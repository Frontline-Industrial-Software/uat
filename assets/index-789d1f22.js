import{j as F,ao as U,ap as G,v as W,aq as K,ar as H,as as ue,T as M,a3 as de,m as R,at as ce,R as me,l as V,u as L,x as A,y as x,B as o,au as q,av as X,A as e,aw as B,z as C,D as O,ai as _,E as i,X as Y,_ as j,ax as Z,C as J,ay as pe,az as be,aA as ve,aB as Q,ac as fe,aC as P,aD as ye,a8 as I,a9 as he,K as ge,aE as ee,aF as Se,ak as _e,ag as ke,aG as De,al as Te,am as Ce,an as Re,Y as $,H as w,aH as $e}from"./index-6cd1c199.js";import{e as Be,i as Ee,r as we}from"./index-11e546f7.js";import{e as Me}from"./ecStat-e43b55fb.js";import{a as Ve}from"./index-150fc974.js";const ae=F({size:U,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),Ae=F({...ae,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),te={[G]:p=>W(p)||K(p)||H(p),[ue]:p=>W(p)||K(p)||H(p)},se=Symbol("radioGroupKey"),le=(p,t)=>{const l=M(),r=de(se,void 0),f=R(()=>!!r),S=R({get(){return f.value?r.modelValue:p.modelValue},set(h){f.value?r.changeEvent(h):t&&t(G,h),l.value.checked=p.modelValue===p.label}}),b=ce(R(()=>r==null?void 0:r.size)),y=me(R(()=>r==null?void 0:r.disabled)),n=M(!1),c=R(()=>y.value||f.value&&S.value!==p.label?-1:0);return{radioRef:l,isGroup:f,radioGroup:r,focus:n,size:b,disabled:y,tabIndex:c,modelValue:S}},xe=["value","name","disabled"],ze=V({name:"ElRadio"}),Ie=V({...ze,props:Ae,emits:te,setup(p,{emit:t}){const l=p,r=L("radio"),{radioRef:f,radioGroup:S,focus:b,size:y,disabled:n,modelValue:c}=le(l,t);function h(){Z(()=>t("change",c.value))}return(u,s)=>{var v;return A(),x("label",{class:C([e(r).b(),e(r).is("disabled",e(n)),e(r).is("focus",e(b)),e(r).is("bordered",u.border),e(r).is("checked",e(c)===u.label),e(r).m(e(y))])},[o("span",{class:C([e(r).e("input"),e(r).is("disabled",e(n)),e(r).is("checked",e(c)===u.label)])},[q(o("input",{ref_key:"radioRef",ref:f,"onUpdate:modelValue":s[0]||(s[0]=k=>B(c)?c.value=k:null),class:C(e(r).e("original")),value:u.label,name:u.name||((v=e(S))==null?void 0:v.name),disabled:e(n),type:"radio",onFocus:s[1]||(s[1]=k=>b.value=!0),onBlur:s[2]||(s[2]=k=>b.value=!1),onChange:h},null,42,xe),[[X,e(c)]]),o("span",{class:C(e(r).e("inner"))},null,2)],2),o("span",{class:C(e(r).e("label")),onKeydown:s[3]||(s[3]=Y(()=>{},["stop"]))},[O(u.$slots,"default",{},()=>[_(i(u.label),1)])],34)],2)}}});var Fe=j(Ie,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Ne=F({...ae,name:{type:String,default:""}}),Pe=["value","name","disabled"],Ge=V({name:"ElRadioButton"}),Le=V({...Ge,props:Ne,setup(p){const t=p,l=L("radio"),{radioRef:r,focus:f,size:S,disabled:b,modelValue:y,radioGroup:n}=le(t),c=R(()=>({backgroundColor:(n==null?void 0:n.fill)||"",borderColor:(n==null?void 0:n.fill)||"",boxShadow:n!=null&&n.fill?`-1px 0 0 0 ${n.fill}`:"",color:(n==null?void 0:n.textColor)||""}));return(h,u)=>{var s;return A(),x("label",{class:C([e(l).b("button"),e(l).is("active",e(y)===h.label),e(l).is("disabled",e(b)),e(l).is("focus",e(f)),e(l).bm("button",e(S))])},[q(o("input",{ref_key:"radioRef",ref:r,"onUpdate:modelValue":u[0]||(u[0]=v=>B(y)?y.value=v:null),class:C(e(l).be("button","original-radio")),value:h.label,type:"radio",name:h.name||((s=e(n))==null?void 0:s.name),disabled:e(b),onFocus:u[1]||(u[1]=v=>f.value=!0),onBlur:u[2]||(u[2]=v=>f.value=!1)},null,42,Pe),[[X,e(y)]]),o("span",{class:C(e(l).be("button","inner")),style:J(e(y)===h.label?e(c):{}),onKeydown:u[3]||(u[3]=Y(()=>{},["stop"]))},[O(h.$slots,"default",{},()=>[_(i(h.label),1)])],38)],2)}}});var oe=j(Le,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const Oe=F({id:{type:String,default:void 0},size:U,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),je=te,We=["id","aria-label","aria-labelledby"],Ke=V({name:"ElRadioGroup"}),He=V({...Ke,props:Oe,emits:je,setup(p,{emit:t}){const l=p,r=L("radio"),f=pe(),S=M(),{formItem:b}=be(),{inputId:y,isLabeledByFormItem:n}=ve(l,{formItemContext:b}),c=u=>{t(G,u),Z(()=>t("change",u))};Q(()=>{const u=S.value.querySelectorAll("[type=radio]"),s=u[0];!Array.from(u).some(v=>v.checked)&&s&&(s.tabIndex=0)});const h=R(()=>l.name||f.value);return fe(se,P({...ye(l),changeEvent:c,name:h})),I(()=>l.modelValue,()=>{l.validateEvent&&(b==null||b.validate("change").catch(u=>he()))}),(u,s)=>(A(),x("div",{id:e(y),ref_key:"radioGroupRef",ref:S,class:C(e(r).b("group")),role:"radiogroup","aria-label":e(n)?void 0:u.label||"radio-group","aria-labelledby":e(n)?e(b).labelId:void 0},[O(u.$slots,"default")],10,We))}});var ne=j(He,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const Ue=ge(Fe,{RadioButton:oe,RadioGroup:ne}),qe=ee(ne);ee(oe);const Xe={class:"echarts-box"},Ye={__name:"index",props:{width:{type:String},height:{type:String},options:{type:Object}},setup(p){const t=p;let l=Be;Q(()=>{r()});function r(){let f=l.init(document.getElementById("myEcharts"),"purple-passion");f.setOption({...t.options,dataZoom:[{type:"inside",throttle:50}],tooltip:{trigger:"axis"}}),window.onresize=function(){f.resize()}}return(f,S)=>(A(),x("div",Xe,[o("div",{id:"myEcharts",style:J({width:t.firstwidth,height:t.height})},null,4)]))}};var Ze=Me;const Je=Se(Ze);const Qe={class:"contain"},ea={class:"step"},aa={class:"step"},ta={class:"main"},sa={class:"left"},la={class:"lefttop"},oa={class:"right"},na={class:"righttop"},ia={class:"rightbutton"},ra={__name:"index",setup(p){const t=ke();De((a,m,D)=>{a.name=="InputData"&&(c.value="Balanced1",v.value=0,f()),D()});let l=P({preset:"Balanced",fileName:t.file.name,step:3});function r(a,m){return Math.round(a/m*1e4)/100+"%"}function f(){t.taskData=[],Object.keys(t.dataArray).forEach(a=>{t.dataArray[a].all=[],t.dataArray[a].data=[]}),t.end.data=!1}const S=Te();function b(a,m,D){let g,T;return a=="baseline"?(g=16,T=1):(g=8,T=.5),{type:"scatter",selectedMode:"single",selectedOffset:10,select:{scale:2,itemStyle:{color:"#40aa97",borderColor:"#40aa97",shadowColor:"#40aa97",borderWidth:10,shadowBlur:30,opacity:1}},emphasis:{scale:2,focus:"series",blurScope:"coordinateSystem"},data:t.dataArray[a].data,name:a,symbolSize:g,itemStyle:{color:z=>m,borderWidth:1,borderColor:"#0b0f07",opacity:T}}}var y=R(()=>{const a=Object.values(t.dataArray).flatMap(E=>E.data.map(N=>N.value[0])),m=parseFloat((Math.min(...a)*.95).toFixed(2)),D=parseFloat((Math.max(...a)*1.05).toFixed(2)),g=Object.values(t.dataArray).flatMap(E=>E.data.map(N=>N.value[1])),T=parseFloat((Math.min(...g)*.95).toFixed(2)),z=parseFloat((Math.max(...g)*1.05).toFixed(2));return{toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},grid:{top:100,height:"65%"},xAxis:{name:"Duration (days)",nameLocation:"middle",padding:[10],height:100,min:m,max:D,nameTextStyle:{align:"center",padding:[30,0,0,0],fontWeight:"lighter",fontSize:20,color:"black"}},yAxis:{name:"Maximum Resource (units/day)",max:z,min:T,padding:[10],nameLocation:"end",nameTextStyle:{align:"center",padding:[0,0,0,100],fontWeight:"lighter",fontSize:16,color:"black"}},legend:{itemGap:40,data:[{name:"baseline",itemStyle:{color:"rgb(204, 204, 204)"}},{name:"Balanced",itemStyle:{color:"rgba(130, 181, 199, 0.9)"}},{name:"Fastest",itemStyle:{color:"rgba(247, 220, 91, 0.9)"}},{name:"Minimum_Resources",itemStyle:{color:"rgba(219, 121, 48, 0.9)"}},{name:"Levelled_Resources",itemStyle:{color:"rgba(170, 187, 93, 0.9)"}}],x:"left",itemWidth:15,itemHeight:15},series:[b("baseline","rgb(204, 204, 204)"),b("Balanced","rgba(130, 181, 199, 0.9)"),b("Fastest","rgba(247, 220, 91, 0.9)"),b("Minimum_Resources","rgba(219, 121, 48, 0.9)"),b("Levelled_Resources","rgba(170, 187, 93, 0.9)")]}});let n=null,c=M("Balanced1");I(c,()=>{n.setOption(y.value)}),I(t.dataArray,()=>{n.setOption(y.value)});function h(){n==null&&(n=Ee(document.getElementById("myEcharts"),"purple-passion")),we(Je.transform.clustering),n.on("click",function(a){n.dispatchAction({type:"select",name:a.name});let m=a.data.value[2].result;switch(l.preset=a.seriesName,l.step=m.step,a.seriesName=="baseline"?l.preset="Balanced":l.preset=a.seriesName,l.preset){case"Balanced":v.value=0;break;case"Fastest":v.value=1;break;case"Minimum_Resources":v.value=2;break;case"Levelled_Resources":v.value=3;break}k(m)})}function u(){n.setOption(y.value)}let s=P({baseDuration:"-",changedDuration:"-",changgedTasks:"-",TotalTasks:"-",baseCriticalPath:"-",changedCriticalPath:"-",TotalResources:"-",group:""}),v=M(0);function k(a){s.group=a.group,s.baseDuration=Math.ceil(a.baselineDurationDays),s.changedDuration=Math.ceil(a.projectDurationDays),s.changgedTasks=Math.ceil(a.changedTasksLen),s.TotalTasks=Math.ceil(a.baselineTasksLen),s.baseCriticalPath=Math.ceil(a.baselineCriticalTasksLen),s.changedCriticalPath=Math.ceil(a.newCriticalTasksLen),s.TotalResources=Math.ceil(a.totalResourceCount)}async function ie(){l.fileName=t.file.name;let a=await Ve.getOptimized({...l},t.file.size);t.SummaryData={...s},t.selectedData=null,t.selectedData=a.data,t.active=2,t.selectChange=!0,S.push({name:"optimizedSummary"})}let d=M(null);function re(){let a=[];for(const m in t.dataArray){let D=$e(t.dataArray[m].data);D.sort((g,T)=>g.value[2].result.loss-T.value[2].result.loss),a.push(D)}return a}return I(t.end,()=>{t.end.data&&(d.value=re(),v.value=0,setTimeout(()=>{n.dispatchAction({type:"select",name:d.value[1][0].name}),k(d.value[1][2].value[2].result),l.preset="Balanced",l.step=d.value[1][2].value[2].result.step},0))},{deep:!0}),Ce(()=>{h(),u(),t.SummaryData&&(s.group=t.SummaryData.group,s.baseDuration=t.SummaryData.baseDuration,s.changedDuration=t.SummaryData.changedDuration,s.changgedTasks=t.SummaryData.changgedTasks,s.TotalTasks=t.SummaryData.TotalTasks,s.baseCriticalPath=t.SummaryData.baseCriticalPath,s.changedCriticalPath=t.SummaryData.changedCriticalPath,s.TotalResources=t.SummaryData.TotalResources)}),(a,m)=>{const D=Ye,g=Ue,T=qe,z=Re("v-btn");return A(),x("div",Qe,[o("h2",null,[_(i(a.$t("baselineSummary.title[0]"))+" ",1),o("div",ea,[o("span",null,i(e(t).setting.Steps)+" "+i(a.$t("baselineSummary.title[1]")),1)]),o("div",aa,[o("span",null,i(`${e(t).setting.Ratio[0]*100}% - ${e(t).setting.Ratio[1]*100}% ${a.$t("baselineSummary.title[2]")}`),1)])]),o("div",ta,[o("div",sa,[o("div",la,[o("div",null,i(a.$t("baselineSummary.chartName[0]")),1)]),$(D,{style:{width:"720px",height:"500px"},id:"myEcharts"})]),o("div",oa,[o("div",na,[o("div",null,i(a.$t("baselineSummary.Tsidebar[0]"))+" "+i(r(e(s).changedDuration,e(s).baseDuration)),1),o("h1",null,[_(i(e(s).changedDuration)+"/ ",1),o("span",null,i(e(s).baseDuration),1),_(" days ")]),o("div",null,i(a.$t("baselineSummary.Tsidebar[1]")),1),o("h1",null,[_(i(e(s).changgedTasks)+"/ ",1),o("span",null,i(e(s).TotalTasks),1)]),o("div",null,i(a.$t("baselineSummary.Tsidebar[2]"))+" "+i(r(e(s).baseCriticalPath,e(s).TotalTasks)),1),o("h1",null,[_(i(e(s).baseCriticalPath)+"/ ",1),o("span",null,i(e(s).TotalTasks),1)]),o("div",null,i(a.$t("baselineSummary.Tsidebar[3]")),1),o("h1",null,i(e(s).TotalResources),1)]),o("div",ia,[o("h1",null,i(a.$t("baselineSummary.Bsidebar[0]")),1),o("div",null,i(a.$t("baselineSummary.Bsidebar[1]")),1),$(T,{modelValue:e(v),"onUpdate:modelValue":m[4]||(m[4]=E=>B(v)?v.value=E:v=E),class:"radiobox"},{default:w(()=>[$(g,{onClick:m[0]||(m[0]=()=>{e(n).dispatchAction({type:"select",name:e(d)[1][0].name}),B(c)?c.value=e(d)[1][0].name:c=e(d)[1][0].name,e(l).preset=e(d)[1][2].value[2].name,e(l).step=e(d)[1][2].value[2].result.step,k(e(d)[1][2].value[2].result)}),label:0},{default:w(()=>[_(i(a.$t("types.type[1]"))+" ",1),o("span",null,i(a.$t("types.msg[0]")),1)]),_:1}),$(g,{onClick:m[1]||(m[1]=()=>{e(n).dispatchAction({type:"select",name:e(d)[2][0].name}),B(c)?c.value=e(d)[2][0].name:c=e(d)[2][0].name,e(l).preset=e(d)[2][2].value[2].name,e(l).step=e(d)[2][2].value[2].result.step,k(e(d)[2][2].value[2].result)}),label:1},{default:w(()=>[_(i(a.$t("types.type[2]"))+" ",1),o("span",null,i(a.$t("types.msg[1]")),1)]),_:1}),$(g,{label:2,onClick:m[2]||(m[2]=()=>{e(n).dispatchAction({type:"select",name:e(d)[3][0].name}),B(c)?c.value=e(d)[3][0].name:c=e(d)[3][0].name,e(l).preset=e(d)[3][2].value[2].name,e(l).step=e(d)[3][2].value[2].result.step,k(e(d)[3][2].value[2].result)})},{default:w(()=>[_(i(a.$t("types.type[3]"))+" ",1),o("span",null,i(a.$t("types.msg[2]")),1)]),_:1}),$(g,{label:3,onClick:m[3]||(m[3]=()=>{e(n).dispatchAction({type:"select",name:e(d)[4][0].name}),B(c)?c.value=e(d)[4][0].name:c=e(d)[4][0].name,e(l).preset=e(d)[4][2].value[2].name,e(l).step=e(d)[4][2].value[2].result.step,k(e(d)[4][2].value[2].result)})},{default:w(()=>[_(i(a.$t("types.type[4]"))+" ",1),o("span",null,i(a.$t("types.msg[3]")),1)]),_:1})]),_:1},8,["modelValue"])]),$(z,{disabled:!e(t).end.data,onClick:ie,class:"btn",icon:"el-icon-delete"},{default:w(()=>[_(i(a.$t("next")),1)]),_:1},8,["disabled"])])])])}}},pa=_e(ra,[["__scopeId","data-v-cbd80850"]]);export{pa as default};