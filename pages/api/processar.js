export default function handler(req, res) {
  const texto = req.body.texto;

  const metaMatch = texto.match(/Meta:\s*([\d,]+)/);
  const prodMatch = texto.match(/Produção:\s*([\d,]+)/);

  if (!metaMatch || !prodMatch) {
    return res.status(400).json({ erro: "Não conseguiu ler os dados" });
  }

  const meta = parseFloat(metaMatch[1].replace(",", "."));
  const producao = parseFloat(prodMatch[1].replace(",", "."));

  const atingido = (producao / meta) * 100;

  let status = "🟢";
  if (atingido < 100) status = "🔴";

  res.status(200).json({
    meta,
    producao,
    atingido: atingido.toFixed(2),
    status
  });
}
