import{$ as I,s as C,v as z,B as ee,C as M,x as o,Z as f,A as s,aW as te,aQ as ae,aZ as ne,b4 as ie,b5 as re,Q as H,ap as se,w as U,aU as T,D as x,b1 as oe,ar as E,as as L,bb as le,z as de}from"./index-94283dfb.js";import{a as ce,E as ue}from"./el-overlay-0b2a8b0e.js";import{C as B}from"./index-dc2e516e.js";import{e as me,c as pe}from"./index-f7adadce.js";import"./index-e4c1f600.js";import{V as fe}from"./index.min-fa53e333.js";const he=o("span",{class:"dialog-footer"},null,-1),ye={__name:"dialog",props:["dialogVisible","data"],emits:["closeDialog"],setup(P,{emit:i}){const u=P;let k=I();async function N(){fe.preview(k.value,`

`+A.value)}function _(d){if(!d)return"0.00";var d=Math.round(parseFloat(d)*100)/100,c=d.toString().split(".");if(c.length==1)return d=d.toString()+".00",d;if(c.length>1)return c[1].length<2&&(d=d.toString()+"0"),d}C(()=>u.dialogVisible);function F(S,d=0){let c=`
`;const v=h=>"  ".repeat(h);for(const[h,g]of Object.entries(S))typeof g=="object"&&g!==null?(c+=`${v(d)}- **${h}**
`,c+=F(g,d+1)):c+=`${v(d)}- ${h}: ${g}
`;return c}function p(S){return new Date(S).toISOString()}let A=C(()=>{let S=()=>{let c="";for(const v in u.data.resources){const h=u.data.resources[v];c+=`The resource with ID ${h.resourceId} was originally planned to have ${_(h.plannedUnits)} units. The initial planned usage rate was ${_(h.plannedUnitsPerHour)} units per hour, and it currently remains at ${_(h.Units)} units per hour. However, after optimization, the new usage rate is ${_(h.newUnitsPerHour)} units per hour, and the new daily usage is ${_(h.newUnitsPerDay)} units per day.
`}return c};return`This is a task named '${u.data.name}' categorized as '${u.data.type}', and it is ${u.data.critical==!0?"":"not"} a Critical Task.
   Before optimization,
   it is scheduled to start on ${p(u.data.plannedStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${p(u.data.plannedFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${u.data.remainingDuration} hours. 
  After optimization,
   it is scheduled to start on ${p(u.data.newStart).replace("T"," ").replace("Z","").slice(0,16)} (date) and finish on ${p(u.data.newFinish).replace("T"," ").replace("Z","").slice(0,16)} (date), with an estimated duration of ${u.data.newDuration} hours. 
Resources:
${S()}As of now, the task has not commenced and is labeled as '${u.data.status}.' The task's duration ratio is ${_(u.data.durationRatio)}.`+F(u.data)});const V=()=>{i("closeDialog")};return(S,d)=>{const c=ce;return z(),ee(c,{onOpen:N,onClose:V,modelValue:u.dialogVisible,"onUpdate:modelValue":d[0]||(d[0]=v=>u.dialogVisible=v),title:"Detailed content",width:"50%",draggable:""},{footer:M(()=>[he]),default:M(()=>[o("span",null,f(s(A).id),1),o("div",{ref_key:"editorRef",ref:k},null,512)]),_:1},8,["modelValue"])}}};const ve={class:"contain"},ge={class:"box"},be={class:"sp"},we={class:"step"},Se={class:"step"},De={class:"maintop"},$e={class:"mainEchar1"},xe={class:"Echar1top"},_e=le('<div class="choosebox" data-v-f5cd3ac1><div class="choose" data-v-f5cd3ac1><div style="background-color:#b0e054;" class="item" data-v-f5cd3ac1></div><div data-v-f5cd3ac1>Optimized</div></div><div class="choose" data-v-f5cd3ac1><div style="background-color:#5474c4;" class="item" data-v-f5cd3ac1></div><div data-v-f5cd3ac1>Baseline</div></div><div class="choose" data-v-f5cd3ac1><div style="background-color:red;" class="item" data-v-f5cd3ac1></div><div data-v-f5cd3ac1>Critical Path</div></div><div class="choose" data-v-f5cd3ac1><div style="background-color:pink;" class="item" data-v-f5cd3ac1></div><div data-v-f5cd3ac1>Critical Path(baseline)</div></div></div><div id="main" data-v-f5cd3ac1></div>',2),Ce={ref:"main",style:{width:"1350px",height:"610px"},id:"myEcharts"},ke={class:"mainEchar2"},Re={class:"Echar2top"},Ie={class:"resources-title"},ze={class:"types"},Fe={ref:"main01",style:{width:"1350px",height:"610px"},id:"myEcharts01"},Ae={class:"button"},Ue={__name:"index",setup(P){const i=ae(),u=ne();let k=I(!1),N=I("");const _=()=>{k.value=!1};ie((t,a,n)=>{t.name=="InputData",n()}),re(()=>{i.selectChange&&(D.value="",h(),O(),i.selectChange=!1)});function F(t,a){return Math.round(t/a*1e4)/100+"%"}function p(t){return new Date(t).toISOString()}function A(t){const a=new Date(t);return`${a.getUTCFullYear()}/${a.getUTCMonth()+1}/${a.getUTCDate()} ${("0"+a.getUTCHours()).slice(-2)}:${("0"+a.getUTCMinutes()).slice(-2)}:${("0"+a.getUTCSeconds()).slice(-2)}`}const V=t=>t[0]===void 0||t[0].length===0?[]:t[0].xy.map(a=>{const[n,m]=Object.entries(a)[0];return{value:[p(parseInt(n)),m],name:p(parseInt(n))+m+t[1]}});let S=me,d=I(2),c;C(()=>i.selectedData?i.selectedData.baselineTasks.filter(a=>a.critical):void 0);function v(t){return`<span >${t}</span>`}function h(){let t=[],a=i.selectedData.baselineTasks.map((e,r)=>{let y=i.selectedData.tasks.find(w=>w.id===e.id);return y.old=e,t.push(y),r=i.selectedData.baselineTasks.length-r+1.5,{name:e.name,value:[r,p(e.newStart),p(e.newFinish),e,{baseNew:{start:e.newStart,finish:e.newFinish,duration:e.newDuration},changeNew:{start:y.newStart,finish:y.newFinish,duration:y.newDuration}}],itemStyle:{color:e.critical?"pink":void 0}}});t=t.map((e,r)=>(r=t.length-r,{id:e.id,name:e.name,value:[r,p(e.newStart),p(e.newFinish),e,{baseNew:{start:e.old.newStart,finish:e.old.newFinish,duration:e.old.newDuration},changeNew:{start:e.newStart,finish:e.newFinish,duration:e.newDuration}}],itemStyle:{color:e.critical?"red":void 0}}));let n=S.init(document.getElementById("myEcharts"),"purple-passion");n.on("click",function(e){N.value=e.data.value[3],k.value=!0});var m;let l=(e,r)=>{let y=r.coord([r.value(1),r.value(0)]),w=r.coord([r.value(2),r.value(0)]),b=r.size([0,1])[1]*.8;return{type:"rect",shape:pe({x:y[0],y:y[1]-b/2,width:Math.max(w[0]-y[0],1),height:b},e.coordSys),style:r.style(),focus:"self",blurScope:"coordinateSystem",emphasis:{}}},$;t.length<30?$=!0:$=!1,m={toolbox:{show:!0,feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"weakFilter",xAxisIndex:[0],labelFormatter:function(e){return A(e)},moveHandleSize:15,height:15,moveHandleStyle:{}},{type:"slider",filterMode:"weakFilter",yAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",xAxisIndex:[0]},{type:"inside",filterMode:"weakFilter",yAxisIndex:[0]}],legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",boundaryGap:[0,0],axisTick:{show:!0,alignWithLabel:!0},minInterval:24*3600,max:function(e){return e.max+(e.max-e.min)*.01},min:function(e){return e.min-(e.max-e.min)*.01},axisLabel:{showMaxLabel:"true",showMinLabel:"true",formatter:function(e,r){return A(e)}}},yAxis:{name:"tasks"},selectedMode:"single",series:[{name:"baseline",type:"custom",data:a,large:!0,renderItem:l,encode:{x:[1,2],y:0,labal:11},label:{normal:{show:$,color:"black",position:"inside",formatter:function(e){return e.data.name},fontSize:12}}},{name:"new",type:"custom",data:t,large:!0,renderItem:l,encode:{x:[1,2],y:0},label:{normal:{show:$,color:"black",position:"inside",formatter:function(e){return e.data.name},fontSize:12}}}],tooltip:{axisPointer:{},formatter:e=>{let r="Resources: <br/>";if(e.value[3].resources)for(const w in e.value[3].resources){let b=e.value[3].resources,R=i.selectedData.newResources.find(X=>X.id==w);R||(R=""),r+=` &nbsp&nbspResource &nbsp  ${R==null?void 0:R.name} &nbsp id: ${w}  <br/>&nbsp&nbsp&nbsp&nbspunits/hour:${Z(b[w].plannedUnitsPerHour)}=> ${Z(b[w].newUnitsPerHour)}<br/>`}function y(w){let b;switch(w){case"New":e.value[3].critical?b="red":b="#b0e054";break;case"Old":e.value[3].critical?b="pink":b="#5474c4"}return`<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${b};"></span>`}return`${e.name}<br/>
        <div style='margin-top:20px'>
         ${y("New")} New: ${v(p(e.value[4].changeNew.start).replace("T"," ").replace("Z","").slice(0,16))} -> ${v(p(e.value[4].changeNew.finish).replace("T"," ").replace("Z","").slice(0,16))}
         (${e.value[4].changeNew.duration})
        <br/>
         ${y("Old")} Old: ${v(p(e.value[4].baseNew.start).replace("T"," ").replace("Z","").slice(0,16))} -> ${v(p(e.value[4].baseNew.finish).replace("T"," ").replace("Z","").slice(0,16))}
       (${e.value[4].baseNew.duration})
         <br/>
         ${r}
        </div>`}}},m&&n.setOption(m),n.on("datazoom",function(e){$||(e.batch[0].end-e.batch[0].start<30/t.length*100?n.setOption({series:[{name:"baseline",type:"custom",data:a,large:!0,renderItem:l,encode:{x:[1,2],y:0,labal:11},label:{normal:{show:!0,color:"black",position:"inside",formatter:function(r){return r.data.name},fontSize:12}}},{name:"new",type:"custom",data:t,large:!0,renderItem:l,encode:{x:[1,2],y:0},label:{normal:{show:!0,color:"black",position:"inside",formatter:function(r){return r.data.name},fontSize:12}}}]}):n.setOption({series:[{name:"baseline",type:"custom",data:a,large:!0,renderItem:l,encode:{x:[1,2],y:0,labal:11},label:{normal:{show:!1,color:"black",position:"inside",formatter:function(r){return r.data.name},fontSize:12}}},{name:"new",type:"custom",data:t,large:!0,renderItem:l,encode:{x:[1,2],y:0},label:{normal:{show:!1,color:"black",position:"inside",formatter:function(r){return r.data.name},fontSize:12}}}]}))}),n.on("mousemove",function(e){n.dispatchAction({type:"highlight",dataIndex:e.dataIndex})}),c=S.init(document.getElementById("myEcharts01"),"purple-passion"),c.on("mousemove",function(e){c.dispatchAction({type:"highlight",name:e.name})}),c.on("click",function(e){c.dispatchAction({type:"select",name:e.name})})}let g=I("");function Z(a){if(!a)return"0.00";var a=Math.round(parseFloat(a)*100)/100,n=a.toString().split(".");if(n.length==1)return a=a.toString()+".00",a;if(n.length>1)return n[1].length<2&&(a=a.toString()+"0"),a}function W(t,a){return t.reduce(function(n,m){let l=m[a];return n[l]||(n[l]=[]),n[l].push(m),n},{})}let j=C(()=>{let t=i.selectedData.baselineResources.map(n=>({id:n.id,name:n.name,type:n.type})),a=W(t,"type");if(g.value){const n=new RegExp(g.value,"i");let m={};for(let l in a)m[l]=a[l].filter($=>n.test($.name));return m}else return a}),Q=C(()=>{var n;const t=i.selectedData.baselineResources;let a="base";return D.value?[t.filter(l=>l.id&&l.id===D.value)[0].distribution,a]:t.length==0?[]:(D.value=t[0].id,[(n=t[0])==null?void 0:n.distribution,a])}),G=C(()=>{var n;const t=i.selectedData.newResources;let a="new";return D.value?[t.filter(l=>l.id&&l.id===D.value)[0].distribution,a]:t.length==0?[]:[(n=t[0])==null?void 0:n.distribution,a]}),K=C(()=>({toolbox:{feature:{dataView:{show:!0,readOnly:!1},saveAsImage:{show:!0}}},dataZoom:[{type:"slider",filterMode:"none"},{type:"slider",filterMode:"none"},{type:"inside",filterMode:"none"},{type:"inside",filterMode:"none"}],tooltip:{trigger:"axis",axisPointer:{type:"cross"}},animation:!1,legend:{data:["baseline","new"]},xAxis:{name:"date",type:"time",axisLabel:{formatter:"{yyyy}-{MM}-{dd}"}},yAxis:{name:"units / day"},series:[{name:"baseline",type:"bar",data:V(Q.value),large:!0,selectedMode:"single",select:{itemStyle:{color:"red",borderWidth:"5px"}},emphasis:{focus:"self",blurScope:"coordinateSystem"}},{name:"new",type:"bar",data:V(G.value),large:!0,selectedMode:"single",select:{itemStyle:{color:"red",borderWidth:"5px"}},emphasis:{focus:"series",blurScope:"coordinateSystem"}}]}));function O(){c.setOption(K.value)}H(d,()=>{O()});async function Y(){u.push({name:"OptimizedReport"}),i.active=3}let D=I("");function q(){u.push({name:"BaselineSummary"}),i.active=1}function J(t){D.value=t}return H(D,()=>{O()}),(t,a)=>{const n=ue,m=se("v-btn");return z(),U(E,null,[o("div",ve,[o("div",ge,[o("h2",null,[T(f(t.$t("optimizedSummary.title[0]"))+" ",1),o("span",be,f(s(i).SummaryData.group),1),o("div",we,[o("span",null,f(s(i).setting.Steps)+" "+f(t.$t("optimizedSummary.title[1]")),1)]),o("div",Se,[o("span",null,f(`${s(i).setting.Ratio[0]*100}% - ${s(i).setting.Ratio[1]*100}% ${t.$t("optimizedSummary.title[2]")}`),1)])]),o("div",De,[x(B,{title:t.$t("optimizedSummary.header[0]"),height:180,precent:F(s(i).SummaryData.changedDuration-s(i).SummaryData.baseDuration,s(i).SummaryData.baseDuration),isPositive:!0,body:[s(i).SummaryData.changedDuration+" days",s(i).SummaryData.baseDuration+" days",s(i).SummaryData.planDurationDays+" days"]},null,8,["title","precent","body"]),x(B,{title:t.$t("baselineSummary.Tsidebar[1]"),height:180,precent:F(s(i).SummaryData.maxResourceUnit-s(i).SummaryData.BasemaxResourceUnit,s(i).SummaryData.BasemaxResourceUnit),isPositive:!1,body:[s(i).SummaryData.maxResourceUnit,s(i).SummaryData.BasemaxResourceUnit]},null,8,["title","precent","body"]),x(B,{title:t.$t("optimizedSummary.header[2]"),height:180,body:[s(i).SummaryData.changgedTasks,s(i).SummaryData.TotalTasks]},null,8,["title","body"]),x(B,{title:t.$t("optimizedSummary.header[3]"),height:180,body:[s(i).SummaryData.changedCriticalPath,s(i).SummaryData.changedCriticalPath,s(i).SummaryData.baseCriticalPath]},null,8,["title","body"])]),o("div",$e,[o("div",xe,[o("div",null,f(t.$t("optimizedSummary.chartName[0]")),1)]),o("span",null,f(t.$t("optimizedSummary.chartName[1]")),1),_e,o("div",Ce,null,512)]),o("div",ke,[o("div",Re,[o("div",null,f(t.$t("optimizedSummary.chartName[2]")),1)]),o("span",null,f(t.$t("optimizedSummary.chartName[3]")),1),x(n,{modelValue:s(g),"onUpdate:modelValue":a[0]||(a[0]=l=>oe(g)?g.value=l:g=l),placeholder:"Search Resources"},null,8,["modelValue"]),(z(!0),U(E,null,L(s(j),(l,$)=>(z(),U("div",null,[o("div",Ie,f($)+" Resources",1),o("div",ze,[(z(!0),U(E,null,L(l,(e,r)=>(z(),U("div",{key:r,class:"type"},[x(m,{variant:"text",value:r,class:de({activeType:s(D)==e.id}),onClick:()=>{J(e.id)}},{default:M(()=>[T(f(e.name)+" "+f(e.type),1)]),_:2},1032,["value","class","onClick"])]))),128))])]))),256)),o("div",Fe,null,512)]),o("div",Ae,[x(m,{onClick:q,class:"btnback"},{default:M(()=>[T("BACK")]),_:1}),x(m,{onClick:Y,class:"btngo"},{default:M(()=>[T(f(t.$t("optimizedSummary.btn[1]")),1)]),_:1})])])]),x(ye,{onCloseDialog:_,data:s(N),dialogVisible:s(k)},null,8,["data","dialogVisible"])],64)}}},Ee=te(Ue,[["__scopeId","data-v-f5cd3ac1"]]);export{Ee as default};