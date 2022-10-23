import{d as p,l as c,j as d,s as h}from"./index.913fa80a.js";import{U as v}from"./UserAvatar.573138ae.js";import{_ as x}from"./Select.vue_vue_type_style_index_0_lang.d60b6c2c.js";import{m as g,c as r,w as y,q as b,t as w,v as e,k as u,u as o,G as i,B as j,i as k,Z as $}from"./@vue.aa17ec7c.js";import"./vue-router.835b731e.js";import"./dexie.a92c4e2b.js";import"./uuid.fbc3d34b.js";import"./dayjs.8eec1a0d.js";import"./@vueuse.9aab9800.js";import"./vue-i18n.bcf46dc7.js";import"./@intlify.03657722.js";const L={class:"flex flex-col justify-between flex-1"},V={class:"divide-y"},U={class:"flex justify-center pt-2 pb-4"},B={class:"flex items-center"},C=e("div",{class:"w-9 flex items-center justify-center"},[e("i",{class:"icon-cloud"})],-1),N={class:"px-1"},G=e("div",{class:"flex items-center justify-center"},[e("i",{class:"icon-chevron-right"})],-1),S={class:"py-4 px-2 flex justify-between buttoned"},q={class:"flex items-center"},A=e("div",{class:"w-9 flex items-center justify-center"},[e("i",{class:"icon-globe-alt"})],-1),D={class:"px-1"},E={class:"shadow buttoned w-120px rounded-sm h-full truncate text-center"},I={class:"py-4 px-2 buttoned"},R=["href"],T=e("div",{class:"w-9 flex items-center justify-center"},[e("i",{class:"icon-bot"})],-1),Z={class:"px-1"},z={class:"py-4 px-2 buttoned flex justify-between items-center"},F={class:"flex items-center"},H=e("div",{class:"w-9 flex items-center justify-center"},[e("i",{class:"icon-code"})],-1),J={class:"px-1"},K=e("div",{class:"flex justify-center"},[e("a",{href:"https://github.com/glink25/Cent",target:"_blank",class:"flex items-center hover:underline text-sm"},[$("Github "),e("div",{class:"px-2"},[e("i",{class:"icon-arrow-top-right icon-xs"})])])],-1),ae=g({__name:"SettingsList",setup(M){const{userInfo:l}=p(),m=s=>{l.value={...l.value,name:s}},n=r({get:()=>{const s=c.find(t=>t.name===d.value);return s?{name:s.label,id:s.name}:void 0},set:s=>{d.value=s==null?void 0:s.id}}),f=r(()=>c.map(s=>({name:s.label,id:s.name})));y(n,s=>{s!=null&&s.id&&h(s.id)});const _="0.0.1";return(s,t)=>(b(),w("div",L,[e("div",V,[e("div",U,[u(v,{name:o(l).name,"onUpdate:name":m,editable:""},null,8,["name"])]),e("div",{class:"py-4 px-2 buttoned flex justify-between",onClick:t[0]||(t[0]=a=>s.$router.push("/settings/sync"))},[e("div",B,[C,e("div",N,i(s.$t("share-and-sync")),1)]),G]),e("div",S,[e("div",q,[A,e("div",D,i(s.$t("language")),1)]),e("div",null,[u(x,{modelValue:o(n),"onUpdate:modelValue":t[1]||(t[1]=a=>k(n)?n.value=a:null),list:o(f),"value-key":"id"},{default:j(()=>{var a;return[e("div",E,i((a=o(n))==null?void 0:a.name),1)]}),_:1},8,["modelValue","list"])])]),e("div",I,[e("a",{class:"flex items-center",href:s.$t("help_link"),target:"_blank"},[T,e("div",Z,i(s.$t("help")),1)],8,R)]),e("div",z,[e("div",F,[H,e("div",J,i(s.$t("version")),1)]),e("div",null,[e("span",null,i(o(_)),1)])])]),K]))}});export{ae as default};
