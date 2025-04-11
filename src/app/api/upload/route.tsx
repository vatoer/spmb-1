import { NextRequest, NextResponse } from "next/server";
import path, { extname } from "path";

import saveFile from "@/utils/file-operations/save";

// Create a Logger instance with custom settings

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    console.log("formData", data);

    //const filename = data.get("filename") as string;

    const file = data.get("file") as File;
    const cuid = data.get("cuid") as string;
    console.log("cuid", cuid);
    const filename = file.name;
    console.log("filename", filename);
    const identifier = data.get("identifier") as string;

    const fileExtension = extname(file.name);

    const uniqueFilename = `${identifier}${fileExtension}`; // Generate a unique filename using cuid

    // base path will be mange on save.ts
    const filesFolder = path.posix.join("temp", cuid);

    const allowedMimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/zip",
      "application/x-rar-compressed",
      "application/octet-stream",
    ];
    const { filePath, relativePath, fileHash, fileType } = await saveFile({
      file,
      fileName: uniqueFilename,
      directory: filesFolder,
      allowedMimeTypes,
    });

    console.log("filePath", filePath);
    console.log("relativePath", relativePath);
    console.log("fileHash", fileHash);
    console.log("fileType", fileType);

    // log upladed file
    //logger.info("File saved at:", filePath);
    // const savedFile = await logUploadedFile(
    //   uniqueFilename,
    //   file.name,
    //   relativePath,
    //   fileHash,
    //   fileType.mime,
    //   "admin"
    // );
    //logger.info("File saved to database:", savedFile);

    return NextResponse.json({ message: "Upload complete" });
  } catch (error) {
    console.log("[ERROR UPLOAD]", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  } finally {
    console.log("Upload complete");
  }
}

function getFileExtension(filename: string) {
  return filename.split(".").pop();
}
