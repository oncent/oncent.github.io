import{d as a}from"./dayjs.8eec1a0d.js";import{m as _,q as h,t as V,y as g,v as o,G as v,u}from"./@vue.6b771be9.js";const k={class:"flex items-center relative"},C=o("i",{class:"icon-xs icon-calendar"},null,-1),F={class:"mx-2"},B=_({__name:"DateTime",props:{modelValue:null,formatter:null,displayFormatter:{type:[String,Function],default:"MM-DD"}},emits:["update:modelValue"],setup(l,{emit:n}){var s,i;const e=l,f=typeof e.displayFormatter=="function"?e.displayFormatter:t=>t.format(e.displayFormatter);e.modelValue===void 0&&n("update:modelValue",(i=(s=e.formatter)==null?void 0:s.call(e,a()))!=null?i:a());const p=t=>{t.target.showPicker()},y=t=>{var m,d;const r=t.target.value,c=a(r);n("update:modelValue",(d=(m=e.formatter)==null?void 0:m.call(e,c))!=null?d:c)};return(t,r)=>(h(),V("label",k,[g(t.$slots,"icon",{},()=>[C]),o("div",F,v(u(f)(u(a)(l.modelValue))),1),o("input",{type:"datetime-local",class:"absolute top-0 left-0 w-2 h-full opacity-0",onClick:p,onChange:y},null,32)]))}});export{B as _};