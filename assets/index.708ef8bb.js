var Be=Object.defineProperty;var Me=(e,o,t)=>o in e?Be(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var R=(e,o,t)=>(Me(e,typeof o!="symbol"?o+"":o,t),t);import{m as $,c as D,q as f,t as I,v as i,x as be,y as ee,z as H,r as _,A as k,k as O,B,C as Re,D as te,E as Te,G as g,u as h,F as we,H as Q,I as P,J as Se,l as Pe,K as Ue,L as fe,M as De,N as $e,O as je}from"./@vue.e6301bd2.js";import{u as Ne,a as xe,c as Ve,b as Fe}from"./vue-router.f815959e.js";import{D as ze,l as Ee}from"./dexie.a92c4e2b.js";import{v as oe}from"./uuid.fbc3d34b.js";import{d as ne}from"./dayjs.386643b6.js";import{u as qe}from"./@vueuse.ec86b252.js";import{c as He}from"./vue-i18n.ac4c776b.js";import"./complex.js.3b936b7b.js";import"./@intlify.cff06da3.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Je={class:"popup-view fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-1"},We=["onClick"],Ye=$({__name:"PopupRouterView",props:{closeOnModal:{type:Boolean},bodyClass:null},setup(e){const o=e,t=Ne(),s=D(()=>t.matched[t.matched.length-2].path===t.path),n=xe(),r=()=>{o.closeOnModal&&s.value&&n.back()};return(l,c)=>(f(),I("div",Je,[i("div",{class:"popup-view-modal absolute w-[200%] h-[200%] bg-black opacity-50",onClick:be(r,["stop"])},null,8,We),i("div",{class:H(["popup-view-body flex z-1 w-screen h-screen sm:max-w-[550px] sm:min-w-[400px] sm:w-[60%] sm:h-[55%] sm:top-auto sm:left-auto sm:rounded-lg bg-[white]",e.bodyClass])},[ee(l.$slots,"default",{},void 0,!0)],2)]))}});const se=(e,o)=>{const t=e.__vccOpts||e;for(const[s,n]of o)t[s]=n;return t},Ge=se(Ye,[["__scopeId","data-v-d870a814"]]),Ke=(()=>{let e=0;return()=>e+=1})();var z=(e=>(e.Success="success",e.Error="error",e.Warning="warning",e))(z||{});const W=_([]),pe=3e3,Qe=()=>({messageList:W}),Ze=e=>{var s;const o=Ke(),t=(()=>typeof e=="string"?{type:"success",content:e,timeout:pe}:e)();W.value.push({...t,id:o}),setTimeout(()=>{W.value=W.value.filter(({id:n})=>n!==o)},(s=t.timeout)!=null?s:pe)},Xe=$({__name:"CustomMessage",setup(e){const{messageList:o}=Qe();return(t,s)=>(f(),k(te,{to:"body"},[O(Re,{name:"fall",tag:"div"},{default:B(()=>[(f(!0),I(we,null,Te(h(o),n=>(f(),I("div",{key:n.id,class:"message-box fixed left-0 w-full flex justify-center z-4"},[i("div",{class:H(["message fixed rounded-md text-white p-1 mt-3 min-w-[300px] max-w-[90%] text-center shadow",{"bg-green-600":n.type===h(z).Success,"bg-yellow-600":n.type===h(z).Warning,"bg-red-600":n.type===h(z).Error}])},g(n.content),3)]))),128))]),_:1})]))}});const et=se(Xe,[["__scopeId","data-v-a527f594"]]),tt=["onClick"],ot={class:"dialog-body z-1 max-w-[550px] max-h-[550px] rounded-sm bg-[white]"},Ie=$({__name:"Dialog",props:{visible:{type:Boolean},customClass:null,closeOnModal:{type:Boolean}},emits:["update:visible"],setup(e,{emit:o}){const t=e,s=()=>{t.closeOnModal&&o("update:visible",!1)};return(n,r)=>(f(),k(te,{to:"body"},[O(Q,{name:"fade"},{default:B(()=>[e.visible?(f(),I("div",{key:0,class:H(["dialog fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-2",[e.customClass]])},[i("div",{class:"dialog-modal absolute w-[200%] h-[200%] bg-black opacity-50",onClick:be(s,["stop"])},null,8,tt),i("div",ot,[ee(n.$slots,"default")])],2)):P("",!0)]),_:3})]))}});const nt={class:"w-full h-full flex p-2 flex-col"},st={class:"flex-1 flex pb-2 mb-4"},rt={class:"font-bold flex-1 pl-2 flex items-center"},it={class:"w-full flex justify-end"},lt=$({__name:"ConfirmProvider",props:{controller:null},setup(e){const o=e,t=()=>{o.controller.close(!1)},s=()=>{o.controller.close(!0)};return(n,r)=>(f(),k(Ie,{visible:e.controller.visible,"custom-class":"confirm-dialog z-3"},{default:B(()=>{var l,c;return[i("div",nt,[i("div",{class:"w-full flex justify-end"},[i("i",{class:"w-10 icon-close buttoned p-2",onClick:t})]),i("div",st,[ee(n.$slots,"default",{},()=>[i("div",rt,g(e.controller.title),1)],!0)]),i("div",it,[i("button",{class:"buttoned shadow rounded px-2 mx-1 px-4",onClick:t},g((l=e.controller.cancelTitle)!=null?l:n.$t("no")),1),i("button",{class:"mx-1 bg-stone-900 text-white rounded px-4",onClick:s},g((c=e.controller.confirmTitle)!=null?c:n.$t("yes")),1)])])]}),_:3},8,["visible"]))}});const at=se(lt,[["__scopeId","data-v-3cd738c5"]]),ve=()=>({visible:!1,icon:"dialog-question",title:"",cancelTitle:void 0,confirmTitle:void 0,hideCancelButton:!1,close:()=>{}}),ct=()=>{const e=_(ve());return{show:t=>new Promise((s,n)=>{e.value={...ve(),...t,visible:!0,close:r=>{e.value={...e.value,visible:!1},r?s():n()}}}),controller:e}},{show:ut,controller:dt}=ct();var u=(e=>(e[e.Income=0]="Income",e[e.Expenses=1]="Expenses",e))(u||{});const mt=[{name:"Food",id:"food",type:u.Expenses,icon:"icon-bowl",color:"bg-red-600",pieColor:"#5470c6"},{name:"Transport",id:"transport",type:u.Expenses,icon:"icon-airplane",color:"bg-red-600",pieColor:"#91cc75"},{name:"Shopping",id:"shopping",type:u.Expenses,icon:"icon-shopping-cart",color:"bg-red-600",pieColor:"#fac858"},{name:"Housing",id:"housing",type:u.Expenses,icon:"icon-home-alt",color:"bg-red-600",pieColor:"#ee6666"},{name:"Entertainment",id:"entertainment",type:u.Expenses,icon:"icon-dice-3",color:"bg-red-600",pieColor:"#73c0de"},{name:"Medical",id:"medical",type:u.Expenses,icon:"icon-pill",color:"bg-red-600",pieColor:"#3ba272"},{name:"Education",id:"education",type:u.Expenses,icon:"icon-pen",color:"bg-red-600",pieColor:"#9a60b4"},{name:"Relationship",id:"relationship",type:u.Expenses,icon:"icon-gift",color:"bg-red-600",pieColor:"#ea7ccc"},{name:"Balance Account",id:"balance-account",type:u.Expenses,icon:"icon-ruler",color:"bg-red-600",pieColor:"#40f8ff"},{name:"Other",id:"other-expenses",type:u.Expenses,icon:"icon-bookmark",color:"bg-red-600",pieColor:"#4d3c77"}],ft=[{name:"Wage",id:"wage",type:u.Income,icon:"icon-credit-card",color:"bg-red-600",pieColor:"#5470c6"},{name:"Part Time",id:"part-time",type:u.Income,icon:"icon-community",color:"bg-red-600",pieColor:"#91cc75"},{name:"Lean",id:"lean",type:u.Income,icon:"icon-mail-open",color:"bg-red-600",pieColor:"#fac858"},{name:"Refund",id:"refund",type:u.Income,icon:"icon-arrow-bottom-right",color:"bg-red-600",pieColor:"#ee6666"},{name:"Drawback",id:"drawback",type:u.Income,icon:"icon-pentagon-right",color:"bg-red-600",pieColor:"#73c0de"},{name:"Balance Account",id:"balance-account",type:u.Income,icon:"icon-ruler",color:"bg-red-600",pieColor:"#3ba272"},{name:"Other",id:"other-income",type:u.Income,icon:"icon-bookmark",color:"bg-red-600",pieColor:"#9a60b4"}],Ce=[...mt,...ft],G=new Map,pt=e=>{if(G.has(e))return G.get(e);const o=Ce.find(t=>t.id===e);if(o)return G.set(e,o),o},T=class{constructor(){R(this,"records");var o;this.records=JSON.parse((o=localStorage.getItem(T.RECORDS_NAME))!=null?o:"[]")}get version(){var o;return Number((o=localStorage.getItem(T.VERSION_NAME))!=null?o:"1")}set version(o){localStorage.setItem(T.VERSION_NAME,String(o))}has(o){return this.records.some(t=>t===o)}delete(o){this.records=this.records.filter(t=>t!==o),localStorage.setItem(T.RECORDS_NAME,JSON.stringify(this.records))}add(o){this.has(o)||(this.records.push(o),localStorage.setItem(T.RECORDS_NAME,JSON.stringify(this.records)))}};let F=T;R(F,"VERSION_NAME","version"),R(F,"RECORDS_NAME","records");const A=new F,ge={bills:"++id, comment, categoryId, time",users:"++id, nickname, name, me, connectId, latestTransferTime"};class vt extends ze{constructor(){super("billDatabase");R(this,"bills");R(this,"users");R(this,"afterUpgradeFn");this.version(A.version).stores(this.getStoreSchemas())}async addNewBillTable(t,s){var r;if(t==="bills"||t==="users")throw new Error("invalid table name");if(!A.has(t)){A.add(t),await this.upgradeBills(),await((r=this.tables.find(l=>l.name===t))==null?void 0:r.bulkAdd(s));return}const n=this.tables.find(l=>l.name===t);await(n==null?void 0:n.clear()),await(n==null?void 0:n.bulkAdd(s))}async deleteBillTable(t){if(t==="bills"||t==="users")throw new Error("invalid table name");A.has(t)&&(A.delete(t),await this.upgradeBills({[t]:null}))}getOtherBillDbs(){return[...this.tables.filter(t=>A.has(t.name))]}getStoreSchemas(){return{...ge,...Object.fromEntries(A.records.map(t=>[t,ge.bills]))}}async upgradeBills(t){var n;const s=this.verno+1;this.close(),await new Promise(r=>setTimeout(r,500)),this.version(s).stores({...this.getStoreSchemas(),...t}).upgrade(()=>{}),await this.open(),(n=this.afterUpgradeFn)==null||n.call(this),A.version=this.verno}afterUpgrade(t){this.afterUpgradeFn=t}}const p=new vt,gt=(e,o)=>{const t=_(o),s=_(1);return{result:D({get:()=>t.value,set:async n=>{s.value=0;try{const r=await e(n);t.value=r}catch{s.value=2}}}),status:s,directlyChange:n=>{t.value=n}}},ht=()=>({id:oe(),name:"Me",me:!0,connectId:"",latestTransferTime:-1}),{result:Z,directlyChange:he}=gt(async e=>(await p.users.put({...e},e.id),e),{name:"",id:"",me:!1,connectId:"",latestTransferTime:-1});let K=!1;const Le=async()=>{const e=await p.users.toArray();if(e.length===0&&!K){K=!0;const o=ht();return await p.users.add({...o,me:!0}),K=!1,he(o),e}return he(e.find(o=>o.me)),e};Le();const re=_([]);Ee(async()=>await Le()).subscribe(e=>{re.value=e});const _t=e=>p.users.update(Z.value.id,{...Z.value,...e}),yt=async(e,o)=>{const t=await p.users.get(e);return p.users.update(e,{...t,...o})},bt=e=>{var o;return p.users.add({...e,id:(o=e.id)!=null?o:oe(),me:!1})},wt=async e=>{await p.users.delete(e),await p.deleteBillTable(e)},Ae=()=>({userInfo:Z,allUsers:re,setMyInfo:_t,updateUserInfo:yt,addUserInfo:bt,removeUserInfo:wt}),xo=e=>re.value.find(o=>o.id===e),xt="*",Et="image/png,image/jpeg,image/gif,image/webp",Eo="file/json",It=({accept:e,multiple:o})=>{const t=document.createElement("input");return t.type="file",t.accept=e!=null?e:xt,t.multiple=o!=null?o:!1,new Promise((s,n)=>{t.addEventListener("change",()=>{if(t.files===null){n();return}s(Array.from(t.files))}),t.addEventListener("error",n),t.click()})},Ct=(e,o)=>{let t=[],s=e.map((a,m)=>({index:m,count:0}));const n=()=>{s=s.filter(a=>a.count<e[a.index].length)},r=a=>{let m=a[0],S=[a[0].index];a.forEach((y,C)=>{m.val<y.val?(m=y,S=[y.index]):m.val==y.val&&C!=0&&S.push(y.index)}),S.forEach(y=>{const C=y;s.forEach(d=>{d.index==C&&d.count++})}),n(),t.push(m.raw)};n();let l=[];for(;s.length>1;)l=s.map((a,m)=>({index:a.index,val:e[a.index][a.count][o],raw:e[a.index][a.count]})),r(l);if(!s[0])return t;const c=e[s[0].index].slice(s[0].count);return t=t.concat(c),t},Io=(...e)=>{const o=new Map;return[...new Set(e.map(t=>[...t.keys()]).flat())].forEach(t=>{o.set(t,e.reduce((s,n)=>{var r;return((r=n.get(t))!=null?r:0)+s},0))}),o},{userInfo:Lt}=Ae(),Co=e=>p.deleteBillTable(e),At=e=>p.bills.add({...e,id:oe(),creatorId:Lt.value.id}),Ot=async e=>{await p.bills.delete(e)},kt=async(e,o)=>{const t=await p.bills.get(e);if(t)return p.bills.put({...t,...o},e)},Oe=_([]),ke=()=>Ee(async()=>{const e=await p.bills.orderBy("time").reverse().toArray(),o=p.getOtherBillDbs(),t=[e,...await Promise.all(o.map(s=>s.orderBy("time").reverse().toArray()))];return Ct(t,"time")}).subscribe({next:e=>{Oe.value=e},error:e=>{}});let _e=ke();p.afterUpgrade(()=>{_e.unsubscribe(),_e=ke()});const Lo=()=>({list:Oe}),Bt=(e,o)=>o===void 0?!0:[u.Expenses,u.Income].includes(e.type),Mt=(e,o,t)=>{const s=ne.unix(e.time);return o?t?s.isAfter(o)&&s.isBefore(t):s.isAfter(o):t?s.isBefore(t):!0},Rt=(e,o=-1/0,t=1/0)=>e.money<=t&&e.money>=o,Tt=(e,o)=>o.some(t=>e.creatorId===t),St=(e,o)=>o.some(t=>e.categoryId===t),Pt=(e,o)=>o?Boolean(e.comment.includes(o)):!0,Ao=(e,o)=>Bt(e,o.type)&&Tt(e,o.users)&&St(e,o.categories)&&Rt(e,o.min,o.max)&&Mt(e,o.start,o.end)&&Pt(e,o.comment),v=_(),q=_("add"),Ut=(e="add",o,t)=>{v.value=o,q.value=e,t==null||t.push("/edit")},Oo=()=>{v.value=void 0,q.value="add"},ko=e=>{var y,C,d,b,x,L,j,N,le,ae,ce;const o=_(u.Expenses),t=_(),s=D(()=>Ce.filter(M=>M.type===o.value)),n=_(s.value[0].id),r=_(""),l=_("");Se(()=>{n.value=s.value[0].id});const c=_(),a=async()=>{const[M]=await It({accept:Et,multiple:!1}),V=URL.createObjectURL(M);c.value&&URL.revokeObjectURL(c.value.url),c.value={url:V,file:M}};if(q.value==="edit"&&(o.value=(C=(y=v.value)==null?void 0:y.type)!=null?C:o.value,t.value=(x=(d=v.value)!=null&&d.time?ne.unix((b=v.value)==null?void 0:b.time):void 0)!=null?x:t.value,n.value=(j=(L=v.value)==null?void 0:L.categoryId)!=null?j:n.value,r.value=((N=v.value)==null?void 0:N.money)!==void 0?v.value.money:r.value,l.value=(ae=(le=v.value)==null?void 0:le.comment)!=null?ae:l.value,(ce=v.value)!=null&&ce.image)){const M=v.value.image instanceof Blob?URL.createObjectURL(v.value.image):URL.createObjectURL(new Blob([v.value.image]));c.value={file:v.value.image,url:M}}const m=()=>{e.back()};return{time:t,type:o,categories:s,cateId:n,comment:l,result:r,image:c,onConfirm:async()=>{var ue,de;const V=(()=>{var me;return{type:o.value,time:t.value.unix(),categoryId:n.value,money:Number(r.value),comment:l.value,image:(me=c.value)==null?void 0:me.file}})();if(V.money<0){Ze({type:z.Error,content:"money can not be negative"});return}if(q.value==="add"){await At(V),m();return}q.value==="edit"&&(ue=v.value)!=null&&ue.id&&(await kt((de=v.value)==null?void 0:de.id,V),m())},goBack:m,chooseImage:a}},Dt="modulepreload",$t=function(e){return"/"+e},ye={},w=function(o,t,s){return!t||t.length===0?o():Promise.all(t.map(n=>{if(n=$t(n),n in ye)return;ye[n]=!0;const r=n.endsWith(".css"),l=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${l}`))return;const c=document.createElement("link");if(c.rel=r?"stylesheet":Dt,r||(c.as="script",c.crossOrigin=""),c.href=n,document.head.appendChild(c),r)return new Promise((a,m)=>{c.addEventListener("load",a),c.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${n}`)))})})).then(()=>o())},jt=()=>w(()=>import("./zh.98630ed1.js"),[]),Nt=()=>w(()=>import("./en.bec2a875.js"),[]),J=[{name:"zh",fetcher:jt,matcher:e=>e.includes("zh-CN"),label:"\u4E2D\u6587-\u7B80\u4F53"},{name:"en",fetcher:Nt,matcher:e=>!0,label:"English"}],Vt=function(){var o,t;const e=navigator.language?navigator.language:navigator.browserLanguage;return(t=(o=J.find(s=>s.matcher(e)))==null?void 0:o.name)!=null?t:J[0].name},U=qe("lang",Vt()),E=He({locale:U.value,fallbackLocale:"en"}),{t:ie}=E.global,Bo=D({get:()=>{const e=J.find(o=>o.name===U.value);return e?{name:e.label,id:e.name}:void 0},set:e=>{!e||(U.value=e==null?void 0:e.id)}}),Mo=async e=>{if(E){const o=J.find(t=>t.name===e);if(o){if(E.global.availableLocales.includes(e)){E.global.locale=e;return}const{default:t}=await o.fetcher();E.global.setLocaleMessage(e,t),E.global.locale=e,document.title=ie("APP_NAME")}}},Ft=async()=>{const e=J.find(t=>t.name===U.value),{default:o}=await e.fetcher();return E.global.setLocaleMessage(U.value,o),E.global.locale=U.value,document.title=ie("APP_NAME"),E},zt={key:0,class:"min-h-[300px] p-4 flex flex-col w-full h-full"},qt={class:"flex-1 flex flex-col"},Ht={class:"flex items-center justify-between"},Jt={class:"flex items-center"},Wt={class:"rounded-full bg-white border p-4"},Yt={class:"flex text-md font-semibold mx-2"},Gt=i("div",{class:"w-full border border-dashed my-2"},null,-1),Kt={class:"text-gray-500"},Qt={class:"flex justify-between items-center my-1"},Zt={class:"flex-1 overflow-x-auto text-right"},Xt={class:"flex justify-between items-center my-1"},eo={class:"flex justify-between items-center my-1"},to={key:0,class:"flex-1 py-2 flex items-center justify-center"},oo=["src"],no={class:"footer flex justify-between items-center"},so={class:"flex"},ro={class:"flex"},io=$({__name:"BillInfo",props:{controller:null},emits:["delete","edit"],setup(e,{emit:o}){const t=e,s=d=>ne.unix(d).format("YYYY-MM-DD HH:mm"),n=D(()=>{var d,b;return(d=t.controller.info)!=null&&d.categoryId?pt((b=t.controller.info)==null?void 0:b.categoryId):void 0}),{allUsers:r,userInfo:l}=Ae(),c=D(()=>{var d,b;return(b=(d=r.value.find(x=>{var L;return x.id===((L=t.controller.info)==null?void 0:L.creatorId)}))==null?void 0:d.name)!=null?b:"unknown user"}),a=()=>{t.controller.set("visible",!1)},m=async()=>{t.controller.info&&(await ut({title:ie("are-you-sure-to-delete-this-bill")}),Ot(t.controller.info.id),o("delete",t.controller.info.id)),a()},S=xe(),y=()=>{t.controller.info&&(Ut("edit",t.controller.info,S),o("edit",t.controller.info)),a()},C=d=>URL.createObjectURL(new Blob([d]));return(d,b)=>(f(),k(Ie,{visible:e.controller.visible,"close-on-modal":"","custom-class":"bill-info-dialog","onUpdate:visible":b[0]||(b[0]=x=>e.controller.set("visible",x))},{default:B(()=>{var x,L,j,N;return[e.controller.info?(f(),I("div",zt,[i("div",qt,[i("div",Ht,[i("div",Jt,[i("div",Wt,[i("i",{class:H(["icon-md",[(x=h(n))==null?void 0:x.icon]])},null,2)]),i("div",Yt,[i("div",null,g(d.$t((L=h(n))==null?void 0:L.name)),1)])]),i("div",{class:H(["text-2xl font-bold flex overflow-x-auto",{"text-red-700":e.controller.info.type===h(u).Expenses,"text-green-900":e.controller.info.type===h(u).Income}])},[i("div",null,g(e.controller.info.type===h(u).Expenses?"-":"+"),1),i("div",null,g(e.controller.info.money),1)],2)]),Gt,i("div",Kt,[i("div",Qt,[i("div",null,g(d.$t("comment"))+":",1),i("div",Zt,g(e.controller.info.comment),1)]),i("div",Xt,[i("div",null,g(d.$t("creator"))+":",1),i("div",null,g(h(c)),1)]),i("div",eo,[i("div",null,g(d.$t("time"))+":",1),i("div",null,g(s(e.controller.info.time)),1)])]),e.controller.info.image?(f(),I("div",to,[i("img",{src:C(e.controller.info.image),alt:"",class:"max-h-200px object-contain rounded"},null,8,oo)])):P("",!0)]),i("div",no,[i("div",so,[((j=t.controller.info)==null?void 0:j.creatorId)===h(l).id?(f(),I("div",{key:0,class:"buttoned px-2 rounded-md text-red-600",onClick:m},g(d.$t("delete")),1)):P("",!0)]),i("div",ro,[i("div",{class:"buttoned px-2 rounded-md",onClick:a},g(d.$t("cancel")),1),((N=t.controller.info)==null?void 0:N.creatorId)===h(l).id?(f(),I("div",{key:0,class:"buttoned ml-2 px-2 rounded-md font-semibold",onClick:y},g(d.$t("edit")),1)):P("",!0)])])])):P("",!0)]}),_:1},8,["visible"]))}});const Y=Pe({info:void 0,visible:!1,set:(e,o)=>{e==="visible"&&(Y.visible=o)}}),lo=e=>{Y.info=e,Y.visible=!0},ao=()=>({show:lo,controller:Y}),co=$({__name:"App",setup(e){const o=_(),t=(r,l)=>l.meta.popup?o.value:(o.value=r,r),s=(r,l)=>{if(l.meta.popup)return r},{controller:n}=ao();return(r,l)=>{const c=Ue("router-view");return f(),I(we,null,[O(c,null,{default:B(({Component:a,route:m})=>[O(Q,{name:"fade"},{default:B(()=>[(f(),k(fe(t(a,m))))]),_:2},1024),(f(),k(te,{to:"body"},[O(Q,{name:"popup-slide",duration:300},{default:B(()=>[s(a,m)?(f(),k(Ge,De($e({key:0},m.meta.popupOption)),{default:B(()=>[(f(),k(fe(s(a,m))))]),_:2},1040)):P("",!0)]),_:2},1024)]))]),_:1}),O(io,{controller:h(n)},null,8,["controller"]),O(h(et)),O(at,{controller:h(dt)},null,8,["controller"])],64)}}});const uo=Ve({history:Fe(),routes:[{path:"/",redirect:"/home"},{path:"/home",component:()=>w(()=>import("./MainLayout.53689a3f.js"),["assets/MainLayout.53689a3f.js","assets/MainLayout.7921e0ff.css","assets/@vue.e6301bd2.js","assets/vue-router.f815959e.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/@vueuse.ec86b252.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"]),children:[{path:"/home",name:"home",component:()=>w(()=>import("./HomeView.f02a43bf.js"),["assets/HomeView.f02a43bf.js","assets/HomeView.fb1a94f4.css","assets/BillItem.vue_vue_type_script_setup_true_lang.292c2df4.js","assets/lodash-es.4471eccc.js","assets/@vue.e6301bd2.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/mathjs.71232648.js","assets/decimal.js.f8235747.js","assets/typed-function.0cf4a37b.js","assets/@babel.9ebe5c4e.js","assets/fraction.js.f0253b53.js","assets/vue-router.f815959e.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/@vueuse.ec86b252.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"])},{path:"/stat",name:"stat",component:()=>w(()=>import("./StatView.e1e867f3.js"),["assets/StatView.e1e867f3.js","assets/StatView.3bb16019.css","assets/vue-router.f815959e.js","assets/@vue.e6301bd2.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/DateTime.vue_vue_type_script_setup_true_lang.fec6fc5e.js","assets/@vueuse.ec86b252.js","assets/echarts.f6f9045b.js","assets/zrender.271abeed.js","assets/Select.vue_vue_type_style_index_0_lang.1841d2ea.js","assets/Select.d775a559.css","assets/useLimitSelect.044ffa37.js","assets/mathjs.71232648.js","assets/decimal.js.f8235747.js","assets/typed-function.0cf4a37b.js","assets/@babel.9ebe5c4e.js","assets/fraction.js.f0253b53.js","assets/lodash-es.4471eccc.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"])},{path:"/search",name:"search",component:()=>w(()=>import("./SearchView.b88b2cde.js"),["assets/SearchView.b88b2cde.js","assets/SearchView.66ae00b8.css","assets/@vue.e6301bd2.js","assets/vue-router.f815959e.js","assets/Select.vue_vue_type_style_index_0_lang.1841d2ea.js","assets/Select.d775a559.css","assets/DateTime.vue_vue_type_script_setup_true_lang.fec6fc5e.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/useLimitSelect.044ffa37.js","assets/BillItem.vue_vue_type_script_setup_true_lang.292c2df4.js","assets/lodash-es.4471eccc.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/@vueuse.ec86b252.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"])}]},{path:"/edit",name:"edit",component:()=>w(()=>import("./EditorView.462c0c21.js"),["assets/EditorView.462c0c21.js","assets/EditorView.39843164.css","assets/vue-router.f815959e.js","assets/@vue.e6301bd2.js","assets/DateTime.vue_vue_type_script_setup_true_lang.fec6fc5e.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/@vueuse.ec86b252.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"]),meta:{popup:!0},beforeEnter:(e,o)=>o.fullPath==="/"?"/home":!0},{path:"/settings",component:()=>w(()=>import("./SettingsView.8977427b.js"),["assets/SettingsView.8977427b.js","assets/SettingsView.3b1321de.css","assets/vue-router.f815959e.js","assets/@vue.e6301bd2.js"]),children:[{path:"/settings",name:"settings",component:()=>w(()=>import("./SettingsList.8c446322.js"),["assets/SettingsList.8c446322.js","assets/SettingsList.6b7f8e3c.css","assets/UserAvatar.f5bb0c7a.js","assets/UserAvatar.e16389e3.css","assets/@vue.e6301bd2.js","assets/Select.vue_vue_type_style_index_0_lang.1841d2ea.js","assets/Select.d775a559.css","assets/vue-router.f815959e.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/@vueuse.ec86b252.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"]),meta:{popupTitle:"settings"}},{path:"/settings/sync",name:"sync",component:()=>w(()=>import("./DataSync.54552f58.js"),["assets/DataSync.54552f58.js","assets/DataSync.be79f3ae.css","assets/@vue.e6301bd2.js","assets/cancelablePromise.8984d70f.js","assets/peerjs.faff7497.js","assets/peerjs-js-binarypack.edcf3dbb.js","assets/webrtc-adapter.37c3a6f1.js","assets/rtcpeerconnection-shim.1d74cdf3.js","assets/sdp.c10b5003.js","assets/UserAvatar.f5bb0c7a.js","assets/UserAvatar.e16389e3.css","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/vue-router.f815959e.js","assets/dexie.a92c4e2b.js","assets/uuid.fbc3d34b.js","assets/@vueuse.ec86b252.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"]),meta:{popupTitle:"share-and-sync"}},{path:"/settings/backup",name:"backup",component:()=>w(()=>import("./BackupView.6806ed02.js"),["assets/BackupView.6806ed02.js","assets/cancelablePromise.8984d70f.js","assets/@vueuse.ec86b252.js","assets/@vue.e6301bd2.js","assets/dayjs.386643b6.js","assets/complex.js.3b936b7b.js","assets/dexie-export-import.af7d5a11.js","assets/dexie.a92c4e2b.js","assets/vue-router.f815959e.js","assets/uuid.fbc3d34b.js","assets/vue-i18n.ac4c776b.js","assets/@intlify.cff06da3.js"]),meta:{popupTitle:"backup"}}],meta:{popup:!0,popupOption:{closeOnModal:!0}},beforeEnter:(e,o)=>o.fullPath==="/"?"/home":!0}]});const X=je(co);X.use(uo);Ft().then(e=>{X.use(e),X.mount("#app")});export{u as B,mt as E,Eo as F,z as M,se as _,ao as a,xo as b,Bo as c,Ae as d,Ce as e,Ke as f,pt as g,Ao as h,Mt as i,ko as j,Oo as k,J as l,Io as m,Ie as n,ut as o,p,Ze as q,Co as r,Mo as s,ie as t,Lo as u,It as v};
