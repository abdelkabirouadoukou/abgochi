"use client";

import { useCallback, useRef, useState } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { compressImageFiles } from "@/lib/compress-image";
import { uploadFileUrl } from "@/lib/upload-url";
import { useUploadThing } from "@/lib/uploadthing-client";

const MAX_FILES_PER_BATCH = 10;
const MAX_FILE_MB = 16;

type ImageUploaderProps = {
  images: string[];
  onChange: (urls: string[]) => void;
};

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((r) => setTimeout(r, 800 * (i + 1)));
      }
    }
  }
  throw lastError;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<
    "idle" | "compressing" | "uploading" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);

  const imagesRef = useRef(images);
  imagesRef.current = images;

  const { startUpload, isUploading } = useUploadThing("productImages", {
    onUploadProgress: (p) => {
      const pct = 50 + Math.round(p * 0.5);
      setProgress(pct);
      setStatusText(`Uploading ${pct}%`);
    },
  });

  const busy = status === "compressing" || status === "uploading" || isUploading;

  const processFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList?.length || busy) return;

      setError(null);
      const raw = Array.from(fileList).filter((f) => {
        if (!f.type.startsWith("image/")) {
          setError(`"${f.name}" is not a valid image.`);
          return false;
        }
        if (f.size > MAX_FILE_MB * 1024 * 1024) {
          setError(`"${f.name}" is too large (max ${MAX_FILE_MB}MB before compression).`);
          return false;
        }
        return true;
      });

      if (raw.length === 0) return;

      const batch = raw.slice(0, MAX_FILES_PER_BATCH);
      if (raw.length > MAX_FILES_PER_BATCH) {
        setError(`Only ${MAX_FILES_PER_BATCH} images per batch. Upload in groups if needed.`);
      }

      try {
        setStatus("compressing");
        setStatusText("Optimizing photos…");
        setProgress(0);

        const compressed = await compressImageFiles(batch, (done, total) => {
          setProgress(Math.round((done / total) * 50));
        });

        const localPreviews = compressed.map((c) => URL.createObjectURL(c.file));
        setPreviews((prev) => [...prev, ...localPreviews]);

        setStatus("uploading");
        setStatusText("Uploading…");
        setProgress(55);

        const files = compressed.map((c) => c.file);

        const result = await withRetry(() => startUpload(files));

        if (!result?.length) {
          throw new Error("Upload returned no files. Check UploadThing configuration.");
        }

        const urls = result.map((f) => uploadFileUrl(f)).filter(Boolean);
        onChange([...imagesRef.current, ...urls]);
        localPreviews.forEach((u) => URL.revokeObjectURL(u));
        setPreviews([]);
        setStatus("idle");
        setProgress(100);
        setStatusText("");
      } catch (err) {
        setStatus("error");
        setProgress(0);
        setStatusText("");
        setError(
          err instanceof Error ? err.message : "Something went wrong. Please retry."
        );
        setPreviews((prev) => {
          prev.forEach((u) => URL.revokeObjectURL(u));
          return [];
        });
      }
    },
    [busy, onChange, startUpload]
  );

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!busy) processFiles(e.dataTransfer.files);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function removePreview(index: number) {
    setPreviews((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
  }

  const allPreviews = [...images, ...previews];

  return (
    <div className="space-y-5">
      <p className="text-lg text-white">Photos</p>
      <p className="text-sm text-white/45">
        Phone photos are compressed automatically before upload. Max {MAX_FILES_PER_BATCH} at a time.
      </p>

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="admin-upload-zone"
      >
        <button
          type="button"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
          className="btn-primary mt-2 disabled:opacity-50"
        >
          {busy ? statusText || "Working…" : "Choose images"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={busy}
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {busy ? (
          <div className="mx-auto mt-5 w-full max-w-xs">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-center text-xs text-white/50">{statusText}</p>
          </div>
        ) : null}
        {error ? (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
            <button
              type="button"
              className="btn-ghost text-sm"
              onClick={() => {
                setError(null);
                setStatus("idle");
              }}
            >
              Dismiss
            </button>
          </div>
        ) : null}
      </div>

      {allPreviews.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((url, index) => (
            <div
              key={`saved-${url}`}
              className="relative aspect-square overflow-hidden border border-white/10 bg-black/40"
            >
              <PremiumImage
                src={url}
                alt={`Product ${index + 1}`}
                sizes="200px"
                wrapperClassName="absolute inset-0 h-full w-full"
              />
              <span className="absolute left-2 top-2 z-10 bg-black/70 px-1.5 py-0.5 text-[10px] text-white/80">
                Saved
              </span>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute right-2 top-2 z-10 bg-black/85 px-2 py-1 text-xs text-white"
              >
                Remove
              </button>
            </div>
          ))}
          {previews.map((url, index) => (
            <div
              key={`preview-${url}`}
              className="relative aspect-square overflow-hidden border border-accent/30 bg-black/40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="h-full w-full object-cover" />
              <span className="absolute left-2 top-2 z-10 bg-accent/80 px-1.5 py-0.5 text-[10px] text-black">
                Preview
              </span>
              {status !== "uploading" ? (
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute right-2 top-2 z-10 bg-black/85 px-2 py-1 text-xs text-white"
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
