import {ReadingProgress} from '@/components/polish';
import {motionCSS} from '@/lib/motion';
import type {Metadata} from 'next';
import localFont from 'next/font/local';
import {pageMetadata,person,siteOrigin} from '@/lib/seo';
import {StructuredData} from '@/components/structured-data';
const display=localFont({src:'../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2',variable:'--font-display',display:'swap',fallback:['Arial']});
const body=localFont({src:'../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2',variable:'--font-body',display:'swap',fallback:['Arial']});
import {Navigation,Entrance} from '@/components/interactive';
import {Footer} from '@/components/portfolio';
import {profile} from '@/lib/content';
import '../src/styles.css';
import './globals.css';
import './phase-two.css';
import './polish.css';
import './colors.css';
export const metadata:Metadata={...pageMetadata('Michael — AI Developer & Automation Expert',profile.description,'/'),title:{default:'Michael — AI Developer & Automation Expert',template:'%s | Michael'},icons:{icon:[{url:'/favicon.svg',type:'image/svg+xml'},{url:'/icons/icon-192.png',sizes:'192x192',type:'image/png'}],apple:'/icons/apple-touch-icon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${display.variable} ${body.variable}`}><body style={motionCSS as React.CSSProperties}><StructuredData data={{"@context":"https://schema.org",...person}}/>{siteOrigin&&<StructuredData data={{"@context":"https://schema.org","@type":"WebSite",name:"Michael",url:siteOrigin}}/>}<a className="skip" href="#main">Skip to content</a><Navigation/><ReadingProgress/><noscript><style>{`@media(max-width:760px){.nav nav{display:flex!important}.menu-toggle{display:none!important}}`}</style></noscript><main id="main"><Entrance>{children}</Entrance></main><Footer/></body></html>}
