export const metadata=pageMetadata("Start a project","Contact Michael about AI development, automation, internal tools, or Webflow and Framer design.","/contact/");
import {pageMetadata,breadcrumbs,person} from '@/lib/seo';
import {StructuredData} from '@/components/structured-data';
import {Label} from '@/components/portfolio';
import {Enquiry,CopyEmail} from '@/components/enquiry';
import {profile} from '@/lib/content';
export default function Contact(){return <><StructuredData data={breadcrumbs([{name:"Start a project",path:"/contact/"}])}/><section className="page-intro wrap"><Label>LET’S MAKE SOMETHING USEFUL</Label><h1>Your next chapter.<br/><em>Built together.</em></h1><p>Tell me what you’re working on, what needs to change, and where you’d like to go.</p></section><section className="wrap contact-layout section"><div><h2>A little context.<br/>A better conversation.</h2><p>Whether you have a clear brief or a challenge to untangle, start with the business need.</p><div className="contact-direct"><a href={'mailto:'+profile.email}>{profile.email} ↗</a><a href={'tel:'+profile.phone.replaceAll(' ','')}>{profile.phone} ↗</a></div><CopyEmail/><div className="contact-note"><b>Start with a conversation.</b><p>Email me directly, or prepare your project brief here and send it through your email app.</p></div></div><Enquiry/></section></>}
