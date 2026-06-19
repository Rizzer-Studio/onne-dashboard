import './globals.css';

export const metadata = {
  title: 'Onne Dashboard MVP v1',
  description: 'Dashboard premium para bot Discord Onne'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
