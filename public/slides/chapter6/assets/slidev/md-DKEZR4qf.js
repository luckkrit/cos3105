import{d as p,z as f,o as l,b as m,e as i,f as _,h,c as v,k as $,q as k,s as g,B as a}from"../modules/vue-UhGCpqZq.js";import{u,f as x}from"./context-Bzx4tVN0.js";import"../index-BudlCRRW.js";import"../modules/shiki-Cj5jBmgd.js";function c(e){return e.startsWith("/")?"/cos3105/slides/chapter6/"+e.slice(1):e}function y(e,o=!1){const s=e&&["#","rgb","hsl"].some(r=>e.indexOf(r)===0),t={background:s?e:void 0,color:e&&!s?"white":void 0,backgroundImage:s?void 0:e?o?`linear-gradient(#0005, #0008), url(${c(e)})`:`url("${c(e)}")`:void 0,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"cover"};return t.background||delete t.background,t}const B={class:"my-auto w-full"},C=p({__name:"cover",props:{background:{default:"https://source.unsplash.com/collection/94734566/1920x1080"}},setup(e){u();const o=e,s=f(()=>y(o.background,!0));return(t,r)=>(l(),m("div",{class:"slidev-layout cover text-center",style:h(s.value)},[i("div",B,[_(t.$slots,"default")])],4))}}),A={__name:"chapter6.md__slidev_1",setup(e){const{$slidev:o,$nav:s,$clicksContext:t,$clicks:r,$page:b,$renderContext:z,$frontmatter:d}=u();return t.setup(),(P,n)=>(l(),v(C,k(g(a(x)(a(d),0))),{default:$(()=>n[0]||(n[0]=[i("h1",null,"Process Synchronization",-1)])),_:1},16))}};export{A as default};
