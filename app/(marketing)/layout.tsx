import { PageShell } from "@/components/layout/PageShell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}
