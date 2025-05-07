import { Client } from "@gradio/client";

export async function POST(req: Request) {
  const client = await Client.connect("SirGhazian/flirty-text-classifier");
  const { text } = await req.json(); // ambil teks dari body request
  const result = await client.predict("/predict", { text });

  return new Response(JSON.stringify(result.data), {
    headers: { "Content-Type": "application/json" },
  });
}
