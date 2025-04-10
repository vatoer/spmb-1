import { NextRequest, NextResponse } from "next/server";
import path, { extname } from "path";

import saveFile from "@/utils/file-operations/save";

// Create a Logger instance with custom settings

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    //const filename = data.get("filename") as string;

    const file = data.get("file") as File;
    const filename = file.name;
    console.log("filename", filename);
    const folderIdentifier = "x";
    // const folderIdentifier = data.get("folder") as string; // folder identifier is kegiatanId
    // check if file have extension

    const hasFileExtension = getFileExtension(filename);
    let uniqueFilename;
    if (hasFileExtension) {
      console.log("hasFileExtension", hasFileExtension);
      const fileExtension = extname(file.name);
      const isSameExtension = fileExtension === hasFileExtension;
      console.log("isSameExtension", isSameExtension);
      // do not add extension if it is the same
      uniqueFilename = filename;
    } else {
      const fileExtension = extname(file.name);
      uniqueFilename = `${filename}${fileExtension}`;
    }

    const fileExtension1 = extname(file.name);
    const fileExtension2 = extname(filename);

    if (fileExtension1 !== fileExtension2) {
      uniqueFilename = `${filename}${fileExtension1}`;
    } else {
      uniqueFilename = filename;
    }

    // base path will be mange on save.ts
    const filesFolder = path.posix.join("temp", folderIdentifier);

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
