if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const d=e=>a(e,t),r={module:{uri:t},exports:i,require:d};s[t]=Promise.all(n.map((e=>r[e]||d(e)))).then((e=>(c(...e),i)))}}define(["./workbox-7c2a5a06"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"0a2fb885fde5e0a3b0b086e9f2b7e29d"},{url:"/_next/static/bjApCyR_K3d0lzaOhdcLp/_buildManifest.js",revision:"a5aa63c841cba2619f9a7f27fac105ec"},{url:"/_next/static/bjApCyR_K3d0lzaOhdcLp/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1418c200-ef880c14d50debb6.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/204-bd11b67c9f5d641f.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/2443530c-11c3539a30942c05.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/488-36683b4d69178678.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/4a89e91e-108740745f31c02d.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/594-e404c5a35c4d8687.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/841-01c3e9a453f1721b.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/865-80cdf3ee7c54b31d.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/9-df019d4bbc03b4c5.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/about/page-224c85596f9a8702.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/baidu/%5B...path%5D/page-2650c67263fc9be9.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/baidu/page-2d90c0e33c835aed.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/layout-24292fd68e6c6885.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/onedrive/%5B...path%5D/page-b6eae35c04dc9143.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/onedrive/page-c4bf26e0bce6b150.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/app/page-47357bb742d9fa69.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/main-4c505c75e8d73021.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/main-app-9757cde9e869bbb2.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/pages/_app-b555d5e1eab47959.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/pages/_error-d79168f986538ac0.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-22318ccd9f86ad34.js",revision:"bjApCyR_K3d0lzaOhdcLp"},{url:"/_next/static/css/42665b9fca2e5869.css",revision:"42665b9fca2e5869"},{url:"/baidu_pan.svg",revision:"f50a85d316adbbffcaf458b3fb0b2b5c"},{url:"/logo.svg",revision:"067b798e803ed979db57d3be3b1609e0"},{url:"/manifest.json",revision:"c4adf72bae76e9e309a2566928d387d1"},{url:"/onedrive.jpg",revision:"1899b0a3fc4c0c7ef696b74e329bccaa"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
