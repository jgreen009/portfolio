'use client';
import {useEffect,useRef,useState} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {motionTokens as t} from '@/lib/motion';
import {process} from '@/lib/content';
import {useMotionActivity} from '@/lib/use-motion-activity';
import {Reveal} from './motion';
const artifacts=[['Business need','People & requirements'],['System map','Data & integrations'],['Experience','Structure & interface'],['Application','Components & logic'],['Connected workflow','Triggers & actions'],['Production readiness','Validation & delivery']];
const positions=[[[35,22],[155,12],[285,40],[65,110],[195,120],[310,100]],[[40,25],[160,25],[280,25],[40,110],[160,110],[280,110]],[[70,15],[155,15],[240,15],[70,100],[155,100],[240,100]],[[25,60],[90,60],[155,60],[220,60],[285,60],[350,60]],[[40,60],[145,15],[250,15],[145,110],[250,110],[350,60]],[[45,60],[105,60],[165,60],[225,60],[285,60],[345,60]]];
export function SignatureWorkflow(){
 const root=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);const reduced=useReducedMotion();const a=useMotionActivity(root);
 useEffect(()=>{
  if(!a.visible||!a.foreground)return;
  const nodes=Array.from(root.current?.querySelectorAll<HTMLElement>('[data-workflow-stage]')??[]);
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.workflowStage))},{rootMargin:'-25% 0px -50% 0px',threshold:0});
  nodes.forEach(node=>observer.observe(node));return()=>observer.disconnect();
 },[a.visible,a.foreground]);
 const transition={duration:a.enabled?t.duration.reveal:0,ease:t.easing};
 return <div ref={root} className="signature-workflow" data-active-stage={active}>
 <div className="workflow-progress" aria-hidden="true"><motion.div initial={false} animate={{scaleY:(active+1)/6}} transition={transition}/></div>
 <div className="workflow-display" aria-hidden="true"><div className="workflow-meta"><span>THE DELIVERY SYSTEM</span><span>0{active+1} / 06</span></div><div className="workflow-counter">0{active+1}<span>/06</span></div>
 <svg className="workflow-constellation" viewBox="0 0 400 160" fill="none">{positions[active].slice(1).map(([x,y],i)=>{const [px,py]=positions[active][i];return <motion.path key={i} initial={false} animate={{d:`M${px+12} ${py+12} L${x+12} ${y+12}`,opacity:active===0?.2:1,pathLength:1}} transition={transition}/>})}{positions[active].map(([x,y],i)=><motion.g key={i} initial={false} animate={{x,y}} transition={transition}><rect width="24" height="24" rx={active===5?12:4}/><text x="12" y="16" textAnchor="middle">{active===5?'✓':i+1}</text></motion.g>)}{active===4&&a.enabled&&a.fine&&<motion.circle r="3" fill="#bccaff" initial={{cx:52,cy:72,opacity:0}} animate={{cx:[52,157,262,362],cy:[72,27,27,72],opacity:[0,1,1,0]}} transition={{duration:t.duration.expressive,ease:'linear'}}/>}</svg>
 <div className="workflow-map">{artifacts.map(([title],i)=><div className={i<=active?'reached':''} key={title}><span>{i<active?'✓':String(i+1).padStart(2,'0')}</span><b>{title}</b></div>)}</div>
 <motion.div className="workflow-output" initial={false} animate={{backgroundColor:active===5?'#303c48':'#232734'}} transition={{duration:reduced?0:t.duration.normal}}><span>{artifacts[active][1]}</span><strong>{process[active][0]}</strong></motion.div></div>
 <div className="workflow-stages">{process.map(([title,description],i)=><article key={title} data-workflow-stage={i} className={active===i?'is-active':''}><Reveal><span className="step">0{i+1} / {artifacts[i][0]}</span><h3>{title}</h3><p>{description}</p><span className="workflow-deliverable">↳ {artifacts[i][1]}</span></Reveal></article>)}</div>
 </div>;
}
