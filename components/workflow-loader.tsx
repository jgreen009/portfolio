'use client';

import dynamic from 'next/dynamic';

// A client-side dynamic boundary splits the non-critical workflow code while
// retaining its prerendered HTML. The page never swaps to an empty placeholder.
const SignatureWorkflow=dynamic(()=>import('./workflow').then(module=>module.SignatureWorkflow));
export function WorkflowLoader(){return <SignatureWorkflow/>}
