(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["app"],{0:function(e,r,n){e.exports=n("2f39")},"2f39":function(e,r,n){"use strict";n.r(r);var t=n("967e"),a=n.n(t),o=(n("a481"),n("96cf"),n("5c7d"),n("7d6e"),n("e54f"),n("0ca9"),n("5b0d"),n("2b0e")),u=n("8686"),c=n("b05d");o["a"].use(c["a"],{config:{},iconSet:u["a"]});var s=function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},i=[],p={name:"App"},f=p,l=n("2877"),d=Object(l["a"])(f,s,i,!1,null,null,null),b=d.exports,w=n("2f62");o["a"].use(w["a"]);var v=function(){var e=new w["a"].Store({modules:{},strict:!1});return e},h=n("8c4f"),x=[{path:"/",component:function(){return n.e("2d0b2c5d").then(n.bind(null,"2614"))}},{path:"*",component:function(){return n.e("2d0c8fe7").then(n.bind(null,"56f6"))}}],k=x;o["a"].use(h["a"]);var m=function(){var e=new h["a"]({scrollBehavior:function(){return{x:0,y:0}},routes:k,mode:"history",base:"/"});return e},g=function(){var e="function"===typeof v?v({Vue:o["a"]}):v,r="function"===typeof m?m({Vue:o["a"],store:e}):m;e.$router=r;var n={el:"#q-app",router:r,store:e,render:function(e){return e(b)}};return{app:n,store:e,router:r}},y=n("a925"),A={failed:"Action failed",success:"Action was successful"},L={"en-us":A};o["a"].use(y["a"]);var V,$,q=new y["a"]({locale:"en-us",fallbackLocale:"en-us",messages:L}),B=function(e){var r=e.app;r.i18n=q},J=n("bc3a"),R=n.n(J);$="/api/v1",V=v().getters.isAuth?R.a.create({baseURL:$,headers:{Authorization:"Bearer ".concat(v().getters.getAuthToken)}}):R.a.create({baseURL:$}),o["a"].prototype.$axios=V;var S=g(),U=S.app,_=S.store,j=S.router;function z(){var e,r,n,t,u;return a.a.async((function(c){while(1)switch(c.prev=c.next){case 0:e=!0,r=function(r){e=!1,window.location.href=r},n=window.location.href.replace(window.location.origin,""),t=[B,void 0],u=0;case 5:if(!(!0===e&&u<t.length)){c.next=23;break}if("function"===typeof t[u]){c.next=8;break}return c.abrupt("continue",20);case 8:return c.prev=8,c.next=11,a.a.awrap(t[u]({app:U,router:j,store:_,Vue:o["a"],ssrContext:null,redirect:r,urlPath:n}));case 11:c.next=20;break;case 13:if(c.prev=13,c.t0=c["catch"](8),!c.t0||!c.t0.url){c.next=18;break}return window.location.href=c.t0.url,c.abrupt("return");case 18:return console.error("[Quasar] boot error:",c.t0),c.abrupt("return");case 20:u++,c.next=5;break;case 23:if(!1!==e){c.next=25;break}return c.abrupt("return");case 25:new o["a"](U);case 26:case"end":return c.stop()}}),null,null,[[8,13]])}z()},"5b0d":function(e,r,n){}},[[0,"runtime","vendor"]]]);