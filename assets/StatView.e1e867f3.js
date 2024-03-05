import{a as Q}from"./vue-router.f815959e.js";import{d as x,a as X}from"./dayjs.386643b6.js";import{_ as L}from"./DateTime.vue_vue_type_script_setup_true_lang.fec6fc5e.js";import{m as R,r as w,c as _,o as J,w as j,J as Z,q as Y,t as D,v as u,z as S,G as b,F as H,E as ee,u as k,k as I,P as te,Q as se,n as ae,U as ne,A as B,R as oe,B as O,X as re,Y as A}from"./@vue.e6301bd2.js";import{_ as le,i as ie,B as V,u as W,m as ce,g as ue,t as de,d as me,e as pe,E as fe}from"./index.708ef8bb.js";import{a as ve}from"./@vueuse.ec86b252.js";import{u as he,i as xe,a as ye,b as ge,c as _e,d as we,e as $e,f as Me,g as Ce,h as Ye,j as ke,k as be,l as De}from"./echarts.f6f9045b.js";import{_ as P}from"./Select.vue_vue_type_style_index_0_lang.1841d2ea.js";import{u as Se}from"./useLimitSelect.044ffa37.js";import{s as Te}from"./mathjs.71232648.js";import{r as Ie}from"./lodash-es.4471eccc.js";import"./complex.js.3b936b7b.js";import"./dexie.a92c4e2b.js";import"./uuid.fbc3d34b.js";import"./vue-i18n.ac4c776b.js";import"./@intlify.cff06da3.js";import"./zrender.271abeed.js";import"./decimal.js.f8235747.js";import"./typed-function.0cf4a37b.js";import"./@babel.9ebe5c4e.js";import"./fraction.js.f0253b53.js";const Ne=o=>(te("data-v-b730748c"),o=o(),se(),o),Ve={class:"flex flex-col items-center"},Ee={class:"flex justify-around rounded-full items-center max-w-300px w-full"},je=["onClick"],Re={key:1,class:"flex justify-around items-center w-full h-12"},Be=Ne(()=>u("div",null,"-",-1)),Oe=R({__name:"DateRangeSelector",props:{start:{default:x().format("YYYY-MM-DD")},end:{default:x().format("YYYY-MM-DD")},date:null,initialType:{default:"month"}},emits:["change"],setup(o,{emit:a}){const s=o,r=()=>{const m=x(s.start).startOf("year"),i=x(s.end).startOf("year"),c=m.year(),y=i.year();return{type:"year",times:Array.from({length:Math.abs(y-c)+1},(p,l)=>({name:`${c+l}`,range:[x(`${c+l}`),x(`${c+l}`).endOf("year")]}))}},t=()=>{const m=x(s.end).startOf("month"),i=x(s.start).startOf("month"),c=Math.abs(m.diff(i,"month"))+1,y=Array.from({length:c},(p,l)=>{const h=i.add(l,"month");return{name:h.format("YYYY-MM"),range:[h,h.endOf("month")]}});return{type:"month",times:y}},e=w(s.initialType),n=_(()=>e.value==="year"?r().times:e.value==="month"?t().times:[{name:"",range:[x(s.start),x(s.end)]}]),f=w(),v=m=>{var y;const i=x(m),c=[...n.value].reverse().findIndex(p=>i.isAfter(p.range[0]));return{index:c,time:(y=n.value[c])!=null?y:n.value[0]}},$=w(),M=w(x(s.start)),d=w(x(s.end)),g=()=>{const{index:m,time:i}=v(M.value);C(i,m,!1)};J(()=>{g()}),j(e,m=>{m!=="custom"&&ae(()=>{g()})});const C=(m,i,c=!0)=>{var y;$.value=m,f.value&&((y=document.querySelector(`.slider-item-${i}`))==null||y.scrollIntoView({block:"center",inline:"center",behavior:c?"smooth":void 0})),a("change",...$.value.range)};return Z(()=>{M.value&&d.value&&a("change",M.value,d.value)}),(m,i)=>(Y(),D("div",Ve,[u("div",Ee,[u("div",{class:S(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="year"}]),onClick:i[0]||(i[0]=c=>e.value="year")},b(m.$t("year")),3),u("div",{class:S(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="month"}]),onClick:i[1]||(i[1]=c=>e.value="month")},b(m.$t("month")),3),u("div",{class:S(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="custom"}]),onClick:i[2]||(i[2]=c=>e.value="custom")},b(m.$t("custom")),3)]),e.value!=="custom"?(Y(),D("div",{class:"slider w-full h-12 flex items-center overflow-x-scroll snap snap-always snap-mandatory snap-x",key:e.value,ref_key:"sliderEl",ref:f},[(Y(!0),D(H,null,ee(k(n),(c,y)=>{var p;return Y(),D("div",{key:c.name,class:S(["whitespace-nowrap mx-2 px-2 rounded-sm snap-center text-sm",[{"bg-stone-700 text-white":c.name===((p=$.value)==null?void 0:p.name)},`slider-item-${y}`]]),onClick:l=>C(c,y)},b(c.name),11,je)}),128))])):(Y(),D("div",Re,[I(L,{modelValue:M.value,"onUpdate:modelValue":i[3]||(i[3]=c=>M.value=c),"display-formatter":"YYYY-MM-DD",class:"text-sm buttoned rounded px-2"},null,8,["modelValue"]),Be,I(L,{modelValue:d.value,"onUpdate:modelValue":i[4]||(i[4]=c=>d.value=c),"display-formatter":"YYYY-MM-DD",class:"text-sm buttoned rounded px-2"},null,8,["modelValue"])]))]))}});const Ue=le(Oe,[["__scopeId","data-v-b730748c"]]);he([xe,ye,ge,_e,we,$e,Me,Ce,Ye,ke,be]);const q=R({__name:"Chart",props:{option:null,onClick:null},emits:["click"],setup(o,{emit:a}){const s=o,r=w(),{width:t}=ve();return J(()=>{const e=De(r.value);e.setOption(s.option),j(()=>s.option,()=>{e.setOption(s.option)}),ne(()=>{e.dispose()}),j(t,()=>{e.resize()}),e.on("click",n=>{a("click",n)})}),(e,n)=>(Y(),D("div",{ref_key:"chartRef",ref:r},null,512))}}),E=o=>{let a=0;try{let t=Number(o).toString().toUpperCase();if(t.split("E").length===2){var s=!1;t.split(".").length===2&&(t=t.split(".")[1],parseInt(t.split("E")[0])!==0&&(s=!0));let e=t.split("E");s&&(a=e[0].length),a-=parseInt(e[1])}else t.split(".").length===2&&parseInt(t.split(".")[1])!==0&&(a=t.split(".")[1].length)}catch(r){throw r}finally{return(isNaN(a)||a<0)&&(a=0),a}},z=o=>{let a=Number(o),s=E(o),r=o.toString().toUpperCase();return r.split("E").length===2?a=Math.round(a*Math.pow(10,s)):a=Number(r.replace(".","")),a},G=(o,a,s,r)=>{let t=0;switch(o){case"add":t=a+s;break;case"sub":t=a-s;break;case"div":t=a/s;break;case"mul":t=a*s;break}return Math.abs(r-t)>1?t:r},F=(o,a)=>{const s=Number(o),r=Number(a);var t=0,e=s.toString(),n=r.toString();try{t+=E(e)}catch{}try{t+=E(n)}catch{}var f=z(e)*z(n)/Math.pow(10,t);return G("mul",s,r,f)},T=(o,a)=>{const s=Number(o),r=Number(a);let t,e,n;try{t=E(s)+1}catch{t=0}try{e=E(r)+1}catch{e=0}n=Math.pow(10,Math.max(t,e));var f=(F(s,n)+F(r,n))/n;return G("add",s,r,f)},{list:Ae}=W();x.extend(X);const Le=["income","expenses","sum"],Pe=(o,a)=>{const s=_(()=>Ae.value.filter(e=>ie(e,o.value,a.value))),r=_(()=>!o.value||!a.value?"YYYY-MM-DD":x.duration(a.value.diff(o.value)).asDays()>=364?"YYYY-MM":"YYYY-MM-DD");return _(()=>{const e=new Map;return s.value.forEach(n=>{var g,C,m,i;const f=x.unix(n.time).format(r.value),v=(()=>(e.has(n.creatorId)||e.set(n.creatorId,{expenses:new Map,income:new Map,sum:new Map,incomeCategories:new Map,expenseCategories:new Map}),e.get(n.creatorId)))(),$=v.sum;$.set(f,n.type===V.Expenses?T((g=$.get(f))!=null?g:0,n.money):Te((C=$.get(f))!=null?C:0,n.money));const M=n.type===V.Expenses?v.expenses:v.income;M.set(f,T((m=M.get(f))!=null?m:0,n.money));const d=n.type===V.Expenses?v.expenseCategories:v.incomeCategories;d.set(n.categoryId,T((i=d.get(n.categoryId))!=null?i:0,n.money))}),e})},U=(o,a,s)=>{if(s==="sum")return a.filter(e=>o.has(e.id)).map(e=>({total:[...o.get(e.id).sum.values()].reduce((f,v)=>f+v,0),name:e.name,category:e.name}));const r=a.filter(e=>o.has(e.id)).map(e=>{switch(s){case"expenses":return o.get(e.id).expenseCategories;case"income":return o.get(e.id).incomeCategories;default:return o.get(e.id).expenseCategories}}).flat();return[...ce(...r).entries()].map(([e,n])=>{const f=ue(e);return{total:n,name:f.name,category:de(f.name)}})},qe=(o,a,s)=>({values:a.filter(t=>o.has(t.id)).map(t=>({data:[...o.get(t.id)[s].entries()],user:t}))}),ze={class:"w-full px-2 flex flex-col items-center"},Fe={class:"flex items-center shadow-inner rounded-full p-1"},Je=u("div",{class:"transform translate-y-[-30%]"},[u("i",{class:"icon-chart icon-xs"})],-1),We=[Je],Ge=u("div",{class:"transform translate-y-[30%]"},[u("i",{class:"icon-trending icon-xs"})],-1),Ke=[Ge],Qe={class:"flex w-full px-2 items-center justify-between"},Xe={class:"shadow buttoned px-4 max-w-[160px] rounded-full h-full truncate mx-2 py-1 flex items-center"},Ze=u("i",{class:"icon-smile-no-mouth icon-xs"},null,-1),He={class:"px-2"},et={class:"flex items-center"},tt={class:"rounded buttoned h-full truncate flex items-center px-2"},st=u("div",{class:"pr-2"},[u("i",{class:"icon-arrows-exchange-alt-v icon-xs"})],-1),at=R({__name:"IncomeChart",props:{statistic:null},setup(o,{expose:a}){const s=o,r=w("expenses"),t=w([]),{allUsers:e}=me();Se(t,e);const n=w("pie"),f=_(()=>U(s.statistic,t.value,"expenses")),v=_(()=>U(s.statistic,t.value,"income")),$=_(()=>U(s.statistic,t.value,"sum")),M=_(()=>({expenses:f.value.reduce((p,l)=>T(p,l.total),0),income:v.value.reduce((p,l)=>T(p,l.total),0),sum:$.value.reduce((p,l)=>T(p,l.total),0)})),d=_(()=>{switch(r.value){case"expenses":return f.value;case"income":return v.value;case"sum":return $.value;default:return[]}}),g=w(""),C=w(""),m=p=>{p.data&&(g.value=`${p.data.category}: ${p.data.total}`,C.value=p.data.name)};j(r,()=>{g.value="",C.value=""}),a({currentCategory:C,currentType:r,selectedUsers:t});const i=_(()=>({dataset:{dimensions:["category","total"],source:re(d.value)},tooltip:{show:!0,formatter:l=>`${l.name}: ${l.value.total}`},xAxis:{type:"category",show:!1},yAxis:{},series:[{type:"pie",radius:["50%","70%"],stillShowZeroSum:!1,itemStyle:{color(l){var h,N;return(N=(h=pe.find(K=>K.name===l.data.name))==null?void 0:h.pieColor)!=null?N:""},borderRadius:5,borderWidth:2,borderColor:"white"}}]})),c=_(()=>qe(s.statistic,e.value,r.value)),y=_(()=>({xAxis:{type:"time"},yAxis:{type:"value"},tooltip:{show:!0,formatter:l=>`${l.seriesName}: ${l.value[1]}`},series:c.value.values.map(({data:l,user:h})=>({data:Ie(l),type:"line",name:h.name}))}));return(p,l)=>(Y(),D("div",ze,[u("div",Fe,[u("div",{class:S(["flex justify-center items-center w-12 h-6 rounded-full",{"bg-stone-700 text-white":n.value==="pie"}]),onClick:l[0]||(l[0]=h=>n.value="pie")},We,2),u("div",{class:S(["flex justify-center items-center w-12 h-6 rounded-full",{"bg-stone-700 text-white":n.value==="line"}]),onClick:l[1]||(l[1]=h=>n.value="line")},Ke,2)]),(Y(),B(oe,null,[n.value==="pie"?(Y(),B(q,{key:0,class:"w-full aspect-square max-h-300px",option:k(i),onClick:m},null,8,["option"])):(Y(),B(q,{key:1,class:"w-full aspect-square max-h-300px",option:k(y)},null,8,["option"]))],1024)),u("div",Qe,[I(P,{modelValue:t.value,"onUpdate:modelValue":l[2]||(l[2]=h=>t.value=h),list:k(e),multiple:"","value-key":"id",placement:"bottom-left"},{default:O(({allSelected:h})=>[u("div",Xe,[Ze,u("div",He,b(h?p.$t("all"):t.value.length===0?"None":t.value.map(N=>N.name).join(",")),1)])]),_:1},8,["modelValue","list"]),u("div",et,[I(P,{modelValue:r.value,"onUpdate:modelValue":l[3]||(l[3]=h=>r.value=h),list:k(Le)},{option:O(({item:h})=>[A(b(p.$t(h)),1)]),default:O(()=>[u("div",tt,[st,A(" "+b(p.$t(r.value))+": ",1)])]),_:1},8,["modelValue","list"]),u("div",null,b(k(M)[r.value]),1)])])]))}}),nt={class:"w-full h-full flex justify-center"},ot={class:"h-full w-full mx-2 max-w-[600px] flex flex-col items-center"},rt={class:"filter w-full m-1 p-2"},lt={class:"w-full"},it={class:"flex p-2 justify-end items-center"},ct=u("div",{class:"flex items-center justify-center"},[u("i",{class:"icon-chevron-right"})],-1),It=R({__name:"StatView",setup(o){const{list:a}=W(),s=_(()=>{const d=a.value.at(-1);if(d)return x.unix(d.time)}),r=_(()=>{const d=a.value.at(0);if(d)return x.unix(d.time)}),t=w(),e=w(),n=(d,g)=>{t.value=d,e.value=g},f=Pe(t,e),v=w(),$=Q(),M=()=>{var m;const{selectedUsers:d,currentType:g,currentCategory:C}=(m=v.value)!=null?m:{};$.push({name:"search",query:{filters:JSON.stringify({type:g==="expenses"?V.Expenses:g==="income"?V.Income:void 0,users:d==null?void 0:d.map(i=>i.id),categories:C?[C].map(i=>{var c;return(c=fe.find(y=>y.name===i))==null?void 0:c.id}):void 0,start:t.value,end:e.value})}})};return(d,g)=>(Y(),D("div",nt,[u("div",ot,[u("div",rt,[I(Ue,{start:k(s),end:k(r),onChange:n},null,8,["start","end"])]),u("div",lt,[I(at,{ref_key:"chartRef",ref:v,statistic:k(f)},null,8,["statistic"])]),u("div",it,[u("div",{class:"flex buttoned rounded-full py-1 px-2 flex items-center",onClick:M},[A(b(d.$t("see-details"))+" ",1),ct])])])]))}});export{It as default};