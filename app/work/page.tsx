export const metadata=pageMetadata("Selected work","Explore Michael’s AI applications, automation tools, custom websites, Framer work, and browser game.","/work/");
import {pageMetadata,breadcrumbs,person} from '@/lib/seo';
import {StructuredData} from '@/components/structured-data';
import {Label,ProjectCard,ContactCTA} from '@/components/portfolio';
import {projects} from '@/lib/content';
export default function Work(){return <><StructuredData data={breadcrumbs([{name:"Selected work",path:"/work/"}])}/><section className="page-intro wrap"><Label>SELECTED WORK / {String(projects.length).padStart(2,'0')} PROJECTS</Label><h1>Different challenges.<br/><em>Deliberate solutions.</em></h1><p>AI applications, operational systems, custom websites, and interactive experiences.</p></section><section className="wrap work-archive">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</section><ContactCTA/></>}
