import{d as p}from"./dayjs.8eec1a0d.js";import{_ as b}from"./DateTime.vue_vue_type_script_setup_true_lang.d7b500a1.js";import{m as I,r as h,c as x,o as N,w as V,J as q,q as _,t as C,v as u,z as T,G as M,F as z,E as F,u as $,k as Y,P as W,Q as G,n as J,R as K,A as B,U as Q,B as O,V as Z,W as A}from"./@vue.6b771be9.js";import{_ as H,i as X,B as E,u as P,m as ee,g as te,t as se,d as ae}from"./index.4519b5e8.js";import{a as ne}from"./@vueuse.3609b986.js";import{u as oe,i as le,a as re,b as ie,c as ce,d as ue,e as de,f as me,g as pe,h as fe,j as ve,k as xe,l as he}from"./echarts.f6f9045b.js";import{_ as R}from"./Select.vue_vue_type_style_index_0_lang.3d0e18e1.js";import"./vue-router.c17ffd82.js";import"./dexie.a92c4e2b.js";import"./uuid.fbc3d34b.js";import"./vue-i18n.a532ecf1.js";import"./@intlify.03657722.js";import"./zrender.271abeed.js";const ye=a=>(W("data-v-97767200"),a=a(),G(),a),_e={class:"flex flex-col items-center"},ge={class:"flex justify-around rounded-full items-center max-w-300px w-full"},we=["onClick"],$e={key:1,class:"flex justify-around items-center w-full h-12"},ke=ye(()=>u("div",null,"-",-1)),Ce=I({__name:"DateRangeSelector",props:{start:{default:p().format("YYYY-MM-DD")},end:{default:p().format("YYYY-MM-DD")},date:null,initialType:{default:"month"}},emits:["change"],setup(a,{emit:r}){const s=a,o=()=>{const d=p(s.start).startOf("year"),c=p(s.end).startOf("year"),t=d.year(),n=c.year();return{type:"year",times:Array.from({length:Math.abs(n-t)+1},(v,k)=>({name:`${t+k}`,range:[p(`${t+k}`),p(`${t+k}`).endOf("year")]}))}},i=()=>{const d=p(s.end).startOf("month"),c=p(s.start).startOf("month"),t=Math.abs(d.diff(c,"month"))+1,n=Array.from({length:t},(v,k)=>{const j=c.add(k,"month");return{name:j.format("YYYY-MM"),range:[j,j.endOf("month")]}});return{type:"month",times:n}},e=h(s.initialType),l=x(()=>e.value==="year"?o().times:e.value==="month"?i().times:[{name:"",range:[p(s.start),p(s.end)]}]),f=h(),m=d=>{var n;const c=p(d),t=[...l.value].reverse().findIndex(v=>c.isAfter(v.range[0]));return{index:t,time:(n=l.value[t])!=null?n:l.value[0]}},y=h(),g=h(p(s.start)),w=h(p(s.end)),D=()=>{const{index:d,time:c}=m(g.value);S(c,d,!1)};N(()=>{D()}),V(e,d=>{d!=="custom"&&J(()=>{D()})});const S=(d,c,t=!0)=>{var n;y.value=d,f.value&&((n=document.querySelector(`.slider-item-${c}`))==null||n.scrollIntoView({block:"center",inline:"center",behavior:t?"smooth":void 0})),r("change",...y.value.range)};return q(()=>{g.value&&w.value&&r("change",g.value,w.value)}),(d,c)=>(_(),C("div",_e,[u("div",ge,[u("div",{class:T(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="year"}]),onClick:c[0]||(c[0]=t=>e.value="year")},M(d.$t("year")),3),u("div",{class:T(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="month"}]),onClick:c[1]||(c[1]=t=>e.value="month")},M(d.$t("month")),3),u("div",{class:T(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="custom"}]),onClick:c[2]||(c[2]=t=>e.value="custom")},M(d.$t("custom")),3)]),e.value!=="custom"?(_(),C("div",{class:"slider w-full h-12 flex justify-center items-center overflow-x-scroll snap snap-always snap-mandatory snap-x",key:e.value,ref_key:"sliderEl",ref:f},[(_(!0),C(z,null,F($(l),(t,n)=>{var v;return _(),C("div",{key:t.name,class:T(["whitespace-nowrap mx-2 px-2 rounded-sm snap-center text-sm",[{"bg-stone-700 text-white":t.name===((v=y.value)==null?void 0:v.name)},`slider-item-${n}`]]),onClick:k=>S(t,n)},M(t.name),11,we)}),128))])):(_(),C("div",$e,[Y(b,{modelValue:g.value,"onUpdate:modelValue":c[3]||(c[3]=t=>g.value=t),"display-formatter":"YYYY-MM-DD",class:"text-sm buttoned rounded px-2"},null,8,["modelValue"]),ke,Y(b,{modelValue:w.value,"onUpdate:modelValue":c[4]||(c[4]=t=>w.value=t),"display-formatter":"YYYY-MM-DD",class:"text-sm buttoned rounded px-2"},null,8,["modelValue"])]))]))}});const Me=H(Ce,[["__scopeId","data-v-97767200"]]);oe([le,re,ie,ce,ue,de,me,pe,fe,ve,xe]);const L=I({__name:"Chart",props:{option:null,onClick:null},emits:["click"],setup(a,{emit:r}){const s=a,o=h(),{width:i}=ne();return N(()=>{const e=he(o.value);e.setOption(s.option),V(()=>s.option,()=>{e.setOption(s.option)}),K(()=>{e.dispose()}),V(i,()=>{e.resize()}),e.on("click",l=>{r("click",l)})}),(e,l)=>(_(),C("div",{ref_key:"chartRef",ref:o},null,512))}}),Ye=(a,r)=>{a.value=r.value;const s=V(()=>r.value.length,o=>{o>0&&(a.value=r.value,s())});V(()=>a.value,(o,i)=>{o.length===0&&(i.length===1?a.value=[i[0]]:a.value=[r.value[0]])})},{list:De}=P(),Te=["income","expenses","sum"],Ve=(a,r)=>{const s=x(()=>De.value.filter(i=>X(i,a.value,r.value)));return x(()=>{const i=new Map;return s.value.forEach(e=>{var g,w;const l=p.unix(e.time).format("YYYY-MM-DD"),f=(()=>(i.has(e.creatorId)||i.set(e.creatorId,{expenses:new Map,income:new Map,sum:new Map,incomeCategories:new Map,expenseCategories:new Map}),i.get(e.creatorId)))(),m=e.type===E.Expenses?f.expenses:f.income;m.set(l,((g=m.get(l))!=null?g:0)+e.money);const y=e.type===E.Expenses?f.expenseCategories:f.incomeCategories;y.set(e.categoryId,((w=y.get(e.categoryId))!=null?w:0)+e.money)}),i})},U=(a,r,s)=>{const o=r.filter(e=>a.has(e.id)).map(e=>{switch(s){case"expenses":return a.get(e.id).expenseCategories;case"income":return a.get(e.id).incomeCategories;case"sum":return[a.get(e.id).expenseCategories,a.get(e.id).incomeCategories];default:return a.get(e.id).expenseCategories}}).flat();return[...ee(...o).entries()].map(([e,l])=>{const f=te(e);return{total:l,name:f.name,category:se(f.name)}})},Se=(a,r,s)=>{const o=r.filter(l=>a.has(l.id)).map(l=>a.get(l.id)),i=[...new Set(o.map(l=>[...l[s].keys()]).flat())],e=o.map(l=>[...l[s].values()]);return{dates:i,values:e}},Ie={class:"w-full flex flex-col items-center"},je={class:"flex items-center shadow-inner rounded-full p-1"},Be=u("div",{class:"transform translate-y-[-30%]"},[u("i",{class:"icon-chart icon-xs"})],-1),Oe=[Be],Ue={class:"flex items-center"},be={class:"shadow buttoned px-4 max-w-[160px] rounded-full h-full truncate mx-2 py-1 flex items-center"},Ae=u("i",{class:"icon-smile-no-mouth icon-xs"},null,-1),Ee={class:"px-2"},Re={class:"rounded buttoned h-full truncate flex items-center px-2"},Le=u("div",{class:"pr-2"},[u("i",{class:"icon-arrows-exchange-alt-v icon-xs"})],-1),Ne=I({__name:"IncomeChart",props:{statistic:null},setup(a){const r=a,s=h("expenses"),o=h([]),{allUsers:i}=ae();Ye(o,i);const e=h("pie"),l=x(()=>U(r.statistic,o.value,"expenses")),f=x(()=>U(r.statistic,o.value,"income")),m=x(()=>U(r.statistic,o.value,"sum")),y=x(()=>({expenses:l.value.reduce((t,n)=>t+n.total,0),income:f.value.reduce((t,n)=>t+n.total,0),sum:m.value.reduce((t,n)=>t+n.total,0)})),g=x(()=>{switch(s.value){case"expenses":return l.value;case"income":return f.value;case"sum":return m.value;default:return[]}}),w=h(""),D=t=>{t.data&&(w.value=`${t.data.category}: ${t.data.total}`)},S=x(()=>({title:{text:w.value,left:"center",top:"center"},dataset:{dimensions:["category","total"],source:Z(g.value)},xAxis:{type:"category",show:!1},yAxis:{},series:[{type:"pie",radius:["50%","70%"],stillShowZeroSum:!1}]})),d=x(()=>Se(r.statistic,i.value,s.value)),c=x(()=>({xAxis:{type:"time",data:d.value.dates},yAxis:{type:"value"},series:d.value.values.map(n=>({data:n,type:"line",stack:"x"}))}));return(t,n)=>(_(),C("div",Ie,[u("div",je,[u("div",{class:T(["flex justify-center items-center w-12 h-6 rounded-full",{"bg-stone-700 text-white":e.value==="pie"}]),onClick:n[0]||(n[0]=v=>e.value="pie")},Oe,2)]),(_(),B(Q,null,[e.value==="pie"?(_(),B(L,{key:0,class:"w-full aspect-square max-h-300px",option:$(S),onClick:D},null,8,["option"])):(_(),B(L,{key:1,class:"w-full aspect-square max-h-300px",option:$(c)},null,8,["option"]))],1024)),u("div",Ue,[Y(R,{modelValue:o.value,"onUpdate:modelValue":n[1]||(n[1]=v=>o.value=v),list:$(i),multiple:"","value-key":"id"},{default:O(({allSelected:v})=>[u("div",be,[Ae,u("div",Ee,M(v?t.$t("all"):o.value.length===0?"None":o.value.map(k=>k.name).join(",")),1)])]),_:1},8,["modelValue","list"]),Y(R,{modelValue:s.value,"onUpdate:modelValue":n[2]||(n[2]=v=>s.value=v),list:$(Te)},{option:O(({item:v})=>[A(M(t.$t(v)),1)]),default:O(()=>[u("div",Re,[Le,A(" "+M(t.$t(s.value))+": ",1)])]),_:1},8,["modelValue","list"]),u("div",null,M($(y)[s.value]),1)])]))}}),Pe={class:"w-full h-full flex justify-center"},qe={class:"h-full w-full mx-2 max-w-[600px] flex flex-col"},ze={class:"filter w-full m-1 p-2"},ot=I({__name:"StatView",setup(a){const{list:r}=P(),s=x(()=>{const m=r.value.at(-1);if(m)return p.unix(m.time)}),o=x(()=>{const m=r.value.at(0);if(m)return p.unix(m.time)}),i=h(),e=h(),l=(m,y)=>{i.value=m,e.value=y},f=Ve(i,e);return(m,y)=>(_(),C("div",Pe,[u("div",qe,[u("div",ze,[Y(Me,{start:$(s),end:$(o),onChange:l},null,8,["start","end"])]),u("div",null,[Y(Ne,{statistic:$(f)},null,8,["statistic"])])])]))}});export{ot as default};