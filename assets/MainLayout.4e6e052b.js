import{m as b,c as w,q as d,A as h,v as e,z as _,u as f,D as C,P as I,Q as k,r as v,t as M,k as p,B as g,K as T,H as j,L as S,R as B}from"./@vue.e6301bd2.js";import{u as $,a as y}from"./vue-router.f815959e.js";import{_ as z}from"./index.83597891.js";import{a as E}from"./@vueuse.ec86b252.js";import"./dexie.a92c4e2b.js";import"./uuid.fbc3d34b.js";import"./dayjs.386643b6.js";import"./complex.js.3b936b7b.js";import"./vue-i18n.ac4c776b.js";import"./@intlify.cff06da3.js";const L=()=>{const s=document.createElement("input");document.body.appendChild(s),s.focus(),s.style.display="none",setTimeout(()=>{s.remove()},1e3)},l=s=>(I("data-v-fb39646e"),s=s(),k(),s),A={class:"floating-tab fixed w-screen h-18 flex items-center justify-around sm:h-screen sm:w-18 sm:flex-col sm:justify-start z-0"},F=l(()=>e("i",{class:"icon-search"},null,-1)),N=[F],R={class:"flex items-center rounded-full p-1 bg-white w-56 h-14 m-2 shadow-md sm:flex-col sm:w-10 sm:h-50 sm:-order-1"},q=l(()=>e("i",{class:"icon-format-left"},null,-1)),D=[q],K=l(()=>e("i",{class:"icon-md icon-math-plus text-[white]"},null,-1)),P=[K],V=l(()=>e("div",{class:"transform translate-x-[25%] translate-y-[-25%]"},[e("i",{class:"icon-chart"})],-1)),H=[V],Q=l(()=>e("i",{class:"icon-more-alt"},null,-1)),W=[Q],G=b({__name:"FloatingTab",setup(s){const c=$(),i=y(),u=w(()=>["stat","home","search"].find(o=>c.fullPath.includes(o))),r=o=>{i.push(o)},m=()=>{i.push("/edit"),L()},n=()=>{i.push("/settings")};return(o,t)=>(d(),h(C,{to:"body"},[e("div",A,[e("div",{class:_(["w-14 h-14 sm:w-10 sm:h-10 cursor-pointer flex items-center justify-center rounded-full shadow-md m-2 bg-white transition-all hover:bg-gray-200 active:bg-gray-300",{"bg-gray-300":f(u)==="search"}]),onClick:t[0]||(t[0]=a=>r("search"))},N,2),e("div",R,[e("div",{class:_(["flex-1 h-full w-full transition rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 active:bg-gray-300",{"bg-gray-300":f(u)==="home"}]),onClick:t[1]||(t[1]=a=>r("home"))},D,2),e("div",{class:"w-18 h-18 sm:w-14 sm:h-14 rounded-full bg-stone-900 shadow-md flex items-center justify-center m-1 cursor-pointer transform transition-all hover:scale-105",onClick:m},P),e("div",{class:_(["flex-1 h-full w-full transition-all rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 active:bg-gray-300",{"bg-gray-300":f(u)==="stat"}]),onClick:t[2]||(t[2]=a=>r("stat"))},H,2)]),e("div",{class:"w-14 h-14 sm:w-10 sm:h-10 cursor-pointer flex items-center justify-center rounded-full shadow-md m-2 bg-white transition-all hover:bg-gray-200 active:bg-gray-300",onClick:n},W)])]))}});const J=z(G,[["__scopeId","data-v-fb39646e"]]),O=640,U=()=>w(()=>E().width.value<=O),X={class:"w-full h-full sm:pl-18"},le=b({__name:"MainLayout",setup(s){const c=v("slide-in"),i=U();y().beforeEach((n,o)=>{const t=i.value?o.meta.mobileMenuIndex:o.meta.pcMenuIndex,a=i.value?n.meta.mobileMenuIndex:n.meta.pcMenuIndex;t!==void 0&&a!==void 0&&(c.value=a<t?"slide-out":"slide-in")});const r=v(),m=(n,o)=>o.meta.popup?r.value:(r.value=n,n);return(n,o)=>{const t=T("router-view");return d(),M("div",X,[p(t,null,{default:g(({Component:a,route:x})=>[p(j,{name:c.value,mode:"out-in"},{default:g(()=>[(d(),h(B,null,[(d(),h(S(m(a,x))))],1024))]),_:2},1032,["name"])]),_:1}),p(J)])}}});export{le as default};