import {pageMetadata,projectSchema,breadcrumbs} from '@/lib/seo';
import {StructuredData} from '@/components/structured-data';
import {notFound} from 'next/navigation';
import {projects} from '@/lib/content';
import {CaseStudy} from '@/components/portfolio';
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=projects.find(p=>p.slug===slug);return p?pageMetadata(p.name,p.description,`/work/${p.slug}/`,`/og/${p.slug}.png`):{title:'Project not found',robots:{index:false,follow:false}}}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const index=projects.findIndex(p=>p.slug===slug);if(index<0)notFound();return <><StructuredData data={projectSchema(projects[index])}/><StructuredData data={breadcrumbs([{name:'Work',path:'/work/'},{name:projects[index].name,path:`/work/${slug}/`}])}/><CaseStudy project={projects[index]} index={index}/></>}
