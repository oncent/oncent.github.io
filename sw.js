if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,r)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let u={};const t=s=>l(s,n),a={module:{uri:n},exports:u,require:t};e[n]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(r(...s),u)))}}define(["./workbox-3ea082d2"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/@babel.9ebe5c4e.js",revision:null},{url:"assets/@intlify.cff06da3.js",revision:null},{url:"assets/@vue.97c6951d.js",revision:null},{url:"assets/@vueuse.5aff771e.js",revision:null},{url:"assets/BackupView.7a1d762c.js",revision:null},{url:"assets/BillItem.vue_vue_type_script_setup_true_lang.330db851.js",revision:null},{url:"assets/cancelablePromise.8984d70f.js",revision:null},{url:"assets/complex.js.3b936b7b.js",revision:null},{url:"assets/DataSync.b03906aa.js",revision:null},{url:"assets/DataSync.be79f3ae.css",revision:null},{url:"assets/DateTime.vue_vue_type_script_setup_true_lang.87a1d40e.js",revision:null},{url:"assets/dayjs.386643b6.js",revision:null},{url:"assets/decimal.js.f8235747.js",revision:null},{url:"assets/dexie-export-import.af7d5a11.js",revision:null},{url:"assets/dexie.a92c4e2b.js",revision:null},{url:"assets/echarts.f6f9045b.js",revision:null},{url:"assets/EditorView.39843164.css",revision:null},{url:"assets/EditorView.fc39011c.js",revision:null},{url:"assets/en.bec2a875.js",revision:null},{url:"assets/escape-latex.ac077838.js",revision:null},{url:"assets/fraction.js.f0253b53.js",revision:null},{url:"assets/HomeView.c94ddb2d.js",revision:null},{url:"assets/HomeView.fb1a94f4.css",revision:null},{url:"assets/index.4395237f.css",revision:null},{url:"assets/index.f6ac297b.js",revision:null},{url:"assets/javascript-natural-sort.63008348.js",revision:null},{url:"assets/lodash-es.4471eccc.js",revision:null},{url:"assets/MainLayout.7921e0ff.css",revision:null},{url:"assets/MainLayout.8e71298a.js",revision:null},{url:"assets/mathjs.71232648.js",revision:null},{url:"assets/peerjs-js-binarypack.edcf3dbb.js",revision:null},{url:"assets/peerjs.faff7497.js",revision:null},{url:"assets/rtcpeerconnection-shim.1d74cdf3.js",revision:null},{url:"assets/sdp.c10b5003.js",revision:null},{url:"assets/SearchView.3803b13d.js",revision:null},{url:"assets/SearchView.7f90e29e.css",revision:null},{url:"assets/seedrandom.eecf9378.js",revision:null},{url:"assets/Select.d775a559.css",revision:null},{url:"assets/Select.vue_vue_type_style_index_0_lang.3e7f384b.js",revision:null},{url:"assets/SettingsList.3540d161.js",revision:null},{url:"assets/SettingsList.6b7f8e3c.css",revision:null},{url:"assets/SettingsView.3b1321de.css",revision:null},{url:"assets/SettingsView.55437aa4.js",revision:null},{url:"assets/StatView.3bb16019.css",revision:null},{url:"assets/StatView.5a5f92a3.js",revision:null},{url:"assets/tiny-emitter.dad6a63e.js",revision:null},{url:"assets/typed-function.0cf4a37b.js",revision:null},{url:"assets/useLimitSelect.9f8388a4.js",revision:null},{url:"assets/UserAvatar.686c9f7c.js",revision:null},{url:"assets/UserAvatar.e16389e3.css",revision:null},{url:"assets/uuid.fbc3d34b.js",revision:null},{url:"assets/vue-demi.b17ab05a.js",revision:null},{url:"assets/vue-i18n.ac1798c5.js",revision:null},{url:"assets/vue-router.f889bb8d.js",revision:null},{url:"assets/vue.f8638657.js",revision:null},{url:"assets/webrtc-adapter.37c3a6f1.js",revision:null},{url:"assets/zh.98630ed1.js",revision:null},{url:"assets/zrender.271abeed.js",revision:null},{url:"index.html",revision:"e1e798d727e15675f6e9508d122d75e2"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"38d06ebd8fa9d40b04808747f11aa125"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
