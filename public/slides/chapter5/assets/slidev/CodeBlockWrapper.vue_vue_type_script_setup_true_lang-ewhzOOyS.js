import{d as I,e as w}from"../modules/unplugin-icons-BALRxKcw.js";import{d as A,t as B,O as E,D as y,L as N,z as v,aI as q,o as c,b as _,f as M,B as u,c as C,g as V,i as z,h as D}from"../modules/vue-DU41SbEV.js";import{v as k,ai as $,C as K,aj as R,ak as j}from"../index-e0DA_0eI.js";import{u as O}from"./context-BAG-bf3o.js";const U=["title"],P=A({__name:"CodeBlockWrapper",props:{ranges:{type:Array,default:()=>[]},finally:{type:[String,Number],default:"last"},startLine:{type:Number,default:1},lines:{type:Boolean,default:k.lineNumbers},at:{type:[String,Number],default:"+1"},maxHeight:{type:String,default:void 0}},setup(S){const e=S,{$clicksContext:a}=O(),n=B(),d=$();E(()=>{a.unregister(d)}),y(()=>{var t;(t=n.value)==null||t.classList.toggle("slidev-code-line-numbers",e.lines)}),N(()=>{var i;if(!a||!((i=e.ranges)!=null&&i.length))return;const t=a.calculateSince(e.at,e.ranges.length-1);a.register(d,t);const o=v(()=>t?Math.max(0,a.current-t.start+1):K),s=v(()=>e.finally==="last"?e.ranges.at(-1):e.finally.toString());y(()=>{if(!n.value)return;let r=e.ranges[o.value]??s.value;const g=r==="hide";n.value.classList.toggle(R,g),g&&(r=e.ranges[o.value+1]??s.value);const f=n.value.querySelector(".shiki"),h=Array.from(f.querySelectorAll("code > .line")),L=h.length;if(j(r,L,e.startLine,l=>[h[l]]),e.maxHeight){const l=Array.from(f.querySelectorAll(".line.highlighted"));l.reduce((m,H)=>H.offsetHeight+m,0)>n.value.offsetHeight?l[0].scrollIntoView({behavior:"smooth",block:"start"}):l.length>0&&l[Math.round((l.length-1)/2)].scrollIntoView({behavior:"smooth",block:"center"})}})});const{copied:p,copy:b}=q();function x(){var o,s;const t=(s=(o=n.value)==null?void 0:o.querySelector(".slidev-code"))==null?void 0:s.textContent;t&&b(t)}return(t,o)=>{const s=I,i=w;return c(),_("div",{ref_key:"el",ref:n,class:z(["slidev-code-wrapper relative group",{"slidev-code-line-numbers":e.lines}]),style:D({"max-height":e.maxHeight,"overflow-y":e.maxHeight?"scroll":void 0,"--start":e.startLine})},[M(t.$slots,"default"),u(k).codeCopy?(c(),_("button",{key:0,class:"slidev-code-copy absolute top-0 right-0 transition opacity-0 group-hover:opacity-20 hover:!opacity-100",title:u(p)?"Copied":"Copy",onClick:o[0]||(o[0]=r=>x())},[u(p)?(c(),C(s,{key:0,class:"p-2 w-8 h-8"})):(c(),C(i,{key:1,class:"p-2 w-8 h-8"}))],8,U)):V("v-if",!0)],6)}}});export{P as _};
