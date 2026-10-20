export function parseSiteUrl(raw) {
  if (!raw?.trim()) return null;
  const url = new URL(raw);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash || url.hostname === 'localhost' || url.hostname.endsWith('.localhost') || /^[\d.]+$/.test(url.hostname) || url.hostname.includes(':')) throw new Error('NEXT_PUBLIC_SITE_URL must be the final HTTPS origin without credentials, path, query or fragment.');
  return url.origin;
}
export const siteOrigin = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const absoluteUrl = path => siteOrigin ? new URL(path,siteOrigin).href : undefined;
