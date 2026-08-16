export const metadata = {
  title: "דירה מס' 8 — 2D / 3D",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
