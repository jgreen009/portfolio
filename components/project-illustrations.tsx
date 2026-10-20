import {ConceptPlayback} from './concept-playback';
/** Editorial diagrams, not screenshots or records from a production application. */
export function ProjectIllustration({index}:{index:number}){
  return <ConceptPlayback kind={index===0?'estimate':'production'}><div className={`editorial-visual illustration-${index}`}>
    <span className="art-label">CONCEPT PREVIEW · EDITORIAL ILLUSTRATION · 0{index+1}</span>
    {index===0?<div className="estimate-illustration">
      <div className="visual-heading"><b>plp / document intelligence</b><span>Compare → reconcile → report</span></div>
      <div className="compare-panes">{['Contractor','Carrier'].map((name,i)=><div className="paper" key={name}><span className="paper-label">{name} document</span><div className="scope-chips"><span>Mitigation</span><span>Rebuild</span></div>{['Scope','Line items','Supporting notes'].map((text,j)=><div className={`abstract-row ${j===1?'difference':''}`} key={text}><span>{text}</span><i style={{width:`${70-j*12-i*9}%`}}/><small>{j===1?'↔ Review difference':'—'}</small></div>)}</div>)}</div>
      <div className="analysis-bridge"><span className="signal-track"/><b>AI analysis</b><span className="signal-track"/><span>Validation</span></div>
      <div className="report-panel"><span className="report-icon" aria-hidden="true">≡</span><div><strong>Structured report</strong><p>Scope separation · Findings · Reconciliation</p></div><span className="verified-symbol">✓ Validation step</span></div>
    </div>:index===1?<div className="operations-illustration">
      <div className="visual-heading"><b>Production / order flow</b><span>One order. Every handoff.</span></div>
      <div className="production-layout"><div className="production-stages">{['Artwork','Garments','Printing','Complete'].map((name,i)=><div key={name}><span className="column-name">0{i+1} / {name}</span><div className={`order-token token-${i}`}><span className="token-bar"/><b>{['Review','Prepare','Schedule','Follow up'][i]}</b><small>Illustrative stage</small></div><span className="stage-track"/></div>)}</div><aside className="order-detail"><span className="paper-label">ORDER DETAILS / CONCEPT</span><dl>{[['Payment','Tracked'],['Artwork','Review'],['Garments','Prepare'],['Printing','Schedule'],['Priority','Visible'],['Completion','Follow up']].map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></aside></div>
      <div className="operations-foot"><span>Clear ownership</span><span>Connected stages</span><span>Customer follow-up ↗</span></div>
    </div>:<div className="estate-illustration">
      <div className="visual-heading"><b>AURELIS</b><span>Space, considered.</span></div>
      <div className="estate-composition"><div className="estate-title"><span>THE ART OF LIVING</span><strong>A place<br/>to <i>belong.</i></strong><p>Architecture. Space. Possibility.</p></div><div className="property-plan" role="img" aria-label="Illustrative property layout, not an actual listing or floor plan"><div className="plan-room living">Living</div><div className="plan-room terrace">Terrace</div><div className="plan-room suite">Suite</div><div className="plan-room courtyard">Courtyard</div><div className="plan-axis"/><span className="plan-caption">ILLUSTRATIVE SPATIAL STUDY</span></div></div>
      <div className="estate-footer"><span>Property presentation / Visual development</span><span>Explore the experience ↗</span></div>
    </div>}
  </div></ConceptPlayback>;
}

export function ServiceCue({index}:{index:number}){return <svg className="service-cue" viewBox="0 0 100 50" fill="none" aria-hidden="true">{index===0?<><rect x="3" y="13" width="22" height="24" rx="2"/><path d="M30 25h18m-5-5 5 5-5 5"/><rect x="55" y="8" width="40" height="34" rx="3"/><path d="m65 25 6 6 13-14"/></>:index===1?<><path d="M17 25h66"/>{[5,40,75].map(x=><rect key={x} x={x} y="14" width="20" height="22" rx="3"/>)}</>:index===2?<><rect x="5" y="5" width="88" height="40" rx="3"/><path d="M5 16h88M30 16v29M40 25h17v12H40zm28-3h15v15H68z"/></>:<><rect x="5" y="5" width="62" height="38" rx="3"/><rect x="73" y="16" width="20" height="29" rx="3"/><path d="M13 13h45M13 21h18v14H13zm25 0h20M38 28h20M78 22h10M78 29h10"/></>}</svg>}
