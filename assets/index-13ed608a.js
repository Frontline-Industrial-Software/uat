import{aN as me,m as C,aO as Ge,aP as pt,aB as Ee,aQ as ft,ab as mt,aR as Ie,aw as Je,N as vt,u as pe,aS as yt,aT as Le,a8 as ae,aU as ht,aV as bt,aW as gt,aX as wt,P as ge,T as A,aq as He,j as Ce,ao as Ct,k as ie,aY as De,ap as fe,v as _e,l as se,aZ as St,aa as Qe,az as xt,aA as _t,at as $t,R as kt,a4 as $e,a_ as It,a$ as Dt,b0 as Et,O as Tt,b1 as zt,ax as oe,a9 as Ue,ad as Ft,au as et,b2 as tt,x,y as O,F,U as re,z as T,A as e,D as Z,B as c,G as K,H as N,I as ce,J as le,af as we,Y as Q,o as Mt,X as At,E as S,C as Te,_ as ze,a5 as Ye,K as at,b3 as ke,b4 as Rt,Q as Bt,a3 as We,b5 as Ot,b6 as Pt,b7 as Vt,ar as Nt,b8 as Lt,ay as je,b9 as Ht,ba as Ut,bb as Ke,bc as Ze,ac as Yt,bd as Wt,ae as jt,be as Kt,bf as Zt,ak as Xt,ag as qt,al as Gt,aG as Jt,am as Qt,an as ea,ai as he,V as Xe,aM as ta,aj as aa}from"./index-abf77186.js";import{e as oa,c as sa}from"./index-11e546f7.js";import"./ecStat-ad0c0394.js";import{m as na}from"./index-03431cb1.js";import{V as la}from"./index.min-a070bfb1.js";const ia=()=>me&&/firefox/i.test(window.navigator.userAgent);let be;const ra=t=>{var s;if(!me)return 0;if(be!==void 0)return be;const n=document.createElement("div");n.className=`${t}-scrollbar__wrap`,n.style.visibility="hidden",n.style.width="100px",n.style.position="absolute",n.style.top="-9999px",document.body.appendChild(n);const a=n.offsetWidth;n.style.overflow="scroll";const r=document.createElement("div");r.style.width="100%",n.appendChild(r);const u=r.offsetWidth;return(s=n.parentNode)==null||s.removeChild(n),be=a-u,be},ua=t=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(t),da=["class","style"],ca=/^on[A-Z]/,pa=(t={})=>{const{excludeListeners:s=!1,excludeKeys:n}=t,a=C(()=>((n==null?void 0:n.value)||[]).concat(da)),r=Ge();return r?C(()=>{var u;return pt(Object.entries((u=r.proxy)==null?void 0:u.$attrs).filter(([f])=>!a.value.includes(f)&&!(s&&ca.test(f))))}):C(()=>({}))},fa=(t,s,n)=>{let a={offsetX:0,offsetY:0};const r=h=>{const p=h.clientX,_=h.clientY,{offsetX:w,offsetY:d}=a,v=t.value.getBoundingClientRect(),E=v.left,$=v.top,m=v.width,ee=v.height,P=document.documentElement.clientWidth,R=document.documentElement.clientHeight,W=-E+w,X=-$+d,H=P-E-m+w,Y=R-$-ee+d,G=L=>{const g=Math.min(Math.max(w+L.clientX-p,W),H),M=Math.min(Math.max(d+L.clientY-_,X),Y);a={offsetX:g,offsetY:M},t.value.style.transform=`translate(${Ie(g)}, ${Ie(M)})`},z=()=>{document.removeEventListener("mousemove",G),document.removeEventListener("mouseup",z)};document.addEventListener("mousemove",G),document.addEventListener("mouseup",z)},u=()=>{s.value&&t.value&&s.value.addEventListener("mousedown",r)},f=()=>{s.value&&t.value&&s.value.removeEventListener("mousedown",r)};Ee(()=>{ft(()=>{n.value?u():f()})}),mt(()=>{f()})},ma=(t,s={})=>{Je(t)||vt("[useLockscreen]","You need to pass a ref param to this function");const n=s.ns||pe("popup"),a=yt(()=>n.bm("parent","hidden"));if(!me||Le(document.body,a.value))return;let r=0,u=!1,f="0";const h=()=>{setTimeout(()=>{wt(document==null?void 0:document.body,a.value),u&&document&&(document.body.style.width=f)},200)};ae(t,p=>{if(!p){h();return}u=!Le(document.body,a.value),u&&(f=document.body.style.width),r=ra(n.namespace.value);const _=document.documentElement.clientHeight<document.body.scrollHeight,w=ht(document.body,"overflowY");r>0&&(_||w==="scroll")&&u&&(document.body.style.width=`calc(100% - ${r}px)`),bt(document.body,a.value)}),gt(()=>h())},ot=t=>{if(!t)return{onClick:ge,onMousedown:ge,onMouseup:ge};let s=!1,n=!1;return{onClick:f=>{s&&n&&t(f),s=n=!1},onMousedown:f=>{s=f.target===f.currentTarget},onMouseup:f=>{n=f.target===f.currentTarget}}};function va(t){const s=A();function n(){if(t.value==null)return;const{selectionStart:r,selectionEnd:u,value:f}=t.value;if(r==null||u==null)return;const h=f.slice(0,Math.max(0,r)),p=f.slice(Math.max(0,u));s.value={selectionStart:r,selectionEnd:u,value:f,beforeTxt:h,afterTxt:p}}function a(){if(t.value==null||s.value==null)return;const{value:r}=t.value,{beforeTxt:u,afterTxt:f,selectionStart:h}=s.value;if(u==null||f==null||h==null)return;let p=r.length;if(r.endsWith(f))p=r.length-f.length;else if(r.startsWith(u))p=u.length;else{const _=u[h-1],w=r.indexOf(_,h-1);w!==-1&&(p=w+1)}t.value.setSelectionRange(p,p)}return[n,a]}let J;const ya=`
  height:0 !important;
  visibility:hidden !important;
  ${ia()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,ha=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function ba(t){const s=window.getComputedStyle(t),n=s.getPropertyValue("box-sizing"),a=Number.parseFloat(s.getPropertyValue("padding-bottom"))+Number.parseFloat(s.getPropertyValue("padding-top")),r=Number.parseFloat(s.getPropertyValue("border-bottom-width"))+Number.parseFloat(s.getPropertyValue("border-top-width"));return{contextStyle:ha.map(f=>`${f}:${s.getPropertyValue(f)}`).join(";"),paddingSize:a,borderSize:r,boxSizing:n}}function qe(t,s=1,n){var a;J||(J=document.createElement("textarea"),document.body.appendChild(J));const{paddingSize:r,borderSize:u,boxSizing:f,contextStyle:h}=ba(t);J.setAttribute("style",`${h};${ya}`),J.value=t.value||t.placeholder||"";let p=J.scrollHeight;const _={};f==="border-box"?p=p+u:f==="content-box"&&(p=p-r),J.value="";const w=J.scrollHeight-r;if(He(s)){let d=w*s;f==="border-box"&&(d=d+r+u),p=Math.max(d,p),_.minHeight=`${d}px`}if(He(n)){let d=w*n;f==="border-box"&&(d=d+r+u),p=Math.min(d,p)}return _.height=`${p}px`,(a=J.parentNode)==null||a.removeChild(J),J=void 0,_}const ga=Ce({id:{type:String,default:void 0},size:Ct,disabled:Boolean,modelValue:{type:ie([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:ie([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:De},prefixIcon:{type:De},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:ie([Object,Array,String]),default:()=>na({})}}),wa={[fe]:t=>_e(t),input:t=>_e(t),change:t=>_e(t),focus:t=>t instanceof FocusEvent,blur:t=>t instanceof FocusEvent,clear:()=>!0,mouseleave:t=>t instanceof MouseEvent,mouseenter:t=>t instanceof MouseEvent,keydown:t=>t instanceof Event,compositionstart:t=>t instanceof CompositionEvent,compositionupdate:t=>t instanceof CompositionEvent,compositionend:t=>t instanceof CompositionEvent},Ca=["role"],Sa=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],xa=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],_a=se({name:"ElInput",inheritAttrs:!1}),$a=se({..._a,props:ga,emits:wa,setup(t,{expose:s,emit:n}){const a=t,r=St(),u=Qe(),f=C(()=>{const o={};return a.containerRole==="combobox"&&(o["aria-haspopup"]=r["aria-haspopup"],o["aria-owns"]=r["aria-owns"],o["aria-expanded"]=r["aria-expanded"]),o}),h=C(()=>[a.type==="textarea"?ee.b():m.b(),m.m(E.value),m.is("disabled",$.value),m.is("exceed",U.value),{[m.b("group")]:u.prepend||u.append,[m.bm("group","append")]:u.append,[m.bm("group","prepend")]:u.prepend,[m.m("prefix")]:u.prefix||a.prefixIcon,[m.m("suffix")]:u.suffix||a.suffixIcon||a.clearable||a.showPassword,[m.bm("suffix","password-clear")]:V.value&&y.value},r.class]),p=C(()=>[m.e("wrapper"),m.is("focus",W.value)]),_=pa({excludeKeys:C(()=>Object.keys(f.value))}),{form:w,formItem:d}=xt(),{inputId:v}=_t(a,{formItemContext:d}),E=$t(),$=kt(),m=pe("input"),ee=pe("textarea"),P=$e(),R=$e(),W=A(!1),X=A(!1),H=A(!1),Y=A(!1),G=A(),z=$e(a.inputStyle),L=C(()=>P.value||R.value),g=C(()=>{var o;return(o=w==null?void 0:w.statusIcon)!=null?o:!1}),M=C(()=>(d==null?void 0:d.validateState)||""),q=C(()=>M.value&&It[M.value]),i=C(()=>Y.value?Dt:Et),l=C(()=>[r.style,a.inputStyle]),b=C(()=>[a.inputStyle,z.value,{resize:a.resize}]),I=C(()=>Tt(a.modelValue)?"":String(a.modelValue)),V=C(()=>a.clearable&&!$.value&&!a.readonly&&!!I.value&&(W.value||X.value)),y=C(()=>a.showPassword&&!$.value&&!a.readonly&&!!I.value&&(!!I.value||W.value)),k=C(()=>a.showWordLimit&&!!_.value.maxlength&&(a.type==="text"||a.type==="textarea")&&!$.value&&!a.readonly&&!a.showPassword),B=C(()=>I.value.length),U=C(()=>!!k.value&&B.value>Number(_.value.maxlength)),j=C(()=>!!u.suffix||!!a.suffixIcon||V.value||a.showPassword||k.value||!!M.value&&g.value),[ne,Se]=va(P);zt(R,o=>{if(lt(),!k.value||a.resize!=="both")return;const D=o[0],{width:te}=D.contentRect;G.value={right:`calc(100% - ${te+15+6}px)`}});const ue=()=>{const{type:o,autosize:D}=a;if(!(!me||o!=="textarea"||!R.value))if(D){const te=Ye(D)?D.minRows:void 0,ye=Ye(D)?D.maxRows:void 0,Ne=qe(R.value,te,ye);z.value={overflowY:"hidden",...Ne},oe(()=>{R.value.offsetHeight,z.value=Ne})}else z.value={minHeight:qe(R.value).minHeight}},lt=(o=>{let D=!1;return()=>{var te;if(D||!a.autosize)return;((te=R.value)==null?void 0:te.offsetParent)===null||(o(),D=!0)}})(ue),de=()=>{const o=L.value,D=a.formatter?a.formatter(I.value):I.value;!o||o.value===D||(o.value=D)},xe=async o=>{ne();let{value:D}=o.target;if(a.formatter&&(D=a.parser?a.parser(D):D),!H.value){if(D===I.value){de();return}n(fe,D),n("input",D),await oe(),de(),Se()}},Fe=o=>{n("change",o.target.value)},Me=o=>{n("compositionstart",o),H.value=!0},Ae=o=>{var D;n("compositionupdate",o);const te=(D=o.target)==null?void 0:D.value,ye=te[te.length-1]||"";H.value=!ua(ye)},Re=o=>{n("compositionend",o),H.value&&(H.value=!1,xe(o))},it=()=>{Y.value=!Y.value,ve()},ve=async()=>{var o;await oe(),(o=L.value)==null||o.focus()},rt=()=>{var o;return(o=L.value)==null?void 0:o.blur()},Be=o=>{W.value=!0,n("focus",o)},Oe=o=>{var D;W.value=!1,n("blur",o),a.validateEvent&&((D=d==null?void 0:d.validate)==null||D.call(d,"blur").catch(te=>Ue()))},ut=o=>{X.value=!1,n("mouseleave",o)},dt=o=>{X.value=!0,n("mouseenter",o)},Pe=o=>{n("keydown",o)},ct=()=>{var o;(o=L.value)==null||o.select()},Ve=()=>{n(fe,""),n("change",""),n("clear"),n("input","")};return ae(()=>a.modelValue,()=>{var o;oe(()=>ue()),a.validateEvent&&((o=d==null?void 0:d.validate)==null||o.call(d,"change").catch(D=>Ue()))}),ae(I,()=>de()),ae(()=>a.type,async()=>{await oe(),de(),ue()}),Ee(()=>{!a.formatter&&a.parser,de(),oe(ue)}),s({input:P,textarea:R,ref:L,textareaStyle:b,autosize:Ft(a,"autosize"),focus:ve,blur:rt,select:ct,clear:Ve,resizeTextarea:ue}),(o,D)=>et((x(),O("div",we(e(f),{class:e(h),style:e(l),role:o.containerRole,onMouseenter:dt,onMouseleave:ut}),[F(" input "),o.type!=="textarea"?(x(),O(re,{key:0},[F(" prepend slot "),o.$slots.prepend?(x(),O("div",{key:0,class:T(e(m).be("group","prepend"))},[Z(o.$slots,"prepend")],2)):F("v-if",!0),c("div",{class:T(e(p))},[F(" prefix slot "),o.$slots.prefix||o.prefixIcon?(x(),O("span",{key:0,class:T(e(m).e("prefix"))},[c("span",{class:T(e(m).e("prefix-inner")),onClick:ve},[Z(o.$slots,"prefix"),o.prefixIcon?(x(),K(e(le),{key:0,class:T(e(m).e("icon"))},{default:N(()=>[(x(),K(ce(o.prefixIcon)))]),_:1},8,["class"])):F("v-if",!0)],2)],2)):F("v-if",!0),c("input",we({id:e(v),ref_key:"input",ref:P,class:e(m).e("inner")},e(_),{type:o.showPassword?Y.value?"text":"password":o.type,disabled:e($),formatter:o.formatter,parser:o.parser,readonly:o.readonly,autocomplete:o.autocomplete,tabindex:o.tabindex,"aria-label":o.label,placeholder:o.placeholder,style:o.inputStyle,form:a.form,onCompositionstart:Me,onCompositionupdate:Ae,onCompositionend:Re,onInput:xe,onFocus:Be,onBlur:Oe,onChange:Fe,onKeydown:Pe}),null,16,Sa),F(" suffix slot "),e(j)?(x(),O("span",{key:1,class:T(e(m).e("suffix"))},[c("span",{class:T(e(m).e("suffix-inner")),onClick:ve},[!e(V)||!e(y)||!e(k)?(x(),O(re,{key:0},[Z(o.$slots,"suffix"),o.suffixIcon?(x(),K(e(le),{key:0,class:T(e(m).e("icon"))},{default:N(()=>[(x(),K(ce(o.suffixIcon)))]),_:1},8,["class"])):F("v-if",!0)],64)):F("v-if",!0),e(V)?(x(),K(e(le),{key:1,class:T([e(m).e("icon"),e(m).e("clear")]),onMousedown:At(e(ge),["prevent"]),onClick:Ve},{default:N(()=>[Q(e(Mt))]),_:1},8,["class","onMousedown"])):F("v-if",!0),e(y)?(x(),K(e(le),{key:2,class:T([e(m).e("icon"),e(m).e("password")]),onClick:it},{default:N(()=>[(x(),K(ce(e(i))))]),_:1},8,["class"])):F("v-if",!0),e(k)?(x(),O("span",{key:3,class:T(e(m).e("count"))},[c("span",{class:T(e(m).e("count-inner"))},S(e(B))+" / "+S(e(_).maxlength),3)],2)):F("v-if",!0),e(M)&&e(q)&&e(g)?(x(),K(e(le),{key:4,class:T([e(m).e("icon"),e(m).e("validateIcon"),e(m).is("loading",e(M)==="validating")])},{default:N(()=>[(x(),K(ce(e(q))))]),_:1},8,["class"])):F("v-if",!0)],2)],2)):F("v-if",!0)],2),F(" append slot "),o.$slots.append?(x(),O("div",{key:1,class:T(e(m).be("group","append"))},[Z(o.$slots,"append")],2)):F("v-if",!0)],64)):(x(),O(re,{key:1},[F(" textarea "),c("textarea",we({id:e(v),ref_key:"textarea",ref:R,class:e(ee).e("inner")},e(_),{tabindex:o.tabindex,disabled:e($),readonly:o.readonly,autocomplete:o.autocomplete,style:e(b),"aria-label":o.label,placeholder:o.placeholder,form:a.form,onCompositionstart:Me,onCompositionupdate:Ae,onCompositionend:Re,onInput:xe,onFocus:Be,onBlur:Oe,onChange:Fe,onKeydown:Pe}),null,16,xa),e(k)?(x(),O("span",{key:0,style:Te(G.value),class:T(e(m).e("count"))},S(e(B))+" / "+S(e(_).maxlength),7)):F("v-if",!0)],64))],16,Ca)),[[tt,o.type!=="hidden"]])}});var ka=ze($a,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const Ia=at(ka),Da=Ce({mask:{type:Boolean,default:!0},customMaskEvent:{type:Boolean,default:!1},overlayClass:{type:ie([String,Array,Object])},zIndex:{type:ie([String,Number])}}),Ea={click:t=>t instanceof MouseEvent},Ta="overlay";var za=se({name:"ElOverlay",props:Da,emits:Ea,setup(t,{slots:s,emit:n}){const a=pe(Ta),r=p=>{n("click",p)},{onClick:u,onMousedown:f,onMouseup:h}=ot(t.customMaskEvent?void 0:r);return()=>t.mask?Q("div",{class:[a.b(),t.overlayClass],style:{zIndex:t.zIndex},onClick:u,onMousedown:f,onMouseup:h},[Z(s,"default")],ke.STYLE|ke.CLASS|ke.PROPS,["onClick","onMouseup","onMousedown"]):Rt("div",{class:t.overlayClass,style:{zIndex:t.zIndex,position:"fixed",top:"0px",right:"0px",bottom:"0px",left:"0px"}},[Z(s,"default")])}});const Fa=za,st=Symbol("dialogInjectionKey"),nt=Ce({center:{type:Boolean,default:!1},alignCenter:{type:Boolean,default:!1},closeIcon:{type:De},customClass:{type:String,default:""},draggable:{type:Boolean,default:!1},fullscreen:{type:Boolean,default:!1},showClose:{type:Boolean,default:!0},title:{type:String,default:""}}),Ma={close:()=>!0},Aa=["aria-label"],Ra=["id"],Ba=se({name:"ElDialogContent"}),Oa=se({...Ba,props:nt,emits:Ma,setup(t){const s=t,{t:n}=Bt(),{Close:a}=Pt,{dialogRef:r,headerRef:u,bodyId:f,ns:h,style:p}=We(st),{focusTrapRef:_}=We(Ot),w=Vt(_,r),d=C(()=>s.draggable);return fa(r,u,d),(v,E)=>(x(),O("div",{ref:e(w),class:T([e(h).b(),e(h).is("fullscreen",v.fullscreen),e(h).is("draggable",e(d)),e(h).is("align-center",v.alignCenter),{[e(h).m("center")]:v.center},v.customClass]),style:Te(e(p)),tabindex:"-1"},[c("header",{ref_key:"headerRef",ref:u,class:T(e(h).e("header"))},[Z(v.$slots,"header",{},()=>[c("span",{role:"heading",class:T(e(h).e("title"))},S(v.title),3)]),v.showClose?(x(),O("button",{key:0,"aria-label":e(n)("el.dialog.close"),class:T(e(h).e("headerbtn")),type:"button",onClick:E[0]||(E[0]=$=>v.$emit("close"))},[Q(e(le),{class:T(e(h).e("close"))},{default:N(()=>[(x(),K(ce(v.closeIcon||e(a))))]),_:1},8,["class"])],10,Aa)):F("v-if",!0)],2),c("div",{id:e(f),class:T(e(h).e("body"))},[Z(v.$slots,"default")],10,Ra),v.$slots.footer?(x(),O("footer",{key:0,class:T(e(h).e("footer"))},[Z(v.$slots,"footer")],2)):F("v-if",!0)],6))}});var Pa=ze(Oa,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog-content.vue"]]);const Va=Ce({...nt,appendToBody:{type:Boolean,default:!1},beforeClose:{type:ie(Function)},destroyOnClose:{type:Boolean,default:!1},closeOnClickModal:{type:Boolean,default:!0},closeOnPressEscape:{type:Boolean,default:!0},lockScroll:{type:Boolean,default:!0},modal:{type:Boolean,default:!0},openDelay:{type:Number,default:0},closeDelay:{type:Number,default:0},top:{type:String},modelValue:{type:Boolean,default:!1},modalClass:String,width:{type:[String,Number]},zIndex:{type:Number},trapFocus:{type:Boolean,default:!1}}),Na={open:()=>!0,opened:()=>!0,close:()=>!0,closed:()=>!0,[fe]:t=>Nt(t),openAutoFocus:()=>!0,closeAutoFocus:()=>!0},La=(t,s)=>{const a=Ge().emit,{nextZIndex:r}=Lt();let u="";const f=je(),h=je(),p=A(!1),_=A(!1),w=A(!1),d=A(t.zIndex||r());let v,E;const $=Ht("namespace",Ut),m=C(()=>{const l={},b=`--${$.value}-dialog`;return t.fullscreen||(t.top&&(l[`${b}-margin-top`]=t.top),t.width&&(l[`${b}-width`]=Ie(t.width))),l}),ee=C(()=>t.alignCenter?{display:"flex"}:{});function P(){a("opened")}function R(){a("closed"),a(fe,!1),t.destroyOnClose&&(w.value=!1)}function W(){a("close")}function X(){E==null||E(),v==null||v(),t.openDelay&&t.openDelay>0?{stop:v}=Ke(()=>z(),t.openDelay):z()}function H(){v==null||v(),E==null||E(),t.closeDelay&&t.closeDelay>0?{stop:E}=Ke(()=>L(),t.closeDelay):L()}function Y(){function l(b){b||(_.value=!0,p.value=!1)}t.beforeClose?t.beforeClose(l):H()}function G(){t.closeOnClickModal&&Y()}function z(){me&&(p.value=!0)}function L(){p.value=!1}function g(){a("openAutoFocus")}function M(){a("closeAutoFocus")}function q(l){var b;((b=l.detail)==null?void 0:b.focusReason)==="pointer"&&l.preventDefault()}t.lockScroll&&ma(p);function i(){t.closeOnPressEscape&&Y()}return ae(()=>t.modelValue,l=>{l?(_.value=!1,X(),w.value=!0,d.value=t.zIndex?d.value++:r(),oe(()=>{a("open"),s.value&&(s.value.scrollTop=0)})):p.value&&H()}),ae(()=>t.fullscreen,l=>{s.value&&(l?(u=s.value.style.transform,s.value.style.transform=""):s.value.style.transform=u)}),Ee(()=>{t.modelValue&&(p.value=!0,w.value=!0,X())}),{afterEnter:P,afterLeave:R,beforeLeave:W,handleClose:Y,onModalClick:G,close:H,doClose:L,onOpenAutoFocus:g,onCloseAutoFocus:M,onCloseRequested:i,onFocusoutPrevented:q,titleId:f,bodyId:h,closed:_,style:m,overlayDialogStyle:ee,rendered:w,visible:p,zIndex:d}},Ha=["aria-label","aria-labelledby","aria-describedby"],Ua=se({name:"ElDialog",inheritAttrs:!1}),Ya=se({...Ua,props:Va,emits:Na,setup(t,{expose:s}){const n=t,a=Qe();Ze({scope:"el-dialog",from:"the title slot",replacement:"the header slot",version:"3.0.0",ref:"https://element-plus.org/en-US/component/dialog.html#slots"},C(()=>!!a.title)),Ze({scope:"el-dialog",from:"custom-class",replacement:"class",version:"2.3.0",ref:"https://element-plus.org/en-US/component/dialog.html#attributes",type:"Attribute"},C(()=>!!n.customClass));const r=pe("dialog"),u=A(),f=A(),h=A(),{visible:p,titleId:_,bodyId:w,style:d,overlayDialogStyle:v,rendered:E,zIndex:$,afterEnter:m,afterLeave:ee,beforeLeave:P,handleClose:R,onModalClick:W,onOpenAutoFocus:X,onCloseAutoFocus:H,onCloseRequested:Y,onFocusoutPrevented:G}=La(n,u);Yt(st,{dialogRef:u,headerRef:f,bodyId:w,ns:r,rendered:E,style:d});const z=ot(W),L=C(()=>n.draggable&&!n.fullscreen);return s({visible:p,dialogContentRef:h}),(g,M)=>(x(),K(Zt,{to:"body",disabled:!g.appendToBody},[Q(Kt,{name:"dialog-fade",onAfterEnter:e(m),onAfterLeave:e(ee),onBeforeLeave:e(P),persisted:""},{default:N(()=>[et(Q(e(Fa),{"custom-mask-event":"",mask:g.modal,"overlay-class":g.modalClass,"z-index":e($)},{default:N(()=>[c("div",{role:"dialog","aria-modal":"true","aria-label":g.title||void 0,"aria-labelledby":g.title?void 0:e(_),"aria-describedby":e(w),class:T(`${e(r).namespace.value}-overlay-dialog`),style:Te(e(v)),onClick:M[0]||(M[0]=(...q)=>e(z).onClick&&e(z).onClick(...q)),onMousedown:M[1]||(M[1]=(...q)=>e(z).onMousedown&&e(z).onMousedown(...q)),onMouseup:M[2]||(M[2]=(...q)=>e(z).onMouseup&&e(z).onMouseup(...q))},[Q(e(Wt),{loop:"",trapped:e(p),"focus-start-el":"container",onFocusAfterTrapped:e(X),onFocusAfterReleased:e(H),onFocusoutPrevented:e(G),onReleaseRequested:e(Y)},{default:N(()=>[e(E)?(x(),K(Pa,we({key:0,ref_key:"dialogContentRef",ref:h},g.$attrs,{"custom-class":g.customClass,center:g.center,"align-center":g.alignCenter,"close-icon":g.closeIcon,draggable:e(L),fullscreen:g.fullscreen,"show-close":g.showClose,title:g.title,onClose:e(R)}),jt({header:N(()=>[g.$slots.title?Z(g.$slots,"title",{key:1}):Z(g.$slots,"header",{key:0,close:e(R),titleId:e(_),titleClass:e(r).e("title")})]),default:N(()=>[Z(g.$slots,"default")]),_:2},[g.$slots.footer?{name:"footer",fn:N(()=>[Z(g.$slots,"footer")])}:void 0]),1040,["custom-class","center","align-center","close-icon","draggable","fullscreen","show-close","title","onClose"])):F("v-if",!0)]),_:3},8,["trapped","onFocusAfterTrapped","onFocusAfterReleased","onFocusoutPrevented","onReleaseRequested"])],46,Ha)]),_:3},8,["mask","overlay-class","z-index"]),[[tt,e(p)]])]),_:3},8,["onAfterEnter","onAfterLeave","onBeforeLeave"])],8,["disabled"]))}});var Wa=ze(Ya,[["__file","/home/runner/work/element-plus/element-plus/packages/components/dialog/src/dialog.vue"]]);const ja=at(Wa);const Ka=c("span",{class:"dialog-footer"},null,-1),Za={__name:"dialog",props:["dialogVisible","data"],emits:["closeDialog"],setup(t,{emit:s}){const n=t;let a=A();async function r(){la.preview(a.value,`

`+p.value)}function u(d){if(!d)return"0.00";var d=Math.round(parseFloat(d)*100)/100,v=d.toString().split(".");if(v.length==1)return d=d.toString()+".00",d;if(v.length>1)return v[1].length<2&&(d=d.toString()+"0"),d}C(()=>n.dialogVisible);function f(w,d=0){let v=`
`;const E=$=>"  ".repeat($);for(const[$,m]of Object.entries(w))typeof m=="object"&&m!==null?(v+=`${E(d)}- **${$}**
`,v+=f(m,d+1)):v+=`${E(d)}- ${$}: ${m}
`;return v}function h(w){return new Date(w).toISOString()}let p=C(()=>{let w=()=>{let v="";for(const E in n.data.resources){const $=n.data.resources[E];v+=`The resource with ID ${$.resourceId} was originally planned to have ${u($.plannedUnits)} units. The initial planned usage rate was ${u($.plannedUnitsPerHour)} units per hour, and it currently remains at ${u($.Units)} units per hour. However, after optimization, the new usage rate is ${u($.newUnitsPerHour)} units per hour, and the new daily usage is ${u($.newUnitsPerDay)} units per day.
`}return v};return`This is a task named '${n.data.name}' categorized as '${n.data.type}', and it is ${n.data.critical==!0?"":"not"} a Critical Task.
   Before optimization,
   it is scheduled to start on ${h(n.data.plannedStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${h(n.data.plannedFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${n.data.remainingDuration} hours. 
  After optimization,
   it is scheduled to start on ${h(n.data.newStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${h(n.data.newFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${n.data.newDuration} hours. 
Resources:
${w()}As of now, the task has not commenced and is labeled as '${n.data.status}.' The task's duration ratio is ${u(n.data.durationRatio)}.`+f(n.data)});const _=()=>{s("closeDialog")};return(w,d)=>{const v=ja;return x(),K(v,{onOpen:r,onClose:_,modelValue:n.dialogVisible,"onUpdate:modelValue":d[0]||(d[0]=E=>n.dialogVisible=E),title:"Detailed content",width:"50%",draggable:""},{footer:N(()=>[Ka]),default:N(()=>[c("span",null,S(e(p).id),1),c("div",{ref_key:"editorRef",ref:a},null,512)]),_:1},8,["modelValue"])}}};const Xa={class:"contain"},qa={class:"box"},Ga={class:"sp"},Ja={class:"step"},Qa={class:"step"},eo={class:"maintop"},to={class:"item"},ao={class:"title"},oo={class:"center"},so={class:"changed"},no={class:"base"},lo={class:"bottom"},io={class:"item"},ro={class:"title"},uo={class:"center"},co={class:"changed"},po={class:"base"},fo={class:"bottom"},mo={class:"item"},vo={class:"title"},yo={class:"center"},ho={class:"changed"},bo={class:"base"},go={class:"bottom"},wo={class:"mainEchar1"},Co={class:"Echar1top"},So=ta('<div class="choosebox" data-v-cbab0a22><div class="choose" data-v-cbab0a22><div style="background-color:#b0e054;" class="item" data-v-cbab0a22></div><div data-v-cbab0a22>Optimized</div></div><div class="choose" data-v-cbab0a22><div style="background-color:#5474c4;" class="item" data-v-cbab0a22></div><div data-v-cbab0a22>Baseline</div></div><div class="choose" data-v-cbab0a22><div style="background-color:red;" class="item" data-v-cbab0a22></div><div data-v-cbab0a22>Critical Path</div></div><div class="choose" data-v-cbab0a22><div style="background-color:pink;" class="item" data-v-cbab0a22></div><div data-v-cbab0a22>Critical Path(baseline)</div></div></div><div id="main" data-v-cbab0a22></div>',2),xo={ref:"main",style:{width:"1150px",height:"610px"},id:"myEcharts"},_o={class:"mainEchar2"},$o={class:"Echar2top"},ko={class:"types"},Io={ref:"main01",style:{width:"1150px",height:"610px"},id:"myEcharts01"},Do={class:"button"},Eo={__name:"index",setup(t){const s=qt(),n=Gt();let a=A(!1),r=A("");const u=()=>{a.value=!1};Jt((i,l,b)=>{i.name=="InputData"&&f(),b()}),Qt(()=>{s.selectChange&&(g.value="",ee(),z(),s.selectChange=!1)});function f(){s.taskData=[],Object.keys(s.dataArray).forEach(i=>{s.dataArray[i].all=[],s.dataArray[i].data=[]}),s.end.data=!1}function h(i,l){return Math.round(i/l*1e4)/100+"%"}function p(i){return new Date(i).toISOString()}function _(i){const l=new Date(i);return`${l.getUTCFullYear()}/${l.getUTCMonth()+1}/${l.getUTCDate()} ${("0"+l.getUTCHours()).slice(-2)}:${("0"+l.getUTCMinutes()).slice(-2)}:${("0"+l.getUTCSeconds()).slice(-2)}`}const w=i=>i===void 0||i.length===0?[]:i.xy.map(l=>{const[b,I]=Object.entries(l)[0];return[p(parseInt(b)),I]});let d=oa,v=A(2),E,$=C(()=>s.selectedData.baselineTasks.filter(l=>l.critical));function m(i){return`<span > ${i} </span>`}function ee(){let i=[],l=s.selectedData.baselineTasks.map((y,k)=>{let B=s.selectedData.tasks.find(U=>U.id===y.id);return i.push(B),k=s.selectedData.baselineTasks.length-k,{name:y.name,value:[k,p(y.newStart),p(y.newFinish),y],itemStyle:{color:y.critical?"pink":void 0}}});i=i.map((y,k)=>(k=i.length-k+.2,{id:y.id,name:y.name,value:[k,p(y.newStart),p(y.newFinish),y],itemStyle:{color:y.critical?"red":void 0}}));let b=d.init(document.getElementById("myEcharts"),"purple-passion");b.on("click",function(y){r.value=y.data.value[3],a.value=!0});var I;let V=(y,k)=>{let B=k.coord([k.value(1),k.value(0)]),U=k.coord([k.value(2),k.value(0)]),j=k.size([0,1])[1]*.5,ne=sa({x:B[0],y:B[1]-j/2,width:Math.max(U[0]-B[0],1),height:j},y.coordSys);return ne&&{type:"rect",shape:ne,style:k.style()}};I={toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"weakFilter",xAxisIndex:[0],labelFormatter:function(y){return _(y)}},{type:"slider",filterMode:"weakFilter",yAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",xAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",yAxisIndex:[0]}],legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",axisLabel:{formatter:function(y,k){return _(y)}}},yAxis:{name:"tasks"},series:[{name:"baseline",type:"custom",data:l,large:!0,renderItem:V,encode:{x:[1,2],y:0}},{name:"new",type:"custom",data:i,large:!0,renderItem:V,encode:{x:[1,2],y:0}}],tooltip:{formatter:y=>{let k="Resources: <br/>";for(const U in y.value[3].resources){let j=y.value[3].resources,ne=s.selectedData.newResources.find(Se=>Se.id===U);k+=` &nbsp&nbspResource &nbsp  ${ne.name} &nbsp id: ${U}  <br/>&nbsp&nbsp&nbsp&nbspunits/hour:${j[U].remainingUnitsPerHour}=> ${R(j[U].newUnitsPerHour)}<br/>`}function B(U){let j;switch(U){case"New":y.value[3].critical?j="red":j="#b0e054";break;case"Old":y.value[3].critical?j="pink":j="#5474c4"}return`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${j};"></span>`}return`${y.name}<br/>
        <div style='margin-top:20px'>
         ${B("New")} New: ${y.value[1].replace("T"," ").replace("Z","").slice(0,16)} -> ${y.value[2].replace("T"," ").replace("Z","").slice(0,16)}
         (${y.value[3].newDuration})
        <br/>
         ${B("Old")} Old: ${m(p(y.value[3].plannedStart).replace("T"," ").replace("Z","").slice(0,16))} -> ${m(p(y.value[3].plannedFinish).replace("T"," ").replace("Z","").slice(0,16))}
       (${m(y.value[3].plannedDuration)})
         <br/>
         ${k}
        </div>`}}},I&&b.setOption(I),E=d.init(document.getElementById("myEcharts01"),"purple-passion")}let P=A("");function R(l){if(!l)return"0.00";var l=Math.round(parseFloat(l)*100)/100,b=l.toString().split(".");if(b.length==1)return l=l.toString()+".00",l;if(b.length>1)return b[1].length<2&&(l=l.toString()+"0"),l}function W(i,l){return i.reduce(function(b,I){let V=I[l];return b[V]||(b[V]=[]),b[V].push(I),b},{})}let X=C(()=>{let i=s.selectedData.baselineResources.map(b=>({id:b.id,name:b.name,type:b.type})),l=W(i,"type");if(P.value){const b=new RegExp(P.value,"i");let I={};for(let V in l)I[V]=l[V].filter(y=>b.test(y.name));return I}else return l}),H=C(()=>{var l;const i=s.selectedData.baselineResources;return g.value?i.filter(I=>I.id&&I.id===g.value)[0].distribution:i.length==0?[]:(g.value=i[0].id,(l=i[0])==null?void 0:l.distribution)}),Y=C(()=>{var l;const i=s.selectedData.newResources;return g.value?i.filter(I=>I.id&&I.id===g.value)[0].distribution:i.length==0?[]:(l=i[0])==null?void 0:l.distribution}),G=C(()=>({toolbox:{feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"none"},{type:"slider",filterMode:"none"},{type:"inside",filterMode:"none"},{type:"inside",filterMode:"none"}],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},animation:!1,legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",axisLabel:{formatter:"{yyyy}-{MM}-{dd}"}},yAxis:{name:"units / day"},series:[{name:"baseline",type:"bar",data:w(H.value),large:!0},{name:"new",type:"bar",data:w(Y.value),large:!0}]}));function z(){E.setOption(G.value)}ae(v,()=>{z()});async function L(){n.push({name:"OptimizedReport"}),s.active=3}let g=A("");function M(){n.push({name:"BaselineSummary"}),s.active=1}function q(i){g.value=i}return ae(g,()=>{z()}),(i,l)=>{const b=Ia,I=ea("v-btn"),V=aa;return x(),O(re,null,[c("div",Xa,[c("div",qa,[c("h2",null,[he(S(i.$t("optimizedSummary.title[0]"))+" ",1),c("span",Ga,S(e(s).SummaryData.group),1),c("div",Ja,[c("span",null,S(e(s).setting.Steps)+" "+S(i.$t("optimizedSummary.title[1]")),1)]),c("div",Qa,[c("span",null,S(`${e(s).setting.Ratio[0]*100}% - ${e(s).setting.Ratio[1]*100}% ${i.$t("optimizedSummary.title[2]")}`),1)])]),c("div",eo,[c("div",to,[c("div",ao,S(i.$t("optimizedSummary.header[0]")),1),c("div",oo,[c("span",so,S(e(s).SummaryData.changedDuration)+"/",1),c("span",no,S(e(s).SummaryData.baseDuration),1)]),c("div",lo,S(h(e(s).SummaryData.changedDuration,e(s).SummaryData.baseDuration)),1)]),c("div",io,[c("div",ro,S(i.$t("optimizedSummary.header[1]")),1),c("div",uo,[c("span",co,S(e(s).SummaryData.changgedTasks)+"/",1),c("span",po,S(e(s).SummaryData.TotalTasks),1)]),c("div",fo,S(h(e(s).SummaryData.changgedTasks,e(s).SummaryData.TotalTasks)),1)]),c("div",mo,[c("div",vo,S(i.$t("optimizedSummary.header[2]")),1),c("div",yo,[c("span",ho,S(e($).length)+"/",1),c("span",bo,S(e(s).selectedData.baselineTasks.length),1)]),c("div",go,S(h(e($).length,e(s).selectedData.baselineTasks.length)),1)])]),c("div",wo,[c("div",Co,[c("div",null,S(i.$t("optimizedSummary.chartName[0]")),1)]),c("span",null,S(i.$t("optimizedSummary.chartName[1]")),1),So,c("div",xo,null,512)]),c("div",_o,[c("div",$o,[c("div",null,S(i.$t("optimizedSummary.chartName[2]")),1)]),c("span",null,S(i.$t("optimizedSummary.chartName[3]")),1),Q(b,{modelValue:e(P),"onUpdate:modelValue":l[0]||(l[0]=y=>Je(P)?P.value=y:P=y),placeholder:"Search Resources"},null,8,["modelValue"]),(x(!0),O(re,null,Xe(e(X),(y,k)=>(x(),O("div",null,[c("div",null,S(k),1),c("div",ko,[(x(!0),O(re,null,Xe(y,(B,U)=>(x(),O("div",{key:U,class:"type"},[Q(I,{variant:"text",value:U,class:T({activeType:e(g)==B.id}),onClick:()=>{q(B.id)}},{default:N(()=>[he(S(B.name)+" "+S(B.type),1)]),_:2},1032,["value","class","onClick"])]))),128))])]))),256)),c("div",Io,null,512)]),c("div",Do,[Q(V,{onClick:M,class:"btnback"},{default:N(()=>[he(S(i.$t("optimizedSummary.btn[0]")),1)]),_:1}),Q(V,{onClick:L,class:"btngo"},{default:N(()=>[he(S(i.$t("optimizedSummary.btn[1]")),1)]),_:1})])])]),Q(Za,{onCloseDialog:u,data:e(r),dialogVisible:e(a)},null,8,["data","dialogVisible"])],64)}}},Bo=Xt(Eo,[["__scopeId","data-v-cbab0a22"]]);export{Bo as default};
