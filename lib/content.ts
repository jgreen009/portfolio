import {projectDetails} from './project-details';
import capturedMedia from '../src/project-media.json';
import { projects as suppliedProjects, profile, services, process, ecosystem } from '../src/content.mjs';
export {profile,services,process,ecosystem};
export type Media = { src: string; alt: string; width: number; height: number; caption?:string; kind?:'desktop'|'mobile'|'detail' };
export type ContentState='draft'|'verified'|'hidden'|'comingSoon';
export type OptionalProjectField='year'|'client'|'heroMedia'|'responsibilities'|'architecture'|'designProcess'|'challenges'|'gallery'|'metrics';
export type Project = {featured:boolean;storyMode?:string;note?:string;slug:string;name:string;short:string;category:string;description:string;problem:string;outcome:string;tech:string[];features:string[];url?:string;status:string|null;year:number|null;industry:string|null;client:string|null;heroMedia:Media|null;responsibilities:string[];architecture:string|null;designProcess:string|null;challenges:string|null;gallery:Media[];metrics:{label:string;value:string}[];readiness:Record<OptionalProjectField,ContentState>};
const mediaByProject=capturedMedia as Record<string,{hero?:Media;gallery:Media[]}>;
const featuredSlugs=['velune','plp-estimate-unifier','production-order-crm','aurelis-estate','svip'];
export const projects: Project[] = suppliedProjects.map(p=>{
  const media=mediaByProject[p.slug];
  const detail=projectDetails[p.slug];
  const confirmedWebsite=['aurelis-estate','forge-fitness','rise-hydration','key-tapper','svip','capy-custom-pc'].includes(p.slug);
  return {...p,featured:featuredSlugs.includes(p.slug),status:p.slug==='production-order-crm'?'Phase 2 complete':['forge-fitness','northridge-build','billora-landing'].includes(p.slug)?'Concept website':null,year:null,industry:p.slug==='plp-estimate-unifier'?'Insurance technology':p.slug==='aurelis-estate'?'Luxury real estate':null,client:null,heroMedia:media?.hero??null,responsibilities:detail?.responsibilities??(confirmedWebsite?['Complete website implementation']:[]),architecture:detail?.architecture??null,designProcess:detail?.designProcess??null,challenges:detail?.challenges??null,gallery:media?.gallery??[],metrics:[],readiness:{year:'draft',client:'draft',heroMedia:media?.hero?'verified':'draft',responsibilities:detail||confirmedWebsite?'verified':'draft',architecture:detail?'verified':'draft',designProcess:detail?'verified':'draft',challenges:detail?'verified':'draft',gallery:media?.gallery.length?'verified':'draft',metrics:'draft'}};
});
// Keep the flagship commerce build first in both the archive and selected work.
projects.sort((a,b)=>Number(b.slug==='velune')-Number(a.slug==='velune'));
export const featuredProjects=projects.filter(p=>p.featured);
export function validPublicUrl(value:string|null|undefined):value is string{try{const url=new URL(value||'');return url.protocol==='https:'&&!url.username&&!url.password}catch{return false}}
export function visibleField(project:Project,field:OptionalProjectField){return project.readiness[field]==='verified'}
export const socialLinks: {label:string;url:string|null;state:ContentState}[]=['LinkedIn','GitHub','Fiverr','Contra'].map(label=>({label,url:null,state:'draft'}));
export const testimonials: {quote:string;name:string;role?:string;company?:string;state:ContentState}[]=[];
export const publicTestimonials=testimonials.filter(t=>t.state==='verified'&&t.quote.trim()&&t.name.trim());
export const publicSocialLinks=socialLinks.filter(s=>s.state==='verified'&&validPublicUrl(s.url));
export const resume: {enabled:boolean;url:string|null;state:ContentState}={enabled:false,url:null,state:'draft'};
