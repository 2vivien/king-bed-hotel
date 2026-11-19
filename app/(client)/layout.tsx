import { WorkspaceShell } from "@/components/layout/WorkspaceShell";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell sectionLabel="Espace Client">{children}</WorkspaceShell>;
}
