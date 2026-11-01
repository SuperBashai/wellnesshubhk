export default function RootRedirectLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-HK"><body>{children}</body></html>;
}
