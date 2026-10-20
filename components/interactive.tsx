'use client';
import {useState,useRef,useEffect} from 'react';
import {motion,useReducedMotion} from 'motion/react';
import {motionTokens as t} from '@/lib/motion';
import {PageEntrance} from './motion';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
export function Navigation(){
  const [open,setOpen]=useState(false);
  const [raised,setRaised]=useState(false);
  const path=usePathname();
  const button=useRef<HTMLButtonElement>(null);
  const header=useRef<HTMLElement>(null);
  const previous=useRef(path);
  useEffect(()=>{let wasRaised=false;const onScroll=()=>{const next=window.scrollY>24;if(next!==wasRaised){setRaised(next);wasRaised=next}};onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[]);
  useEffect(()=>{if(previous.current!==path){setOpen(false);previous.current=path}},[path]);
  useEffect(()=>{const mq=matchMedia('(min-width: 761px)');const close=()=>{if(mq.matches)setOpen(false)};mq.addEventListener('change',close);return()=>mq.removeEventListener('change',close)},[]);
  useEffect(()=>{
    if(!open)return;
    const oldOverflow=document.body.style.overflow;
    document.body.style.overflow='hidden';
    const targets=[document.querySelector('main'),document.querySelector('footer')].filter(Boolean) as HTMLElement[];
    const previousInert=targets.map(el=>el.inert);targets.forEach(el=>el.inert=true);
    const first=header.current?.querySelector<HTMLElement>('nav a');first?.focus();
    return()=>{document.body.style.overflow=oldOverflow;targets.forEach((el,i)=>el.inert=previousInert[i])};
  },[open]);
  function closeMenu(){setOpen(false);button.current?.focus()}
  return <header ref={header} className={`nav wrap ${raised?'is-raised':''} ${open?'menu-open':''}`} onKeyDown={e=>{
    if(!open)return;
    if(e.key==='Escape'){e.preventDefault();closeMenu()}
    if(e.key==='Tab'){
      const items=Array.from(header.current?.querySelectorAll<HTMLElement>('a,button')??[]).filter(el=>el.getClientRects().length);
      const first=items[0],last=items[items.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    }
  }}><Link className="brand" href="/" aria-label="Michael home" onClick={()=>setOpen(false)}>michael<span>®</span></Link><button ref={button} className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open?'Close −':'Menu +'} onClick={()=>open?closeMenu():setOpen(true)}><span>{open?'Close':'Menu'}</span><span className="menu-icon" aria-hidden="true"><i/><i/></span></button><nav id="navigation" className={open?'open':''} aria-label="Main navigation">{[['Work','/work'],['Services','/#services'],['About','/about'],['Contact','/contact']].map(([text,href])=><Link key={href} href={href} onClick={()=>setOpen(false)} aria-current={path.replace(/\/$/,'')===href||href==='/work'&&path.startsWith('/work/')?'page':undefined}>{text}</Link>)}</nav><Link href="/contact" className="nav-cta">Start a Project <span aria-hidden="true">↗</span></Link></header>
}
export function Entrance({children}:{children:React.ReactNode}){return <PageEntrance>{children}</PageEntrance>}
export function HoverLink({href,children,className=''}:{href:string;children:React.ReactNode;className?:string}){const reduced=useReducedMotion();return <motion.div whileHover={reduced?undefined:{y:t.hover.lift}} transition={{duration:t.duration.fast}}><Link href={href} className={className}>{children}</Link></motion.div>}
export {Enquiry} from './enquiry';
