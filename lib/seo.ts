import type {Metadata} from 'next';
import {absoluteUrl,siteOrigin} from './site-url.mjs';
import {profile,type Project} from './content';
export {siteOrigin};
export const person={'@type':'Person',name:profile.name,jobTitle:'AI Developer and Automation Expert',description:'AI Developer, Automation Expert, and Visual Web Designer',email:profile.email,...(siteOrigin?{'@id':`${siteOrigin}/#person`,url:siteOrigin}:{})};
export function pageMetadata(title:string,description:string,path:string,image='/og/portfolio.png'):Metadata{
  const url=absoluteUrl(path),imageUrl=absoluteUrl(image);
  return {title,description,...(siteOrigin?{metadataBase:new URL(siteOrigin),alternates:{canonical:url}}:{}),robots:{index:!!siteOrigin,follow:!!siteOrigin},openGraph:{type:'website',siteName:'Michael',title,description,locale:'en_US',...(url?{url}:{}),...(imageUrl?{images:[{url:imageUrl,width:1200,height:630,alt:title}]}:{})},twitter:{card:'summary_large_image',title,description,...(imageUrl?{images:[imageUrl]}:{})}};
}
export function breadcrumbs(items:{name:string;path:string}[]){if(!siteOrigin)return null;return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{name:'Home',path:'/'},...items].map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:absoluteUrl(item.path)}))}}
export function projectSchema(p:Project){return {'@context':'https://schema.org','@type':'CreativeWork',name:p.name,description:p.description,creator:person,genre:p.category,...(siteOrigin?{url:absoluteUrl(`/work/${p.slug}/`),image:absoluteUrl(`/og/${p.slug}.png`)}:{}),...(p.url?{sameAs:p.url}:{})}}
