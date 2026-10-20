'use client';
import {useEffect,useRef,useState,type ReactNode,type PointerEvent} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {motion,useAnimate,useSpring,useScroll,useReducedMotion} from 'motion/react';
import {motionTokens as t} from '@/lib/motion';
import {useMotionActivity} from '@/lib/use-motion-activity';

export function MotionAction({href,children,className='text-link'}:{href:string;children:ReactNode;className?:string}){
 const ref=useRef<HTMLAnchorElement>(null);const activity=useMotionActivity(ref);
 const x=useSpring(0,t.spring),y=useSpring(0,t.spring);const [pressed,setPressed]=useState(false);const reset=()=>{x.jump(0);y.jump(0);setPressed(false)};
 useEffect(()=>{if(!activity.enabled||!activity.fine){x.jump(0);y.jump(0)}},[activity.enabled,activity.fine,x,y]);
 function move(e:PointerEvent<HTMLAnchorElement>){if(!activity.enabled||!activity.fine||e.pointerType!=='mouse'||!className.includes('primary'))return;const r=e.currentTarget.getBoundingClientRect();x.set(Math.max(-1,Math.min(1,(e.clientX-r.left)/r.width*2-1))*t.magneticRange);y.set(Math.max(-1,Math.min(1,(e.clientY-r.top)/r.height*2-1))*t.magneticRange)}
 return <Link ref={ref} href={href} className={`${className} motion-action`} rel={href.startsWith('https://')?'noopener noreferrer':undefined} onPointerDown={()=>setPressed(true)} onPointerUp={()=>setPressed(false)} onKeyDown={e=>{if(e.key==='Enter')setPressed(true)}} onKeyUp={()=>setPressed(false)} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset} onBlur={reset}><motion.span className="action-content" style={{x,y}} animate={{scale:pressed&&activity.enabled?.97:1}} transition={t.spring}>{children}<span className="action-arrow" aria-hidden="true">↗</span></motion.span></Link>;
}

export function DepthSurface({children,className=''}:{children:ReactNode;className?:string}){
 const ref=useRef<HTMLDivElement>(null);const a=useMotionActivity(ref);const x=useSpring(0,t.spring),y=useSpring(0,t.spring);
 const reset=()=>{x.jump(0);y.jump(0);ref.current?.style.removeProperty('--pointer-x');ref.current?.style.removeProperty('--pointer-y')};
 useEffect(()=>{if(!a.enabled||!a.fine){x.jump(0);y.jump(0)}},[a.enabled,a.fine,x,y]);
 return <motion.div ref={ref} className={`depth-surface ${className}`} style={{x,y}} onPointerMove={e=>{if(!a.enabled||!a.fine||e.pointerType!=='mouse')return;const r=e.currentTarget.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;x.set((px-.5)*t.depthRange);y.set((py-.5)*t.depthRange);e.currentTarget.style.setProperty('--pointer-x',`${px*100}%`);e.currentTarget.style.setProperty('--pointer-y',`${py*100}%`)}} onPointerLeave={reset} onPointerCancel={reset}>{children}</motion.div>;
}

/** One finite editorial sequence per card; no repeating illustration timers. */
export function ProjectSequence({children,index,slug}:{children:ReactNode;index:number;slug:string}){
 const [scope,animate]=useAnimate();const a=useMotionActivity(scope);const played=useRef(false);
 const controls=useRef<ReturnType<typeof animate>[]>([]);
 useEffect(()=>{
  if(!a.enabled){controls.current.forEach(c=>c.pause());return}
  if(played.current){controls.current.forEach(c=>c.play());return}
  played.current=true;
  const steps=['.project-caption .eyebrow','.project-caption h3','.project-description','.project-media','.tags','.project-actions'];
  steps.forEach((selector,i)=>{const el=scope.current.querySelector(selector);if(!el)return;const media=i===3;controls.current.push(animate(el,media&&a.fine?{clipPath:[index%2?'inset(0 7% 0 0)':'inset(7% 0 0 0)','inset(0% 0% 0% 0%)'],opacity:[.8,1]}:{y:[a.fine?t.distance:6,0],opacity:[.8,1]},{duration:media?t.duration.expressive:t.duration.normal,ease:t.expressiveEasing,delay:i*t.stagger}));});
  if(a.fine){const stages=slug==='plp-estimate-unifier'?['.paper','.abstract-row','.difference','.analysis-bridge','.report-panel']:slug==='production-order-crm'?['.token-0','.token-1','.token-2','.order-detail','.token-3']:[];
   stages.forEach((selector,i)=>scope.current.querySelectorAll(selector).forEach((el:Element)=>controls.current.push(animate(el,{y:[5,0],opacity:[.65,1]},{duration:t.duration.reveal,delay:t.duration.normal+i*t.duration.normal,ease:t.easing}))));
  }
 },[a.enabled,a.fine,animate,index,scope,slug]);
 useEffect(()=>()=>controls.current.forEach(c=>c.stop()),[]);
 return <article ref={scope} data-project={slug} data-motion-active={a.enabled} className={`project project-${index} project-${slug}`}>{children}</article>;
}

export function CaseProgress(){
 const path=usePathname();const [active,setActive]=useState('overview');
 useEffect(()=>{
  const nodes=['overview','capabilities','approach'].map(id=>document.getElementById(id)).filter((el):el is HTMLElement=>!!el);
  const update=()=>{const passed=nodes.filter(el=>el.getBoundingClientRect().top<=innerHeight*.4);setActive(passed.at(-1)?.id??'overview')};
  const observer=new IntersectionObserver(update,{rootMargin:'-15% 0px -40% 0px',threshold:[0,.25,.5,.75,1]});
  const sync=()=>{observer.disconnect();if(!document.hidden){nodes.forEach(el=>observer.observe(el));update()}};sync();document.addEventListener('visibilitychange',sync);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync)};
 },[path]);
 return <nav className="case-progress" aria-label="Case study sections">{[['overview','Overview'],['capabilities','Capabilities'],['approach','Technology']].map(([id,title],i)=><a key={id} href={`#${id}`} onClick={()=>setActive(id)} aria-current={active===id?'location':undefined}>{`0${i+1} / ${title}`}</a>)}</nav>;
}

/** Native scrolling remains owned by the browser; only the decorative indicator interpolates. */
export function ReadingProgress(){
 const {scrollYProgress}=useScroll();const smooth=useSpring(scrollYProgress,t.scroll.spring);const reduced=useReducedMotion();
 return <motion.div className="reading-progress" aria-hidden="true" style={{scaleX:reduced?scrollYProgress:smooth}}/>;
}
