import {profile} from '../src/content.mjs';

export function createBrief(data) {
  return `PROJECT BRIEF FOR MICHAEL\nTo: ${profile.email}\n\nName: ${String(data.get('name')||'').trim()}\nEmail: ${String(data.get('email')||'').trim()}\nService: ${data.get('service') || 'To be discussed'}\n\nProject\n${data.get('message')}\n\nPrepared locally. This brief has not been sent.`;
}

export function createEmailHref(brief) {
  return `mailto:${profile.email}?subject=${encodeURIComponent('Project enquiry for Michael')}&body=${encodeURIComponent(brief)}`;
}

export function validateEnquiry(data){const errors={};const name=String(data.get('name')||'').trim();const email=String(data.get('email')||'').trim();const message=String(data.get('message')||'').trim();if(!name||name.length>120)errors.name='Enter your name (up to 120 characters).';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||email.length>254)errors.email='Enter a valid email address.';if(!message||message.length>5000)errors.message='Describe your project (up to 5,000 characters).';return errors}
