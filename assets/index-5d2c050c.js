import{aR as Pe,m as g,aS as Ze,aT as je,T as P,av as Ee,j as We,at as Ye,k as ve,aU as ze,au as be,v as he,l as Ae,aV as Xe,aa as Ge,aD as Je,aE as Qe,ay as qe,R as et,u as Re,a4 as ye,aW as tt,aX as at,aY as nt,O as st,aZ as ot,a8 as oe,aB as q,a9 as Fe,am as it,ad as rt,ao as lt,ap as ut,x as S,y as V,F as k,U as ee,z as R,A as t,D as ue,B as m,G as U,H as L,I as de,J as se,af as ge,Y as H,o as dt,X as ct,P as pt,E,C as mt,_ as ft,a5 as Ve,K as vt,al as ht,ag as yt,as as gt,aJ as bt,aK as wt,an as xt,aj as ce,aA as St,V as Te,aQ as $t}from"./index-d7b40158.js";import{C as pe}from"./index-a987af5e.js";import{e as _t,c as Ct}from"./index-11e546f7.js";import{m as Dt}from"./index-ee7bc3dc.js";import{E as It}from"./el-overlay-87f8a1d5.js";import{V as kt}from"./index.min-9b93d807.js";const Et=()=>Pe&&/firefox/i.test(window.navigator.userAgent),zt=l=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(l),Rt=["class","style"],Ft=/^on[A-Z]/,Vt=(l={})=>{const{excludeListeners:o=!1,excludeKeys:i}=l,n=g(()=>((i==null?void 0:i.value)||[]).concat(Rt)),f=Ze();return f?g(()=>{var p;return je(Object.entries((p=f.proxy)==null?void 0:p.$attrs).filter(([b])=>!n.value.includes(b)&&!(o&&Ft.test(b))))}):g(()=>({}))};function Tt(l){const o=P();function i(){if(l.value==null)return;const{selectionStart:f,selectionEnd:p,value:b}=l.value;if(f==null||p==null)return;const w=b.slice(0,Math.max(0,f)),x=b.slice(Math.max(0,p));o.value={selectionStart:f,selectionEnd:p,value:b,beforeTxt:w,afterTxt:x}}function n(){if(l.value==null||o.value==null)return;const{value:f}=l.value,{beforeTxt:p,afterTxt:b,selectionStart:w}=o.value;if(p==null||b==null||w==null)return;let x=f.length;if(f.endsWith(b))x=f.length-b.length;else if(f.startsWith(p))x=p.length;else{const z=p[w-1],I=f.indexOf(z,w-1);I!==-1&&(x=I+1)}l.value.setSelectionRange(x,x)}return[i,n]}let M;const Nt=`
  height:0 !important;
  visibility:hidden !important;
  ${Et()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,Pt=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function At(l){const o=window.getComputedStyle(l),i=o.getPropertyValue("box-sizing"),n=Number.parseFloat(o.getPropertyValue("padding-bottom"))+Number.parseFloat(o.getPropertyValue("padding-top")),f=Number.parseFloat(o.getPropertyValue("border-bottom-width"))+Number.parseFloat(o.getPropertyValue("border-top-width"));return{contextStyle:Pt.map(b=>`${b}:${o.getPropertyValue(b)}`).join(";"),paddingSize:n,borderSize:f,boxSizing:i}}function Ne(l,o=1,i){var n;M||(M=document.createElement("textarea"),document.body.appendChild(M));const{paddingSize:f,borderSize:p,boxSizing:b,contextStyle:w}=At(l);M.setAttribute("style",`${w};${Nt}`),M.value=l.value||l.placeholder||"";let x=M.scrollHeight;const z={};b==="border-box"?x=x+p:b==="content-box"&&(x=x-f),M.value="";const I=M.scrollHeight-f;if(Ee(o)){let u=I*o;b==="border-box"&&(u=u+f+p),x=Math.max(u,x),z.minHeight=`${u}px`}if(Ee(i)){let u=I*i;b==="border-box"&&(u=u+f+p),x=Math.min(u,x)}return z.height=`${x}px`,(n=M.parentNode)==null||n.removeChild(M),M=void 0,z}const Mt=We({id:{type:String,default:void 0},size:Ye,disabled:Boolean,modelValue:{type:ve([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:ve([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:ze},prefixIcon:{type:ze},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:ve([Object,Array,String]),default:()=>Dt({})}}),Bt={[be]:l=>he(l),input:l=>he(l),change:l=>he(l),focus:l=>l instanceof FocusEvent,blur:l=>l instanceof FocusEvent,clear:()=>!0,mouseleave:l=>l instanceof MouseEvent,mouseenter:l=>l instanceof MouseEvent,keydown:l=>l instanceof Event,compositionstart:l=>l instanceof CompositionEvent,compositionupdate:l=>l instanceof CompositionEvent,compositionend:l=>l instanceof CompositionEvent},Ot=["role"],Ut=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],Ht=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],Lt=Ae({name:"ElInput",inheritAttrs:!1}),Kt=Ae({...Lt,props:Mt,emits:Bt,setup(l,{expose:o,emit:i}){const n=l,f=Xe(),p=Ge(),b=g(()=>{const e={};return n.containerRole==="combobox"&&(e["aria-haspopup"]=f["aria-haspopup"],e["aria-owns"]=f["aria-owns"],e["aria-expanded"]=f["aria-expanded"]),e}),w=g(()=>[n.type==="textarea"?K.b():d.b(),d.m(B.value),d.is("disabled",_.value),d.is("exceed",N.value),{[d.b("group")]:p.prepend||p.append,[d.bm("group","append")]:p.append,[d.bm("group","prepend")]:p.prepend,[d.m("prefix")]:p.prefix||n.prefixIcon,[d.m("suffix")]:p.suffix||n.suffixIcon||n.clearable||n.showPassword,[d.bm("suffix","password-clear")]:a.value&&h.value},f.class]),x=g(()=>[d.e("wrapper"),d.is("focus",W.value)]),z=Vt({excludeKeys:g(()=>Object.keys(b.value))}),{form:I,formItem:u}=Je(),{inputId:$}=Qe(n,{formItemContext:u}),B=qe(),_=et(),d=Re("input"),K=Re("textarea"),j=ye(),A=ye(),W=P(!1),te=P(!1),Y=P(!1),G=P(!1),J=P(),Q=ye(n.inputStyle),F=g(()=>j.value||A.value),ie=g(()=>{var e;return(e=I==null?void 0:I.statusIcon)!=null?e:!1}),X=g(()=>(u==null?void 0:u.validateState)||""),s=g(()=>X.value&&tt[X.value]),r=g(()=>G.value?at:nt),c=g(()=>[f.style,n.inputStyle]),D=g(()=>[n.inputStyle,Q.value,{resize:n.resize}]),v=g(()=>st(n.modelValue)?"":String(n.modelValue)),a=g(()=>n.clearable&&!_.value&&!n.readonly&&!!v.value&&(W.value||te.value)),h=g(()=>n.showPassword&&!_.value&&!n.readonly&&!!v.value&&(!!v.value||W.value)),C=g(()=>n.showWordLimit&&!!z.value.maxlength&&(n.type==="text"||n.type==="textarea")&&!_.value&&!n.readonly&&!n.showPassword),T=g(()=>v.value.length),N=g(()=>!!C.value&&T.value>Number(z.value.maxlength)),Z=g(()=>!!p.suffix||!!n.suffixIcon||a.value||n.showPassword||C.value||!!X.value&&ie.value),[me,Me]=Tt(j);ot(A,e=>{if(Be(),!C.value||n.resize!=="both")return;const y=e[0],{width:O}=y.contentRect;J.value={right:`calc(100% - ${O+15+6}px)`}});const ae=()=>{const{type:e,autosize:y}=n;if(!(!Pe||e!=="textarea"||!A.value))if(y){const O=Ve(y)?y.minRows:void 0,le=Ve(y)?y.maxRows:void 0,ke=Ne(A.value,O,le);Q.value={overflowY:"hidden",...ke},q(()=>{A.value.offsetHeight,Q.value=ke})}else Q.value={minHeight:Ne(A.value).minHeight}},Be=(e=>{let y=!1;return()=>{var O;if(y||!n.autosize)return;((O=A.value)==null?void 0:O.offsetParent)===null||(e(),y=!0)}})(ae),ne=()=>{const e=F.value,y=n.formatter?n.formatter(v.value):v.value;!e||e.value===y||(e.value=y)},fe=async e=>{me();let{value:y}=e.target;if(n.formatter&&(y=n.parser?n.parser(y):y),!Y.value){if(y===v.value){ne();return}i(be,y),i("input",y),await q(),ne(),Me()}},we=e=>{i("change",e.target.value)},xe=e=>{i("compositionstart",e),Y.value=!0},Se=e=>{var y;i("compositionupdate",e);const O=(y=e.target)==null?void 0:y.value,le=O[O.length-1]||"";Y.value=!zt(le)},$e=e=>{i("compositionend",e),Y.value&&(Y.value=!1,fe(e))},Oe=()=>{G.value=!G.value,re()},re=async()=>{var e;await q(),(e=F.value)==null||e.focus()},Ue=()=>{var e;return(e=F.value)==null?void 0:e.blur()},_e=e=>{W.value=!0,i("focus",e)},Ce=e=>{var y;W.value=!1,i("blur",e),n.validateEvent&&((y=u==null?void 0:u.validate)==null||y.call(u,"blur").catch(O=>Fe()))},He=e=>{te.value=!1,i("mouseleave",e)},Le=e=>{te.value=!0,i("mouseenter",e)},De=e=>{i("keydown",e)},Ke=()=>{var e;(e=F.value)==null||e.select()},Ie=()=>{i(be,""),i("change",""),i("clear"),i("input","")};return oe(()=>n.modelValue,()=>{var e;q(()=>ae()),n.validateEvent&&((e=u==null?void 0:u.validate)==null||e.call(u,"change").catch(y=>Fe()))}),oe(v,()=>ne()),oe(()=>n.type,async()=>{await q(),ne(),ae()}),it(()=>{!n.formatter&&n.parser,ne(),q(ae)}),o({input:j,textarea:A,ref:F,textareaStyle:D,autosize:rt(n,"autosize"),focus:re,blur:Ue,select:Ke,clear:Ie,resizeTextarea:ae}),(e,y)=>lt((S(),V("div",ge(t(b),{class:t(w),style:t(c),role:e.containerRole,onMouseenter:Le,onMouseleave:He}),[k(" input "),e.type!=="textarea"?(S(),V(ee,{key:0},[k(" prepend slot "),e.$slots.prepend?(S(),V("div",{key:0,class:R(t(d).be("group","prepend"))},[ue(e.$slots,"prepend")],2)):k("v-if",!0),m("div",{class:R(t(x))},[k(" prefix slot "),e.$slots.prefix||e.prefixIcon?(S(),V("span",{key:0,class:R(t(d).e("prefix"))},[m("span",{class:R(t(d).e("prefix-inner")),onClick:re},[ue(e.$slots,"prefix"),e.prefixIcon?(S(),U(t(se),{key:0,class:R(t(d).e("icon"))},{default:L(()=>[(S(),U(de(e.prefixIcon)))]),_:1},8,["class"])):k("v-if",!0)],2)],2)):k("v-if",!0),m("input",ge({id:t($),ref_key:"input",ref:j,class:t(d).e("inner")},t(z),{type:e.showPassword?G.value?"text":"password":e.type,disabled:t(_),formatter:e.formatter,parser:e.parser,readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.label,placeholder:e.placeholder,style:e.inputStyle,form:n.form,onCompositionstart:xe,onCompositionupdate:Se,onCompositionend:$e,onInput:fe,onFocus:_e,onBlur:Ce,onChange:we,onKeydown:De}),null,16,Ut),k(" suffix slot "),t(Z)?(S(),V("span",{key:1,class:R(t(d).e("suffix"))},[m("span",{class:R(t(d).e("suffix-inner")),onClick:re},[!t(a)||!t(h)||!t(C)?(S(),V(ee,{key:0},[ue(e.$slots,"suffix"),e.suffixIcon?(S(),U(t(se),{key:0,class:R(t(d).e("icon"))},{default:L(()=>[(S(),U(de(e.suffixIcon)))]),_:1},8,["class"])):k("v-if",!0)],64)):k("v-if",!0),t(a)?(S(),U(t(se),{key:1,class:R([t(d).e("icon"),t(d).e("clear")]),onMousedown:ct(t(pt),["prevent"]),onClick:Ie},{default:L(()=>[H(t(dt))]),_:1},8,["class","onMousedown"])):k("v-if",!0),t(h)?(S(),U(t(se),{key:2,class:R([t(d).e("icon"),t(d).e("password")]),onClick:Oe},{default:L(()=>[(S(),U(de(t(r))))]),_:1},8,["class"])):k("v-if",!0),t(C)?(S(),V("span",{key:3,class:R(t(d).e("count"))},[m("span",{class:R(t(d).e("count-inner"))},E(t(T))+" / "+E(t(z).maxlength),3)],2)):k("v-if",!0),t(X)&&t(s)&&t(ie)?(S(),U(t(se),{key:4,class:R([t(d).e("icon"),t(d).e("validateIcon"),t(d).is("loading",t(X)==="validating")])},{default:L(()=>[(S(),U(de(t(s))))]),_:1},8,["class"])):k("v-if",!0)],2)],2)):k("v-if",!0)],2),k(" append slot "),e.$slots.append?(S(),V("div",{key:1,class:R(t(d).be("group","append"))},[ue(e.$slots,"append")],2)):k("v-if",!0)],64)):(S(),V(ee,{key:1},[k(" textarea "),m("textarea",ge({id:t($),ref_key:"textarea",ref:A,class:t(K).e("inner")},t(z),{tabindex:e.tabindex,disabled:t(_),readonly:e.readonly,autocomplete:e.autocomplete,style:t(D),"aria-label":e.label,placeholder:e.placeholder,form:n.form,onCompositionstart:xe,onCompositionupdate:Se,onCompositionend:$e,onInput:fe,onFocus:_e,onBlur:Ce,onChange:we,onKeydown:De}),null,16,Ht),t(C)?(S(),V("span",{key:0,style:mt(J.value),class:R(t(d).e("count"))},E(t(T))+" / "+E(t(z).maxlength),7)):k("v-if",!0)],64))],16,Ot)),[[ut,e.type!=="hidden"]])}});var Zt=ft(Kt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const jt=vt(Zt);const Wt=m("span",{class:"dialog-footer"},null,-1),Yt={__name:"dialog",props:["dialogVisible","data"],emits:["closeDialog"],setup(l,{emit:o}){const i=l;let n=P();async function f(){kt.preview(n.value,`

`+x.value)}function p(u){if(!u)return"0.00";var u=Math.round(parseFloat(u)*100)/100,$=u.toString().split(".");if($.length==1)return u=u.toString()+".00",u;if($.length>1)return $[1].length<2&&(u=u.toString()+"0"),u}g(()=>i.dialogVisible);function b(I,u=0){let $=`
`;const B=_=>"  ".repeat(_);for(const[_,d]of Object.entries(I))typeof d=="object"&&d!==null?($+=`${B(u)}- **${_}**
`,$+=b(d,u+1)):$+=`${B(u)}- ${_}: ${d}
`;return $}function w(I){return new Date(I).toISOString()}let x=g(()=>{let I=()=>{let $="";for(const B in i.data.resources){const _=i.data.resources[B];$+=`The resource with ID ${_.resourceId} was originally planned to have ${p(_.plannedUnits)} units. The initial planned usage rate was ${p(_.plannedUnitsPerHour)} units per hour, and it currently remains at ${p(_.Units)} units per hour. However, after optimization, the new usage rate is ${p(_.newUnitsPerHour)} units per hour, and the new daily usage is ${p(_.newUnitsPerDay)} units per day.
`}return $};return`This is a task named '${i.data.name}' categorized as '${i.data.type}', and it is ${i.data.critical==!0?"":"not"} a Critical Task.
   Before optimization,
   it is scheduled to start on ${w(i.data.plannedStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${w(i.data.plannedFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${i.data.remainingDuration} hours. 
  After optimization,
   it is scheduled to start on ${w(i.data.newStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${w(i.data.newFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${i.data.newDuration} hours. 
Resources:
${I()}As of now, the task has not commenced and is labeled as '${i.data.status}.' The task's duration ratio is ${p(i.data.durationRatio)}.`+b(i.data)});const z=()=>{o("closeDialog")};return(I,u)=>{const $=It;return S(),U($,{onOpen:f,onClose:z,modelValue:i.dialogVisible,"onUpdate:modelValue":u[0]||(u[0]=B=>i.dialogVisible=B),title:"Detailed content",width:"50%",draggable:""},{footer:L(()=>[Wt]),default:L(()=>[m("span",null,E(t(x).id),1),m("div",{ref_key:"editorRef",ref:n},null,512)]),_:1},8,["modelValue"])}}};const Xt={class:"contain"},Gt={class:"box"},Jt={class:"sp"},Qt={class:"step"},qt={class:"step"},ea={class:"maintop"},ta={class:"mainEchar1"},aa={class:"Echar1top"},na=$t('<div class="choosebox" data-v-b25d3a38><div class="choose" data-v-b25d3a38><div style="background-color:#b0e054;" class="item" data-v-b25d3a38></div><div data-v-b25d3a38>Optimized</div></div><div class="choose" data-v-b25d3a38><div style="background-color:#5474c4;" class="item" data-v-b25d3a38></div><div data-v-b25d3a38>Baseline</div></div><div class="choose" data-v-b25d3a38><div style="background-color:red;" class="item" data-v-b25d3a38></div><div data-v-b25d3a38>Critical Path</div></div><div class="choose" data-v-b25d3a38><div style="background-color:pink;" class="item" data-v-b25d3a38></div><div data-v-b25d3a38>Critical Path(baseline)</div></div></div><div id="main" data-v-b25d3a38></div>',2),sa={ref:"main",style:{width:"1350px",height:"610px"},id:"myEcharts"},oa={class:"mainEchar2"},ia={class:"Echar2top"},ra={class:"resources-title"},la={class:"types"},ua={ref:"main01",style:{width:"1350px",height:"610px"},id:"myEcharts01"},da={class:"button"},ca={__name:"index",setup(l){const o=yt(),i=gt();let n=P(!1),f=P("");const p=()=>{n.value=!1};bt((s,r,c)=>{s.name=="InputData",c()}),wt(()=>{o.selectChange&&(F.value="",d(),J(),o.selectChange=!1)});function b(s,r){return Math.round(s/r*1e4)/100+"%"}function w(s){return new Date(s).toISOString()}function x(s){const r=new Date(s);return`${r.getUTCFullYear()}/${r.getUTCMonth()+1}/${r.getUTCDate()} ${("0"+r.getUTCHours()).slice(-2)}:${("0"+r.getUTCMinutes()).slice(-2)}:${("0"+r.getUTCSeconds()).slice(-2)}`}const z=s=>s[0]===void 0||s[0].length===0?[]:s[0].xy.map(r=>{const[c,D]=Object.entries(r)[0];return{value:[w(parseInt(c)),D],name:w(parseInt(c))+D+s[1]}});let I=_t,u=P(2),$,B=g(()=>o.selectedData?o.selectedData.baselineTasks.filter(r=>r.critical):void 0);function _(s){return`<span >${s}</span>`}function d(){let s=[],r=o.selectedData.baselineTasks.map((a,h)=>{let C=o.selectedData.tasks.find(T=>T.id===a.id);return C.old=a,s.push(C),h=o.selectedData.baselineTasks.length-h,{name:a.name,value:[h,w(a.newStart),w(a.newFinish),a,{baseNew:{start:a.newStart,finish:a.newFinish,duration:a.newDuration},changeNew:{start:C.newStart,finish:C.newFinish,duration:C.newDuration}}],itemStyle:{color:a.critical?"pink":void 0}}});s=s.map((a,h)=>(h=s.length-h+.2,{id:a.id,name:a.name,value:[h,w(a.newStart),w(a.newFinish),a,{baseNew:{start:a.old.newStart,finish:a.old.newFinish,duration:a.old.newDuration},changeNew:{start:a.newStart,finish:a.newFinish,duration:a.newDuration}}],itemStyle:{color:a.critical?"red":void 0}}));let c=I.init(document.getElementById("myEcharts"),"purple-passion");c.on("click",function(a){f.value=a.data.value[3],n.value=!0});var D;let v=(a,h)=>{let C=h.coord([h.value(1),h.value(0)]),T=h.coord([h.value(2),h.value(0)]),N=h.size([0,1])[1]*.5;return{type:"rect",shape:Ct({x:C[0],y:C[1]-N/2,width:Math.max(T[0]-C[0],1),height:N},a.coordSys),style:h.style(),focus:"self",blurScope:"coordinateSystem",emphasis:{}}};D={toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"weakFilter",xAxisIndex:[0],labelFormatter:function(a){return x(a)},moveHandleSize:15,height:15,moveHandleStyle:{}},{type:"slider",filterMode:"weakFilter",yAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",xAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",yAxisIndex:[0]}],legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",boundaryGap:[0,0],axisTick:{show:!0,alignWithLabel:!0},minInterval:24*3600,max:function(a){return a.max+(a.max-a.min)*.01},min:function(a){return a.min-(a.max-a.min)*.01},axisLabel:{showMaxLabel:"true",showMinLabel:"true",formatter:function(a,h){return x(a)}}},yAxis:{name:"tasks"},selectedMode:"single",series:[{name:"baseline",type:"custom",data:r,large:!0,renderItem:v,encode:{x:[1,2],y:0}},{name:"new",type:"custom",data:s,large:!0,renderItem:v,encode:{x:[1,2],y:0}}],tooltip:{axisPointer:{},formatter:a=>{let h="Resources: <br/>";if(a.value[3].resources)for(const T in a.value[3].resources){let N=a.value[3].resources,Z=o.selectedData.newResources.find(me=>me.id==T);Z||(Z=""),h+=` &nbsp&nbspResource &nbsp  ${Z==null?void 0:Z.name} &nbsp id: ${T}  <br/>&nbsp&nbsp&nbsp&nbspunits/hour:${j(N[T].plannedUnitsPerHour)}=> ${j(N[T].newUnitsPerHour)}<br/>`}function C(T){let N;switch(T){case"New":a.value[3].critical?N="red":N="#b0e054";break;case"Old":a.value[3].critical?N="pink":N="#5474c4"}return`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${N};"></span>`}return`${a.name}<br/>
        <div style='margin-top:20px'>
         ${C("New")} New: ${_(w(a.value[4].changeNew.start).replace("T"," ").replace("Z","").slice(0,16))} -> ${_(w(a.value[4].changeNew.finish).replace("T"," ").replace("Z","").slice(0,16))}
         (${a.value[4].changeNew.duration})
        <br/>
         ${C("Old")} Old: ${_(w(a.value[4].baseNew.start).replace("T"," ").replace("Z","").slice(0,16))} -> ${_(w(a.value[4].baseNew.finish).replace("T"," ").replace("Z","").slice(0,16))}
       (${a.value[4].baseNew.duration})
         <br/>
         ${h}
        </div>`}}},D&&c.setOption(D),c.on("mousemove",function(a){c.dispatchAction({type:"highlight",dataIndex:a.dataIndex})}),$=I.init(document.getElementById("myEcharts01"),"purple-passion"),$.on("mousemove",function(a){$.dispatchAction({type:"highlight",name:a.name})}),$.on("click",function(a){$.dispatchAction({type:"select",name:a.name})})}let K=P("");function j(r){if(!r)return"0.00";var r=Math.round(parseFloat(r)*100)/100,c=r.toString().split(".");if(c.length==1)return r=r.toString()+".00",r;if(c.length>1)return c[1].length<2&&(r=r.toString()+"0"),r}function A(s,r){return s.reduce(function(c,D){let v=D[r];return c[v]||(c[v]=[]),c[v].push(D),c},{})}let W=g(()=>{let s=o.selectedData.baselineResources.map(c=>({id:c.id,name:c.name,type:c.type})),r=A(s,"type");if(K.value){const c=new RegExp(K.value,"i");let D={};for(let v in r)D[v]=r[v].filter(a=>c.test(a.name));return D}else return r}),te=g(()=>{var c;const s=o.selectedData.baselineResources;let r="base";return F.value?[s.filter(v=>v.id&&v.id===F.value)[0].distribution,r]:s.length==0?[]:(F.value=s[0].id,[(c=s[0])==null?void 0:c.distribution,r])}),Y=g(()=>{var c;const s=o.selectedData.newResources;let r="new";return F.value?[s.filter(v=>v.id&&v.id===F.value)[0].distribution,r]:s.length==0?[]:[(c=s[0])==null?void 0:c.distribution,r]}),G=g(()=>({toolbox:{feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"none"},{type:"slider",filterMode:"none"},{type:"inside",filterMode:"none"},{type:"inside",filterMode:"none"}],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},animation:!1,legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",axisLabel:{formatter:"{yyyy}-{MM}-{dd}"}},yAxis:{name:"units / day"},series:[{name:"baseline",type:"bar",data:z(te.value),large:!0,selectedMode:"single",select:{itemStyle:{color:"red",borderWidth:"5px"}},emphasis:{focus:"self",blurScope:"coordinateSystem"}},{name:"new",type:"bar",data:z(Y.value),large:!0,selectedMode:"single",select:{itemStyle:{color:"red",borderWidth:"5px"}},emphasis:{focus:"series",blurScope:"coordinateSystem"}}]}));function J(){$.setOption(G.value)}oe(u,()=>{J()});async function Q(){i.push({name:"OptimizedReport"}),o.active=3}let F=P("");function ie(){i.push({name:"BaselineSummary"}),o.active=1}function X(s){F.value=s}return oe(F,()=>{J()}),(s,r)=>{const c=jt,D=xt("v-btn");return S(),V(ee,null,[m("div",Xt,[m("div",Gt,[m("h2",null,[ce(E(s.$t("optimizedSummary.title[0]"))+" ",1),m("span",Jt,E(t(o).SummaryData.group),1),m("div",Qt,[m("span",null,E(t(o).setting.Steps)+" "+E(s.$t("optimizedSummary.title[1]")),1)]),m("div",qt,[m("span",null,E(`${t(o).setting.Ratio[0]*100}% - ${t(o).setting.Ratio[1]*100}% ${s.$t("optimizedSummary.title[2]")}`),1)])]),m("div",ea,[H(pe,{title:s.$t("optimizedSummary.header[0]"),height:180,precent:b(t(o).SummaryData.changedDuration-t(o).SummaryData.baseDuration,t(o).SummaryData.baseDuration),isPositive:!0,body:[t(o).SummaryData.changedDuration+" days",t(o).SummaryData.baseDuration+" days"]},null,8,["title","precent","body"]),H(pe,{title:s.$t("baselineSummary.Tsidebar[1]"),height:180,precent:b(t(o).SummaryData.maxResourceUnit-t(o).SummaryData.BasemaxResourceUnit,t(o).SummaryData.BasemaxResourceUnit),isPositive:!1,body:[t(o).SummaryData.maxResourceUnit,t(o).SummaryData.BasemaxResourceUnit]},null,8,["title","precent","body"]),H(pe,{title:s.$t("optimizedSummary.header[2]"),height:180,body:[t(o).SummaryData.changgedTasks,t(o).SummaryData.TotalTasks]},null,8,["title","body"]),H(pe,{title:s.$t("optimizedSummary.header[3]"),height:180,body:[t(B).length,t(o).selectedData.baselineTasks.length]},null,8,["title","body"])]),m("div",ta,[m("div",aa,[m("div",null,E(s.$t("optimizedSummary.chartName[0]")),1)]),m("span",null,E(s.$t("optimizedSummary.chartName[1]")),1),na,m("div",sa,null,512)]),m("div",oa,[m("div",ia,[m("div",null,E(s.$t("optimizedSummary.chartName[2]")),1)]),m("span",null,E(s.$t("optimizedSummary.chartName[3]")),1),H(c,{modelValue:t(K),"onUpdate:modelValue":r[0]||(r[0]=v=>St(K)?K.value=v:K=v),placeholder:"Search Resources"},null,8,["modelValue"]),(S(!0),V(ee,null,Te(t(W),(v,a)=>(S(),V("div",null,[m("div",ra,E(a)+" Resources",1),m("div",la,[(S(!0),V(ee,null,Te(v,(h,C)=>(S(),V("div",{key:C,class:"type"},[H(D,{variant:"text",value:C,class:R({activeType:t(F)==h.id}),onClick:()=>{X(h.id)}},{default:L(()=>[ce(E(h.name)+" "+E(h.type),1)]),_:2},1032,["value","class","onClick"])]))),128))])]))),256)),m("div",ua,null,512)]),m("div",da,[H(D,{onClick:ie,class:"btnback"},{default:L(()=>[ce("BACK")]),_:1}),H(D,{onClick:Q,class:"btngo"},{default:L(()=>[ce(E(s.$t("optimizedSummary.btn[1]")),1)]),_:1})])])]),H(Yt,{onCloseDialog:p,data:t(f),dialogVisible:t(n)},null,8,["data","dialogVisible"])],64)}}},ba=ht(ca,[["__scopeId","data-v-b25d3a38"]]);export{ba as default};