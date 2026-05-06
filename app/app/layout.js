export const metadata = {
  title: "Dashboard Produção",
  description: "Relatório Inteligente"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
