import exhibitCatalogRaw from '../../shared/booking-product-system/exhibits.v1.json?raw';

interface SharedExhibitRecord {
  id: string;
  title_en?: string;
  title_ar?: string | null;
  historical_period?: string | null;
  content_en?: {
    summary?: string;
    historical_background?: string;
  };
  locations?: {
    original?: string | null;
    current?: string | null;
    gallery?: string | null;
    floor?: string | null;
    map?: {
      x?: number | null;
      y?: number | null;
    };
  };
  media?: {
    image_url?: string | null;
    alt_en?: string | null;
  };
  is_active?: boolean;
  route_order?: number | null;
  themes?: string[];
  tags?: string[];
}

interface SharedExhibitCatalog {
  standard_route_ids: string[];
  exhibits: SharedExhibitRecord[];
}

export const exhibitCatalog = JSON.parse(exhibitCatalogRaw) as SharedExhibitCatalog;

export const sharedStandardRouteIds = exhibitCatalog.standard_route_ids;

export const sharedExhibitRecords = exhibitCatalog.exhibits;
