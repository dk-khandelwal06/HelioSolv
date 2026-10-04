import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { DemoProvider } from '@/lib/demo-context';

export const metadata: Metadata = {
  title: 'HelioSolv | Powering a Circular Future for Solar PV Waste',
  description: 'AI-assisted solar panel triage and decentralized Deep Eutectic Solvent (DES) solvometallurgy platform. Extracting 99.9% pure silver and intact silicon at 69% gross margins.',
  keywords: [
    'Solar Recycling',
    'Deep Eutectic Solvents',
    'Solvometallurgy',
    'E-Waste Management Rules 2022',
    'CPCB EPR Credits',
    'SANKALP Satin Finserv',
    'Bhadla Solar Park',
    'Silver Recovery',
    'Circular Economy'
  ],
  authors: [{ name: 'HelioSolv Engineering Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <DemoProvider>
            {children}
          </DemoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
