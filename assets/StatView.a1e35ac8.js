import{a as K}from"./vue-router.c17ffd82.js";import{d as h,a as Q}from"./dayjs.386643b6.js";import{_ as L}from"./DateTime.vue_vue_type_script_setup_true_lang.44300d6f.js";import{m as j,r as w,c as _,o as J,w as N,J as Z,q as Y,t as D,v as c,z as S,G as b,F as H,E as X,u as k,k as V,P as ee,Q as te,n as se,R as ae,A as R,U as ne,B,V as oe,W as U}from"./@vue.6b771be9.js";import{_ as re,i as le,B as I,u as W,m as ie,g as ce,t as ue,d as me,E as de}from"./index.9baf700f.js";import{a as pe}from"./@vueuse.3609b986.js";import{u as fe,i as ve,a as he,b as xe,c as ye,d as ge,e as _e,f as we,g as $e,h as Me,j as Ce,k as Ye,l as ke}from"./echarts.f6f9045b.js";import{_ as P}from"./Select.vue_vue_type_style_index_0_lang.85fcceb7.js";import{u as be}from"./useLimitSelect.b6e917fd.js";import{s as De}from"./mathjs.71232648.js";import{r as Se}from"./lodash-es.4471eccc.js";import"./complex.js.3b936b7b.js";import"./dexie.a92c4e2b.js";import"./uuid.fbc3d34b.js";import"./vue-i18n.a532ecf1.js";import"./@intlify.03657722.js";import"./zrender.271abeed.js";import"./decimal.js.f8235747.js";import"./typed-function.0cf4a37b.js";import"./@babel.9ebe5c4e.js";import"./fraction.js.f0253b53.js";const Te=o=>(ee("data-v-b730748c"),o=o(),te(),o),Ve={class:"flex flex-col items-center"},Ie={class:"flex justify-around rounded-full items-center max-w-300px w-full"},Ee=["onClick"],Ne={key:1,class:"flex justify-around items-center w-full h-12"},je=Te(()=>c("div",null,"-",-1)),Re=j({__name:"DateRangeSelector",props:{start:{default:h().format("YYYY-MM-DD")},end:{default:h().format("YYYY-MM-DD")},date:null,initialType:{default:"month"}},emits:["change"],setup(o,{emit:a}){const s=o,r=()=>{const m=h(s.start).startOf("year"),l=h(s.end).startOf("year"),i=m.year(),x=l.year();return{type:"year",times:Array.from({length:Math.abs(x-i)+1},(d,p)=>({name:`${i+p}`,range:[h(`${i+p}`),h(`${i+p}`).endOf("year")]}))}},t=()=>{const m=h(s.end).startOf("month"),l=h(s.start).startOf("month"),i=Math.abs(m.diff(l,"month"))+1,x=Array.from({length:i},(d,p)=>{const g=l.add(p,"month");return{name:g.format("YYYY-MM"),range:[g,g.endOf("month")]}});return{type:"month",times:x}},e=w(s.initialType),n=_(()=>e.value==="year"?r().times:e.value==="month"?t().times:[{name:"",range:[h(s.start),h(s.end)]}]),f=w(),v=m=>{var x;const l=h(m),i=[...n.value].reverse().findIndex(d=>l.isAfter(d.range[0]));return{index:i,time:(x=n.value[i])!=null?x:n.value[0]}},$=w(),M=w(h(s.start)),u=w(h(s.end)),y=()=>{const{index:m,time:l}=v(M.value);C(l,m,!1)};J(()=>{y()}),N(e,m=>{m!=="custom"&&se(()=>{y()})});const C=(m,l,i=!0)=>{var x;$.value=m,f.value&&((x=document.querySelector(`.slider-item-${l}`))==null||x.scrollIntoView({block:"center",inline:"center",behavior:i?"smooth":void 0})),a("change",...$.value.range)};return Z(()=>{M.value&&u.value&&a("change",M.value,u.value)}),(m,l)=>(Y(),D("div",Ve,[c("div",Ie,[c("div",{class:S(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="year"}]),onClick:l[0]||(l[0]=i=>e.value="year")},b(m.$t("year")),3),c("div",{class:S(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="month"}]),onClick:l[1]||(l[1]=i=>e.value="month")},b(m.$t("month")),3),c("div",{class:S(["flex-1 flex justify-center m-1",{"bg-stone-400 rounded-full text-white":e.value==="custom"}]),onClick:l[2]||(l[2]=i=>e.value="custom")},b(m.$t("custom")),3)]),e.value!=="custom"?(Y(),D("div",{class:"slider w-full h-12 flex items-center overflow-x-scroll snap snap-always snap-mandatory snap-x",key:e.value,ref_key:"sliderEl",ref:f},[(Y(!0),D(H,null,X(k(n),(i,x)=>{var d;return Y(),D("div",{key:i.name,class:S(["whitespace-nowrap mx-2 px-2 rounded-sm snap-center text-sm",[{"bg-stone-700 text-white":i.name===((d=$.value)==null?void 0:d.name)},`slider-item-${x}`]]),onClick:p=>C(i,x)},b(i.name),11,Ee)}),128))])):(Y(),D("div",Ne,[V(L,{modelValue:M.value,"onUpdate:modelValue":l[3]||(l[3]=i=>M.value=i),"display-formatter":"YYYY-MM-DD",class:"text-sm buttoned rounded px-2"},null,8,["modelValue"]),je,V(L,{modelValue:u.value,"onUpdate:modelValue":l[4]||(l[4]=i=>u.value=i),"display-formatter":"YYYY-MM-DD",class:"text-sm buttoned rounded px-2"},null,8,["modelValue"])]))]))}});const Be=re(Re,[["__scopeId","data-v-b730748c"]]);fe([ve,he,xe,ye,ge,_e,we,$e,Me,Ce,Ye]);const q=j({__name:"Chart",props:{option:null,onClick:null},emits:["click"],setup(o,{emit:a}){const s=o,r=w(),{width:t}=pe();return J(()=>{const e=ke(r.value);e.setOption(s.option),N(()=>s.option,()=>{e.setOption(s.option)}),ae(()=>{e.dispose()}),N(t,()=>{e.resize()}),e.on("click",n=>{a("click",n)})}),(e,n)=>(Y(),D("div",{ref_key:"chartRef",ref:r},null,512))}}),E=o=>{let a=0;try{let t=Number(o).toString().toUpperCase();if(t.split("E").length===2){var s=!1;t.split(".").length===2&&(t=t.split(".")[1],parseInt(t.split("E")[0])!==0&&(s=!0));let e=t.split("E");s&&(a=e[0].length),a-=parseInt(e[1])}else t.split(".").length===2&&parseInt(t.split(".")[1])!==0&&(a=t.split(".")[1].length)}catch(r){throw r}finally{return(isNaN(a)||a<0)&&(a=0),a}},z=o=>{let a=Number(o),s=E(o),r=o.toString().toUpperCase();return r.split("E").length===2?a=Math.round(a*Math.pow(10,s)):a=Number(r.replace(".","")),a},G=(o,a,s,r)=>{let t=0;switch(o){case"add":t=a+s;break;case"sub":t=a-s;break;case"div":t=a/s;break;case"mul":t=a*s;break}return Math.abs(r-t)>1?t:r},F=(o,a)=>{const s=Number(o),r=Number(a);var t=0,e=s.toString(),n=r.toString();try{t+=E(e)}catch{}try{t+=E(n)}catch{}var f=z(e)*z(n)/Math.pow(10,t);return G("mul",s,r,f)},T=(o,a)=>{const s=Number(o),r=Number(a);let t,e,n;try{t=E(s)+1}catch{t=0}try{e=E(r)+1}catch{e=0}n=Math.pow(10,Math.max(t,e));var f=(F(s,n)+F(r,n))/n;return G("add",s,r,f)},{list:Oe}=W();h.extend(Q);const Ue=["income","expenses","sum"],Ae=(o,a)=>{const s=_(()=>Oe.value.filter(e=>le(e,o.value,a.value))),r=_(()=>!o.value||!a.value?"YYYY-MM-DD":h.duration(a.value.diff(o.value)).asDays()>=364?"YYYY-MM":"YYYY-MM-DD");return _(()=>{const e=new Map;return s.value.forEach(n=>{var y,C,m,l;const f=h.unix(n.time).format(r.value),v=(()=>(e.has(n.creatorId)||e.set(n.creatorId,{expenses:new Map,income:new Map,sum:new Map,incomeCategories:new Map,expenseCategories:new Map}),e.get(n.creatorId)))(),$=v.sum;$.set(f,n.type===I.Expenses?T((y=$.get(f))!=null?y:0,n.money):De((C=$.get(f))!=null?C:0,n.money));const M=n.type===I.Expenses?v.expenses:v.income;M.set(f,T((m=M.get(f))!=null?m:0,n.money));const u=n.type===I.Expenses?v.expenseCategories:v.incomeCategories;u.set(n.categoryId,T((l=u.get(n.categoryId))!=null?l:0,n.money))}),e})},O=(o,a,s)=>{if(s==="sum")return a.filter(e=>o.has(e.id)).map(e=>({total:[...o.get(e.id).sum.values()].reduce((f,v)=>f+v,0),name:e.name,category:e.name}));const r=a.filter(e=>o.has(e.id)).map(e=>{switch(s){case"expenses":return o.get(e.id).expenseCategories;case"income":return o.get(e.id).incomeCategories;default:return o.get(e.id).expenseCategories}}).flat();return[...ie(...r).entries()].map(([e,n])=>{const f=ce(e);return{total:n,name:f.name,category:ue(f.name)}})},Le=(o,a,s)=>({values:a.filter(t=>o.has(t.id)).map(t=>({data:[...o.get(t.id)[s].entries()],user:t}))}),Pe={class:"w-full px-2 flex flex-col items-center"},qe={class:"flex items-center shadow-inner rounded-full p-1"},ze=c("div",{class:"transform translate-y-[-30%]"},[c("i",{class:"icon-chart icon-xs"})],-1),Fe=[ze],Je=c("div",{class:"transform translate-y-[30%]"},[c("i",{class:"icon-trending icon-xs"})],-1),We=[Je],Ge={class:"flex w-full px-2 items-center justify-between"},Ke={class:"shadow buttoned px-4 max-w-[160px] rounded-full h-full truncate mx-2 py-1 flex items-center"},Qe=c("i",{class:"icon-smile-no-mouth icon-xs"},null,-1),Ze={class:"px-2"},He={class:"flex items-center"},Xe={class:"rounded buttoned h-full truncate flex items-center px-2"},et=c("div",{class:"pr-2"},[c("i",{class:"icon-arrows-exchange-alt-v icon-xs"})],-1),tt=j({__name:"IncomeChart",props:{statistic:null},setup(o,{expose:a}){const s=o,r=w("expenses"),t=w([]),{allUsers:e}=me();be(t,e);const n=w("pie"),f=_(()=>O(s.statistic,t.value,"expenses")),v=_(()=>O(s.statistic,t.value,"income")),$=_(()=>O(s.statistic,t.value,"sum")),M=_(()=>({expenses:f.value.reduce((d,p)=>T(d,p.total),0),income:v.value.reduce((d,p)=>T(d,p.total),0),sum:$.value.reduce((d,p)=>T(d,p.total),0)})),u=_(()=>{switch(r.value){case"expenses":return f.value;case"income":return v.value;case"sum":return $.value;default:return[]}}),y=w(""),C=w(""),m=d=>{d.data&&(y.value=`${d.data.category}: ${d.data.total}`,C.value=d.data.name)};N(r,()=>{y.value="",C.value=""}),a({currentCategory:C,currentType:r,selectedUsers:t});const l=_(()=>({title:{text:y.value,left:"center",top:"center"},dataset:{dimensions:["category","total"],source:oe(u.value)},tooltip:{show:!0},xAxis:{type:"category",show:!1},yAxis:{},series:[{type:"pie",radius:["50%","70%"],stillShowZeroSum:!1}]})),i=_(()=>Le(s.statistic,e.value,r.value)),x=_(()=>({xAxis:{type:"time"},yAxis:{type:"value"},tooltip:{show:!0,formatter:"{a}: {c0}"},series:i.value.values.map(({data:p,user:g})=>({data:Se(p),type:"line",name:g.name}))}));return(d,p)=>(Y(),D("div",Pe,[c("div",qe,[c("div",{class:S(["flex justify-center items-center w-12 h-6 rounded-full",{"bg-stone-700 text-white":n.value==="pie"}]),onClick:p[0]||(p[0]=g=>n.value="pie")},Fe,2),c("div",{class:S(["flex justify-center items-center w-12 h-6 rounded-full",{"bg-stone-700 text-white":n.value==="line"}]),onClick:p[1]||(p[1]=g=>n.value="line")},We,2)]),(Y(),R(ne,null,[n.value==="pie"?(Y(),R(q,{key:0,class:"w-full aspect-square max-h-300px",option:k(l),onClick:m},null,8,["option"])):(Y(),R(q,{key:1,class:"w-full aspect-square max-h-300px",option:k(x)},null,8,["option"]))],1024)),c("div",Ge,[V(P,{modelValue:t.value,"onUpdate:modelValue":p[2]||(p[2]=g=>t.value=g),list:k(e),multiple:"","value-key":"id",placement:"bottom-left"},{default:B(({allSelected:g})=>[c("div",Ke,[Qe,c("div",Ze,b(g?d.$t("all"):t.value.length===0?"None":t.value.map(A=>A.name).join(",")),1)])]),_:1},8,["modelValue","list"]),c("div",He,[V(P,{modelValue:r.value,"onUpdate:modelValue":p[3]||(p[3]=g=>r.value=g),list:k(Ue)},{option:B(({item:g})=>[U(b(d.$t(g)),1)]),default:B(()=>[c("div",Xe,[et,U(" "+b(d.$t(r.value))+": ",1)])]),_:1},8,["modelValue","list"]),c("div",null,b(k(M)[r.value]),1)])])]))}}),st={class:"w-full h-full flex justify-center"},at={class:"h-full w-full mx-2 max-w-[600px] flex flex-col"},nt={class:"filter w-full m-1 p-2"},ot={class:"flex p-2 justify-end items-center"},rt=c("div",{class:"flex items-center justify-center"},[c("i",{class:"icon-chevron-right"})],-1),Dt=j({__name:"StatView",setup(o){const{list:a}=W(),s=_(()=>{const u=a.value.at(-1);if(u)return h.unix(u.time)}),r=_(()=>{const u=a.value.at(0);if(u)return h.unix(u.time)}),t=w(),e=w(),n=(u,y)=>{t.value=u,e.value=y},f=Ae(t,e),v=w(),$=K(),M=()=>{var m;const{selectedUsers:u,currentType:y,currentCategory:C}=(m=v.value)!=null?m:{};$.push({name:"search",query:{filters:JSON.stringify({type:y==="expenses"?I.Expenses:y==="income"?I.Income:void 0,users:u==null?void 0:u.map(l=>l.id),categories:C?[C].map(l=>{var i;return(i=de.find(x=>x.name===l))==null?void 0:i.id}):void 0,start:t.value,end:e.value})}})};return(u,y)=>(Y(),D("div",st,[c("div",at,[c("div",nt,[V(Be,{start:k(s),end:k(r),onChange:n},null,8,["start","end"])]),c("div",null,[V(tt,{ref_key:"chartRef",ref:v,statistic:k(f)},null,8,["statistic"])]),c("div",ot,[c("div",{class:"flex buttoned rounded-full py-1 px-2 flex items-center",onClick:M},[U(b(u.$t("see-details"))+" ",1),rt])])])]))}});export{Dt as default};
