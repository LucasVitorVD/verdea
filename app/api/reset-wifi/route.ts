import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ip, username, password } = await req.json();

    if (!ip || !username || !password) {
      return NextResponse.json({ error: "IP, username e password são obrigatórios" }, { status: 400 });
    }
    
    const response = await fetch(`http://${ip}/api/reset-wifi`, {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(`${username}:${password}`).toString("base64"),
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: "Erro no ESP", details: text }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });

  } catch (err: any) {
    return NextResponse.json({ error: "Erro interno", details: err.message }, { status: 500 });
  }
}