import{aS as Ae,m as g,aT as Ze,aU as je,T as M,ax as De,j as Ke,av as We,k as fe,aV as Te,aw as ge,v as ve,l as Me,aW as Ye,aa as Xe,aF as Ge,aG as qe,aA as Je,R as Qe,u as Ee,a4 as he,aX as et,aY as tt,aZ as at,O as st,a_ as nt,a8 as oe,aD as J,a9 as ze,aH as ot,ad as it,ao as rt,aq as lt,x as _,y as F,F as T,U as ee,z as R,A as t,D as ue,B as o,G as H,H as U,I as de,J as ne,af as ye,Y as Q,o as ut,X as dt,P as ct,E as f,C as pt,_ as mt,a5 as Re,K as ft,an as vt,ag as ht,at as yt,aL as gt,aM as bt,au as xt,aj as ce,aC as wt,V as Ve,aR as _t,ak as St}from"./index-a207d3e1.js";import{e as $t,c as Ct}from"./index-11e546f7.js";import"./ecStat-2bb6c78c.js";import{m as kt}from"./index-96dcd4c0.js";import{E as It}from"./el-overlay-7a17b8b1.js";import{V as Dt}from"./index.min-2f8d73f3.js";const Tt=()=>Ae&&/firefox/i.test(window.navigator.userAgent),Et=u=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(u),zt=["class","style"],Rt=/^on[A-Z]/,Vt=(u={})=>{const{excludeListeners:i=!1,excludeKeys:r}=u,a=g(()=>((r==null?void 0:r.value)||[]).concat(zt)),v=Ze();return v?g(()=>{var m;return je(Object.entries((m=v.proxy)==null?void 0:m.$attrs).filter(([h])=>!a.value.includes(h)&&!(i&&Rt.test(h))))}):g(()=>({}))};function Ft(u){const i=M();function r(){if(u.value==null)return;const{selectionStart:v,selectionEnd:m,value:h}=u.value;if(v==null||m==null)return;const $=h.slice(0,Math.max(0,v)),w=h.slice(Math.max(0,m));i.value={selectionStart:v,selectionEnd:m,value:h,beforeTxt:$,afterTxt:w}}function a(){if(u.value==null||i.value==null)return;const{value:v}=u.value,{beforeTxt:m,afterTxt:h,selectionStart:$}=i.value;if(m==null||h==null||$==null)return;let w=v.length;if(v.endsWith(h))w=v.length-h.length;else if(v.startsWith(m))w=m.length;else{const E=m[$-1],D=v.indexOf(E,$-1);D!==-1&&(w=D+1)}u.value.setSelectionRange(w,w)}return[r,a]}let O;const At=`
  height:0 !important;
  visibility:hidden !important;
  ${Tt()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,Mt=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function Pt(u){const i=window.getComputedStyle(u),r=i.getPropertyValue("box-sizing"),a=Number.parseFloat(i.getPropertyValue("padding-bottom"))+Number.parseFloat(i.getPropertyValue("padding-top")),v=Number.parseFloat(i.getPropertyValue("border-bottom-width"))+Number.parseFloat(i.getPropertyValue("border-top-width"));return{contextStyle:Mt.map(h=>`${h}:${i.getPropertyValue(h)}`).join(";"),paddingSize:a,borderSize:v,boxSizing:r}}function Fe(u,i=1,r){var a;O||(O=document.createElement("textarea"),document.body.appendChild(O));const{paddingSize:v,borderSize:m,boxSizing:h,contextStyle:$}=Pt(u);O.setAttribute("style",`${$};${At}`),O.value=u.value||u.placeholder||"";let w=O.scrollHeight;const E={};h==="border-box"?w=w+m:h==="content-box"&&(w=w-v),O.value="";const D=O.scrollHeight-v;if(De(i)){let d=D*i;h==="border-box"&&(d=d+v+m),w=Math.max(d,w),E.minHeight=`${d}px`}if(De(r)){let d=D*r;h==="border-box"&&(d=d+v+m),w=Math.min(d,w)}return E.height=`${w}px`,(a=O.parentNode)==null||a.removeChild(O),O=void 0,E}const Nt=Ke({id:{type:String,default:void 0},size:We,disabled:Boolean,modelValue:{type:fe([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:fe([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:Te},prefixIcon:{type:Te},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:fe([Object,Array,String]),default:()=>kt({})}}),Ot={[ge]:u=>ve(u),input:u=>ve(u),change:u=>ve(u),focus:u=>u instanceof FocusEvent,blur:u=>u instanceof FocusEvent,clear:()=>!0,mouseleave:u=>u instanceof MouseEvent,mouseenter:u=>u instanceof MouseEvent,keydown:u=>u instanceof Event,compositionstart:u=>u instanceof CompositionEvent,compositionupdate:u=>u instanceof CompositionEvent,compositionend:u=>u instanceof CompositionEvent},Bt=["role"],Ht=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],Ut=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],Lt=Me({name:"ElInput",inheritAttrs:!1}),Zt=Me({...Lt,props:Nt,emits:Ot,setup(u,{expose:i,emit:r}){const a=u,v=Ye(),m=Xe(),h=g(()=>{const e={};return a.containerRole==="combobox"&&(e["aria-haspopup"]=v["aria-haspopup"],e["aria-owns"]=v["aria-owns"],e["aria-expanded"]=v["aria-expanded"]),e}),$=g(()=>[a.type==="textarea"?L.b():c.b(),c.m(P.value),c.is("disabled",C.value),c.is("exceed",A.value),{[c.b("group")]:m.prepend||m.append,[c.bm("group","append")]:m.append,[c.bm("group","prepend")]:m.prepend,[c.m("prefix")]:m.prefix||a.prefixIcon,[c.m("suffix")]:m.suffix||a.suffixIcon||a.clearable||a.showPassword,[c.bm("suffix","password-clear")]:s.value&&x.value},v.class]),w=g(()=>[c.e("wrapper"),c.is("focus",K.value)]),E=Vt({excludeKeys:g(()=>Object.keys(h.value))}),{form:D,formItem:d}=Ge(),{inputId:S}=qe(a,{formItemContext:d}),P=Je(),C=Qe(),c=Ee("input"),L=Ee("textarea"),j=he(),N=he(),K=M(!1),te=M(!1),W=M(!1),X=M(!1),G=M(),q=he(a.inputStyle),V=g(()=>j.value||N.value),ie=g(()=>{var e;return(e=D==null?void 0:D.statusIcon)!=null?e:!1}),Y=g(()=>(d==null?void 0:d.validateState)||""),n=g(()=>Y.value&&et[Y.value]),l=g(()=>X.value?tt:at),p=g(()=>[v.style,a.inputStyle]),I=g(()=>[a.inputStyle,q.value,{resize:a.resize}]),b=g(()=>st(a.modelValue)?"":String(a.modelValue)),s=g(()=>a.clearable&&!C.value&&!a.readonly&&!!b.value&&(K.value||te.value)),x=g(()=>a.showPassword&&!C.value&&!a.readonly&&!!b.value&&(!!b.value||K.value)),k=g(()=>a.showWordLimit&&!!E.value.maxlength&&(a.type==="text"||a.type==="textarea")&&!C.value&&!a.readonly&&!a.showPassword),z=g(()=>b.value.length),A=g(()=>!!k.value&&z.value>Number(E.value.maxlength)),Z=g(()=>!!m.suffix||!!a.suffixIcon||s.value||a.showPassword||k.value||!!Y.value&&ie.value),[pe,Pe]=Ft(j);nt(N,e=>{if(Ne(),!k.value||a.resize!=="both")return;const y=e[0],{width:B}=y.contentRect;G.value={right:`calc(100% - ${B+15+6}px)`}});const ae=()=>{const{type:e,autosize:y}=a;if(!(!Ae||e!=="textarea"||!N.value))if(y){const B=Re(y)?y.minRows:void 0,le=Re(y)?y.maxRows:void 0,Ie=Fe(N.value,B,le);q.value={overflowY:"hidden",...Ie},J(()=>{N.value.offsetHeight,q.value=Ie})}else q.value={minHeight:Fe(N.value).minHeight}},Ne=(e=>{let y=!1;return()=>{var B;if(y||!a.autosize)return;((B=N.value)==null?void 0:B.offsetParent)===null||(e(),y=!0)}})(ae),se=()=>{const e=V.value,y=a.formatter?a.formatter(b.value):b.value;!e||e.value===y||(e.value=y)},me=async e=>{pe();let{value:y}=e.target;if(a.formatter&&(y=a.parser?a.parser(y):y),!W.value){if(y===b.value){se();return}r(ge,y),r("input",y),await J(),se(),Pe()}},be=e=>{r("change",e.target.value)},xe=e=>{r("compositionstart",e),W.value=!0},we=e=>{var y;r("compositionupdate",e);const B=(y=e.target)==null?void 0:y.value,le=B[B.length-1]||"";W.value=!Et(le)},_e=e=>{r("compositionend",e),W.value&&(W.value=!1,me(e))},Oe=()=>{X.value=!X.value,re()},re=async()=>{var e;await J(),(e=V.value)==null||e.focus()},Be=()=>{var e;return(e=V.value)==null?void 0:e.blur()},Se=e=>{K.value=!0,r("focus",e)},$e=e=>{var y;K.value=!1,r("blur",e),a.validateEvent&&((y=d==null?void 0:d.validate)==null||y.call(d,"blur").catch(B=>ze()))},He=e=>{te.value=!1,r("mouseleave",e)},Ue=e=>{te.value=!0,r("mouseenter",e)},Ce=e=>{r("keydown",e)},Le=()=>{var e;(e=V.value)==null||e.select()},ke=()=>{r(ge,""),r("change",""),r("clear"),r("input","")};return oe(()=>a.modelValue,()=>{var e;J(()=>ae()),a.validateEvent&&((e=d==null?void 0:d.validate)==null||e.call(d,"change").catch(y=>ze()))}),oe(b,()=>se()),oe(()=>a.type,async()=>{await J(),se(),ae()}),ot(()=>{!a.formatter&&a.parser,se(),J(ae)}),i({input:j,textarea:N,ref:V,textareaStyle:I,autosize:it(a,"autosize"),focus:re,blur:Be,select:Le,clear:ke,resizeTextarea:ae}),(e,y)=>rt((_(),F("div",ye(t(h),{class:t($),style:t(p),role:e.containerRole,onMouseenter:Ue,onMouseleave:He}),[T(" input "),e.type!=="textarea"?(_(),F(ee,{key:0},[T(" prepend slot "),e.$slots.prepend?(_(),F("div",{key:0,class:R(t(c).be("group","prepend"))},[ue(e.$slots,"prepend")],2)):T("v-if",!0),o("div",{class:R(t(w))},[T(" prefix slot "),e.$slots.prefix||e.prefixIcon?(_(),F("span",{key:0,class:R(t(c).e("prefix"))},[o("span",{class:R(t(c).e("prefix-inner")),onClick:re},[ue(e.$slots,"prefix"),e.prefixIcon?(_(),H(t(ne),{key:0,class:R(t(c).e("icon"))},{default:U(()=>[(_(),H(de(e.prefixIcon)))]),_:1},8,["class"])):T("v-if",!0)],2)],2)):T("v-if",!0),o("input",ye({id:t(S),ref_key:"input",ref:j,class:t(c).e("inner")},t(E),{type:e.showPassword?X.value?"text":"password":e.type,disabled:t(C),formatter:e.formatter,parser:e.parser,readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.label,placeholder:e.placeholder,style:e.inputStyle,form:a.form,onCompositionstart:xe,onCompositionupdate:we,onCompositionend:_e,onInput:me,onFocus:Se,onBlur:$e,onChange:be,onKeydown:Ce}),null,16,Ht),T(" suffix slot "),t(Z)?(_(),F("span",{key:1,class:R(t(c).e("suffix"))},[o("span",{class:R(t(c).e("suffix-inner")),onClick:re},[!t(s)||!t(x)||!t(k)?(_(),F(ee,{key:0},[ue(e.$slots,"suffix"),e.suffixIcon?(_(),H(t(ne),{key:0,class:R(t(c).e("icon"))},{default:U(()=>[(_(),H(de(e.suffixIcon)))]),_:1},8,["class"])):T("v-if",!0)],64)):T("v-if",!0),t(s)?(_(),H(t(ne),{key:1,class:R([t(c).e("icon"),t(c).e("clear")]),onMousedown:dt(t(ct),["prevent"]),onClick:ke},{default:U(()=>[Q(t(ut))]),_:1},8,["class","onMousedown"])):T("v-if",!0),t(x)?(_(),H(t(ne),{key:2,class:R([t(c).e("icon"),t(c).e("password")]),onClick:Oe},{default:U(()=>[(_(),H(de(t(l))))]),_:1},8,["class"])):T("v-if",!0),t(k)?(_(),F("span",{key:3,class:R(t(c).e("count"))},[o("span",{class:R(t(c).e("count-inner"))},f(t(z))+" / "+f(t(E).maxlength),3)],2)):T("v-if",!0),t(Y)&&t(n)&&t(ie)?(_(),H(t(ne),{key:4,class:R([t(c).e("icon"),t(c).e("validateIcon"),t(c).is("loading",t(Y)==="validating")])},{default:U(()=>[(_(),H(de(t(n))))]),_:1},8,["class"])):T("v-if",!0)],2)],2)):T("v-if",!0)],2),T(" append slot "),e.$slots.append?(_(),F("div",{key:1,class:R(t(c).be("group","append"))},[ue(e.$slots,"append")],2)):T("v-if",!0)],64)):(_(),F(ee,{key:1},[T(" textarea "),o("textarea",ye({id:t(S),ref_key:"textarea",ref:N,class:t(L).e("inner")},t(E),{tabindex:e.tabindex,disabled:t(C),readonly:e.readonly,autocomplete:e.autocomplete,style:t(I),"aria-label":e.label,placeholder:e.placeholder,form:a.form,onCompositionstart:xe,onCompositionupdate:we,onCompositionend:_e,onInput:me,onFocus:Se,onBlur:$e,onChange:be,onKeydown:Ce}),null,16,Ut),t(k)?(_(),F("span",{key:0,style:pt(G.value),class:R(t(c).e("count"))},f(t(z))+" / "+f(t(E).maxlength),7)):T("v-if",!0)],64))],16,Bt)),[[lt,e.type!=="hidden"]])}});var jt=mt(Zt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const Kt=ft(jt);const Wt=o("span",{class:"dialog-footer"},null,-1),Yt={__name:"dialog",props:["dialogVisible","data"],emits:["closeDialog"],setup(u,{emit:i}){const r=u;let a=M();async function v(){Dt.preview(a.value,`

`+w.value)}function m(d){if(!d)return"0.00";var d=Math.round(parseFloat(d)*100)/100,S=d.toString().split(".");if(S.length==1)return d=d.toString()+".00",d;if(S.length>1)return S[1].length<2&&(d=d.toString()+"0"),d}g(()=>r.dialogVisible);function h(D,d=0){let S=`
`;const P=C=>"  ".repeat(C);for(const[C,c]of Object.entries(D))typeof c=="object"&&c!==null?(S+=`${P(d)}- **${C}**
`,S+=h(c,d+1)):S+=`${P(d)}- ${C}: ${c}
`;return S}function $(D){return new Date(D).toISOString()}let w=g(()=>{let D=()=>{let S="";for(const P in r.data.resources){const C=r.data.resources[P];S+=`The resource with ID ${C.resourceId} was originally planned to have ${m(C.plannedUnits)} units. The initial planned usage rate was ${m(C.plannedUnitsPerHour)} units per hour, and it currently remains at ${m(C.Units)} units per hour. However, after optimization, the new usage rate is ${m(C.newUnitsPerHour)} units per hour, and the new daily usage is ${m(C.newUnitsPerDay)} units per day.
`}return S};return`This is a task named '${r.data.name}' categorized as '${r.data.type}', and it is ${r.data.critical==!0?"":"not"} a Critical Task.
   Before optimization,
   it is scheduled to start on ${$(r.data.plannedStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${$(r.data.plannedFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${r.data.remainingDuration} hours. 
  After optimization,
   it is scheduled to start on ${$(r.data.newStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${$(r.data.newFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${r.data.newDuration} hours. 
Resources:
${D()}As of now, the task has not commenced and is labeled as '${r.data.status}.' The task's duration ratio is ${m(r.data.durationRatio)}.`+h(r.data)});const E=()=>{i("closeDialog")};return(D,d)=>{const S=It;return _(),H(S,{onOpen:v,onClose:E,modelValue:r.dialogVisible,"onUpdate:modelValue":d[0]||(d[0]=P=>r.dialogVisible=P),title:"Detailed content",width:"50%",draggable:""},{footer:U(()=>[Wt]),default:U(()=>[o("span",null,f(t(w).id),1),o("div",{ref_key:"editorRef",ref:a},null,512)]),_:1},8,["modelValue"])}}};const Xt={class:"contain"},Gt={class:"box"},qt={class:"sp"},Jt={class:"step"},Qt={class:"step"},ea={class:"maintop"},ta={class:"item"},aa={class:"title"},sa={class:"center"},na={class:"changed"},oa={class:"base"},ia={class:"bottom"},ra={class:"item"},la={class:"title"},ua={class:"center"},da={class:"changed"},ca={class:"base"},pa={class:"bottom"},ma={class:"item"},fa={class:"title"},va={class:"center"},ha={class:"changed"},ya={class:"base"},ga={class:"bottom"},ba={class:"mainEchar1"},xa={class:"Echar1top"},wa=_t('<div class="choosebox" data-v-5943e205><div class="choose" data-v-5943e205><div style="background-color:#b0e054;" class="item" data-v-5943e205></div><div data-v-5943e205>Optimized</div></div><div class="choose" data-v-5943e205><div style="background-color:#5474c4;" class="item" data-v-5943e205></div><div data-v-5943e205>Baseline</div></div><div class="choose" data-v-5943e205><div style="background-color:red;" class="item" data-v-5943e205></div><div data-v-5943e205>Critical Path</div></div><div class="choose" data-v-5943e205><div style="background-color:pink;" class="item" data-v-5943e205></div><div data-v-5943e205>Critical Path(baseline)</div></div></div><div id="main" data-v-5943e205></div>',2),_a={ref:"main",style:{width:"1150px",height:"610px"},id:"myEcharts"},Sa={class:"mainEchar2"},$a={class:"Echar2top"},Ca={class:"resources-title"},ka={class:"types"},Ia={ref:"main01",style:{width:"1150px",height:"610px"},id:"myEcharts01"},Da={class:"button"},Ta={__name:"index",setup(u){const i=ht(),r=yt();let a=M(!1),v=M("");const m=()=>{a.value=!1};gt((n,l,p)=>{n.name=="InputData",p()}),bt(()=>{i.selectChange&&(V.value="",c(),G(),i.selectChange=!1)});function h(n,l){return Math.round(n/l*1e4)/100+"%"}function $(n){return new Date(n).toISOString()}function w(n){const l=new Date(n);return`${l.getUTCFullYear()}/${l.getUTCMonth()+1}/${l.getUTCDate()} ${("0"+l.getUTCHours()).slice(-2)}:${("0"+l.getUTCMinutes()).slice(-2)}:${("0"+l.getUTCSeconds()).slice(-2)}`}const E=n=>n[0]===void 0||n[0].length===0?[]:n[0].xy.map(l=>{const[p,I]=Object.entries(l)[0];return{value:[$(parseInt(p)),I],name:$(parseInt(p))+I+n[1]}});let D=$t,d=M(2),S,P=g(()=>i.selectedData?i.selectedData.baselineTasks.filter(l=>l.critical):void 0);function C(n){return`<span >${n}</span>`}function c(){let n=[],l=i.selectedData.baselineTasks.map((s,x)=>{let k=i.selectedData.tasks.find(z=>z.id===s.id);return n.push(k),x=i.selectedData.baselineTasks.length-x,{name:s.name,value:[x,$(s.newStart),$(s.newFinish),s],itemStyle:{color:s.critical?"pink":void 0}}});n=n.map((s,x)=>(x=n.length-x+.2,{id:s.id,name:s.name,value:[x,$(s.newStart),$(s.newFinish),s],itemStyle:{color:s.critical?"red":void 0}}));let p=D.init(document.getElementById("myEcharts"),"purple-passion");p.on("click",function(s){v.value=s.data.value[3],a.value=!0});var I;let b=(s,x)=>{let k=x.coord([x.value(1),x.value(0)]),z=x.coord([x.value(2),x.value(0)]),A=x.size([0,1])[1]*.5;return{type:"rect",shape:Ct({x:k[0],y:k[1]-A/2,width:Math.max(z[0]-k[0],1),height:A},s.coordSys),style:x.style(),focus:"self",blurScope:"coordinateSystem",emphasis:{}}};I={toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"weakFilter",xAxisIndex:[0],labelFormatter:function(s){return w(s)},moveHandleSize:15,height:15,moveHandleStyle:{}},{type:"slider",filterMode:"weakFilter",yAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",xAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",yAxisIndex:[0]}],legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",axisLabel:{formatter:function(s,x){return w(s)}}},yAxis:{name:"tasks"},selectedMode:"single",series:[{name:"baseline",type:"custom",data:l,large:!0,renderItem:b,encode:{x:[1,2],y:0}},{name:"new",type:"custom",data:n,large:!0,renderItem:b,encode:{x:[1,2],y:0}}],tooltip:{formatter:s=>{let x="Resources: <br/>";if(s.value[3].resources)for(const z in s.value[3].resources){let A=s.value[3].resources,Z=i.selectedData.newResources.find(pe=>pe.id==z);Z||(Z=""),console.log(Z),x+=` &nbsp&nbspResource &nbsp  ${Z==null?void 0:Z.name} &nbsp id: ${z}  <br/>&nbsp&nbsp&nbsp&nbspunits/hour:${j(A[z].plannedUnitsPerHour)}=> ${j(A[z].newUnitsPerHour)}<br/>`}function k(z){let A;switch(z){case"New":s.value[3].critical?A="red":A="#b0e054";break;case"Old":s.value[3].critical?A="pink":A="#5474c4"}return`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${A};"></span>`}return`${s.name}<br/>
        <div style='margin-top:20px'>
         ${k("New")} New: ${s.value[1].replace("T"," ").replace("Z","").slice(0,16)} -> ${s.value[2].replace("T"," ").replace("Z","").slice(0,16)}
         (${s.value[3].newDuration})
        <br/>
         ${k("Old")} Old: ${C($(s.value[3].plannedStart).replace("T"," ").replace("Z","").slice(0,16))} -> ${C($(s.value[3].plannedFinish).replace("T"," ").replace("Z","").slice(0,16))}
       (${C(s.value[3].plannedDuration)})
         <br/>
         ${x}
        </div>`}}},I&&p.setOption(I),p.on("mousemove",function(s){p.dispatchAction({type:"highlight",dataIndex:s.dataIndex})}),S=D.init(document.getElementById("myEcharts01"),"purple-passion"),S.on("mousemove",function(s){S.dispatchAction({type:"highlight",name:s.name})}),S.on("click",function(s){console.log(s.name),S.dispatchAction({type:"select",name:s.name})})}let L=M("");function j(l){if(!l)return"0.00";var l=Math.round(parseFloat(l)*100)/100,p=l.toString().split(".");if(p.length==1)return l=l.toString()+".00",l;if(p.length>1)return p[1].length<2&&(l=l.toString()+"0"),l}function N(n,l){return n.reduce(function(p,I){let b=I[l];return p[b]||(p[b]=[]),p[b].push(I),p},{})}let K=g(()=>{let n=i.selectedData.baselineResources.map(p=>({id:p.id,name:p.name,type:p.type})),l=N(n,"type");if(L.value){const p=new RegExp(L.value,"i");let I={};for(let b in l)I[b]=l[b].filter(s=>p.test(s.name));return I}else return l}),te=g(()=>{var p;const n=i.selectedData.baselineResources;let l="base";return V.value?[n.filter(b=>b.id&&b.id===V.value)[0].distribution,l]:n.length==0?[]:(V.value=n[0].id,[(p=n[0])==null?void 0:p.distribution,l])}),W=g(()=>{var p;const n=i.selectedData.newResources;let l="new";return V.value?[n.filter(b=>b.id&&b.id===V.value)[0].distribution,l]:n.length==0?[]:[(p=n[0])==null?void 0:p.distribution,l]}),X=g(()=>({toolbox:{feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"none"},{type:"slider",filterMode:"none"},{type:"inside",filterMode:"none"},{type:"inside",filterMode:"none"}],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},animation:!1,legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",axisLabel:{formatter:"{yyyy}-{MM}-{dd}"}},yAxis:{name:"units / day"},series:[{name:"baseline",type:"bar",data:E(te.value),large:!0,selectedMode:"single",select:{itemStyle:{color:"red",borderWidth:"5px"}},emphasis:{focus:"self",blurScope:"coordinateSystem"}},{name:"new",type:"bar",data:E(W.value),large:!0,selectedMode:"single",select:{itemStyle:{color:"red",borderWidth:"5px"}},emphasis:{focus:"series",blurScope:"coordinateSystem"}}]}));function G(){S.setOption(X.value)}oe(d,()=>{G()});async function q(){r.push({name:"OptimizedReport"}),i.active=3}let V=M("");function ie(){r.push({name:"BaselineSummary"}),i.active=1}function Y(n){V.value=n}return oe(V,()=>{G()}),(n,l)=>{const p=Kt,I=xt("v-btn"),b=St;return _(),F(ee,null,[o("div",Xt,[o("div",Gt,[o("h2",null,[ce(f(n.$t("optimizedSummary.title[0]"))+" ",1),o("span",qt,f(t(i).SummaryData.group),1),o("div",Jt,[o("span",null,f(t(i).setting.Steps)+" "+f(n.$t("optimizedSummary.title[1]")),1)]),o("div",Qt,[o("span",null,f(`${t(i).setting.Ratio[0]*100}% - ${t(i).setting.Ratio[1]*100}% ${n.$t("optimizedSummary.title[2]")}`),1)])]),o("div",ea,[o("div",ta,[o("div",aa,f(n.$t("optimizedSummary.header[0]")),1),o("div",sa,[o("span",na,f(t(i).SummaryData.changedDuration)+"/",1),o("span",oa,f(t(i).SummaryData.baseDuration),1)]),o("div",ia,f(h(t(i).SummaryData.changedDuration,t(i).SummaryData.baseDuration)),1)]),o("div",ra,[o("div",la,f(n.$t("optimizedSummary.header[1]")),1),o("div",ua,[o("span",da,f(t(i).SummaryData.changgedTasks)+"/",1),o("span",ca,f(t(i).SummaryData.TotalTasks),1)]),o("div",pa,f(h(t(i).SummaryData.changgedTasks,t(i).SummaryData.TotalTasks)),1)]),o("div",ma,[o("div",fa,f(n.$t("optimizedSummary.header[2]")),1),o("div",va,[o("span",ha,f(t(P).length)+"/",1),o("span",ya,f(t(i).selectedData.baselineTasks.length),1)]),o("div",ga,f(h(t(P).length,t(i).selectedData.baselineTasks.length)),1)])]),o("div",ba,[o("div",xa,[o("div",null,f(n.$t("optimizedSummary.chartName[0]")),1)]),o("span",null,f(n.$t("optimizedSummary.chartName[1]")),1),wa,o("div",_a,null,512)]),o("div",Sa,[o("div",$a,[o("div",null,f(n.$t("optimizedSummary.chartName[2]")),1)]),o("span",null,f(n.$t("optimizedSummary.chartName[3]")),1),Q(p,{modelValue:t(L),"onUpdate:modelValue":l[0]||(l[0]=s=>wt(L)?L.value=s:L=s),placeholder:"Search Resources"},null,8,["modelValue"]),(_(!0),F(ee,null,Ve(t(K),(s,x)=>(_(),F("div",null,[o("div",Ca,f(x)+" Resources",1),o("div",ka,[(_(!0),F(ee,null,Ve(s,(k,z)=>(_(),F("div",{key:z,class:"type"},[Q(I,{variant:"text",value:z,class:R({activeType:t(V)==k.id}),onClick:()=>{Y(k.id)}},{default:U(()=>[ce(f(k.name)+" "+f(k.type),1)]),_:2},1032,["value","class","onClick"])]))),128))])]))),256)),o("div",Ia,null,512)]),o("div",Da,[Q(b,{onClick:ie,class:"btnback"},{default:U(()=>[ce(f(n.$t("optimizedSummary.btn[0]")),1)]),_:1}),Q(b,{onClick:q,class:"btngo"},{default:U(()=>[ce(f(n.$t("optimizedSummary.btn[1]")),1)]),_:1})])])]),Q(Yt,{onCloseDialog:m,data:t(v),dialogVisible:t(a)},null,8,["data","dialogVisible"])],64)}}},Pa=vt(Ta,[["__scopeId","data-v-5943e205"]]);export{Pa as default};
