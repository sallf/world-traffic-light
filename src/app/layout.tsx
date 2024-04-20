// import { useRouter } from 'next/navigation';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
  // const router = useRouter();
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
