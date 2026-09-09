import {notFound} from 'next/navigation';
import {projects} from '@/lib/content';
import {CaseStudy} from '@/components/portfolio';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);return {title:p?.name??'Project not found',description:p?.description}}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const index=projects.findIndex(p=>p.slug===slug);if(index<0)notFound();return <CaseStudy project={projects[index]} index={index}/>}
