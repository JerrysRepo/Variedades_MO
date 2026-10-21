import type { SiteContent } from '@variedades-mo/contracts';

import { Icon, type IconName } from './Icon';

type MobileNavigationProps = {
  navigation: SiteContent['navigation'];
};

export function MobileNavigation({ navigation }: MobileNavigationProps) {
  const items: Array<{ href: string; icon: IconName; label: string }> = [
    { href: '#contenido-principal', icon: 'home', label: navigation.homeLabel },
    { href: '#colecciones', icon: 'gift', label: navigation.collectionsLabel },
    { href: '#catalogo', icon: 'grid', label: navigation.catalogLabel },
    { href: '#contacto', icon: 'heart', label: navigation.contactLabel },
  ];

  return (
    <nav className="mobile-navigation" aria-label="Navegación móvil">
      {items.map((item) => (
        <a href={item.href} key={item.href}>
          <Icon name={item.icon} />
          <small>{item.label}</small>
        </a>
      ))}
    </nav>
  );
}
