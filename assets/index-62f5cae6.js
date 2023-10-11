import{j as N,at as J,au as L,v as K,av as H,aw as q,ax as de,T as w,a3 as ce,m as B,ay as pe,R as me,l as E,u as U,x as I,y as z,B as i,ao as X,az as Y,A as e,aA as O,z as $,D as j,aj as k,E as f,X as Z,_ as W,aB as Q,C as ee,aC as be,aD as fe,aE as ye,am as ae,ac as ve,aF as P,aG as he,a8 as F,a9 as ge,K as Se,aH as te,aI as _e,al as Re,ag as Ce,aJ as De,aK as ke,as as $e,an as Be,Y as _,H as T,aL as Te,aq as we,ar as xe}from"./index-d7b40158.js";import{e as Ee,i as Me,r as Ve}from"./index-11e546f7.js";import{e as Ie,C as A}from"./index-a987af5e.js";import{a as ze}from"./index-ee7bc3dc.js";const se=N({size:J,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),Ae=N({...se,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),le={[L]:r=>K(r)||H(r)||q(r),[de]:r=>K(r)||H(r)||q(r)},oe=Symbol("radioGroupKey"),ne=(r,l)=>{const u=w(),s=ce(oe,void 0),a=B(()=>!!s),c=B({get(){return a.value?s.modelValue:r.modelValue},set(m){a.value?s.changeEvent(m):l&&l(L,m),u.value.checked=r.modelValue===r.label}}),y=pe(B(()=>s==null?void 0:s.size)),v=me(B(()=>s==null?void 0:s.disabled)),o=w(!1),p=B(()=>v.value||a.value&&c.value!==r.label?-1:0);return{radioRef:u,isGroup:a,radioGroup:s,focus:o,size:y,disabled:v,tabIndex:p,modelValue:c}},Fe=["value","name","disabled"],Ne=E({name:"ElRadio"}),Ge=E({...Ne,props:Ae,emits:le,setup(r,{emit:l}){const u=r,s=U("radio"),{radioRef:a,radioGroup:c,focus:y,size:v,disabled:o,modelValue:p}=ne(u,l);function m(){Q(()=>l("change",p.value))}return(n,b)=>{var g;return I(),z("label",{class:$([e(s).b(),e(s).is("disabled",e(o)),e(s).is("focus",e(y)),e(s).is("bordered",n.border),e(s).is("checked",e(p)===n.label),e(s).m(e(v))])},[i("span",{class:$([e(s).e("input"),e(s).is("disabled",e(o)),e(s).is("checked",e(p)===n.label)])},[X(i("input",{ref_key:"radioRef",ref:a,"onUpdate:modelValue":b[0]||(b[0]=M=>O(p)?p.value=M:null),class:$(e(s).e("original")),value:n.label,name:n.name||((g=e(c))==null?void 0:g.name),disabled:e(o),type:"radio",onFocus:b[1]||(b[1]=M=>y.value=!0),onBlur:b[2]||(b[2]=M=>y.value=!1),onChange:m},null,42,Fe),[[Y,e(p)]]),i("span",{class:$(e(s).e("inner"))},null,2)],2),i("span",{class:$(e(s).e("label")),onKeydown:b[3]||(b[3]=Z(()=>{},["stop"]))},[j(n.$slots,"default",{},()=>[k(f(n.label),1)])],34)],2)}}});var Pe=W(Ge,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Le=N({...se,name:{type:String,default:""}}),Ue=["value","name","disabled"],Oe=E({name:"ElRadioButton"}),je=E({...Oe,props:Le,setup(r){const l=r,u=U("radio"),{radioRef:s,focus:a,size:c,disabled:y,modelValue:v,radioGroup:o}=ne(l),p=B(()=>({backgroundColor:(o==null?void 0:o.fill)||"",borderColor:(o==null?void 0:o.fill)||"",boxShadow:o!=null&&o.fill?`-1px 0 0 0 ${o.fill}`:"",color:(o==null?void 0:o.textColor)||""}));return(m,n)=>{var b;return I(),z("label",{class:$([e(u).b("button"),e(u).is("active",e(v)===m.label),e(u).is("disabled",e(y)),e(u).is("focus",e(a)),e(u).bm("button",e(c))])},[X(i("input",{ref_key:"radioRef",ref:s,"onUpdate:modelValue":n[0]||(n[0]=g=>O(v)?v.value=g:null),class:$(e(u).be("button","original-radio")),value:m.label,type:"radio",name:m.name||((b=e(o))==null?void 0:b.name),disabled:e(y),onFocus:n[1]||(n[1]=g=>a.value=!0),onBlur:n[2]||(n[2]=g=>a.value=!1)},null,42,Ue),[[Y,e(v)]]),i("span",{class:$(e(u).be("button","inner")),style:ee(e(v)===m.label?e(p):{}),onKeydown:n[3]||(n[3]=Z(()=>{},["stop"]))},[j(m.$slots,"default",{},()=>[k(f(m.label),1)])],38)],2)}}});var ie=W(je,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const We=N({id:{type:String,default:void 0},size:J,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),Ke=le,He=["id","aria-label","aria-labelledby"],qe=E({name:"ElRadioGroup"}),Je=E({...qe,props:We,emits:Ke,setup(r,{emit:l}){const u=r,s=U("radio"),a=be(),c=w(),{formItem:y}=fe(),{inputId:v,isLabeledByFormItem:o}=ye(u,{formItemContext:y}),p=n=>{l(L,n),Q(()=>l("change",n))};ae(()=>{const n=c.value.querySelectorAll("[type=radio]"),b=n[0];!Array.from(n).some(g=>g.checked)&&b&&(b.tabIndex=0)});const m=B(()=>u.name||a.value);return ve(oe,P({...he(u),changeEvent:p,name:m})),F(()=>u.modelValue,()=>{u.validateEvent&&(y==null||y.validate("change").catch(n=>ge()))}),(n,b)=>(I(),z("div",{id:e(v),ref_key:"radioGroupRef",ref:c,class:$(e(s).b("group")),role:"radiogroup","aria-label":e(o)?void 0:n.label||"radio-group","aria-labelledby":e(o)?e(y).labelId:void 0},[j(n.$slots,"default")],10,He))}});var re=W(Je,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const Xe=Se(Pe,{RadioButton:ie,RadioGroup:re}),Ye=te(re);te(ie);const Ze={class:"echarts-box"},Qe={__name:"index",props:{width:{type:String},height:{type:String},options:{type:Object}},setup(r){const l=r;let u=Ee;ae(()=>{s()});function s(){let a=u.init(document.getElementById("myEcharts"),"purple-passion");a.setOption({...l.options,dataZoom:[{type:"inside",throttle:50}],tooltip:{trigger:"axis"}}),window.onresize=function(){a.resize()}}return(a,c)=>(I(),z("div",Ze,[i("div",{id:"myEcharts",style:ee({width:l.firstwidth,height:l.height})},null,4)]))}};var ea=Ie;const aa=_e(ea);const ta=r=>(we("data-v-ee7d592e"),r=r(),xe(),r),sa={class:"step"},la={class:"step"},oa={class:"main"},na={class:"left"},ia={class:"lefttop"},ra={class:"right"},ua={class:"righttop"},da={class:"rightbutton"},ca=ta(()=>i("span",null,"Satisfies all constraints",-1)),pa={__name:"index",setup(r){const l=Ce();let u=w("Balanced1"),s=P({preset:"Balanced",fileName:l.file.name,step:3}),a=P({baseDuration:"-",changedDuration:"-",changgedTasks:"-",TotalTasks:"-",baseCriticalPath:"-",changedCriticalPath:"-",TotalResources:"-",group:"",planDurationDays:"-"}),c=w(0);De((t,d,C)=>{C()}),ke(()=>{n(),b()});function y(t,d){return Math.round(t/d*1e4)/100+"%"}const v=$e();F(u,()=>{o.setOption(m.value)}),F(l.dataArray,()=>{o.setOption(m.value)}),F(l.end,async()=>{l.end.data?(R.value=ue(),c.value=0,setTimeout(()=>{o.dispatchAction({type:"select",name:R.value[1][0].name}),g(R.value[1][0].value[2].result),s.preset="Balanced",s.step=R.value[1][0].value[2].result.step},0)):(u=w(""),u.value="Balanced1",c.value=0,a.baseDuration="-",a.changedDuration="-",a.changgedTasks="-",a.TotalTasks="-",a.baseCriticalPath="-",a.changedCriticalPath="-",a.TotalResources="-",a.group="",a.maxResourceUnit="-",a.BasemaxResourceUnit="-",a.planDurationDays="-")},{deep:!0});let o=null;function p(t,d,C){let h,D;return t=="baseline"?(h=16,D=1):(h=8,D=.5),{type:"scatter",selectedMode:"single",selectedOffset:10,symbol:x=>{let S="path://M18.018,15.344c-0.285,0-0.555-0.162-0.684-0.441l-6.595-12.076l-6.594,12.076c-0.128,0.279-0.398,0.441-0.684,0.441c-0.491,0-0.706-0.638-0.249-0.929l6.997-12.808l-6.997-12.809c-0.457-0.291-0.242-0.929,0.249-0.929c0.286,0,0.556,0.162,0.684,0.441l6.595,12.076l6.594-12.076c0.127-0.279,0.398-0.441,0.684-0.441c0.49,0,0.705,0.638,0.249,0.929l-6.998,12.808l6.998,12.809c0.456,0.291,0.241,0.929-0.249,0.929H18.018z";return x[2].result.constraintLoss>0?S:"circle"},select:{scale:2,itemStyle:{color:"#40aa97",borderColor:"#40aa97",shadowColor:"#40aa97",borderWidth:10,shadowBlur:30,opacity:1}},emphasis:{scale:2,focus:"series",blurScope:"coordinateSystem"},data:l.dataArray[t].data,name:t,symbolSize:h,itemStyle:{color:x=>d,borderWidth:1,borderColor:"#0b0f07",opacity:D}}}var m=B(()=>{const t=Object.values(l.dataArray).flatMap(S=>S.data.map(G=>G.value[0])),d=parseFloat((Math.min(...t)*.95).toFixed(2)),C=parseFloat((Math.max(...t)*1.05).toFixed(2)),h=Object.values(l.dataArray).flatMap(S=>S.data.map(G=>G.value[1])),D=parseFloat((Math.min(...h)*.95).toFixed(2)),x=parseFloat((Math.max(...h)*1.05).toFixed(2));return{toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},grid:{top:100,height:"65%"},xAxis:{name:"Duration (days)",nameLocation:"middle",padding:[10],height:100,min:d,max:C,nameTextStyle:{align:"center",padding:[30,0,0,0],fontWeight:"lighter",fontSize:20,color:"black"}},yAxis:{name:"Maximum Resource (units/day)",max:x,min:D,padding:[10],nameLocation:"end",nameTextStyle:{align:"center",padding:[0,0,0,100],fontWeight:"lighter",fontSize:16,color:"black"}},legend:{itemGap:40,data:[{name:"baseline",itemStyle:{color:"rgb(204, 204, 204)"}},{name:"Balanced",itemStyle:{color:"rgba(130, 181, 199, 0.9)"}},{name:"Fastest",itemStyle:{color:"rgba(247, 220, 91, 0.9)"}},{name:"Minimum_Resources",itemStyle:{color:"rgba(219, 121, 48, 0.9)"}},{name:"Levelled_Resources",itemStyle:{color:"rgba(170, 187, 93, 0.9)"}}],x:"left",itemWidth:15,itemHeight:15},series:[p("baseline","rgb(204, 204, 204)"),p("Balanced","rgba(130, 181, 199, 0.9)"),p("Fastest","rgba(247, 220, 91, 0.9)"),p("Minimum_Resources","rgba(219, 121, 48, 0.9)"),p("Levelled_Resources","rgba(170, 187, 93, 0.9)")]}});function n(){o==null&&(o=Me(document.getElementById("myEcharts"),"purple-passion")),Ve(aa.transform.clustering),o.on("click",function(t){o.dispatchAction({type:"select",name:t.name});let d=t.data.value[2].result;switch(s.preset=t.seriesName,s.step=d.step,t.seriesName=="baseline"?s.preset="Balanced":s.preset=t.seriesName,s.preset){case"Balanced":c.value=0;break;case"Fastest":c.value=1;break;case"Minimum_Resources":c.value=2;break;case"Levelled_Resources":c.value=3;break}g(d)})}function b(){o.setOption(m.value)}function g(t){a.group=t.group,a.baseDuration=Math.ceil(t.baselineDurationDaysWithCalendar),a.changedDuration=Math.ceil(t.projectDurationDaysWithCalendar),a.planDurationDays=l.originalDurationDays,a.changgedTasks=Math.ceil(t.changedTasksLen),a.TotalTasks=Math.ceil(t.baselineTasksLen),a.baseCriticalPath=Math.ceil(t.baselineCriticalTasksLen),a.changedCriticalPath=Math.ceil(t.newCriticalTasksLen),a.TotalResources=Math.ceil(t.totalResourceCount),a.maxResourceUnit=Math.ceil(t.maxResourceUnitAgg),a.BasemaxResourceUnit=Math.ceil(l.dataArray.baseline.all[0].result.maxResourceUnitAgg)}async function M(){s.fileName=l.file.name;let t=await ze.getOptimized({...s},l.file.size);l.SummaryData={...a},l.selectedData=null,l.selectedData=t.data,l.active=2,l.selectChange=!0,v.push({name:"optimizedSummary"})}let R=w(null);function ue(){let t=[];for(const d in l.dataArray){let C=Te(l.dataArray[d].data);C.sort((h,D)=>h.value[2].result.loss-D.value[2].result.loss),t.push(C)}return t}function V(t){o.dispatchAction({type:"select",name:R.value[t][0].name}),u=R.value[t][0].name,s.preset=R.value[t][0].value[2].name,s.step=R.value[t][0].value[2].result.step,g(R.value[t][0].value[2].result)}return(t,d)=>{const C=Qe,h=Xe,D=Ye,x=Be("v-btn");return I(),z("div",null,[i("h2",null,[k(f(t.$t("baselineSummary.title[0]"))+" ",1),i("div",sa,[i("span",null,f(e(l).setting.Steps)+" "+f(t.$t("baselineSummary.title[1]")),1)]),i("div",la,[i("span",null,f(`${e(l).setting.Ratio[0]*100}% - ${e(l).setting.Ratio[1]*100}% ${t.$t("baselineSummary.title[2]")}`),1)])]),i("div",oa,[i("div",na,[i("div",ia,[i("div",null,f(t.$t("baselineSummary.chartName[0]")),1)]),_(C,{style:{width:"720px",height:"500px"},id:"myEcharts"})]),i("div",ra,[i("div",ua,[i("div",null,[_(A,{title:t.$t("baselineSummary.Tsidebar[0]"),height:150,precent:y(e(a).changedDuration-e(a).baseDuration,e(a).baseDuration),isPositive:!0,body:[e(a).changedDuration+" days",e(a).baseDuration+" days",e(a).planDurationDays+" days"]},null,8,["title","precent","body"]),_(A,{title:t.$t("baselineSummary.Tsidebar[1]"),height:150,precent:y(e(a).maxResourceUnit-e(a).BasemaxResourceUnit,e(a).BasemaxResourceUnit),isPositive:!1,body:[e(a).maxResourceUnit,e(a).BasemaxResourceUnit]},null,8,["title","precent","body"])]),i("div",null,[_(A,{title:t.$t("baselineSummary.Tsidebar[2]"),height:150,body:[e(a).changgedTasks,e(a).TotalTasks]},null,8,["title","body"]),_(A,{title:t.$t("baselineSummary.Tsidebar[3]"),height:150,body:[e(a).baseCriticalPath,e(a).TotalTasks]},null,8,["title","body"])])]),i("div",da,[i("h1",null,f(t.$t("baselineSummary.Bsidebar[0]")),1),_(D,{modelValue:e(c),"onUpdate:modelValue":d[5]||(d[5]=S=>O(c)?c.value=S:c=S),class:"radiobox"},{default:T(()=>[_(h,{onClick:d[0]||(d[0]=()=>{V(1)}),label:0},{default:T(()=>[k(f(t.$t("types.typeShow[1]"))+" ",1),i("span",null,f(t.$t("types.msg[0]")),1)]),_:1}),_(h,{onClick:d[1]||(d[1]=S=>V(2)),label:1},{default:T(()=>[k(f(t.$t("types.typeShow[2]"))+" ",1),i("span",null,f(t.$t("types.msg[1]")),1)]),_:1}),_(h,{label:2,onClick:d[2]||(d[2]=S=>V(3))},{default:T(()=>[k(f(t.$t("types.typeShow[3]"))+" ",1),i("span",null,f(t.$t("types.msg[2]")),1)]),_:1}),_(h,{label:3,onClick:d[3]||(d[3]=S=>V(4))},{default:T(()=>[k(f(t.$t("types.typeShow[4]"))+" ",1),i("span",null,f(t.$t("types.msg[3]")),1)]),_:1}),_(h,{label:3,onClick:d[4]||(d[4]=S=>V(4))},{default:T(()=>[k(" Constraint Compliance "),ca]),_:1})]),_:1},8,["modelValue"])]),_(x,{style:{outline:"none"},disabled:!e(l).end.data,onClick:M,class:"btn",color:"rgb(64, 170, 151)"},{default:T(()=>[k(f(t.$t("next")),1)]),_:1},8,["disabled"])])])])}}},va=Re(pa,[["__scopeId","data-v-ee7d592e"]]);export{va as default};
