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

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    // Limite de 5 MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Arquivo muito grande. Máx: 5MB" }, { status: 400 })
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de arquivo inválido" }, { status: 400 });
    }

    const uploadData = await pinata.upload.public.file(file);
    const url = await pinata.gateways.public.convert(uploadData.cid)

    return NextResponse.json({ url }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}