/** Future server adapter boundary. No provider is configured or invoked. */
export type EnquiryPayload={name:string;email:string;service:string;message:string};
export type SubmissionResult={ok:true;reference?:string}|{ok:false;message:string;fieldErrors?:Partial<Record<keyof EnquiryPayload,string>>};
export interface SubmissionAdapter {submit(payload:EnquiryPayload,signal?:AbortSignal):Promise<SubmissionResult>}
// Implement only after infrastructure approval. Credentials must remain server-side.
