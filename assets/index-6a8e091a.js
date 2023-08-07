import{j as F,ao as q,ap as G,v as K,aq as H,ar as U,as as de,T as B,a3 as ce,m as T,at as me,R as pe,l as M,u as L,x as V,y as x,B as o,au as X,av as Y,A as a,aw as O,z as C,D as j,ai as S,E as n,X as Z,_ as W,ax as J,C as Q,ay as be,az as fe,aA as ve,aB as ee,ac as ye,aC as P,aD as he,a8 as I,a9 as ge,K as Se,aE as ae,aF as _e,ak as ke,ag as De,aG as $e,al as Ce,am as Te,an as Re,Y as w,H as E,aH as we}from"./index-0e46e161.js";import{e as Be,i as Ee,r as Me}from"./index-11e546f7.js";import{e as Ve}from"./ecStat-959362bb.js";import{a as xe}from"./index-217b3bb1.js";const te=F({size:q,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),ze=F({...te,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),se={[G]:m=>K(m)||H(m)||U(m),[de]:m=>K(m)||H(m)||U(m)},le=Symbol("radioGroupKey"),oe=(m,t)=>{const r=B(),l=ce(le,void 0),p=T(()=>!!l),g=T({get(){return p.value?l.modelValue:m.modelValue},set(y){p.value?l.changeEvent(y):t&&t(G,y),r.value.checked=m.modelValue===m.label}}),v=me(T(()=>l==null?void 0:l.size)),f=pe(T(()=>l==null?void 0:l.disabled)),u=B(!1),d=T(()=>f.value||p.value&&g.value!==m.label?-1:0);return{radioRef:r,isGroup:p,radioGroup:l,focus:u,size:v,disabled:f,tabIndex:d,modelValue:g}},Ae=["value","name","disabled"],Ie=M({name:"ElRadio"}),Fe=M({...Ie,props:ze,emits:se,setup(m,{emit:t}){const r=m,l=L("radio"),{radioRef:p,radioGroup:g,focus:v,size:f,disabled:u,modelValue:d}=oe(r,t);function y(){J(()=>t("change",d.value))}return(i,s)=>{var b;return V(),x("label",{class:C([a(l).b(),a(l).is("disabled",a(u)),a(l).is("focus",a(v)),a(l).is("bordered",i.border),a(l).is("checked",a(d)===i.label),a(l).m(a(f))])},[o("span",{class:C([a(l).e("input"),a(l).is("disabled",a(u)),a(l).is("checked",a(d)===i.label)])},[X(o("input",{ref_key:"radioRef",ref:p,"onUpdate:modelValue":s[0]||(s[0]=R=>O(d)?d.value=R:null),class:C(a(l).e("original")),value:i.label,name:i.name||((b=a(g))==null?void 0:b.name),disabled:a(u),type:"radio",onFocus:s[1]||(s[1]=R=>v.value=!0),onBlur:s[2]||(s[2]=R=>v.value=!1),onChange:y},null,42,Ae),[[Y,a(d)]]),o("span",{class:C(a(l).e("inner"))},null,2)],2),o("span",{class:C(a(l).e("label")),onKeydown:s[3]||(s[3]=Z(()=>{},["stop"]))},[j(i.$slots,"default",{},()=>[S(n(i.label),1)])],34)],2)}}});var Ne=W(Fe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Pe=F({...te,name:{type:String,default:""}}),Ge=["value","name","disabled"],Le=M({name:"ElRadioButton"}),Oe=M({...Le,props:Pe,setup(m){const t=m,r=L("radio"),{radioRef:l,focus:p,size:g,disabled:v,modelValue:f,radioGroup:u}=oe(t),d=T(()=>({backgroundColor:(u==null?void 0:u.fill)||"",borderColor:(u==null?void 0:u.fill)||"",boxShadow:u!=null&&u.fill?`-1px 0 0 0 ${u.fill}`:"",color:(u==null?void 0:u.textColor)||""}));return(y,i)=>{var s;return V(),x("label",{class:C([a(r).b("button"),a(r).is("active",a(f)===y.label),a(r).is("disabled",a(v)),a(r).is("focus",a(p)),a(r).bm("button",a(g))])},[X(o("input",{ref_key:"radioRef",ref:l,"onUpdate:modelValue":i[0]||(i[0]=b=>O(f)?f.value=b:null),class:C(a(r).be("button","original-radio")),value:y.label,type:"radio",name:y.name||((s=a(u))==null?void 0:s.name),disabled:a(v),onFocus:i[1]||(i[1]=b=>p.value=!0),onBlur:i[2]||(i[2]=b=>p.value=!1)},null,42,Ge),[[Y,a(f)]]),o("span",{class:C(a(r).be("button","inner")),style:Q(a(f)===y.label?a(d):{}),onKeydown:i[3]||(i[3]=Z(()=>{},["stop"]))},[j(y.$slots,"default",{},()=>[S(n(y.label),1)])],38)],2)}}});var ne=W(Oe,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const je=F({id:{type:String,default:void 0},size:q,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),We=se,Ke=["id","aria-label","aria-labelledby"],He=M({name:"ElRadioGroup"}),Ue=M({...He,props:je,emits:We,setup(m,{emit:t}){const r=m,l=L("radio"),p=be(),g=B(),{formItem:v}=fe(),{inputId:f,isLabeledByFormItem:u}=ve(r,{formItemContext:v}),d=i=>{t(G,i),J(()=>t("change",i))};ee(()=>{const i=g.value.querySelectorAll("[type=radio]"),s=i[0];!Array.from(i).some(b=>b.checked)&&s&&(s.tabIndex=0)});const y=T(()=>r.name||p.value);return ye(le,P({...he(r),changeEvent:d,name:y})),I(()=>r.modelValue,()=>{r.validateEvent&&(v==null||v.validate("change").catch(i=>ge()))}),(i,s)=>(V(),x("div",{id:a(f),ref_key:"radioGroupRef",ref:g,class:C(a(l).b("group")),role:"radiogroup","aria-label":a(u)?void 0:i.label||"radio-group","aria-labelledby":a(u)?a(v).labelId:void 0},[j(i.$slots,"default")],10,Ke))}});var ie=W(Ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const qe=Se(Ne,{RadioButton:ne,RadioGroup:ie}),Xe=ae(ie);ae(ne);const Ye={class:"echarts-box"},Ze={__name:"index",props:{width:{type:String},height:{type:String},options:{type:Object}},setup(m){const t=m;let r=Be;ee(()=>{l()});function l(){let p=r.init(document.getElementById("myEcharts"),"purple-passion");p.setOption({...t.options,dataZoom:[{type:"inside",throttle:50}],tooltip:{trigger:"axis"}}),window.onresize=function(){p.resize()}}return(p,g)=>(V(),x("div",Ye,[o("div",{id:"myEcharts",style:Q({width:t.firstwidth,height:t.height})},null,4)]))}};var Je=Ve;const Qe=_e(Je);const ea={class:"contain"},aa={class:"step"},ta={class:"step"},sa={class:"main"},la={class:"left"},oa={class:"lefttop"},na={class:"right"},ia={class:"righttop"},ra={class:"rightbutton"},ua={__name:"index",setup(m){const t=De();let r=B("Balanced1");$e((e,c,k)=>{e.name=="InputData"&&(r=B(""),r.value="Balanced1",b.value=0,g()),k()});let l=P({preset:"Balanced",fileName:t.file.name,step:3});function p(e,c){return Math.round(e/c*1e4)/100+"%"}function g(){t.taskData=[],Object.keys(t.dataArray).forEach(e=>{t.dataArray[e].all=[],t.dataArray[e].data=[]}),t.end.data=!1}const v=Ce();function f(e,c,k){let h,D;return e=="baseline"?(h=16,D=1):(h=8,D=.5),{type:"scatter",selectedMode:"single",selectedOffset:10,select:{scale:2,itemStyle:{color:"#40aa97",borderColor:"#40aa97",shadowColor:"#40aa97",borderWidth:10,shadowBlur:30,opacity:1}},emphasis:{scale:2,focus:"series",blurScope:"coordinateSystem"},data:t.dataArray[e].data,name:e,symbolSize:h,itemStyle:{color:A=>c,borderWidth:1,borderColor:"#0b0f07",opacity:D}}}var u=T(()=>{const e=Object.values(t.dataArray).flatMap($=>$.data.map(N=>N.value[0])),c=parseFloat((Math.min(...e)*.95).toFixed(2)),k=parseFloat((Math.max(...e)*1.05).toFixed(2)),h=Object.values(t.dataArray).flatMap($=>$.data.map(N=>N.value[1])),D=parseFloat((Math.min(...h)*.95).toFixed(2)),A=parseFloat((Math.max(...h)*1.05).toFixed(2));return{toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},grid:{top:100,height:"65%"},xAxis:{name:"Duration (days)",nameLocation:"middle",padding:[10],height:100,min:c,max:k,nameTextStyle:{align:"center",padding:[30,0,0,0],fontWeight:"lighter",fontSize:20,color:"black"}},yAxis:{name:"Maximum Resource (units/day)",max:A,min:D,padding:[10],nameLocation:"end",nameTextStyle:{align:"center",padding:[0,0,0,100],fontWeight:"lighter",fontSize:16,color:"black"}},legend:{itemGap:40,data:[{name:"baseline",itemStyle:{color:"rgb(204, 204, 204)"}},{name:"Balanced",itemStyle:{color:"rgba(130, 181, 199, 0.9)"}},{name:"Fastest",itemStyle:{color:"rgba(247, 220, 91, 0.9)"}},{name:"Minimum_Resources",itemStyle:{color:"rgba(219, 121, 48, 0.9)"}},{name:"Levelled_Resources",itemStyle:{color:"rgba(170, 187, 93, 0.9)"}}],x:"left",itemWidth:15,itemHeight:15},series:[f("baseline","rgb(204, 204, 204)"),f("Balanced","rgba(130, 181, 199, 0.9)"),f("Fastest","rgba(247, 220, 91, 0.9)"),f("Minimum_Resources","rgba(219, 121, 48, 0.9)"),f("Levelled_Resources","rgba(170, 187, 93, 0.9)")]}});let d=null;I(r,()=>{d.setOption(u.value)}),I(t.dataArray,()=>{d.setOption(u.value)});function y(){d==null&&(d=Ee(document.getElementById("myEcharts"),"purple-passion")),Me(Qe.transform.clustering),d.on("click",function(e){d.dispatchAction({type:"select",name:e.name});let c=e.data.value[2].result;switch(l.preset=e.seriesName,l.step=c.step,e.seriesName=="baseline"?l.preset="Balanced":l.preset=e.seriesName,l.preset){case"Balanced":b.value=0;break;case"Fastest":b.value=1;break;case"Minimum_Resources":b.value=2;break;case"Levelled_Resources":b.value=3;break}R(c)})}function i(){d.setOption(u.value)}let s=P({baseDuration:"-",changedDuration:"-",changgedTasks:"-",TotalTasks:"-",baseCriticalPath:"-",changedCriticalPath:"-",TotalResources:"-",group:""}),b=B(0);function R(e){s.group=e.group,s.baseDuration=Math.ceil(e.baselineDurationDays),s.changedDuration=Math.ceil(e.projectDurationDays),s.changgedTasks=Math.ceil(e.changedTasksLen),s.TotalTasks=Math.ceil(e.baselineTasksLen),s.baseCriticalPath=Math.ceil(e.baselineCriticalTasksLen),s.changedCriticalPath=Math.ceil(e.newCriticalTasksLen),s.TotalResources=Math.ceil(e.totalResourceCount)}async function re(){l.fileName=t.file.name;let e=await xe.getOptimized({...l},t.file.size);t.SummaryData={...s},t.selectedData=null,t.selectedData=e.data,t.active=2,t.selectChange=!0,v.push({name:"optimizedSummary"})}let _=B(null);function ue(){let e=[];for(const c in t.dataArray){let k=we(t.dataArray[c].data);k.sort((h,D)=>h.value[2].result.loss-D.value[2].result.loss),e.push(k)}return e}function z(e){d.dispatchAction({type:"select",name:_.value[e][0].name}),r=_.value[e][0].name,l.preset=_.value[e][0].value[2].name,l.step=_.value[e][0].value[2].result.step,R(_.value[e][0].value[2].result)}return I(t.end,async()=>{t.end.data&&(_.value=await ue(),b.value=0,setTimeout(()=>{d.dispatchAction({type:"select",name:_.value[1][0].name}),R(_.value[1][0].value[2].result),l.preset="Balanced",l.step=_.value[1][0].value[2].result.step},0))},{deep:!0}),Te(()=>{y(),i(),t.SummaryData&&(s.group=t.SummaryData.group,s.baseDuration=t.SummaryData.baseDuration,s.changedDuration=t.SummaryData.changedDuration,s.changgedTasks=t.SummaryData.changgedTasks,s.TotalTasks=t.SummaryData.TotalTasks,s.baseCriticalPath=t.SummaryData.baseCriticalPath,s.changedCriticalPath=t.SummaryData.changedCriticalPath,s.TotalResources=t.SummaryData.TotalResources)}),(e,c)=>{const k=Ze,h=qe,D=Xe,A=Re("v-btn");return V(),x("div",ea,[o("h2",null,[S(n(e.$t("baselineSummary.title[0]"))+" ",1),o("div",aa,[o("span",null,n(a(t).setting.Steps)+" "+n(e.$t("baselineSummary.title[1]")),1)]),o("div",ta,[o("span",null,n(`${a(t).setting.Ratio[0]*100}% - ${a(t).setting.Ratio[1]*100}% ${e.$t("baselineSummary.title[2]")}`),1)])]),o("div",sa,[o("div",la,[o("div",oa,[o("div",null,n(e.$t("baselineSummary.chartName[0]")),1)]),w(k,{style:{width:"720px",height:"500px"},id:"myEcharts"})]),o("div",na,[o("div",ia,[o("div",null,n(e.$t("baselineSummary.Tsidebar[0]"))+" "+n(p(a(s).changedDuration,a(s).baseDuration)),1),o("h1",null,[S(n(a(s).changedDuration)+"/ ",1),o("span",null,n(a(s).baseDuration),1),S(" days ")]),o("div",null,n(e.$t("baselineSummary.Tsidebar[1]")),1),o("h1",null,[S(n(a(s).changgedTasks)+"/ ",1),o("span",null,n(a(s).TotalTasks),1)]),o("div",null,n(e.$t("baselineSummary.Tsidebar[2]"))+" "+n(p(a(s).baseCriticalPath,a(s).TotalTasks)),1),o("h1",null,[S(n(a(s).baseCriticalPath)+"/ ",1),o("span",null,n(a(s).TotalTasks),1)]),o("div",null,n(e.$t("baselineSummary.Tsidebar[3]")),1),o("h1",null,n(a(s).TotalResources),1)]),o("div",ra,[o("h1",null,n(e.$t("baselineSummary.Bsidebar[0]")),1),o("div",null,n(e.$t("baselineSummary.Bsidebar[1]")),1),w(D,{modelValue:a(b),"onUpdate:modelValue":c[4]||(c[4]=$=>O(b)?b.value=$:b=$),class:"radiobox"},{default:E(()=>[w(h,{onClick:c[0]||(c[0]=()=>{z(1)}),label:0},{default:E(()=>[S(n(e.$t("types.typeShow[1]"))+" ",1),o("span",null,n(e.$t("types.msg[0]")),1)]),_:1}),w(h,{onClick:c[1]||(c[1]=$=>z(2)),label:1},{default:E(()=>[S(n(e.$t("types.typeShow[2]"))+" ",1),o("span",null,n(e.$t("types.msg[1]")),1)]),_:1}),w(h,{label:2,onClick:c[2]||(c[2]=$=>z(3))},{default:E(()=>[S(n(e.$t("types.typeShow[3]"))+" ",1),o("span",null,n(e.$t("types.msg[2]")),1)]),_:1}),w(h,{label:3,onClick:c[3]||(c[3]=$=>z(4))},{default:E(()=>[S(n(e.$t("types.typeShow[4]"))+" ",1),o("span",null,n(e.$t("types.msg[3]")),1)]),_:1})]),_:1},8,["modelValue"])]),w(A,{disabled:!a(t).end.data,onClick:re,class:"btn",icon:"el-icon-delete"},{default:E(()=>[S(n(e.$t("next")),1)]),_:1},8,["disabled"])])])])}}},ba=ke(ua,[["__scopeId","data-v-c56dd8b6"]]);export{ba as default};
