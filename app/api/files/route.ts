import { pinata } from "@/lib/pinata-config"
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file = data.get("imageFile") as unknown as File;
    const uploadData = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(uploadData.cid)

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}