const o="promise canceled",b=e=>{let s=()=>{},c=()=>{};const t=n=>{c=n};return{start:(...n)=>{const a=e(t,...n),i=new Promise((C,r)=>{s=r});return Promise.race([a,i])},cancel:()=>{s(new Error(o)),c()}}},d=e=>(e==null?void 0:e.message)===o;export{b as c,d as i};
