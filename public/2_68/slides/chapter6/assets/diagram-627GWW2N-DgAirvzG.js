import{p as w}from"./chunk-K2ZEYYM2-iusFMNlN.js";import{p as B}from"./gitGraph-YCYPL57B-5MQDGNWY-DC0OiOt_.js";import{H as S,s as F,g as z,q as P,t as W,d as T,e as D,a as l,m as x,I as v,K as A,y as E,aU as _,n as N}from"./Mermaid.vue_vue_type_script_setup_true_lang-DuewtwfO.js";import"./chunk-TGZYFRKZ-CkN0xax0.js";import"./index-BudlCRRW.js";import"./modules/vue-UhGCpqZq.js";import"./modules/shiki-Cj5jBmgd.js";import"./lz-string-BjqiNizP.js";import"./modules/file-saver-C8BEGaqa.js";var C={packet:[]},h=structuredClone(C),I=S.packet,L=l(()=>{const t=v({...I,...A().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),Y=l(()=>h.packet,"getPacket"),H=l(t=>{t.length>0&&h.packet.push(t)},"pushWord"),K=l(()=>{E(),h=structuredClone(C)},"clear"),m={pushWord:H,getPacket:Y,getConfig:L,clear:K,setAccTitle:F,getAccTitle:z,setDiagramTitle:P,getDiagramTitle:W,getAccDescription:T,setAccDescription:D},M=1e4,O=l(t=>{w(t,m);let e=-1,o=[],s=1;const{bitsPerRow:i}=m.getConfig();for(let{start:a,end:r,label:p}of t.blocks){if(r&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);for(e=r??a,x.debug(`Packet block ${a} - ${e} with label ${p}`);o.length<=i+1&&m.getPacket().length<M;){const[b,c]=U({start:a,end:r,label:p},s,i);if(o.push(b),b.end+1===s*i&&(m.pushWord(o),o=[],s++),!c)break;({start:a,end:r,label:p}=c)}}m.pushWord(o)},"populate"),U=l((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),q={parse:l(async t=>{const e=await B("packet",t);x.debug(e),O(e)},"parse")},G=l((t,e,o,s)=>{const i=s.db,a=i.getConfig(),{rowHeight:r,paddingY:p,bitWidth:b,bitsPerRow:c}=a,u=i.getPacket(),n=i.getDiagramTitle(),g=r+p,d=g*(u.length+1)-(n?0:r),k=b*c+2,f=_(e);f.attr("viewbox",`0 0 ${k} ${d}`),N(f,d,k,a.useMaxWidth);for(const[y,$]of u.entries())R(f,$,y,a);f.append("text").text(n).attr("x",k/2).attr("y",d-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),R=l((t,e,o,{rowHeight:s,paddingX:i,paddingY:a,bitWidth:r,bitsPerRow:p,showBits:b})=>{const c=t.append("g"),u=o*(s+a)+a;for(const n of e){const g=n.start%p*r+1,d=(n.end-n.start+1)*r-i;if(c.append("rect").attr("x",g).attr("y",u).attr("width",d).attr("height",s).attr("class","packetBlock"),c.append("text").attr("x",g+d/2).attr("y",u+s/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(n.label),!b)continue;const k=n.end===n.start,f=u-2;c.append("text").attr("x",g+(k?d/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(n.start),k||c.append("text").attr("x",g+d).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(n.end)}},"drawWord"),X={draw:G},j={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},J=l(({packet:t}={})=>{const e=v(j,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),lt={parser:q,db:m,renderer:X,styles:J};export{lt as diagram};
