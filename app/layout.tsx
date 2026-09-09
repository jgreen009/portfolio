import type {Metadata} from 'next';
import {Navigation,Entrance} from '@/components/interactive';
import {Footer} from '@/components/portfolio';
import {profile} from '@/lib/content';
import '../src/styles.css';
import './globals.css';
export const metadata:Metadata={title:{default:'Michael — Intelligent products & automated systems',template:'%s | Michael'},description:profile.description,icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip" href="#main">Skip to content</a><Navigation/><main id="main"><Entrance>{children}</Entrance></main><Footer/></body></html>}
