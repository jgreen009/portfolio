import { projects as suppliedProjects, profile, services, process, ecosystem } from '../src/content.mjs';
export {profile,services,process,ecosystem};
export type Media = { src: string; alt: string; width: number; height: number };
export type Project = {slug:string;name:string;short:string;category:string;description:string;problem:string;outcome:string;tech:string[];features:string[];url?:string;status:string|null;year:number|null;industry:string|null;client:string|null;heroMedia:Media|null;responsibilities:string[];architecture:string|null;designProcess:string|null;challenges:string|null;gallery:Media[]};
export const projects: Project[] = suppliedProjects.map((p,i)=>({...p,status:i===1?'Phase 2 complete':null,year:null,industry:i===0?'Insurance technology':i===2?'Luxury real estate':null,client:null,heroMedia:null,responsibilities:[],architecture:null,designProcess:null,challenges:null,gallery:[]}));
export const socialLinks: {label:string;url:string|null}[]=['LinkedIn','GitHub','Fiverr','Contra'].map(label=>({label,url:null}));
export const testimonials: {quote:string;name:string;role?:string;company?:string}[]=[];
export const resume: {enabled:boolean;url:string|null}={enabled:false,url:null};
