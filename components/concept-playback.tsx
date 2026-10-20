'use client';
import {useEffect,useRef,useState,type ReactNode} from 'react';
import {useMotionActivity} from '@/lib/use-motion-activity';
import {motionTokens as t} from '@/lib/motion';
const messages={
 estimate:['Documents received','Analyzing line items','Differences identified','Validating reconciliation','Structured report ready'],
 production:['Order received','Artwork reviewed','Production scheduled · priority visible','Details synchronized','Completion recorded'],
};
/** Finite, illustrative demonstration. Never represents a real customer record. */
export function ConceptPlayback({kind,children}:{kind:'estimate'|'production';children:ReactNode}){
 const ref=useRef<HTMLDivElement>(null);const a=useMotionActivity(ref);const [step,setStep]=useState(0);
 useEffect(()=>{if(!a.enabled||!a.fine||step===4)return;const timer=setTimeout(()=>setStep(i=>i+1),t.duration.expressive*1000);return()=>clearTimeout(timer)},[a.enabled,a.fine,step]);
 const shown=a.reduced||!a.fine?4:step;
 return <div ref={ref} className={`concept-playback concept-${kind}`} data-concept-step={shown} data-concept-running={a.enabled&&a.fine&&step<4}>{children}<div className="concept-readout" aria-hidden="true"><span>ILLUSTRATIVE SEQUENCE</span><strong>{messages[kind][shown]}</strong><span>{shown+1} / 5</span></div></div>;
}
