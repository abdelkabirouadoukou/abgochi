"use client";

import { useCallback, useRef, useState } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { compressImageFile } from "@/lib/compress-image";
import { uploadFileUrl } from "@/lib/upload-url";
import { useUploadThing } from "@/lib/uploadthing-client";
import type { ClientFileDTO } from "@/lib/clients";

const MAX_BATCH = 8;
const MAX_MB = 16;

type ClientFileUploaderProps = {
  clientId: string;
  files: ClientFileDTO[];
  onFilesChange: (files: ClientFileDTO[]) => void;
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

function isImageFile(name: string) {
  const n = name.toLowerCase();
  if (n.endsWith(".pdf")) return false;
  return /\.(jpe?g|png|webp|gif|heic|heif)$/i.test(n);
}

export function ClientFileUploader({
  clientId,
  files,
  onFilesChange,
}: ClientFileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { startUpload, isUploading } = useUploadThing("clientFiles", {
    onUploadProgress: (p) => {
      const pct = 40 + Math.round(p * 0.5);
      setProgress(pct);
      setStatusText(`Envoi ${pct}%`);
    },
  });

  const working = busy || isUploading;

  const saveUploaded = useCallback(
    async (uploaded: { url: string; name: string }[]) => {
      const added: ClientFileDTO[] = [];
      for (const item of uploaded) {
        const res = await fetch(`/api/clients/${clientId}/files`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileUrl: item.url,
            fileName: item.name,
          }),
        });
        if (!res.ok) throw new Error("Could not save file to client");
        added.push(await res.json());
      }
      onFilesChange([...files, ...added]);
    },
    [clientId, files, onFilesChange]
  );

  const processFiles = useCallback(
    async (fileList: FileList | null) => {
      if (!fileList?.length || working) return;
      setError(null);

      const raw = Array.from(fileList).slice(0, MAX_BATCH).filter((f) => {
        const ok =
          f.type.startsWith("image/") ||
          f.type === "application/pdf" ||
          f.name.toLowerCase().endsWith(".pdf");
        if (!ok) setError(`"${f.name}" — type non supporté`);
        if (f.size > MAX_MB * 1024 * 1024) {
          setError(`"${f.name}" trop volumineux`);
          return false;
        }
        return ok;
      });

      if (!raw.length) return;

      setBusy(true);
      setProgress(5);
      setStatusText("Préparation…");

      try {
        const toUpload: File[] = [];
        for (let i = 0; i < raw.length; i++) {
          const f = raw[i];
          setProgress(Math.round(((i + 0.5) / raw.length) * 35));
          if (f.type.startsWith("image/")) {
            const { file } = await compressImageFile(f);
            toUpload.push(file);
          } else {
            toUpload.push(f);
          }
        }

        setStatusText("Envoi des fichiers…");
        setProgress(40);

        const result = await withRetry(() => startUpload(toUpload));
        if (!result?.length) throw new Error("Aucun fichier reçu");

        const payload = result.map((r) => ({
          url: uploadFileUrl(r),
          name: r.name ?? "file",
        }));

        setProgress(92);
        setStatusText("Enregistrement…");
        await saveUploaded(payload);
        setProgress(100);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Échec du téléversement. Réessayez."
        );
      } finally {
        setBusy(false);
        setProgress(0);
        setStatusText("");
      }
    },
    [working, startUpload, saveUploaded]
  );

  async function removeFile(fileId: string) {
    if (!confirm("Supprimer ce fichier ?")) return;
    const res = await fetch(`/api/clients/${clientId}/files/${fileId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      onFilesChange(files.filter((f) => f.id !== fileId));
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-lg text-white">Fichiers client</p>
      <p className="text-sm text-white/45">
        Photos, croquis, PDF — compressés automatiquement sur téléphone.
      </p>

      <div
        className="admin-upload-zone"
        onDrop={(e) => {
          e.preventDefault();
          if (!working) processFiles(e.dataTransfer.files);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <button
          type="button"
          disabled={working}
          onClick={() => inputRef.current?.click()}
          className="btn-primary py-4 text-base disabled:opacity-50"
        >
          {working ? statusText || "Patientez…" : "+ Ajouter des fichiers"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,application/pdf"
          multiple
          className="hidden"
          disabled={working}
          onChange={(e) => {
            processFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {working ? (
          <div className="mx-auto mt-4 w-full max-w-sm">
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : null}
        {error ? (
          <p className="mt-3 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </div>

      {files.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="admin-card flex flex-col gap-3 p-4"
            >
              {isImageFile(file.fileName) ? (
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  <PremiumImage
                    src={file.fileUrl}
                    alt={file.fileName}
                    sizes="300px"
                    wrapperClassName="absolute inset-0 h-full w-full"
                  />
                </div>
              ) : (
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[80px] items-center justify-center border border-white/10 bg-white/5 text-accent hover:text-white"
                >
                  PDF — {file.fileName}
                </a>
              )}
              <p className="truncate text-sm text-white/60">{file.fileName}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <a
                  href={file.fileUrl}
                  download={file.fileName}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex-1 py-3 text-center text-sm"
                >
                  Télécharger
                </a>
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="btn-ghost flex-1 py-3 text-sm"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/40">Aucun fichier pour l&apos;instant.</p>
      )}
    </div>
  );
}
