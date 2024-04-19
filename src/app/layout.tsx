import './global.css';

export const metadata = {
  title: 'World Traffic Light',
  description: 'How well does your project work in the world?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
