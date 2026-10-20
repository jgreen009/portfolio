'use client';
import {useRef,useState} from 'react';
import {profile,services} from '@/lib/content';
import {createBrief,createEmailHref,validateEnquiry} from '@/lib/enquiry.mjs';

export function CopyEmail(){const [status,setStatus]=useState('');return <div className="copy-email"><button type="button" className="copy-button" onClick={async()=>{try{await navigator.clipboard.writeText(profile.email);setStatus('Email address copied.')}catch{setStatus('Copy unavailable. Select the email address above to copy it.')}}}>Copy email address</button><span role="status">{status}</span></div>}

export function Enquiry(){
  const [brief,setBrief]=useState('');
  const [status,setStatus]=useState('');
  const [errors,setErrors]=useState<Record<string,string>>({});
  const summary=useRef<HTMLDivElement>(null);
  const prepared=useRef<HTMLTextAreaElement>(null);
  const invalidate=()=>{setBrief('');setStatus('');setErrors({})};
  function download(text:string){const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download=`michael-project-brief-${new Date().toISOString().slice(0,10)}.txt`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000)}
  return <form noValidate onChange={invalidate} onSubmit={event=>{
    event.preventDefault();const data=new FormData(event.currentTarget);const next=validateEnquiry(data);setErrors(next);
    if(Object.keys(next).length){setBrief('');setStatus('Please correct the fields listed above.');requestAnimationFrame(()=>summary.current?.focus());return}
    const text=createBrief(data);setBrief(text);download(text);setStatus('Your brief is prepared and its download has started. No enquiry has been sent.');
  }}>
    {Object.keys(errors).length>0&&<div className="error-summary" ref={summary} tabIndex={-1} role="alert"><h3>Please check your details</h3><ul>{Object.entries(errors).map(([field,message])=><li key={field}><a href={`#enquiry-${field}`}>{message}</a></li>)}</ul></div>}
    <label htmlFor="enquiry-name">Your name<input id="enquiry-name" name="name" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name?'error-name':undefined}/>{errors.name&&<span className="field-error" id="error-name">{errors.name}</span>}</label>
    <label htmlFor="enquiry-email">Email address<input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" aria-invalid={!!errors.email} aria-describedby={errors.email?'error-email':undefined}/>{errors.email&&<span className="field-error" id="error-email">{errors.email}</span>}</label>
    <label htmlFor="enquiry-service">What can I help with?<select id="enquiry-service" name="service" defaultValue=""><option value="">Select a service</option>{services.map(([title])=><option key={title}>{title}</option>)}<option>Let’s figure it out</option></select></label>
    <label htmlFor="enquiry-message">Tell me about your project<textarea id="enquiry-message" name="message" rows={5} required maxLength={5000} placeholder="The challenge, the idea, and what success looks like…" aria-invalid={!!errors.message} aria-describedby={errors.message?'error-message':undefined}/>{errors.message&&<span className="field-error" id="error-message">{errors.message}</span>}</label>
    <button className="button primary" type="submit">Prepare project brief ↓</button>
    <p className="form-note">This form does not store or send your information. Prepare a brief, then choose how to share it.</p><p id="form-status" role="status" aria-live="polite">{status}</p>
    {brief&&<div className="prepared-brief"><h3>Your prepared brief</h3><textarea ref={prepared} aria-label="Prepared project brief" readOnly value={brief} rows={8}/><div className="brief-actions"><button type="button" className="copy-button" onClick={async()=>{try{await navigator.clipboard.writeText(brief);setStatus('Project brief copied. No enquiry has been sent.')}catch{prepared.current?.focus();prepared.current?.select();setStatus('Copy unavailable. The brief is selected; copy it manually.')}}}>Copy project brief</button><button className="copy-button" type="button" onClick={()=>{download(brief);setStatus('Your brief download has started again. No enquiry has been sent.')}}>Download again</button>{brief.length<1800?<a className="text-link" href={createEmailHref(brief)}>Open brief in email app ↗</a>:<a className="text-link" href={`mailto:${profile.email}?subject=Project%20enquiry%20for%20Michael`}>Open email app ↗</a>}</div><p className="form-note">{brief.length>=1800?'For longer briefs, copy the text or attach the downloaded file. ':''}Email handoff opens your configured mail app. You still need to send the email yourself.</p></div>}
  </form>;
}
