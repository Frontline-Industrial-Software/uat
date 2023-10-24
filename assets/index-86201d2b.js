import{o as L,a_ as J,ad as U,ae as K,a9 as Z,a$ as q,af as be,$ as B,K as he,s as D,u as ye,aF as ge,p as A,q as G,v as F,w as E,x as r,X,b0 as Y,A as a,b1 as W,z as M,y as j,aU as $,Z as g,F as ee,_ as H,W as ae,I as te,b2 as fe,a5 as ve,b3 as Se,a0 as se,an as _e,R as P,U as xe,Q as O,a6 as Re,J as ke,ax as le,aW as Ce,aQ as De,b4 as Me,b5 as $e,aZ as we,ap as Be,D as R,C as T,O as Te}from"./index-94283dfb.js";import{e as Ae,i as Q}from"./index-f7adadce.js";import{C as N}from"./index-dc2e516e.js";import{a as Ve}from"./index-e4c1f600.js";const oe=L({size:J,disabled:Boolean,label:{type:[String,Number,Boolean],default:""}}),Fe=L({...oe,modelValue:{type:[String,Number,Boolean],default:""},name:{type:String,default:""},border:Boolean}),ne={[U]:p=>K(p)||Z(p)||q(p),[be]:p=>K(p)||Z(p)||q(p)},ie=Symbol("radioGroupKey"),re=(p,l)=>{const d=B(),s=he(ie,void 0),t=D(()=>!!s),u=D({get(){return t.value?s.modelValue:p.modelValue},set(b){t.value?s.changeEvent(b):l&&l(U,b),d.value.checked=p.modelValue===p.label}}),f=ye(D(()=>s==null?void 0:s.size)),S=ge(D(()=>s==null?void 0:s.disabled)),n=B(!1),c=D(()=>S.value||t.value&&u.value!==p.label?-1:0);return{radioRef:d,isGroup:t,radioGroup:s,focus:n,size:f,disabled:S,tabIndex:c,modelValue:u}},Ee=["value","name","disabled"],ze=A({name:"ElRadio"}),Ie=A({...ze,props:Fe,emits:ne,setup(p,{emit:l}){const d=p,s=G("radio"),{radioRef:t,radioGroup:u,focus:f,size:S,disabled:n,modelValue:c}=re(d,l);function b(){ae(()=>l("change",c.value))}return(o,h)=>{var x;return F(),E("label",{class:M([a(s).b(),a(s).is("disabled",a(n)),a(s).is("focus",a(f)),a(s).is("bordered",o.border),a(s).is("checked",a(c)===o.label),a(s).m(a(S))])},[r("span",{class:M([a(s).e("input"),a(s).is("disabled",a(n)),a(s).is("checked",a(c)===o.label)])},[X(r("input",{ref_key:"radioRef",ref:t,"onUpdate:modelValue":h[0]||(h[0]=V=>W(c)?c.value=V:null),class:M(a(s).e("original")),value:o.label,name:o.name||((x=a(u))==null?void 0:x.name),disabled:a(n),type:"radio",onFocus:h[1]||(h[1]=V=>f.value=!0),onBlur:h[2]||(h[2]=V=>f.value=!1),onChange:b},null,42,Ee),[[Y,a(c)]]),r("span",{class:M(a(s).e("inner"))},null,2)],2),r("span",{class:M(a(s).e("label")),onKeydown:h[3]||(h[3]=ee(()=>{},["stop"]))},[j(o.$slots,"default",{},()=>[$(g(o.label),1)])],34)],2)}}});var Ne=H(Ie,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio.vue"]]);const Oe=L({...oe,name:{type:String,default:""}}),Le=["value","name","disabled"],Pe=A({name:"ElRadioButton"}),Ue=A({...Pe,props:Oe,setup(p){const l=p,d=G("radio"),{radioRef:s,focus:t,size:u,disabled:f,modelValue:S,radioGroup:n}=re(l),c=D(()=>({backgroundColor:(n==null?void 0:n.fill)||"",borderColor:(n==null?void 0:n.fill)||"",boxShadow:n!=null&&n.fill?`-1px 0 0 0 ${n.fill}`:"",color:(n==null?void 0:n.textColor)||""}));return(b,o)=>{var h;return F(),E("label",{class:M([a(d).b("button"),a(d).is("active",a(S)===b.label),a(d).is("disabled",a(f)),a(d).is("focus",a(t)),a(d).bm("button",a(u))])},[X(r("input",{ref_key:"radioRef",ref:s,"onUpdate:modelValue":o[0]||(o[0]=x=>W(S)?S.value=x:null),class:M(a(d).be("button","original-radio")),value:b.label,type:"radio",name:b.name||((h=a(n))==null?void 0:h.name),disabled:a(f),onFocus:o[1]||(o[1]=x=>t.value=!0),onBlur:o[2]||(o[2]=x=>t.value=!1)},null,42,Le),[[Y,a(S)]]),r("span",{class:M(a(d).be("button","inner")),style:te(a(S)===b.label?a(c):{}),onKeydown:o[3]||(o[3]=ee(()=>{},["stop"]))},[j(b.$slots,"default",{},()=>[$(g(b.label),1)])],38)],2)}}});var de=H(Ue,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-button.vue"]]);const Ge=L({id:{type:String,default:void 0},size:J,disabled:Boolean,modelValue:{type:[String,Number,Boolean],default:""},fill:{type:String,default:""},label:{type:String,default:void 0},textColor:{type:String,default:""},name:{type:String,default:void 0},validateEvent:{type:Boolean,default:!0}}),We=ne,je=["id","aria-label","aria-labelledby"],He=A({name:"ElRadioGroup"}),Ke=A({...He,props:Ge,emits:We,setup(p,{emit:l}){const d=p,s=G("radio"),t=fe(),u=B(),{formItem:f}=ve(),{inputId:S,isLabeledByFormItem:n}=Se(d,{formItemContext:f}),c=o=>{l(U,o),ae(()=>l("change",o))};se(()=>{const o=u.value.querySelectorAll("[type=radio]"),h=o[0];!Array.from(o).some(x=>x.checked)&&h&&(h.tabIndex=0)});const b=D(()=>d.name||t.value);return _e(ie,P({...xe(d),changeEvent:c,name:b})),O(()=>d.modelValue,()=>{d.validateEvent&&(f==null||f.validate("change").catch(o=>Re()))}),(o,h)=>(F(),E("div",{id:a(S),ref_key:"radioGroupRef",ref:u,class:M(a(s).b("group")),role:"radiogroup","aria-label":a(n)?void 0:o.label||"radio-group","aria-labelledby":a(n)?a(f).labelId:void 0},[j(o.$slots,"default")],10,je))}});var ue=H(Ke,[["__file","/home/runner/work/element-plus/element-plus/packages/components/radio/src/radio-group.vue"]]);const Ze=ke(Ne,{RadioButton:de,RadioGroup:ue}),qe=le(ue);le(de);const Qe={class:"echarts-box"},Je={__name:"index",props:{width:{type:String},height:{type:String},options:{type:Object}},setup(p){const l=p;let d=Ae;se(()=>{s()});function s(){let t=d.init(document.getElementById("myEcharts"),"purple-passion");t.setOption({...l.options,dataZoom:[{type:"inside",throttle:50}],tooltip:{trigger:"axis"}}),window.onresize=function(){t.resize()}}return(t,u)=>(F(),E("div",Qe,[r("div",{id:"myEcharts",style:te({width:l.firstwidth,height:l.height})},null,4)]))}};const Xe={class:"step"},Ye={class:"step"},ea={class:"main"},aa={class:"left"},ta={class:"lefttop"},sa={class:"chartContent"},la={class:"right"},oa={class:"righttop"},na={class:"rightbutton"},ia={__name:"index",setup(p){const l=De();let d=B("Balanced1"),s=P({preset:"Balanced",fileName:l.file.name,step:3}),t=P({baseDuration:"-",changedDuration:"-",changgedTasks:"-",TotalTasks:"-",baseCriticalPath:"-",changedCriticalPath:"-",TotalResources:"-",group:"",planDurationDays:"-"}),u=B(0);Me((e,i,_)=>{_()}),$e(()=>{V(),ce()});function f(e,i){return Math.round(e/i*1e4)/100+"%"}const S=we();O(d,()=>{n.setOption(h.value),c.setOption(x.value)}),O(l.dataArray,()=>{n.setOption(h.value),c.setOption(x.value)}),O(l.end,async()=>{l.end.data?(k.value=me(),u.value=0,setTimeout(()=>{n.dispatchAction({type:"select",name:k.value[1][0].name}),c.dispatchAction({type:"select",name:k.value[1][0].name}),z(k.value[1][0].value[2].result),s.preset="Balanced",s.step=k.value[1][0].value[2].result.step},0)):(d=B(""),d.value="Balanced1",u.value=0,t.baseDuration="-",t.changedDuration="-",t.changgedTasks="-",t.TotalTasks="-",t.baseCriticalPath="-",t.changedCriticalPath="-",t.TotalResources="-",t.group="",t.maxResourceUnit="-",t.BasemaxResourceUnit="-",t.planDurationDays="-")},{deep:!0});let n=null,c=null;function b(e,i,_){let m,v;return e=="baseline"?(m=16,v=1):(m=8,v=.5),{type:"scatter",selectedMode:"single",selectedOffset:10,symbol:C=>{let y="path://M18.018,15.344c-0.285,0-0.555-0.162-0.684-0.441l-6.595-12.076l-6.594,12.076c-0.128,0.279-0.398,0.441-0.684,0.441c-0.491,0-0.706-0.638-0.249-0.929l6.997-12.808l-6.997-12.809c-0.457-0.291-0.242-0.929,0.249-0.929c0.286,0,0.556,0.162,0.684,0.441l6.595,12.076l6.594-12.076c0.127-0.279,0.398-0.441,0.684-0.441c0.49,0,0.705,0.638,0.249,0.929l-6.998,12.808l6.998,12.809c0.456,0.291,0.241,0.929-0.249,0.929H18.018z";return C[2].result.constraintLoss>0?y:"circle"},select:{scale:2,itemStyle:{color:"#40aa97",borderColor:"#40aa97",shadowColor:"#40aa97",borderWidth:10,shadowBlur:30,opacity:1}},emphasis:{scale:2,focus:"series",blurScope:"coordinateSystem"},data:l.dataArray[e].span,name:e,symbolSize:m,itemStyle:{color:C=>i,borderWidth:1,borderColor:"#0b0f07",opacity:v}}}function o(e,i,_){let m,v;return e=="baseline"?(m=16,v=1):(m=8,v=.5),{type:"scatter",selectedMode:"single",selectedOffset:10,symbol:C=>{let y="path://M18.018,15.344c-0.285,0-0.555-0.162-0.684-0.441l-6.595-12.076l-6.594,12.076c-0.128,0.279-0.398,0.441-0.684,0.441c-0.491,0-0.706-0.638-0.249-0.929l6.997-12.808l-6.997-12.809c-0.457-0.291-0.242-0.929,0.249-0.929c0.286,0,0.556,0.162,0.684,0.441l6.595,12.076l6.594-12.076c0.127-0.279,0.398-0.441,0.684-0.441c0.49,0,0.705,0.638,0.249,0.929l-6.998,12.808l6.998,12.809c0.456,0.291,0.241,0.929-0.249,0.929H18.018z";return C[2].result.constraintLoss>0?y:"circle"},select:{scale:2,itemStyle:{color:"#40aa97",borderColor:"#40aa97",shadowColor:"#40aa97",borderWidth:10,shadowBlur:30,opacity:1}},emphasis:{scale:2,focus:"series",blurScope:"coordinateSystem"},data:l.dataArray[e].data,name:e,symbolSize:m,itemStyle:{color:C=>i,borderWidth:1,borderColor:"#0b0f07",opacity:v}}}var h=D(()=>{const e=Object.values(l.dataArray).flatMap(y=>y.data.map(w=>w.value[0])),i=parseFloat((Math.min(...e)*.95).toFixed(2)),_=parseFloat((Math.max(...e)*1.05).toFixed(2)),m=Object.values(l.dataArray).flatMap(y=>y.data.map(w=>w.value[1])),v=parseFloat((Math.min(...m)*.95).toFixed(2)),C=parseFloat((Math.max(...m)*1.05).toFixed(2));return{toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},grid:{top:100,height:"65%"},xAxis:{name:"Duration (days)",nameLocation:"middle",padding:[10],height:100,min:i,max:_,nameTextStyle:{align:"center",padding:[30,0,0,0],fontWeight:"lighter",fontSize:20,color:"black"}},yAxis:{name:"Maximum Resource (units/day)",max:C,min:v,padding:[10],nameLocation:"end",nameTextStyle:{align:"center",padding:[0,0,0,100],fontWeight:"lighter",fontSize:16,color:"black"}},legend:{itemGap:40,data:[{name:"baseline",itemStyle:{color:"rgb(204, 204, 204)"}},{name:"Balanced",itemStyle:{color:"rgba(130, 181, 199, 0.9)"}},{name:"Fastest",itemStyle:{color:"rgba(247, 220, 91, 0.9)"}},{name:"Minimum_Resources",itemStyle:{color:"rgba(219, 121, 48, 0.9)"}},{name:"Levelled_Resources",itemStyle:{color:"rgba(170, 187, 93, 0.9)"}}],x:"left",itemWidth:15,itemHeight:15},series:[o("baseline","rgb(204, 204, 204)"),o("Balanced","rgba(130, 181, 199, 0.9)"),o("Fastest","rgba(247, 220, 91, 0.9)"),o("Minimum_Resources","rgba(219, 121, 48, 0.9)"),o("Levelled_Resources","rgba(170, 187, 93, 0.9)")]}}),x=D(()=>{const e=Object.values(l.dataArray).flatMap(y=>y.data.map(w=>w.value[0])),i=parseFloat((Math.min(...e)*.95).toFixed(2)),_=parseFloat((Math.max(...e)*1.05).toFixed(2)),m=Object.values(l.dataArray).flatMap(y=>y.data.map(w=>w.value[2].result.spanResourceUnitAgg)),v=parseFloat((Math.min(...m)*.95).toFixed(2)),C=parseFloat((Math.max(...m)*1.05).toFixed(2));return{toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"inside",xAxisIndex:[0]},{type:"inside",yAxisIndex:[0]}],grid:{top:100,height:"65%"},xAxis:{name:"Duration (days)",nameLocation:"middle",padding:[10],height:100,min:i,max:_,nameTextStyle:{align:"center",padding:[30,0,0,0],fontWeight:"lighter",fontSize:20,color:"black"}},yAxis:{name:"Resource spread VS duration ",max:C,min:v,padding:[10],nameLocation:"end",nameTextStyle:{align:"center",padding:[0,0,0,100],fontWeight:"lighter",fontSize:16,color:"black"}},legend:{itemGap:40,data:[{name:"baseline",itemStyle:{color:"rgb(204, 204, 204)"}},{name:"Balanced",itemStyle:{color:"rgba(130, 181, 199, 0.9)"}},{name:"Fastest",itemStyle:{color:"rgba(247, 220, 91, 0.9)"}},{name:"Minimum_Resources",itemStyle:{color:"rgba(219, 121, 48, 0.9)"}},{name:"Levelled_Resources",itemStyle:{color:"rgba(170, 187, 93, 0.9)"}}],x:"left",itemWidth:15,itemHeight:15},series:[b("baseline","rgb(204, 204, 204)"),b("Balanced","rgba(130, 181, 199, 0.9)"),b("Fastest","rgba(247, 220, 91, 0.9)"),b("Minimum_Resources","rgba(219, 121, 48, 0.9)"),b("Levelled_Resources","rgba(170, 187, 93, 0.9)")]}});function V(){n==null&&(n=Q(document.getElementById("myEcharts"),"purple-passion"),c=Q(document.getElementById("twoEcharts"),"purple-passion")),n.on("click",function(e){c.dispatchAction({type:"select",name:e.name}),n.dispatchAction({type:"select",name:e.name});let i=e.data.value[2].result;switch(s.preset=e.seriesName,s.step=i.step,e.seriesName=="baseline"?s.preset="Balanced":s.preset=e.seriesName,s.preset){case"Balanced":u.value=0;break;case"Fastest":u.value=1;break;case"Minimum_Resources":u.value=2;break;case"Levelled_Resources":u.value=3;break}z(i)}),c.on("click",function(e){c.dispatchAction({type:"select",name:e.name}),n.dispatchAction({type:"select",name:e.name});let i=e.data.value[2].result;switch(s.preset=e.seriesName,s.step=i.step,e.seriesName=="baseline"?s.preset="Balanced":s.preset=e.seriesName,s.preset){case"Balanced":u.value=0;break;case"Fastest":u.value=1;break;case"Minimum_Resources":u.value=2;break;case"Levelled_Resources":u.value=3;break}z(i)})}function ce(){n.setOption(h.value),c.setOption(x.value)}function z(e){t.group=e.group,t.baseDuration=Math.ceil(e.baselineDurationDaysWithCalendar),t.changedDuration=Math.ceil(e.projectDurationDaysWithCalendar),t.planDurationDays=Math.ceil(l.originalplan.originalDurationDays),t.changgedTasks=Math.ceil(e.changedTasksLen),t.TotalTasks=Math.ceil(e.baselineTasksLen),t.baseCriticalPath=Math.ceil(e.baselineCriticalTasksLen),t.changedCriticalPath=Math.ceil(e.newCriticalTasksLen),t.TotalResources=Math.ceil(e.totalResourceCount),t.maxResourceUnit=Math.ceil(e.maxResourceUnitAgg),t.BasemaxResourceUnit=Math.ceil(l.originalplan.maxResourceUnitAgg)}async function pe(){s.fileName=l.file.name,s.considerDefaultResourceType=l.setting.considerDefaultResourceType,s.resourceConstraint=l.setting.resourceConstraint;let e=await Ve.getOptimized({...s},l.file.size);l.SummaryData={...t},l.selectedData=null,l.selectedData=e.data,l.active=2,l.selectChange=!0,S.push({name:"optimizedSummary"})}let k=B(null);function me(){let e=[];for(const i in l.dataArray){let _=Te(l.dataArray[i].data);_.sort((m,v)=>m.value[2].result.loss-v.value[2].result.loss),e.push(_)}return e}function I(e){n.dispatchAction({type:"select",name:k.value[e][0].name}),c.dispatchAction({type:"select",name:k.value[e][0].name}),d=k.value[e][0].name,s.preset=k.value[e][0].value[2].name,s.step=k.value[e][0].value[2].result.step,z(k.value[e][0].value[2].result)}return(e,i)=>{const _=Je,m=Ze,v=qe,C=Be("v-btn");return F(),E("div",null,[r("h2",null,[$(g(e.$t("baselineSummary.title[0]"))+" ",1),r("div",Xe,[r("span",null,g(a(l).setting.Steps)+" "+g(e.$t("baselineSummary.title[1]")),1)]),r("div",Ye,[r("span",null,g(`${a(l).setting.Ratio[0]*100}% - ${a(l).setting.Ratio[1]*100}% ${e.$t("baselineSummary.title[2]")}`),1)])]),r("div",ea,[r("div",aa,[r("div",ta,[r("div",null,g(e.$t("baselineSummary.chartName[0]")),1)]),r("div",sa,[R(_,{style:{width:"720px",height:"500px"},id:"myEcharts"}),R(_,{style:{width:"720px",height:"500px"},id:"twoEcharts"})])]),r("div",la,[r("div",oa,[r("div",null,[R(N,{title:e.$t("baselineSummary.Tsidebar[0]"),height:150,precent:f(a(t).changedDuration-a(t).baseDuration,a(t).baseDuration),isPositive:!0,body:[a(t).changedDuration+" days",a(t).baseDuration+" days",a(t).planDurationDays+" days"]},null,8,["title","precent","body"]),R(N,{title:e.$t("baselineSummary.Tsidebar[1]"),height:150,precent:f(a(t).maxResourceUnit-a(t).BasemaxResourceUnit,a(t).BasemaxResourceUnit),body:[a(t).maxResourceUnit,a(t).BasemaxResourceUnit]},null,8,["title","precent","body"])]),r("div",null,[R(N,{title:e.$t("baselineSummary.Tsidebar[2]"),height:150,body:[a(t).changgedTasks,a(t).TotalTasks]},null,8,["title","body"]),R(N,{title:e.$t("baselineSummary.Tsidebar[3]"),height:150,body:[a(t).changedCriticalPath,a(t).changedCriticalPath,a(t).baseCriticalPath]},null,8,["title","body"])])]),r("div",na,[r("h1",null,g(e.$t("baselineSummary.Bsidebar[0]")),1),R(v,{modelValue:a(u),"onUpdate:modelValue":i[4]||(i[4]=y=>W(u)?u.value=y:u=y),class:"radiobox"},{default:T(()=>[R(m,{onClick:i[0]||(i[0]=()=>{I(1)}),label:0},{default:T(()=>[$(g(e.$t("types.typeShow[1]"))+" ",1),r("span",null,g(e.$t("types.msg[0]")),1)]),_:1}),R(m,{onClick:i[1]||(i[1]=y=>I(2)),label:1},{default:T(()=>[$(g(e.$t("types.typeShow[2]"))+" ",1),r("span",null,g(e.$t("types.msg[1]")),1)]),_:1}),R(m,{label:2,onClick:i[2]||(i[2]=y=>I(3))},{default:T(()=>[$(g(e.$t("types.typeShow[3]"))+" ",1),r("span",null,g(e.$t("types.msg[2]")),1)]),_:1}),R(m,{label:3,onClick:i[3]||(i[3]=y=>I(4))},{default:T(()=>[$(g(e.$t("types.typeShow[4]"))+" ",1),r("span",null,g(e.$t("types.msg[3]")),1)]),_:1})]),_:1},8,["modelValue"])]),R(C,{style:{outline:"none"},disabled:!a(l).end.data,onClick:pe,class:"btn",color:"rgb(64, 170, 151)"},{default:T(()=>[$(g(e.$t("next")),1)]),_:1},8,["disabled"])])])])}}},pa=Ce(ia,[["__scopeId","data-v-1f73a98d"]]);export{pa as default};
