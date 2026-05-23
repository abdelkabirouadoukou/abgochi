"use client";

import { useCallback, useRef, useState } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { compressImageFiles } from "@/lib/compress-image";
import { MAX_HERO_IMAGES } from "@/lib/site-settings-constants";
import { uploadFileUrl } from "@/lib/upload-url";
import { useUploadThing } from "@/lib/uploadthing-client";

type HeroImagesEditorProps = {
  initialImages: string[];
};

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (e) {
      last = e;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 700 * (i + 1)));
    }
  }
  throw last;
}

export function HeroImagesEditor({ initialImages }: HeroImagesEditorProps) {
  const [images, setImages] = useState(initialImages);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const persist = useCallback(async (next: string[]) => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/site-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroImages: next }),
      });
      if (!res.ok) throw new Error("Save failed");
      const data = await res.json();
      setImages(data.heroImages);
      setSaved(true);
    } catch {
      setError("Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }, []);

  const { startUpload, isUploading } = useUploadThing("productImages", {
    onUploadProgress: (p) => setProgress(Math.round(p)),
  });

  const busy = uploading || isUploading || saving;
  const slotsLeft = MAX_HERO_IMAGES - images.length;

  async function processFiles(fileList: FileList | null) {
    if (!fileList?.length || busy || slotsLeft <= 0) return;
    setError(null);
    setUploading(true);

    const raw = Array.from(fileList).slice(0, slotsLeft);
    try {
      const compressed = await compressImageFiles(raw);
      const result = await withRetry(() => startUpload(compressed.map((c) => c.file)));
      if (!result?.length) throw new Error("Upload failed");
      const urls = result.map((f) => uploadFileUrl(f)).filter(Boolean);
      await persist([...images, ...urls]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  function removeAt(index: number) {
    const next = images.filter((_, i) => i !== index);
    setImages(next);
    persist(next);
  }

  return (
    <div className="space-y-6">
      <p className="text-white/50">
        {images.length} / {MAX_HERO_IMAGES} images — these rotate in the homepage hero.
      </p>

      <div className="admin-upload-zone">
        <button
          type="button"
          disabled={busy || slotsLeft <= 0}
          onClick={() => inputRef.current?.click()}
          className="btn-primary py-4 disabled:opacity-40"
        >
          {uploading ? `Uploading ${progress}%` : "+ Add hero image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={busy || slotsLeft <= 0}
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {error ? <p className="text-red-400">{error}</p> : null}
      {saved ? <p className="text-sm text-emerald-400/90">Saved.</p> : null}

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-[3/4] overflow-hidden border border-white/10"
            >
              <PremiumImage
                src={url}
                alt={`Hero ${index + 1}`}
                sizes="200px"
                wrapperClassName="absolute inset-0 h-full w-full"
              />
              <span className="absolute left-2 top-2 bg-black/70 px-2 py-0.5 text-xs text-white">
                {index + 1}
              </span>
              <button
                type="button"
                disabled={busy}
                onClick={() => removeAt(index)}
                className="absolute right-2 top-2 bg-black/85 px-2 py-1 text-xs text-white"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-white/40">No hero images yet. Add 3–10 for the rotating hero.</p>
      )}
    </div>
  );
}
