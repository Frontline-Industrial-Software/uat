import{bp as p,r as a,aq as g,D as m,F as V,a8 as v,M as l,N as y,as as _,a9 as h,ab as x,H as o,bN as C,bO as k,af as z,a$ as n}from"./index-e159460d.js";const q={__name:"next",props:["title","disabled","style"],emits:["clicked"],setup(r,{emit:u}){const e=r,s=p();let t=a(!1);function c(){t.value=!1}let i=a(!1);function d(){i.value=!1}function b(){if(e.disabled){if(s.loginAndauthRequired!==!1)if(s.loginStatus===!0){if(s.isVip.auth!==!0){n({showClose:!0,message:"File size exceeded, requires permission authorization. Please contact us.",type:"error",duration:1e4}),i.value=!0;return}}else{n({showClose:!0,message:"File size exceeded, please log in to obtain authorization.",type:"error",duration:1e4}),t.value=!0;return}u("clicked")}}return(N,F)=>{const f=g("v-btn");return m(),V(z,null,[v("div",{onClick:b,style:{display:"flex","justify-content":"end"}},[l(f,{disabled:!e.disabled,color:"rgb(64, 170, 151)",style:x(e.style)},{default:y(()=>[_(h(e.title),1)]),_:1},8,["disabled","style"])]),l(C,{onClose:c,dialogVisible:o(t)},null,8,["dialogVisible"]),l(k,{onClose:d,dialogVisible:o(i)},null,8,["dialogVisible"])],64)}}};export{q as _};