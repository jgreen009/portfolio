import type {MetadataRoute} from 'next';
import {projects} from '@/lib/content';
import {siteOrigin} from '@/lib/site-url.mjs';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return siteOrigin?['/','/work/','/about/','/contact/',...projects.map(p=>`/work/${p.slug}/`)].map(path=>({url:`${siteOrigin}${path}`})):[]}
