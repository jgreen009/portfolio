export const metadata={title:'Page not found',description:'The requested page could not be found. Return to Michael’s portfolio.',robots:{index:false,follow:false}};
import {Label,Action} from '@/components/portfolio';
export default function NotFound(){return <section className="page-intro wrap"><Label>404 / PAGE NOT FOUND</Label><h1>A different direction.</h1><Action href="/" className="button primary">Back to home</Action></section>}
