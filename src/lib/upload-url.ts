/** UploadThing v8+ prefers ufsUrl over deprecated url */
export function uploadFileUrl(file: {
  url?: string | null;
  ufsUrl?: string | null;
}): string {
  return file.ufsUrl ?? file.url ?? "";
}
