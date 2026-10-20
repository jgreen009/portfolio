'use client';
import {useEffect,useState,type RefObject} from 'react';
import {useInView,useReducedMotion} from 'motion/react';

/** Observes only the boundary; work inside it runs only while visible and foreground. */
export function useMotionActivity(ref:RefObject<HTMLElement|null>){
 const visible=useInView(ref,{amount:.08});const reduced=useReducedMotion();
 const [foreground,setForeground]=useState(true);const [fine,setFine]=useState(false);
 useEffect(()=>{const media=matchMedia('(hover:hover) and (pointer:fine) and (min-width:801px)');const sync=()=>setFine(media.matches);const visibility=()=>setForeground(!document.hidden);sync();visibility();media.addEventListener('change',sync);document.addEventListener('visibilitychange',visibility);return()=>{media.removeEventListener('change',sync);document.removeEventListener('visibilitychange',visibility)}},[]);
 return {visible,foreground,fine,reduced,enabled:visible&&foreground&&reduced===false};
}
