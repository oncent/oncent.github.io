const a=Math.cosh||function(t){return Math.abs(t)<1e-9?1-t:(Math.exp(t)+Math.exp(-t))*.5},u=Math.sinh||function(t){return Math.abs(t)<1e-9?t:(Math.exp(t)-Math.exp(-t))*.5},N=function(t){const i=Math.PI/4;if(-i>t||t>i)return Math.cos(t)-1;const n=t*t;return n*(n*(n*(n*(n*(n*(n*(n/20922789888e3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-1/2)},w=function(t,i){return t=Math.abs(t),i=Math.abs(i),t<i&&([t,i]=[i,t]),t<1e8?Math.sqrt(t*t+i*i):(i/=t,t*Math.sqrt(1+i*i))},M=function(){throw SyntaxError("Invalid Param")};function I(t,i){const n=Math.abs(t),e=Math.abs(i);return t===0?Math.log(e):i===0?Math.log(n):n<3e3&&e<3e3?Math.log(t*t+i*i)*.5:(t=t*.5,i=i*.5,.5*Math.log(t*t+i*i)+Math.LN2)}const l={re:0,im:0},m=function(t,i){const n=l;if(t==null)n.re=n.im=0;else if(i!==void 0)n.re=t,n.im=i;else switch(typeof t){case"object":if("im"in t&&"re"in t)n.re=t.re,n.im=t.im;else if("abs"in t&&"arg"in t){if(!isFinite(t.abs)&&isFinite(t.arg))return s.INFINITY;n.re=t.abs*Math.cos(t.arg),n.im=t.abs*Math.sin(t.arg)}else if("r"in t&&"phi"in t){if(!isFinite(t.r)&&isFinite(t.phi))return s.INFINITY;n.re=t.r*Math.cos(t.phi),n.im=t.r*Math.sin(t.phi)}else t.length===2?(n.re=t[0],n.im=t[1]):M();break;case"string":n.im=n.re=0;const e=t.replace(/_/g,"").match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g);let o=1,c=0;e===null&&M();for(let r=0;r<e.length;r++){const h=e[r];h===" "||h==="	"||h===`
`||(h==="+"?o++:h==="-"?c++:h==="i"||h==="I"?(o+c===0&&M(),e[r+1]!==" "&&!isNaN(e[r+1])?(n.im+=parseFloat((c%2?"-":"")+e[r+1]),r++):n.im+=parseFloat((c%2?"-":"")+"1"),o=c=0):((o+c===0||isNaN(h))&&M(),e[r+1]==="i"||e[r+1]==="I"?(n.im+=parseFloat((c%2?"-":"")+h),r++):n.re+=parseFloat((c%2?"-":"")+h),o=c=0))}o+c>0&&M();break;case"number":n.im=0,n.re=t;break;default:M()}return isNaN(n.re)||isNaN(n.im),n};function s(t,i){if(!(this instanceof s))return new s(t,i);const n=m(t,i);this.re=n.re,this.im=n.im}s.prototype={re:0,im:0,sign:function(){const t=w(this.re,this.im);return new s(this.re/t,this.im/t)},add:function(t,i){const n=m(t,i),e=this.isInfinite(),o=!(isFinite(n.re)&&isFinite(n.im));return e||o?e&&o?s.NAN:s.INFINITY:new s(this.re+n.re,this.im+n.im)},sub:function(t,i){const n=m(t,i),e=this.isInfinite(),o=!(isFinite(n.re)&&isFinite(n.im));return e||o?e&&o?s.NAN:s.INFINITY:new s(this.re-n.re,this.im-n.im)},mul:function(t,i){const n=m(t,i),e=this.isInfinite(),o=!(isFinite(n.re)&&isFinite(n.im)),c=this.re===0&&this.im===0,r=n.re===0&&n.im===0;return e&&r||o&&c?s.NAN:e||o?s.INFINITY:n.im===0&&this.im===0?new s(this.re*n.re,0):new s(this.re*n.re-this.im*n.im,this.re*n.im+this.im*n.re)},div:function(t,i){const n=m(t,i),e=this.isInfinite(),o=!(isFinite(n.re)&&isFinite(n.im)),c=this.re===0&&this.im===0,r=n.re===0&&n.im===0;if(c&&r||e&&o)return s.NAN;if(r||e)return s.INFINITY;if(c||o)return s.ZERO;if(n.im===0)return new s(this.re/n.re,this.im/n.re);if(Math.abs(n.re)<Math.abs(n.im)){const h=n.re/n.im,f=n.re*h+n.im;return new s((this.re*h+this.im)/f,(this.im*h-this.re)/f)}else{const h=n.im/n.re,f=n.im*h+n.re;return new s((this.re+this.im*h)/f,(this.im-this.re*h)/f)}},pow:function(t,i){const n=m(t,i),e=this.re===0&&this.im===0;if(n.re===0&&n.im===0)return s.ONE;if(n.im===0){if(this.im===0&&this.re>0)return new s(Math.pow(this.re,n.re),0);if(this.re===0)switch((n.re%4+4)%4){case 0:return new s(Math.pow(this.im,n.re),0);case 1:return new s(0,Math.pow(this.im,n.re));case 2:return new s(-Math.pow(this.im,n.re),0);case 3:return new s(0,-Math.pow(this.im,n.re))}}if(e&&n.re>0)return s.ZERO;const c=Math.atan2(this.im,this.re),r=I(this.re,this.im);let h=Math.exp(n.re*r-n.im*c),f=n.im*r+n.re*c;return new s(h*Math.cos(f),h*Math.sin(f))},sqrt:function(){const t=this.re,i=this.im;if(i===0)return t>=0?new s(Math.sqrt(t),0):new s(0,Math.sqrt(-t));const n=w(t,i);let e=Math.sqrt(.5*(n+Math.abs(t))),o=Math.abs(i)/(2*e);return t>=0?new s(e,i<0?-o:o):new s(o,i<0?-e:e)},exp:function(){const t=Math.exp(this.re);return this.im===0?new s(t,0):new s(t*Math.cos(this.im),t*Math.sin(this.im))},expm1:function(){const t=this.re,i=this.im;return new s(Math.expm1(t)*Math.cos(i)+N(i),Math.exp(t)*Math.sin(i))},log:function(){const t=this.re,i=this.im;return i===0&&t>0?new s(Math.log(t),0):new s(I(t,i),Math.atan2(i,t))},abs:function(){return w(this.re,this.im)},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){const t=this.re,i=this.im;return new s(Math.sin(t)*a(i),Math.cos(t)*u(i))},cos:function(){const t=this.re,i=this.im;return new s(Math.cos(t)*a(i),-Math.sin(t)*u(i))},tan:function(){const t=2*this.re,i=2*this.im,n=Math.cos(t)+a(i);return new s(Math.sin(t)/n,u(i)/n)},cot:function(){const t=2*this.re,i=2*this.im,n=Math.cos(t)-a(i);return new s(-Math.sin(t)/n,u(i)/n)},sec:function(){const t=this.re,i=this.im,n=.5*a(2*i)+.5*Math.cos(2*t);return new s(Math.cos(t)*a(i)/n,Math.sin(t)*u(i)/n)},csc:function(){const t=this.re,i=this.im,n=.5*a(2*i)-.5*Math.cos(2*t);return new s(Math.sin(t)*a(i)/n,-Math.cos(t)*u(i)/n)},asin:function(){const t=this.re,i=this.im,n=new s(i*i-t*t+1,-2*t*i).sqrt(),e=new s(n.re-i,n.im+t).log();return new s(e.im,-e.re)},acos:function(){const t=this.re,i=this.im,n=new s(i*i-t*t+1,-2*t*i).sqrt(),e=new s(n.re-i,n.im+t).log();return new s(Math.PI/2-e.im,e.re)},atan:function(){const t=this.re,i=this.im;if(t===0){if(i===1)return new s(0,1/0);if(i===-1)return new s(0,-1/0)}const n=t*t+(1-i)*(1-i),e=new s((1-i*i-t*t)/n,-2*t/n).log();return new s(-.5*e.im,.5*e.re)},acot:function(){const t=this.re,i=this.im;if(i===0)return new s(Math.atan2(1,t),0);const n=t*t+i*i;return n!==0?new s(t/n,-i/n).atan():new s(t!==0?t/0:0,i!==0?-i/0:0).atan()},asec:function(){const t=this.re,i=this.im;if(t===0&&i===0)return new s(0,1/0);const n=t*t+i*i;return n!==0?new s(t/n,-i/n).acos():new s(t!==0?t/0:0,i!==0?-i/0:0).acos()},acsc:function(){const t=this.re,i=this.im;if(t===0&&i===0)return new s(Math.PI/2,1/0);const n=t*t+i*i;return n!==0?new s(t/n,-i/n).asin():new s(t!==0?t/0:0,i!==0?-i/0:0).asin()},sinh:function(){const t=this.re,i=this.im;return new s(u(t)*Math.cos(i),a(t)*Math.sin(i))},cosh:function(){const t=this.re,i=this.im;return new s(a(t)*Math.cos(i),u(t)*Math.sin(i))},tanh:function(){const t=2*this.re,i=2*this.im,n=a(t)+Math.cos(i);return new s(u(t)/n,Math.sin(i)/n)},coth:function(){const t=2*this.re,i=2*this.im,n=a(t)-Math.cos(i);return new s(u(t)/n,-Math.sin(i)/n)},csch:function(){const t=this.re,i=this.im,n=Math.cos(2*i)-a(2*t);return new s(-2*u(t)*Math.cos(i)/n,2*a(t)*Math.sin(i)/n)},sech:function(){const t=this.re,i=this.im,n=Math.cos(2*i)+a(2*t);return new s(2*a(t)*Math.cos(i)/n,-2*u(t)*Math.sin(i)/n)},asinh:function(){let t=this.im;this.im=-this.re,this.re=t;const i=this.asin();return this.re=-this.im,this.im=t,t=i.re,i.re=-i.im,i.im=t,i},acosh:function(){const t=this.acos();if(t.im<=0){const i=t.re;t.re=-t.im,t.im=i}else{const i=t.im;t.im=-t.re,t.re=i}return t},atanh:function(){const t=this.re,i=this.im,n=t>1&&i===0,e=1-t,o=1+t,c=e*e+i*i,r=c!==0?new s((o*e-i*i)/c,(i*e+o*i)/c):new s(t!==-1?t/0:0,i!==0?i/0:0),h=r.re;return r.re=I(r.re,r.im)/2,r.im=Math.atan2(r.im,h)/2,n&&(r.im=-r.im),r},acoth:function(){const t=this.re,i=this.im;if(t===0&&i===0)return new s(0,Math.PI/2);const n=t*t+i*i;return n!==0?new s(t/n,-i/n).atanh():new s(t!==0?t/0:0,i!==0?-i/0:0).atanh()},acsch:function(){const t=this.re,i=this.im;if(i===0)return new s(t!==0?Math.log(t+Math.sqrt(t*t+1)):1/0,0);const n=t*t+i*i;return n!==0?new s(t/n,-i/n).asinh():new s(t!==0?t/0:0,i!==0?-i/0:0).asinh()},asech:function(){const t=this.re,i=this.im;if(this.isZero())return s.INFINITY;const n=t*t+i*i;return n!==0?new s(t/n,-i/n).acosh():new s(t!==0?t/0:0,i!==0?-i/0:0).acosh()},inverse:function(){if(this.isZero())return s.INFINITY;if(this.isInfinite())return s.ZERO;const t=this.re,i=this.im,n=t*t+i*i;return new s(t/n,-i/n)},conjugate:function(){return new s(this.re,-this.im)},neg:function(){return new s(-this.re,-this.im)},ceil:function(t){return t=Math.pow(10,t||0),new s(Math.ceil(this.re*t)/t,Math.ceil(this.im*t)/t)},floor:function(t){return t=Math.pow(10,t||0),new s(Math.floor(this.re*t)/t,Math.floor(this.im*t)/t)},round:function(t){return t=Math.pow(10,t||0),new s(Math.round(this.re*t)/t,Math.round(this.im*t)/t)},equals:function(t,i){const n=m(t,i);return Math.abs(n.re-this.re)<=s.EPSILON&&Math.abs(n.im-this.im)<=s.EPSILON},clone:function(){return new s(this.re,this.im)},toString:function(){let t=this.re,i=this.im,n="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(t)<s.EPSILON&&(t=0),Math.abs(i)<s.EPSILON&&(i=0),i===0?n+t:(t!==0?(n+=t,n+=" ",i<0?(i=-i,n+="-"):n+="+",n+=" "):i<0&&(i=-i,n+="-"),i!==1&&(n+=i),n+"i"))},toVector:function(){return[this.re,this.im]},valueOf:function(){return this.im===0?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return this.im===0&&this.re===0},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!this.isFinite()}};s.ZERO=new s(0,0);s.ONE=new s(1,0);s.I=new s(0,1);s.PI=new s(Math.PI,0);s.E=new s(Math.E,0);s.INFINITY=new s(1/0,1/0);s.NAN=new s(NaN,NaN);s.EPSILON=1e-15;export{s as C};
