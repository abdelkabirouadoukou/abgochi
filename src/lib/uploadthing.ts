import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  productImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      if (!process.env.UPLOADTHING_TOKEN) {
        throw new UploadThingError("UploadThing is not configured");
      }
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
  galleryImage: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      if (!process.env.UPLOADTHING_TOKEN) {
        throw new UploadThingError("UploadThing is not configured");
      }
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
