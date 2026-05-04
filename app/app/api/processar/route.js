export async function POST(req) {
  const { texto } = await req.json();

  const metaMatch = texto.match(/Meta:\s*([\d,]+)/);
  const prodMatch = texto.match(/Produção:\s*([\d,]+)/);

  if (!metaMatch || !prodMatch) {
    return new Response(JSON.stringify({ erro: "Erro ao ler dados" }), {
      status: 400
    });
  }

  const meta = parseFloat(metaMatch[1].replace(",", "."));
  const producao = parseFloat(prodMatch[1].replace(",", "."));

  const atingido = (producao / meta) * 100;

  return new Response(JSON.stringify({
    meta,
    producao,
    atingido: atingido.toFixed(2)
  }));
}
