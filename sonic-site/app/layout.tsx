import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

/**
 * Global metadata applied to every page.  Titles and descriptions can
 * be overridden in individual pages.  See https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  title: 'OSiO ETH Website | Faces',
  description:
    'An improved Next.js scaffold for the OSiO Ethiopia website. The original site was built as a static export; this version splits global styles, head tags and page markup into manageable modules.',
};

/**
 * The root layout.  All pages are rendered inside this component.
 * Global providers (such as contexts), headers and footers can be
 * defined here.  Note: Do not import client‑side hooks (e.g. useState)
 * directly in this file since it runs on the server.
 */
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
