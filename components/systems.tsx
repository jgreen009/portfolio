'use client';
import {useEffect,useRef,useState} from 'react';
import {motion} from 'motion/react';
import {motionTokens as t} from '@/lib/motion';
import {useMotionActivity} from '@/lib/use-motion-activity';
import {DepthSurface} from './polish';
const stages=[
 ['Input','Documents, requests, and business context.','Context received'],
 ['AI processing','Interpret information within defined rules.','Reasoning with context'],
 ['Data','Keep information structured and traceable.','Information organized'],
 ['Automation','Connect the next action to the right tool.','Workflow connected'],
 ['Business outcome','Deliver useful output with human oversight.','Ready for human review'],
];
export function IntelligentSystem(){
 const ref=useRef<HTMLDivElement>(null);const {enabled,fine,reduced}=useMotionActivity(ref);
 const [active,setActive]=useState(0),[paused,setPaused]=useState(false),[engaged,setEngaged]=useState(false),[manual,setManual]=useState(false);
 const [selection,setSelection]=useState(0);
 const manualUntil=useRef(0);const manualTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const running=enabled&&fine&&!paused&&!engaged&&!manual;
 const runningRef=useRef(running);runningRef.current=running;
 useEffect(()=>{if(!running)return;const id=setInterval(()=>{const box=ref.current?.getBoundingClientRect();if(runningRef.current&&!document.hidden&&box&&box.bottom>0&&box.top<innerHeight)setActive(i=>(i+1)%stages.length)},t.cycleMs);return()=>clearInterval(id)},[running]);
 useEffect(()=>{if(!manual||!enabled)return;const remaining=Math.max(0,manualUntil.current-Date.now());manualTimer.current=setTimeout(()=>setManual(false),remaining);return()=>{if(manualTimer.current)clearTimeout(manualTimer.current)}},[manual,enabled,selection]);
 function choose(i:number){setSelection(n=>n+1);setActive(i);manualUntil.current=Date.now()+t.manualPauseMs;setManual(true)}
 // useMotionActivity also suspends work while document.hidden is true.
 return <DepthSurface className="hero-system-depth"><div ref={ref} className="system operational-system" data-running={running} data-active-stage={active} onMouseEnter={()=>setEngaged(true)} onMouseLeave={()=>setEngaged(false)} onFocusCapture={()=>setEngaged(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setEngaged(false)}}>
 <div className="system-top"><span>INTELLIGENCE, APPLIED</span><span>01 → 05</span></div>
 <div className="system-flow"><svg className="system-wiring" viewBox="0 0 2 420" preserveAspectRatio="none" aria-hidden="true"><path d="M1 54V366"/><motion.path d="M1 54V366" className="wire-active" initial={false} animate={{pathLength:reduced?1:(active+1)/5}} transition={{duration:enabled?t.duration.reveal:0,ease:t.easing}}/>{enabled&&(running||manual)&&<motion.circle key={`${active}-${selection}`} r="3" cx="1" fill="currentColor" initial={{cy:54+active*78,opacity:0}} animate={{cy:Math.min(366,132+active*78),opacity:[0,1,0]}} transition={{duration:t.duration.expressive,ease:'linear'}}/>}</svg>
 {stages.map(([title,description],i)=><button key={title} className={`system-stage ${active===i?'is-active':''}`} aria-pressed={active===i} onClick={()=>choose(i)} aria-describedby={`system-stage-${i}`}><motion.span className="stage-marker" initial={false} animate={{scale:enabled&&active===i?[1,1.055,1]:1}} transition={{duration:t.duration.expressive}} key={`${i}-${active}-${selection}`} aria-hidden="true">0{i+1}</motion.span><span><strong><span className="sr-only">0{i+1} </span>{title}</strong><small id={`system-stage-${i}`}>{description}</small></span><span className="stage-arrow" aria-hidden="true">↗</span></button>)}
 </div><div className="system-readout" aria-hidden="true"><span>OUTPUT / 0{active+1}</span><motion.strong key={`${active}-${selection}`} initial={enabled?{opacity:.7,y:4}:false} animate={{opacity:1,y:0}} transition={{duration:t.duration.fast}}>{stages[active][2]}</motion.strong></div>
 <div className="system-bottom"><span>HUMAN INTENT → USEFUL OUTPUT</span><button type="button" onClick={()=>{setPaused(v=>!v);setManual(false)}} aria-pressed={paused}>{paused?'Resume cycle':'Pause cycle'}</button></div>
 </div></DepthSurface>;
}
