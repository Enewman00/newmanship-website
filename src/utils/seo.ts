// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JsonLd = Record<string, any>;

export function generateOrganizationSchema(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Newmanship',
    url: siteUrl,
    description: 'Indie app studio crafting thoughtful mobile apps for iOS and Android.',
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/og/default.png`,
      width: 1200,
      height: 630,
    },
  };
}

export function generateWebSiteSchema(siteUrl: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Newmanship',
    url: siteUrl,
  };
}

export function generateSoftwareApplicationSchema(
  name: string,
  description: string,
  category: string,
  platforms: string[],
  appStoreUrl?: string,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    applicationCategory: category,
    operatingSystem: platforms.join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(appStoreUrl ? { url: appStoreUrl } : {}),
  };
}

export function generateMobileApplicationSchema(opts: {
  name: string;
  description: string;
  pageUrl: string;
  appStoreUrl: string;
  applicationCategory: string;
  applicationSubCategory?: string;
  operatingSystem: string;
  image?: string;
  screenshots?: string[];
  offers: Array<{ name: string; price: string }>;
  rating?: { value: number; count: number };
  // Official social profiles, emitted as sameAs alongside the App Store listing
  profiles?: string[];
  author: string;
  siteUrl: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    name: opts.name,
    description: opts.description,
    url: opts.pageUrl,
    installUrl: opts.appStoreUrl,
    downloadUrl: opts.appStoreUrl,
    sameAs: [opts.appStoreUrl, ...(opts.profiles ?? [])],
    applicationCategory: opts.applicationCategory,
    ...(opts.applicationSubCategory ? { applicationSubCategory: opts.applicationSubCategory } : {}),
    operatingSystem: opts.operatingSystem,
    inLanguage: 'en',
    ...(opts.image ? { image: opts.image } : {}),
    ...(opts.screenshots ? { screenshot: opts.screenshots } : {}),
    offers: opts.offers.map(({ name, price }) => ({
      '@type': 'Offer',
      name,
      price,
      priceCurrency: 'USD',
    })),
    ...(opts.rating
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: opts.rating.value,
            ratingCount: opts.rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    author: { '@type': 'Person', name: opts.author },
    publisher: { '@type': 'Organization', name: 'Newmanship', url: opts.siteUrl },
  };
}

export function generateFAQPageSchema(
  faqs: Array<{ question: string; answer: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };
}

export function generateArticleSchema(
  headline: string,
  description: string,
  author: string,
  datePublished: Date,
  dateModified?: Date,
  image?: string,
  url?: string,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: datePublished.toISOString(),
    ...(dateModified ? { dateModified: dateModified.toISOString() } : {}),
    ...(image ? { image } : {}),
    ...(url ? { url } : {}),
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, url }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: url,
    })),
  };
}
