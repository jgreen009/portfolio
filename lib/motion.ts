/** Shared JS tokens and CSS variables; no per-component timing constants. */
export const motionTokens = {
 duration:{fast:.18,normal:.42,reveal:.56,expressive:.8}, delay:.07, stagger:.055,
 easing:[.22,1,.36,1] as const, expressiveEasing:[.16,1,.3,1] as const,
 spring:{stiffness:260,damping:28,mass:.6}, distance:20,
 hover:{lift:-3,scale:1.015}, magneticRange:4, depthRange:2,
 scroll:{spring: {stiffness:120,damping:30}, distance:8},
 reduced:{duration:0,distance:0,scale:1}, cycleMs:3200, manualPauseMs:8000,
};
export const motionCSS={
 '--motion-fast':`${motionTokens.duration.fast}s`,'--motion-normal':`${motionTokens.duration.normal}s`,
 '--motion-reveal':`${motionTokens.duration.reveal}s`,'--motion-expressive':`${motionTokens.duration.expressive}s`,
 '--motion-step':`${motionTokens.stagger}s`,'--motion-ease':`cubic-bezier(${motionTokens.easing.join(',')})`,
 '--motion-expressive-ease':`cubic-bezier(${motionTokens.expressiveEasing.join(',')})`,
};
