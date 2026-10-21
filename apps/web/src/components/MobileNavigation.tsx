import type { SiteContent } from '@variedades-mo/contracts';

type MobileNavigationProps = {
  navigation: SiteContent['navigation'];
};

export function MobileNavigation({ navigation }: MobileNavigationProps) {
  const items = [
    { href: '#contenido-principal', icon: '⌂', label: navigation.homeLabel },
    { href: '#colecciones', icon: '♡', label: navigation.collectionsLabel },
    { href: '#catalogo', icon: '▦', label: navigation.catalogLabel },
    { href: '#contacto', icon: '✦', label: navigation.contactLabel },
  ];

  return (
    <nav className="mobile-navigation" aria-label="Navegación móvil">
      {items.map((item) => (
        <a href={item.href} key={item.href}>
          <span aria-hidden="true">{item.icon}</span>
          <small>{item.label}</small>
        </a>
      ))}
    </nav>
  );
}
