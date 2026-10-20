'use client';

import {useEffect,useRef} from 'react';
import {useAnimate,useInView,useReducedMotion} from 'motion/react';
import {usePathname} from 'next/navigation';
import {motionTokens as t} from '@/lib/motion';

type RevealProps={children:React.ReactNode;kind?:'rise'|'left'|'right'|'clip'|'mask'|'stagger';once?:boolean;delay?:number;className?:string};

/** Content is rendered visible on the server; motion only enhances it after hydration. */
export function Reveal({children,kind='rise',once=true,delay=0,className=''}:RevealProps){
  const [scope,animate]=useAnimate();
  const visible=useInView(scope,{once,amount:0.12});
  const reduced=useReducedMotion();
  const played=useRef(false);
  useEffect(()=>{
    if(reduced!==false||!visible||(once&&played.current))return;
    played.current=true;
    const frames=kind==='clip'?{clipPath:['inset(0 0 12% 0)','inset(0 0 0% 0)'],opacity:[0.6,1]}:
      kind==='left'||kind==='right'?{x:[kind==='left'?-t.distance:t.distance,0],opacity:[0.6,1]}:
      {y:[kind==='mask'?t.distance*1.5:t.distance,0],opacity:[0.6,1]};
    const controls=kind==='stagger'
      ?Array.from((scope.current.querySelector('dl')?.children??scope.current.children) as HTMLCollectionOf<HTMLElement>).map((child,i)=>animate(child,frames,{duration:t.duration.reveal,ease:t.easing,delay:delay+i*t.stagger}))
      :[animate(scope.current,frames,{duration:t.duration.reveal,ease:t.easing,delay})];
    const visibility=()=>controls.forEach(control=>document.hidden?control.pause():control.play());document.addEventListener('visibilitychange',visibility);return()=>{document.removeEventListener('visibilitychange',visibility);controls.forEach(control=>control.stop());if(scope.current){scope.current.style.opacity='1';scope.current.style.transform='none';scope.current.style.clipPath='none'}};
  },[visible,reduced,once,kind,delay,animate,scope]);
  return <div ref={scope} className={`reveal reveal-${kind} ${className}`}>{children}</div>;
}

export function PageEntrance({children}:{children:React.ReactNode}){
  const path=usePathname();
  // No exit wait: App Router owns navigation, focus, history and scroll restoration.
  return <Reveal key={path} className="page-content">{children}</Reveal>;
}

export function HeroHeading(){return <h1 className="hero-heading" aria-label="I build intelligent products and automated systems that move businesses forward.">
  {['I build intelligent','products and','automated systems','that move businesses','forward.'].map((line,i)=><span className="heading-mask" aria-hidden="true" key={line}><span style={{'--line-index':i} as React.CSSProperties}>{i>2?<em>{line}</em>:line}</span></span>)}
</h1>}
