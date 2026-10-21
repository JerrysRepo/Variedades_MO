import { useState } from 'react';

import { AnnouncementBar } from './components/AnnouncementBar';
import { BenefitsBar } from './components/BenefitsBar';
import { CatalogSection } from './components/CatalogSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ContactSection } from './components/ContactSection';
import { ErrorPanel } from './components/ErrorPanel';
import { HeroSection } from './components/HeroSection';
import { LoadingPage } from './components/LoadingPage';
import { MobileNavigation } from './components/MobileNavigation';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { StorySection } from './components/StorySection';
import { appConfig } from './config';
import { useCatalog } from './hooks/useCatalog';

export function App() {
  const { status, catalog, message, retry } = useCatalog();
  const [selectedCategory, setSelectedCategory] = useState('');

  if (status === 'loading') {
    return <LoadingPage />;
  }

  if (status === 'error') {
    return <ErrorPanel message={message} onRetry={retry} />;
  }

  const { benefits, categories, products, site } = catalog;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido-principal">
        Saltar al contenido principal
      </a>

      <AnnouncementBar {...site.announcement} />
      <SiteHeader
        brand={site.brand}
        navigation={site.navigation}
        whatsappLabel={site.contact.whatsappLabel}
        whatsappUrl={site.contact.whatsappUrl}
      />

      <main id="contenido-principal" tabIndex={-1}>
        <HeroSection content={site.hero} />
        <BenefitsBar benefits={benefits} />
        <CategoryShowcase
          categories={categories}
          content={site.collections}
          onSelect={setSelectedCategory}
        />
        <CatalogSection
          categories={categories}
          content={site.catalog}
          onCategoryChange={setSelectedCategory}
          products={products}
          selectedCategory={selectedCategory}
        />
        <StorySection content={site.story} tagline={site.brand.tagline} />
        <ContactSection content={site.contact} />
      </main>

      {appConfig.usesMockData ? (
        <p className="development-note">Vista local · Datos de demostración</p>
      ) : null}
      <SiteFooter site={site} />
      <MobileNavigation navigation={site.navigation} />
    </div>
  );
}
