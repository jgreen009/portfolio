import {Label,ProjectCard,ContactCTA} from '@/components/portfolio';
import {projects} from '@/lib/content';
export const metadata={title:'Selected work',description:'Explore Michael’s AI applications, business systems, and visual web development.'};
export default function Work(){return <><section className="page-intro wrap"><Label>SELECTED WORK / 01—03</Label><h1>Different challenges.<br/><em>Deliberate solutions.</em></h1><p>AI applications, operational systems, and refined digital experiences.</p></section><section className="wrap">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</section><ContactCTA/></>}
