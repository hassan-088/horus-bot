import recommendedRoutesRaw from '../../shared/booking-product-system/recommended_routes.v1.json?raw';
import { sharedExhibitRecords } from '@/lib/exhibitCatalog';

export interface RecommendedRoute {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  theme: string;
  recommended_for: string[];
  duration_min: number;
  pace: string;
  kids_friendly: boolean;
  photo_spots: boolean;
  cover_image: string;
  artifact_ids: string[];
  recommended_language: string;
  is_active: boolean;
  route_order: number;
}

export interface RecommendedRouteLoadResult {
  routes: RecommendedRoute[];
  warnings: string[];
}

const ARTIFACT_ID_PATTERN = /^artifact_\d{3}$/;
const PLACEHOLDER_COVER_IMAGE = '/placeholder.svg';

function parseRecommendedRoutes(): RecommendedRoute[] {
  const parsed = JSON.parse(recommendedRoutesRaw) as unknown;
  return Array.isArray(parsed) ? (parsed as RecommendedRoute[]) : [];
}

export function validateRecommendedRoutes(
  routes: RecommendedRoute[],
  exhibitIds = new Set(sharedExhibitRecords.map((exhibit) => exhibit.id)),
): string[] {
  const warnings: string[] = [];
  const routeIds = new Set<string>();

  if (routes.length !== 7) {
    warnings.push(`Expected 7 recommended routes, found ${routes.length}.`);
  }

  for (const route of routes) {
    if (!route.id?.trim()) {
      warnings.push('Recommended route has an empty id.');
    } else if (routeIds.has(route.id)) {
      warnings.push(`Duplicate recommended route id: ${route.id}.`);
    } else {
      routeIds.add(route.id);
    }

    if (!route.title_en?.trim() || !route.title_ar?.trim()) {
      warnings.push(`${route.id}: missing title content.`);
    }
    if (!route.description_en?.trim() || !route.description_ar?.trim()) {
      warnings.push(`${route.id}: missing description content.`);
    }

    const artifactIds = new Set<string>();
    for (const artifactId of route.artifact_ids ?? []) {
      if (!ARTIFACT_ID_PATTERN.test(artifactId)) {
        warnings.push(`${route.id}: invalid artifact id ${artifactId}.`);
        continue;
      }
      if (artifactIds.has(artifactId)) {
        warnings.push(`${route.id}: duplicate artifact id ${artifactId}.`);
      } else {
        artifactIds.add(artifactId);
      }
      if (!exhibitIds.has(artifactId)) {
        warnings.push(`${route.id}: unknown artifact id ${artifactId}.`);
      }
    }
  }

  return warnings;
}

export function coverImageOrPlaceholder(route: RecommendedRoute): string {
  return route.cover_image?.trim() || PLACEHOLDER_COVER_IMAGE;
}

export function loadRecommendedRoutes(): RecommendedRouteLoadResult {
  try {
    const routes = parseRecommendedRoutes().sort(
      (a, b) => a.route_order - b.route_order,
    );
    const warnings = validateRecommendedRoutes(routes);
    const invalidRouteIds = invalidRouteIdsFromWarnings(warnings);
    return {
      routes: routes.filter((route) => !invalidRouteIds.has(route.id)),
      warnings,
    };
  } catch (error) {
    return {
      routes: [],
      warnings: [
        `Unable to load recommended routes: ${
          error instanceof Error ? error.message : String(error)
        }`,
      ],
    };
  }
}

export const recommendedRoutes = loadRecommendedRoutes().routes;

function invalidRouteIdsFromWarnings(warnings: string[]): Set<string> {
  const ids = new Set<string>();
  for (const warning of warnings) {
    if (!warning.includes(': invalid artifact id') && !warning.includes(': unknown artifact id')) {
      continue;
    }
    const [routeId] = warning.split(':');
    if (routeId) ids.add(routeId);
  }
  return ids;
}
