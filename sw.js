if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),a={module:{uri:n},exports:u,require:t};e[n]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3ea082d2"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/@intlify.03657722.js",revision:null},{url:"assets/@vue.aa17ec7c.js",revision:null},{url:"assets/@vueuse.9aab9800.js",revision:null},{url:"assets/BillItem.vue_vue_type_script_setup_true_lang.060510e3.js",revision:null},{url:"assets/DataSync.be79f3ae.css",revision:null},{url:"assets/DataSync.f5e2a579.js",revision:null},{url:"assets/DateTime.vue_vue_type_script_setup_true_lang.5226095e.js",revision:null},{url:"assets/dayjs.8eec1a0d.js",revision:null},{url:"assets/dexie.a92c4e2b.js",revision:null},{url:"assets/echarts.f6f9045b.js",revision:null},{url:"assets/EditorView.741f197b.js",revision:null},{url:"assets/EditorView.a6726be3.css",revision:null},{url:"assets/en.afee2a88.js",revision:null},{url:"assets/HomeView.2b46e98c.css",revision:null},{url:"assets/HomeView.a7de0fee.js",revision:null},{url:"assets/index.913fa80a.js",revision:null},{url:"assets/index.f646b91d.css",revision:null},{url:"assets/lodash-es.94cbcf30.js",revision:null},{url:"assets/MainLayout.7921e0ff.css",revision:null},{url:"assets/MainLayout.c275dea1.js",revision:null},{url:"assets/peerjs-js-binarypack.edcf3dbb.js",revision:null},{url:"assets/peerjs.faff7497.js",revision:null},{url:"assets/rtcpeerconnection-shim.1d74cdf3.js",revision:null},{url:"assets/sdp.c10b5003.js",revision:null},{url:"assets/SearchView.48027c83.css",revision:null},{url:"assets/SearchView.8fa6d834.js",revision:null},{url:"assets/Select.c9f10c3d.css",revision:null},{url:"assets/Select.vue_vue_type_style_index_0_lang.d60b6c2c.js",revision:null},{url:"assets/SettingsList.8d390cee.js",revision:null},{url:"assets/SettingsView.3b1321de.css",revision:null},{url:"assets/SettingsView.4acbf918.js",revision:null},{url:"assets/StatView.55d22b68.js",revision:null},{url:"assets/StatView.c00165d1.css",revision:null},{url:"assets/UserAvatar.573138ae.js",revision:null},{url:"assets/UserAvatar.e16389e3.css",revision:null},{url:"assets/uuid.fbc3d34b.js",revision:null},{url:"assets/vue-demi.b17ab05a.js",revision:null},{url:"assets/vue-i18n.bcf46dc7.js",revision:null},{url:"assets/vue-router.835b731e.js",revision:null},{url:"assets/vue.f8638657.js",revision:null},{url:"assets/webrtc-adapter.37c3a6f1.js",revision:null},{url:"assets/zh.7ad87b05.js",revision:null},{url:"assets/zrender.271abeed.js",revision:null},{url:"index.html",revision:"2ef5ca801ab27ee94e97788da83aea64"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"38d06ebd8fa9d40b04808747f11aa125"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
