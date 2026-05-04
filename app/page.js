"use client";

import { useState } from "react";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [dados, setDados] = useState(null);

  async function gerar() {
    const res = await fetch("/api/processar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto })
    });

    const data = await res.json();
    setDados(data);
  }

  return (
    <div style={{
      background: "#0f172a",
      color: "#fff",
      minHeight: "100vh",
      padding: 20
    }}>
      <h1>Relatório Inteligente Produção</h1>

      <textarea
        rows={10}
        style={{ width: "100%" }}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={gerar}>Gerar</button>

      {dados && (
        <div>
          <h2>{dados.producao}</h2>
          <h3>{dados.meta}</h3>
          <h3>{dados.atingido}%</h3>
        </div>
      )}
    </div>
  );
}
