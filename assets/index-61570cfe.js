import{b as F,a4 as L,j as K,a5 as q,a6 as U,a7 as de,z as V,K as ce,c as x,a as I,u as O,o as A,k as P,m as o,a8 as H,a9 as Z,l as e,aa as E,n as C,r as j,Y as S,t as y,C as X,_ as W,ab as Y,p as J,ac as Q,R as me,ad as G,ae as pe,O as $,y as he,af as ee,ag as fe,Z as be,W as ve,ah as ge,$ as ye,a0 as _e,a1 as Se,D as B,v as M,a2 as De,a3 as ke,ai as Te}from"./index-db3ad2bd.js";import{e as Ce,i as Re,r as xe}from"./index-11e546f7.js";import{e as Be}from"./ecStat-6a642616.js";import{o as ae,p as Ee,j as we,q as Me,s as Ve,v as Ie,n as Ae}from"./index-63ec4a17.js";import{d as Pe}from"./error-78e43d3e.js";const te=F({size:ae,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),ze=F({...te,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),se={[L]:c=>K(c)||q(c)||U(c),[de]:c=>K(c)||q(c)||U(c)},oe=Symbol("radioGroupKey"),le=(c,a)=>{const s=V(),i=ce(oe,void 0),f=x(()=>!!i),_=x({get(){return f.value?i.modelValue:c.modelValue},set(v){f.value?i.changeEvent(v):a&&a(L,v),s.value.checked=c.modelValue===c.label}}),p=Ee(x(()=>i==null?void 0:i.size)),b=we(x(()=>i==null?void 0:i.disabled)),n=V(!1),d=x(()=>b.value||f.value&&_.value!==c.label?-1:0);return{radioRef:s,isGroup:f,radioGroup:i,focus:n,size:p,disabled:b,tabIndex:d,modelValue:_}},$e=["value","name","disabled"],Fe=I({name:"ElRadio"}),Ne=I({...Fe,props:ze,emits:se,setup(c,{emit:a}){const s=c,i=O("radio"),{radioRef:f,radioGroup:_,focus:p,size:b,disabled:n,modelValue:d}=le(s,a);function v(){Y(()=>a("change",d.value))}return(r,t)=>{var h;return A(),P("label",{class:C([e(i).b(),e(i).is("disabled",e(n)),e(i).is("focus",e(p)),e(i).is("bordered",r.border),e(i).is("checked",e(d)===r.label),e(i).m(e(b))])},[o("span",{class:C([e(i).e("input"),e(i).is("disabled",e(n)),e(i).is("checked",e(d)===r.label)])},[H(o("input",{ref_key:"radioRef",ref:f,"onUpdate:modelValue":t[0]||(t[0]=D=>E(d)?d.value=D:null),class:C(e(i).e("original")),value:r.label,name:r.name||((h=e(_))==null?void 0:h.name),disabled:e(n),type:"radio",onFocus:t[1]||(t[1]=D=>p.value=!0),onBlur:t[2]||(t[2]=D=>p.value=!1),onChange:v},null,42,$e),[[Z,e(d)]]),o("span",{class:C(e(i).e("inner"))},null,2)],2),o("span",{class:C(e(i).e("label")),onKeydown:t[3]||(t[3]=X(()=>{},["stop"]))},[j(r.$slots,"default",{},()=>[S(y(r.label),1)])],34)],2)}}});var Ge=W(Ne,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Le=F({...te,name:{type:String,default:""}}),Oe=["value","name","disabled"],je=I({name:"ElRadioButton"}),We=I({...je,props:Le,setup(c){const a=c,s=O("radio"),{radioRef:i,focus:f,size:_,disabled:p,modelValue:b,radioGroup:n}=le(a),d=x(()=>({backgroundColor:(n==null?void 0:n.fill)||"",borderColor:(n==null?void 0:n.fill)||"",boxShadow:n!=null&&n.fill?`-1px 0 0 0 ${n.fill}`:"",color:(n==null?void 0:n.textColor)||""}));return(v,r)=>{var t;return A(),P("label",{class:C([e(s).b("button"),e(s).is("active",e(b)===v.label),e(s).is("disabled",e(p)),e(s).is("focus",e(f)),e(s).bm("button",e(_))])},[H(o("input",{ref_key:"radioRef",ref:i,"onUpdate:modelValue":r[0]||(r[0]=h=>E(b)?b.value=h:null),class:C(e(s).be("button","original-radio")),value:v.label,type:"radio",name:v.name||((t=e(n))==null?void 0:t.name),disabled:e(p),onFocus:r[1]||(r[1]=h=>f.value=!0),onBlur:r[2]||(r[2]=h=>f.value=!1)},null,42,Oe),[[Z,e(b)]]),o("span",{class:C(e(s).be("button","inner")),style:J(e(b)===v.label?e(d):{}),onKeydown:r[3]||(r[3]=X(()=>{},["stop"]))},[j(v.$slots,"default",{},()=>[S(y(v.label),1)])],38)],2)}}});var ne=W(We,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const Ke=F({id:{type:String,default:void 0},size:ae,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),qe=se,Ue=["id","aria-label","aria-labelledby"],He=I({name:"ElRadioGroup"}),Ze=I({...He,props:Ke,emits:qe,setup(c,{emit:a}){const s=c,i=O("radio"),f=Me(),_=V(),{formItem:p}=Ve(),{inputId:b,isLabeledByFormItem:n}=Ie(s,{formItemContext:p}),d=r=>{a(L,r),Y(()=>a("change",r))};Q(()=>{const r=_.value.querySelectorAll("[type=radio]"),t=r[0];!Array.from(r).some(h=>h.checked)&&t&&(t.tabIndex=0)});const v=x(()=>s.name||f.value);return me(oe,G({...pe(s),changeEvent:d,name:v})),$(()=>s.modelValue,()=>{s.validateEvent&&(p==null||p.validate("change").catch(r=>Pe()))}),(r,t)=>(A(),P("div",{id:e(b),ref_key:"radioGroupRef",ref:_,class:C(e(i).b("group")),role:"radiogroup","aria-label":e(n)?void 0:r.label||"radio-group","aria-labelledby":e(n)?e(p).labelId:void 0},[j(r.$slots,"default")],10,Ue))}});var ie=W(Ze,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const Xe=he(Ge,{RadioButton:ne,RadioGroup:ie}),Ye=ee(ie);ee(ne);const Je={class:"echarts-box"},Qe={__name:"index",props:{width:{type:String},height:{type:String},options:{type:Object}},setup(c){const a=c;let s=Ce;Q(()=>{i()});function i(){let f=s.init(document.getElementById("myEcharts"),"purple-passion");f.setOption({...a.options,dataZoom:[{type:"inside",throttle:50}],tooltip:{trigger:"axis"}}),window.onresize=function(){f.resize()}}return(f,_)=>(A(),P("div",Je,[o("div",{id:"myEcharts",style:J({width:a.firstwidth,height:a.height})},null,4)]))}};var ea=Be;const aa=fe(ea);const R=c=>(De("data-v-bdc75fc8"),c=c(),ke(),c),ta={class:"contain"},sa={class:"step"},oa={class:"step"},la={class:"main"},na={class:"left"},ia=R(()=>o("div",{class:"lefttop"},[o("div",null,"Comparison Chart")],-1)),ra={class:"right"},ua={class:"righttop"},da=R(()=>o("div",null,"Changed Tasks vs Total N of Tasks",-1)),ca=R(()=>o("div",null,"Total Resources",-1)),ma={class:"rightbutton"},pa=R(()=>o("h1",null,"Optimization Presets",-1)),ha=R(()=>o("div",null," These available presets are pre-configured settings that are designed to deliver the best performance or quality for each individual specific use case. ",-1)),fa=R(()=>o("span",null,"Best combination of the others",-1)),ba=R(()=>o("span",null,"Shortest project duration",-1)),va=R(()=>o("span",null,"Least amount of required resources",-1)),ga=R(()=>o("span",null,"Best resource distribution",-1)),ya={__name:"index",setup(c){const a=ve();ge((l,m,k)=>{l.name=="InputData"&&(d.value="Balanced1",h.value=0,f()),k()});let s=G({preset:"Balanced",fileName:a.file.name,step:3});function i(l,m){return Math.round(l/m*1e4)/100+"%"}function f(){a.taskData=[],a.SummaryData.baseDuration="-",a.SummaryData.changedDuration="-",a.SummaryData.changgedTasks="-",a.SummaryData.TotalTasks="-",a.SummaryData.baseCriticalPath="-",a.SummaryData.changedCriticalPath="-",a.SummaryData.TotalResources="-",a.SummaryData.group="",Object.keys(a.dataArray).forEach(l=>{a.dataArray[l].all=[],a.dataArray[l].data=[]}),a.end.data=!1}const _=ye();function p(l,m,k){let g,T;return l=="baseline"?(g=16,T=1):(g=8,T=.5),{type:"scatter",selectedMode:"single",selectedOffset:10,select:{scale:2,itemStyle:{color:"#40aa97",borderColor:"#40aa97",shadowColor:"#40aa97",borderWidth:10,shadowBlur:30,opacity:1}},emphasis:{scale:2,focus:"series",blurScope:"coordinateSystem"},data:a.dataArray[l].data,name:l,symbolSize:g,itemStyle:{color:z=>m,borderWidth:1,borderColor:"#0b0f07",opacity:T}}}var b=x(()=>{const l=Object.values(a.dataArray).flatMap(w=>w.data.map(N=>N.value[0])),m=parseFloat((Math.min(...l)*.95).toFixed(2)),k=parseFloat((Math.max(...l)*1.05).toFixed(2)),g=Object.values(a.dataArray).flatMap(w=>w.data.map(N=>N.value[1])),T=parseFloat((Math.min(...g)*.95).toFixed(2)),z=parseFloat((Math.max(...g)*1.05).toFixed(2));return{toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},grid:{top:100,height:"65%"},xAxis:{name:"Duration (days)",nameLocation:"middle",padding:[10],height:100,min:m,max:k,nameTextStyle:{align:"center",padding:[30,0,0,0],fontWeight:"lighter",fontSize:20,color:"black"}},yAxis:{name:"Maximum Resource (units/day)",max:z,min:T,padding:[10],nameLocation:"end",nameTextStyle:{align:"center",padding:[0,0,0,100],fontWeight:"lighter",fontSize:16,color:"black"}},legend:{itemGap:40,data:[{name:"baseline",itemStyle:{color:"rgb(204, 204, 204)"}},{name:"Balanced",itemStyle:{color:"rgba(130, 181, 199, 0.9)"}},{name:"Fastest",itemStyle:{color:"rgba(247, 220, 91, 0.9)"}},{name:"Minimum_Resources",itemStyle:{color:"rgba(219, 121, 48, 0.9)"}},{name:"Levelled_Resources",itemStyle:{color:"rgba(170, 187, 93, 0.9)"}}],x:"left",itemWidth:15,itemHeight:15},series:[p("baseline","rgb(204, 204, 204)"),p("Balanced","rgba(130, 181, 199, 0.9)"),p("Fastest","rgba(247, 220, 91, 0.9)"),p("Minimum_Resources","rgba(219, 121, 48, 0.9)"),p("Levelled_Resources","rgba(170, 187, 93, 0.9)")]}});let n=null,d=V("Balanced1");$(d,()=>{n.setOption(b.value)}),$(a.dataArray,()=>{n.setOption(b.value)});function v(){n==null&&(n=Re(document.getElementById("myEcharts"),"purple-passion")),xe(aa.transform.clustering),n.on("click",function(l){n.dispatchAction({type:"select",name:l.name});let m=l.data.value[2].result;switch(s.preset=l.seriesName,s.step=m.step,l.seriesName=="baseline"?s.preset="Balanced":s.preset=l.seriesName,s.preset){case"Balanced":h.value=0;break;case"Fastest":h.value=1;break;case"Minimum_Resources":h.value=2;break;case"Levelled_Resources":h.value=3;break}D(m)})}function r(){n.setOption(b.value)}let t=G({baseDuration:"-",changedDuration:"-",changgedTasks:"-",TotalTasks:"-",baseCriticalPath:"-",changedCriticalPath:"-",TotalResources:"-",group:""}),h=V(0);function D(l){t.group=l.group,t.baseDuration=Math.ceil(l.baselineDurationDays),t.changedDuration=Math.ceil(l.projectDurationDays),t.changgedTasks=Math.ceil(l.changedTasksLen),t.TotalTasks=Math.ceil(l.baselineTasksLen),t.baseCriticalPath=Math.ceil(l.baselineCriticalTasksLen),t.changedCriticalPath=Math.ceil(l.newCriticalTasksLen),t.TotalResources=Math.ceil(l.totalResourceCount)}async function re(){s.fileName=a.file.name;let l=await Ae.getOptimized({...s},a.file.size);a.SummaryData={...t},a.selectedData=null,a.selectedData=l.data,a.active=2,a.selectChange=!0,_.push({name:"optimizedSummary"})}let u=V(null);function ue(){let l=[];for(const m in a.dataArray){let k=Te(a.dataArray[m].data);k.sort((g,T)=>g.value[2].result.loss-T.value[2].result.loss),l.push(k)}return l}return $(a.end,()=>{a.end.data&&(u.value=ue(),h.value=0,setTimeout(()=>{n.dispatchAction({type:"select",name:u.value[1][0].name}),D(u.value[1][2].value[2].result),s.preset="Balanced",s.step=u.value[1][2].value[2].result.step},0))},{deep:!0}),_e(()=>{v(),r(),a.SummaryData&&(t.group=a.SummaryData.group,t.baseDuration=a.SummaryData.baseDuration,t.changedDuration=a.SummaryData.changedDuration,t.changgedTasks=a.SummaryData.changgedTasks,t.TotalTasks=a.SummaryData.TotalTasks,t.baseCriticalPath=a.SummaryData.baseCriticalPath,t.changedCriticalPath=a.SummaryData.changedCriticalPath,t.TotalResources=a.SummaryData.TotalResources)}),(l,m)=>{const k=Qe,g=Xe,T=Ye,z=Se("v-btn");return A(),P("div",ta,[o("h2",null,[S(" Baseline Summary "),o("div",sa,[o("span",null,y(e(a).setting.Steps)+" steps",1)]),o("div",oa,[o("span",null,y(`${e(a).setting.Ratio[0]*100}% - ${e(a).setting.Ratio[1]*100}% ratio`),1)])]),o("div",la,[o("div",na,[ia,B(k,{style:{width:"720px",height:"500px"},id:"myEcharts"})]),o("div",ra,[o("div",ua,[o("div",null," Project Duration "+y(i(e(t).changedDuration,e(t).baseDuration)),1),o("h1",null,[S(y(e(t).changedDuration)+"/ ",1),o("span",null,y(e(t).baseDuration),1),S(" days ")]),da,o("h1",null,[S(y(e(t).changgedTasks)+"/ ",1),o("span",null,y(e(t).TotalTasks),1)]),o("div",null," Tasks on Critical Path "+y(i(e(t).baseCriticalPath,e(t).TotalTasks)),1),o("h1",null,[S(y(e(t).baseCriticalPath)+"/ ",1),o("span",null,y(e(t).TotalTasks),1)]),ca,o("h1",null,y(e(t).TotalResources),1)]),o("div",ma,[pa,ha,B(T,{modelValue:e(h),"onUpdate:modelValue":m[4]||(m[4]=w=>E(h)?h.value=w:h=w),class:"radiobox"},{default:M(()=>[B(g,{onClick:m[0]||(m[0]=()=>{e(n).dispatchAction({type:"select",name:e(u)[1][0].name}),E(d)?d.value=e(u)[1][0].name:d=e(u)[1][0].name,e(s).preset=e(u)[1][2].value[2].name,e(s).step=e(u)[1][2].value[2].result.step,D(e(u)[1][2].value[2].result)}),label:0},{default:M(()=>[S("Balanced "),fa]),_:1}),B(g,{onClick:m[1]||(m[1]=()=>{e(n).dispatchAction({type:"select",name:e(u)[2][0].name}),E(d)?d.value=e(u)[2][0].name:d=e(u)[2][0].name,e(s).preset=e(u)[2][2].value[2].name,e(s).step=e(u)[2][2].value[2].result.step,D(e(u)[2][2].value[2].result)}),label:1},{default:M(()=>[S("Fastest "),ba]),_:1}),B(g,{label:2,onClick:m[2]||(m[2]=()=>{e(n).dispatchAction({type:"select",name:e(u)[3][0].name}),E(d)?d.value=e(u)[3][0].name:d=e(u)[3][0].name,e(s).preset=e(u)[3][2].value[2].name,e(s).step=e(u)[3][2].value[2].result.step,D(e(u)[3][2].value[2].result)})},{default:M(()=>[S("Minimum Resources "),va]),_:1}),B(g,{label:3,onClick:m[3]||(m[3]=()=>{e(n).dispatchAction({type:"select",name:e(u)[4][0].name}),E(d)?d.value=e(u)[4][0].name:d=e(u)[4][0].name,e(s).preset=e(u)[4][2].value[2].name,e(s).step=e(u)[4][2].value[2].result.step,D(e(u)[4][2].value[2].result)})},{default:M(()=>[S("Levelled Resources "),ga]),_:1})]),_:1},8,["modelValue"])]),B(z,{disabled:!e(a).end.data,onClick:re,class:"btn",icon:"el-icon-delete"},{default:M(()=>[S("NEXT")]),_:1},8,["disabled"])])])])}}},Ca=be(ya,[["__scopeId","data-v-bdc75fc8"]]);export{Ca as default};
