export interface NavItem {
  label: string;
  href: string;
}

export const primaryNavItems: readonly NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Chambres", href: "/rooms" },
  { label: "Services", href: "/services" },
  { label: "Galerie", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerNavItems: readonly NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Chambres", href: "/rooms" },
  { label: "Services", href: "/services" },
  { label: "Galerie", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Mon espace", href: "/account" },
  { label: "FAQ", href: "/faq" },
] as const;
