const MAX_EDGE = 2000;
const MAX_OUTPUT_BYTES = 8 * 1024 * 1024;
const DEFAULT_QUALITY = 0.82;

export type CompressResult = {
  file: File;
  originalSize: number;
  compressedSize: number;
};

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Could not read "${file.name}"`));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

async function encodeOptimized(
  canvas: HTMLCanvasElement,
  fileName: string
): Promise<Blob> {
  const webpSupported =
    typeof document !== "undefined" &&
    canvas.toDataURL("image/webp").startsWith("data:image/webp");

  const baseName = fileName.replace(/\.[^.]+$/, "") || "image";
  let quality = DEFAULT_QUALITY;

  for (let attempt = 0; attempt < 6; attempt++) {
    const type = webpSupported ? "image/webp" : "image/jpeg";
    const blob = await canvasToBlob(canvas, type, quality);
    if (!blob) break;
    if (blob.size <= MAX_OUTPUT_BYTES) return blob;
    quality -= 0.12;
  }

  const fallback = await canvasToBlob(canvas, "image/jpeg", 0.7);
  if (!fallback) {
    throw new Error("Compression failed");
  }
  return fallback;
}

/**
 * Resize & compress phone photos in-browser before UploadThing upload.
 */
export async function compressImageFile(file: File): Promise<CompressResult> {
  if (!file.type.startsWith("image/")) {
    throw new Error(`"${file.name}" is not an image`);
  }

  if (file.size <= 400_000 && file.type === "image/webp") {
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
    };
  }

  try {
    const img = await loadImageFromFile(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported");

    ctx.drawImage(img, 0, 0, width, height);
    const blob = await encodeOptimized(canvas, file.name);
    const ext = blob.type === "image/webp" ? "webp" : "jpg";
    const safeName = file.name.replace(/\.[^.]+$/, "") || "product";
    const compressed = new File([blob], `${safeName}.${ext}`, {
      type: blob.type,
      lastModified: Date.now(),
    });

    return {
      file: compressed,
      originalSize: file.size,
      compressedSize: compressed.size,
    };
  } catch {
    if (file.size > MAX_OUTPUT_BYTES) {
      throw new Error(
        `"${file.name}" is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Try another photo.`
      );
    }
    return {
      file,
      originalSize: file.size,
      compressedSize: file.size,
    };
  }
}

export async function compressImageFiles(
  files: File[],
  onProgress?: (done: number, total: number) => void
): Promise<CompressResult[]> {
  const results: CompressResult[] = [];
  for (let i = 0; i < files.length; i++) {
    results.push(await compressImageFile(files[i]));
    onProgress?.(i + 1, files.length);
  }
  return results;
}
