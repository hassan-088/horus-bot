import { useEffect, useMemo, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/integrations/firebase/client';
import { exhibits as fallbackExhibits } from '@/lib/data';

export interface WebsiteExhibit {
  id: string;
  titleEn: string;
  titleAr: string | null;
  summary: string;
  routeOrder: number | null;
  themes: string[];
  tags: string[];
  imageUrl: string | null;
  altEn: string;
  isActive: boolean;
  source: 'firestore' | 'fallback';
}

const STANDARD_ROUTE_IDS = [
  'artifact_001',
  'artifact_005',
  'artifact_002',
  'artifact_006',
  'artifact_018',
  'artifact_030',
];

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === 'string')
    : [];
}

function asRouteOrder(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function fromFirestore(id: string, data: Record<string, unknown>): WebsiteExhibit {
  const media = (data.media && typeof data.media === 'object')
    ? data.media as Record<string, unknown>
    : {};
  const contentEn = (data.content_en && typeof data.content_en === 'object')
    ? data.content_en as Record<string, unknown>
    : {};
  const titleEn = (data.title_en as string | undefined) ?? id;

  return {
    id: (data.id as string | undefined) ?? id,
    titleEn,
    titleAr: (data.title_ar as string | null | undefined) ?? null,
    summary: (contentEn.summary as string | undefined)
      ?? (contentEn.historical_background as string | undefined)
      ?? '',
    routeOrder: asRouteOrder(data.route_order),
    themes: asStringArray(data.themes),
    tags: asStringArray(data.tags),
    imageUrl: (media.image_url as string | null | undefined) ?? null,
    altEn: (media.alt_en as string | undefined) ?? titleEn,
    isActive: data.is_active !== false,
    source: 'firestore',
  };
}

function fallbackRows(): WebsiteExhibit[] {
  return fallbackExhibits.map((exhibit) => ({
    id: exhibit.id,
    titleEn: exhibit.nameEn,
    titleAr: exhibit.nameAr,
    summary: exhibit.descriptionEn,
    routeOrder: null,
    themes: [],
    tags: [],
    imageUrl: null,
    altEn: exhibit.nameEn,
    isActive: true,
    source: 'fallback',
  }));
}

export function useExhibits() {
  const [exhibits, setExhibits] = useState<WebsiteExhibit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const snap = await getDocs(collection(db, 'exhibits'));
        const rows = snap.docs
          .map((docSnap) => fromFirestore(docSnap.id, docSnap.data() as Record<string, unknown>))
          .filter((exhibit) => exhibit.isActive)
          .sort((a, b) => a.id.localeCompare(b.id));

        if (!mounted) return;
        setExhibits(rows.length > 0 ? rows : fallbackRows());
      } catch (e) {
        if (!mounted) return;
        setError((e as Error).message);
        setExhibits(fallbackRows());
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const standardRoute = useMemo(() => {
    const ordered = exhibits
      .filter((exhibit) => exhibit.routeOrder !== null)
      .sort((a, b) => (a.routeOrder ?? 999) - (b.routeOrder ?? 999));
    if (ordered.length === STANDARD_ROUTE_IDS.length) return ordered;

    const byId = new Map(exhibits.map((exhibit) => [exhibit.id, exhibit]));
    return STANDARD_ROUTE_IDS
      .map((id) => byId.get(id))
      .filter((exhibit): exhibit is WebsiteExhibit => Boolean(exhibit));
  }, [exhibits]);

  return { exhibits, loading, error, standardRoute };
}

