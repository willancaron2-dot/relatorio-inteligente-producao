"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export default function Home() {
  const [texto, setTexto] = useState("");
  const [dados, setDados] = useState(null);

  async function gerar() {
    const res = await fetch("/api/processar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto })
    });

    const data = await res.json();
    setDados(data);
  }

  const chartData = dados
    ? [
        { name: "Meta", valor: dados.meta },
        { name: "Produção", valor: dados.producao }
      ]
    : [];

  return (
    <div style={{
      background: "#0f172a",
      color: "#fff",
      minHeight: "100vh",
      padding: 20
    }}>
      <h1>📊 Dashboard Produção</h1>

      <textarea
        rows={8}
        style={{ width: "100%", marginBottom: 10 }}
        placeholder="Cole seu relatório..."
        onChange={(e) => setTexto(e.target.value)}
      />

      <button onClick={gerar}>Gerar</button>

      {dados && (
        <>
          <h2>📈 Resultado</h2>
          <p>Meta: {dados.meta}</p>
          <p>Produção: {dados.producao}</p>
          <p>% Atingido: {dados.atingido}%</p>

          <BarChart width={400} height={250} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valor" />
          </BarChart>
        </>
      )}
    </div>
  );
}
