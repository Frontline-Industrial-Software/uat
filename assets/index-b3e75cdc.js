import{c as f,al as Ue,am as Xe,r as M,a6 as Ce,b as Ye,a5 as he,m as pe,d as ve,an as Ee,e as Fe,ao as Ze,Q as qe,f as De,M as fe,ap as Ge,aq as Qe,ar as Je,P as G,ab as j,a1 as Pe,U as et,a9 as tt,as as at,o as h,n as E,x as S,F as Q,p as I,u as t,t as ie,q as n,y as O,z as L,A as le,E as Z,W as me,H as q,h as st,G as ot,N as nt,v as w,s as it,_ as lt,O as Ae,B as rt,$ as dt,X as ut,a0 as ct,ag as pt,a2 as vt,Z as re,a as ft,C as Re,ak as mt,a3 as ht,a4 as yt}from"./index-979567ae.js";import{E as bt}from"./el-button-4740fd87.js";import{e as gt,c as xt}from"./index-66d2cb58.js";import"./ecStat-4ea877ad.js";import{b as _t,e as wt,f as St,c as It,u as kt}from"./index-1b326afd.js";import{a as Ve,m as Ct,i as Et,b as Dt}from"./typescript-aa082a44.js";import{d as ze}from"./error-78e43d3e.js";const At=()=>Ve&&/firefox/i.test(window.navigator.userAgent),Rt=o=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(o),zt=["class","style"],Tt=/^on[A-Z]/,Ft=(o={})=>{const{excludeListeners:s=!1,excludeKeys:r}=o,a=f(()=>((r==null?void 0:r.value)||[]).concat(zt)),d=Xe();return d?f(()=>{var v;return Ue(Object.entries((v=d.proxy)==null?void 0:v.$attrs).filter(([m])=>!a.value.includes(m)&&!(s&&Tt.test(m))))}):f(()=>({}))};function Pt(o){const s=M();function r(){if(o.value==null)return;const{selectionStart:d,selectionEnd:v,value:m}=o.value;if(d==null||v==null)return;const A=m.slice(0,Math.max(0,d)),y=m.slice(Math.max(0,v));s.value={selectionStart:d,selectionEnd:v,value:m,beforeTxt:A,afterTxt:y}}function a(){if(o.value==null||s.value==null)return;const{value:d}=o.value,{beforeTxt:v,afterTxt:m,selectionStart:A}=s.value;if(v==null||m==null||A==null)return;let y=d.length;if(d.endsWith(m))y=d.length-m.length;else if(d.startsWith(v))y=v.length;else{const D=v[A-1],k=d.indexOf(D,A-1);k!==-1&&(y=k+1)}o.value.setSelectionRange(y,y)}return[r,a]}let P;const Vt=`
  height:0 !important;
  visibility:hidden !important;
  ${At()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,Mt=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function Ot(o){const s=window.getComputedStyle(o),r=s.getPropertyValue("box-sizing"),a=Number.parseFloat(s.getPropertyValue("padding-bottom"))+Number.parseFloat(s.getPropertyValue("padding-top")),d=Number.parseFloat(s.getPropertyValue("border-bottom-width"))+Number.parseFloat(s.getPropertyValue("border-top-width"));return{contextStyle:Mt.map(m=>`${m}:${s.getPropertyValue(m)}`).join(";"),paddingSize:a,borderSize:d,boxSizing:r}}function Te(o,s=1,r){var a;P||(P=document.createElement("textarea"),document.body.appendChild(P));const{paddingSize:d,borderSize:v,boxSizing:m,contextStyle:A}=Ot(o);P.setAttribute("style",`${A};${Vt}`),P.value=o.value||o.placeholder||"";let y=P.scrollHeight;const D={};m==="border-box"?y=y+v:m==="content-box"&&(y=y-d),P.value="";const k=P.scrollHeight-d;if(Ce(s)){let x=k*s;m==="border-box"&&(x=x+d+v),y=Math.max(x,y),D.minHeight=`${x}px`}if(Ce(r)){let x=k*r;m==="border-box"&&(x=x+d+v),y=Math.min(x,y)}return D.height=`${y}px`,(a=P.parentNode)==null||a.removeChild(P),P=void 0,D}const Bt=Ye({id:{type:String,default:void 0},size:_t,disabled:Boolean,modelValue:{type:ve([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:ve([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:Ee},prefixIcon:{type:Ee},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:ve([Object,Array,String]),default:()=>Ct({})}}),Nt={[he]:o=>pe(o),input:o=>pe(o),change:o=>pe(o),focus:o=>o instanceof FocusEvent,blur:o=>o instanceof FocusEvent,clear:()=>!0,mouseleave:o=>o instanceof MouseEvent,mouseenter:o=>o instanceof MouseEvent,keydown:o=>o instanceof Event,compositionstart:o=>o instanceof CompositionEvent,compositionupdate:o=>o instanceof CompositionEvent,compositionend:o=>o instanceof CompositionEvent},$t=["role"],Lt=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],Ht=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],Kt=Fe({name:"ElInput",inheritAttrs:!1}),jt=Fe({...Kt,props:Bt,emits:Nt,setup(o,{expose:s,emit:r}){const a=o,d=Ze(),v=qe(),m=f(()=>{const e={};return a.containerRole==="combobox"&&(e["aria-haspopup"]=d["aria-haspopup"],e["aria-owns"]=d["aria-owns"],e["aria-expanded"]=d["aria-expanded"]),e}),A=f(()=>[a.type==="textarea"?ae.b():i.b(),i.m(te.value),i.is("disabled",B.value),i.is("exceed",Me.value),{[i.b("group")]:v.prepend||v.append,[i.bm("group","append")]:v.append,[i.bm("group","prepend")]:v.prepend,[i.m("prefix")]:v.prefix||a.prefixIcon,[i.m("suffix")]:v.suffix||a.suffixIcon||a.clearable||a.showPassword,[i.bm("suffix","password-clear")]:se.value&&de.value},d.class]),y=f(()=>[i.e("wrapper"),i.is("focus",R.value)]),D=Ft({excludeKeys:f(()=>Object.keys(m.value))}),{form:k,formItem:x}=wt(),{inputId:ee}=St(a,{formItemContext:x}),te=It(),B=kt(),i=De("input"),ae=De("textarea"),N=fe(),T=fe(),R=M(!1),W=M(!1),H=M(!1),l=M(!1),b=M(),p=fe(a.inputStyle),_=f(()=>N.value||T.value),C=f(()=>{var e;return(e=k==null?void 0:k.statusIcon)!=null?e:!1}),u=f(()=>(x==null?void 0:x.validateState)||""),g=f(()=>u.value&&Ge[u.value]),z=f(()=>l.value?Qe:Je),$=f(()=>[d.style,a.inputStyle]),U=f(()=>[a.inputStyle,p.value,{resize:a.resize}]),F=f(()=>Et(a.modelValue)?"":String(a.modelValue)),se=f(()=>a.clearable&&!B.value&&!a.readonly&&!!F.value&&(R.value||W.value)),de=f(()=>a.showPassword&&!B.value&&!a.readonly&&!!F.value&&(!!F.value||R.value)),K=f(()=>a.showWordLimit&&!!D.value.maxlength&&(a.type==="text"||a.type==="textarea")&&!B.value&&!a.readonly&&!a.showPassword),ue=f(()=>F.value.length),Me=f(()=>!!K.value&&ue.value>Number(D.value.maxlength)),Oe=f(()=>!!v.suffix||!!a.suffixIcon||se.value||a.showPassword||K.value||!!u.value&&C.value),[Be,Ne]=Pt(N);Dt(T,e=>{if($e(),!K.value||a.resize!=="both")return;const c=e[0],{width:V}=c.contentRect;b.value={right:`calc(100% - ${V+15+6}px)`}});const X=()=>{const{type:e,autosize:c}=a;if(!(!Ve||e!=="textarea"||!T.value))if(c){const V=Ae(c)?c.minRows:void 0,ne=Ae(c)?c.maxRows:void 0,ke=Te(T.value,V,ne);p.value={overflowY:"hidden",...ke},j(()=>{T.value.offsetHeight,p.value=ke})}else p.value={minHeight:Te(T.value).minHeight}},$e=(e=>{let c=!1;return()=>{var V;if(c||!a.autosize)return;((V=T.value)==null?void 0:V.offsetParent)===null||(e(),c=!0)}})(X),Y=()=>{const e=_.value,c=a.formatter?a.formatter(F.value):F.value;!e||e.value===c||(e.value=c)},ce=async e=>{Be();let{value:c}=e.target;if(a.formatter&&(c=a.parser?a.parser(c):c),!H.value){if(c===F.value){Y();return}r(he,c),r("input",c),await j(),Y(),Ne()}},ye=e=>{r("change",e.target.value)},be=e=>{r("compositionstart",e),H.value=!0},ge=e=>{var c;r("compositionupdate",e);const V=(c=e.target)==null?void 0:c.value,ne=V[V.length-1]||"";H.value=!Rt(ne)},xe=e=>{r("compositionend",e),H.value&&(H.value=!1,ce(e))},Le=()=>{l.value=!l.value,oe()},oe=async()=>{var e;await j(),(e=_.value)==null||e.focus()},He=()=>{var e;return(e=_.value)==null?void 0:e.blur()},_e=e=>{R.value=!0,r("focus",e)},we=e=>{var c;R.value=!1,r("blur",e),a.validateEvent&&((c=x==null?void 0:x.validate)==null||c.call(x,"blur").catch(V=>ze()))},Ke=e=>{W.value=!1,r("mouseleave",e)},je=e=>{W.value=!0,r("mouseenter",e)},Se=e=>{r("keydown",e)},We=()=>{var e;(e=_.value)==null||e.select()},Ie=()=>{r(he,""),r("change",""),r("clear"),r("input","")};return G(()=>a.modelValue,()=>{var e;j(()=>X()),a.validateEvent&&((e=x==null?void 0:x.validate)==null||e.call(x,"change").catch(c=>ze()))}),G(F,()=>Y()),G(()=>a.type,async()=>{await j(),Y(),X()}),Pe(()=>{!a.formatter&&a.parser,Y(),j(X)}),s({input:N,textarea:T,ref:_,textareaStyle:U,autosize:et(a,"autosize"),focus:oe,blur:He,select:We,clear:Ie,resizeTextarea:X}),(e,c)=>tt((h(),E("div",me(t(m),{class:t(A),style:t($),role:e.containerRole,onMouseenter:je,onMouseleave:Ke}),[S(" input "),e.type!=="textarea"?(h(),E(Q,{key:0},[S(" prepend slot "),e.$slots.prepend?(h(),E("div",{key:0,class:I(t(i).be("group","prepend"))},[ie(e.$slots,"prepend")],2)):S("v-if",!0),n("div",{class:I(t(y))},[S(" prefix slot "),e.$slots.prefix||e.prefixIcon?(h(),E("span",{key:0,class:I(t(i).e("prefix"))},[n("span",{class:I(t(i).e("prefix-inner")),onClick:oe},[ie(e.$slots,"prefix"),e.prefixIcon?(h(),O(t(Z),{key:0,class:I(t(i).e("icon"))},{default:L(()=>[(h(),O(le(e.prefixIcon)))]),_:1},8,["class"])):S("v-if",!0)],2)],2)):S("v-if",!0),n("input",me({id:t(ee),ref_key:"input",ref:N,class:t(i).e("inner")},t(D),{type:e.showPassword?l.value?"text":"password":e.type,disabled:t(B),formatter:e.formatter,parser:e.parser,readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.label,placeholder:e.placeholder,style:e.inputStyle,form:a.form,onCompositionstart:be,onCompositionupdate:ge,onCompositionend:xe,onInput:ce,onFocus:_e,onBlur:we,onChange:ye,onKeydown:Se}),null,16,Lt),S(" suffix slot "),t(Oe)?(h(),E("span",{key:1,class:I(t(i).e("suffix"))},[n("span",{class:I(t(i).e("suffix-inner")),onClick:oe},[!t(se)||!t(de)||!t(K)?(h(),E(Q,{key:0},[ie(e.$slots,"suffix"),e.suffixIcon?(h(),O(t(Z),{key:0,class:I(t(i).e("icon"))},{default:L(()=>[(h(),O(le(e.suffixIcon)))]),_:1},8,["class"])):S("v-if",!0)],64)):S("v-if",!0),t(se)?(h(),O(t(Z),{key:1,class:I([t(i).e("icon"),t(i).e("clear")]),onMousedown:ot(t(nt),["prevent"]),onClick:Ie},{default:L(()=>[q(t(st))]),_:1},8,["class","onMousedown"])):S("v-if",!0),t(de)?(h(),O(t(Z),{key:2,class:I([t(i).e("icon"),t(i).e("password")]),onClick:Le},{default:L(()=>[(h(),O(le(t(z))))]),_:1},8,["class"])):S("v-if",!0),t(K)?(h(),E("span",{key:3,class:I(t(i).e("count"))},[n("span",{class:I(t(i).e("count-inner"))},w(t(ue))+" / "+w(t(D).maxlength),3)],2)):S("v-if",!0),t(u)&&t(g)&&t(C)?(h(),O(t(Z),{key:4,class:I([t(i).e("icon"),t(i).e("validateIcon"),t(i).is("loading",t(u)==="validating")])},{default:L(()=>[(h(),O(le(t(g))))]),_:1},8,["class"])):S("v-if",!0)],2)],2)):S("v-if",!0)],2),S(" append slot "),e.$slots.append?(h(),E("div",{key:1,class:I(t(i).be("group","append"))},[ie(e.$slots,"append")],2)):S("v-if",!0)],64)):(h(),E(Q,{key:1},[S(" textarea "),n("textarea",me({id:t(ee),ref_key:"textarea",ref:T,class:t(ae).e("inner")},t(D),{tabindex:e.tabindex,disabled:t(B),readonly:e.readonly,autocomplete:e.autocomplete,style:t(U),"aria-label":e.label,placeholder:e.placeholder,form:a.form,onCompositionstart:be,onCompositionupdate:ge,onCompositionend:xe,onInput:ce,onFocus:_e,onBlur:we,onChange:ye,onKeydown:Se}),null,16,Ht),t(K)?(h(),E("span",{key:0,style:it(b.value),class:I(t(i).e("count"))},w(t(ue))+" / "+w(t(D).maxlength),7)):S("v-if",!0)],64))],16,$t)),[[at,e.type!=="hidden"]])}});var Wt=lt(jt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const Ut=rt(Wt);const J=o=>(ht("data-v-20bdb339"),o=o(),yt(),o),Xt={class:"contain"},Yt={class:"box"},Zt={class:"sp"},qt={class:"step"},Gt={class:"step"},Qt={class:"maintop"},Jt={class:"item"},ea=J(()=>n("div",{class:"title"},"Project Duration (days)",-1)),ta={class:"center"},aa={class:"changed"},sa={class:"base"},oa={class:"bottom"},na={class:"item"},ia=J(()=>n("div",{class:"title"},"Tasks",-1)),la={class:"center"},ra={class:"changed"},da={class:"base"},ua={class:"bottom"},ca={class:"item"},pa=J(()=>n("div",{class:"title"},"Tasks on Critical Path",-1)),va={class:"center"},fa={class:"changed"},ma={class:"base"},ha={class:"bottom"},ya={class:"mainEchar1"},ba=mt('<div class="Echar1top" data-v-20bdb339><div data-v-20bdb339>Comparison Chart</div></div><span data-v-20bdb339>Overview of all tasks over time</span><div class="choosebox" data-v-20bdb339><div class="choose" data-v-20bdb339><div style="background-color:#b0e054;" class="item" data-v-20bdb339></div><div data-v-20bdb339>Optimized</div></div><div class="choose" data-v-20bdb339><div style="background-color:#5474c4;" class="item" data-v-20bdb339></div><div data-v-20bdb339>Baseline</div></div><div class="choose" data-v-20bdb339><div style="background-color:red;" class="item" data-v-20bdb339></div><div data-v-20bdb339>Critical Path</div></div></div><div id="main" data-v-20bdb339></div>',4),ga={ref:"main",style:{width:"1150px",height:"610px"},id:"myEcharts"},xa={class:"mainEchar2"},_a=J(()=>n("div",{class:"Echar2top"},[n("div",null,"Labor Resources")],-1)),wa=J(()=>n("span",null,"Total utilization of multiple resources over time",-1)),Sa={class:"types"},Ia={ref:"main01",style:{width:"1150px",height:"610px"},id:"myEcharts01"},ka={class:"button"},Ca={__name:"index",setup(o){const s=ut(),r=ct();pt((l,b)=>{l.name=="InputData"&&a()});function a(){s.taskData=[],Object.keys(s.dataArray).forEach(l=>{s.dataArray[l].all=[],s.dataArray[l].data=[]})}Pe(()=>{D(),N()});let d=gt,v=M(2),m;function A(l,b){return Math.round(l/b*1e4)/100+"%"}let y=f(()=>s.selectedData.baselineTasks.filter(b=>b.critical));function D(){let l=[],b=s.selectedData.baselineTasks.map((u,g)=>{let z=s.selectedData.tasks.find($=>$.id===u.id);return l.push(z),g=s.selectedData.baselineTasks.length-g,{name:u.name,value:[g,u.newStart,u.newFinish],itemStyle:{color:u.critical?"pink":void 0}}});l=l.map((u,g)=>(g=l.length-g,{id:u.id,name:u.name,value:[g,u.newStart,u.newFinish],itemStyle:{color:u.critical?"red":void 0}}));let p=d.init(document.getElementById("myEcharts"),"purple-passion");var _;let C=(u,g)=>{let z=g.coord([g.value(1),g.value(0)]),$=g.coord([g.value(2),g.value(0)]),U=g.size([0,1])[1]*.5,F=xt({x:z[0],y:z[1]-U/2,width:Math.max($[0]-z[0],1),height:U},u.coordSys);return F&&{type:"rect",shape:F,style:g.style()}};_={toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"weakFilter",xAxisIndex:[0]},{type:"slider",filterMode:"weakFilter",yAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",xAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",yAxisIndex:[0]}],legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time"},yAxis:{name:"tasks"},series:[{name:"baseline",type:"custom",data:b,large:!0,renderItem:C,encode:{x:[1,2],y:0}},{name:"new",type:"custom",data:l,large:!0,renderItem:C,encode:{x:[1,2],y:0}}],tooltip:{formatter:u=>u.name}},_&&p.setOption(_),m=d.init(document.getElementById("myEcharts01"),"purple-passion")}let k=M("");function x(l,b){return l.reduce(function(p,_){let C=_[b];return p[C]||(p[C]=[]),p[C].push(_),p},{})}let ee=f(()=>{let l=s.selectedData.baselineResources.map(p=>({id:p.id,name:p.name,type:p.type})),b=x(l,"type");if(k.value){const p=new RegExp(k.value,"i");let _={};for(let C in b)_[C]=b[C].filter(u=>p.test(u.name));return _}else return b});const te=l=>l.xy.map(b=>{const[p,_]=Object.entries(b)[0];return[parseInt(p),_]});let B=f(()=>{const l=s.selectedData.baselineResources;return R.value?l.filter(p=>p.id&&p.id===R.value)[0].distribution:l[1].distribution}),i=f(()=>{const l=s.selectedData.newResources;return R.value?l.filter(p=>p.id&&p.id===R.value)[0].distribution:l[1].distribution}),ae=f(()=>({toolbox:{feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"weakFilter",start:0,end:100,xAxisIndex:[0]},{type:"slider",filterMode:"weakFilter",yAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",xAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",yAxisIndex:[0]}],tooltip:{trigger:"axis"},animation:!1,legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time"},yAxis:{name:"units / day"},series:[{name:"baseline",type:"bar",data:te(B.value),large:!0},{name:"new",type:"bar",data:te(i.value),large:!0}]}));function N(){m.setOption(ae.value)}G(v,()=>{N()}),M("Type to search...");async function T(){r.push({name:"OptimizedReport"}),s.active=3}let R=M("");function W(){r.push({name:"BaselineSummary"}),s.active=1}function H(l){R.value=l}return G(R,()=>{N()}),(l,b)=>{const p=Ut,_=vt("v-btn"),C=bt;return h(),E("div",Xt,[n("div",Yt,[n("h2",null,[re(" Overview "),n("span",Zt,w(t(s).SummaryData.group),1),n("div",qt,[n("span",null,w(t(s).setting.Steps)+" steps",1)]),n("div",Gt,[n("span",null,w(`${t(s).setting.Ratio[0]*100}% - ${t(s).setting.Ratio[1]*100}% ratio`),1)])]),n("div",Qt,[n("div",Jt,[ea,n("div",ta,[n("span",aa,w(t(s).SummaryData.changedDuration)+"/",1),n("span",sa,w(t(s).SummaryData.baseDuration),1)]),n("div",oa,w(A(t(s).SummaryData.changedDuration,t(s).SummaryData.baseDuration)),1)]),n("div",na,[ia,n("div",la,[n("span",ra,w(t(s).SummaryData.changgedTasks)+"/",1),n("span",da,w(t(s).SummaryData.TotalTasks),1)]),n("div",ua,w(A(t(s).SummaryData.changgedTasks,t(s).SummaryData.TotalTasks)),1)]),n("div",ca,[pa,n("div",va,[n("span",fa,w(t(y).length)+"/",1),n("span",ma,w(t(s).selectedData.baselineTasks.length),1)]),n("div",ha,w(A(t(y).length,t(s).selectedData.baselineTasks.length)),1)])]),n("div",ya,[ba,n("div",ga,null,512)]),n("div",xa,[_a,wa,q(p,{modelValue:t(k),"onUpdate:modelValue":b[0]||(b[0]=u=>ft(k)?k.value=u:k=u),placeholder:"Search Resources"},null,8,["modelValue"]),(h(!0),E(Q,null,Re(t(ee),(u,g)=>(h(),E("div",null,[n("div",null,w(g),1),n("div",Sa,[(h(!0),E(Q,null,Re(u,(z,$)=>(h(),E("div",{key:$,class:"type"},[q(_,{variant:"text",value:$,class:I({activeType:t(R)==z.id}),onClick:()=>{H(z.id)}},{default:L(()=>[re(w(z.name)+" "+w(z.type),1)]),_:2},1032,["value","class","onClick"])]))),128))])]))),256)),n("div",Ia,null,512)]),n("div",ka,[q(C,{onClick:W,class:"btnback"},{default:L(()=>[re("BACK")]),_:1}),q(C,{onClick:T,class:"btngo"},{default:L(()=>[re("VIEW DETALED REPORT")]),_:1})])])])}}},Va=dt(Ca,[["__scopeId","data-v-20bdb339"]]);export{Va as default};
