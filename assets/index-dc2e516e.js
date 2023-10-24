import{b6 as dn,aW as mn,v as w,w as _,x as W,Z as $,H as cn,I as gn,aX as pn,aY as En}from"./index-94283dfb.js";var Dn={exports:{}};(function(Q,C){(function(u,r){Q.exports=r()})(dn,function(){return function(v){var u={};function r(t){if(u[t])return u[t].exports;var R=u[t]={exports:{},id:t,loaded:!1};return v[t].call(R.exports,R,R.exports,r),R.loaded=!0,R.exports}return r.m=v,r.c=u,r.p="",r(0)}([function(v,u,r){var t;t=function(R){return{clustering:r(1),regression:r(5),statistics:r(6),histogram:r(15),transform:{regression:r(18),histogram:r(21),clustering:r(22)}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(2),S=m.dataPreprocess,g=m.normalizeDimensions,f=r(3),n=r(4),d=f.size,p=f.sumOfColumn,e=f.sum,D=f.zeros,n=r(4),s=n.isNumber,i=Math.pow,o={SINGLE:"single",MULTIPLE:"multiple"};function l(x,N,M){for(var U=D(x.length,2),T=E(N,z(x,M.dimensions)),A=!0,L,I,F,B;A;){A=!1;for(var P=0;P<x.length;P++){L=1/0,I=-1;for(var O=0;O<N;O++)F=y(x[P],T[O],M),F<L&&(L=F,I=O);U[P][0]!==I&&(A=!0),U[P][0]=I,U[P][1]=L}for(var P=0;P<N;P++){B=[];for(var O=0;O<U.length;O++)U[O][0]===P&&B.push(x[O]);T[P]=c(B,M)}}var q={centroids:T,clusterAssigned:U};return q}function c(x,N){for(var M=[],U,T,A=0;A<N.dimensions.length;A++){var L=N.dimensions[A];U=0;for(var I=0;I<x.length;I++)U+=x[I][L];T=U/x.length,M.push(T)}return M}function a(x,N,M){var U=(s(N)?{clusterCount:N,stepByStep:M}:N)||{clusterCount:2},T=U.clusterCount;if(T<2)return;var A=b(x,U),L=A.outputType===o.SINGLE,I=S(x,{dimensions:A.dimensions}),F=D(I.length,2),B,P,O;function q(X,J){F[X][1]=J}function V(X){return F[X][1]}if(L){B=[];var un=A.outputClusterIndexDimension;P=function(X,J){B[X][un]=J},O=function(X){return B[X][un]};for(var G=0;G<I.length;G++)B.push(I[G].slice()),q(G,0),P(G,0)}else P=function(X,J){F[X][0]=J},O=function(X){return F[X][0]};for(var vn=c(I,A),j=[vn],G=0;G<I.length;G++){var hn=y(I[G],vn,A);q(G,hn)}var rn,en,tn,nn,on,an,ln=1,H={data:B,centroids:j,isEnd:!1};L||(H.clusterAssment=F);function fn(){if(ln<T){rn=1/0;for(var X,J,Z,Y=0;Y<j.length;Y++){en=[],tn=[];for(var K=0;K<I.length;K++)O(K)===Y?en.push(I[K]):tn.push(V(K));nn=l(en,2,A),on=p(nn.clusterAssigned,1),an=e(tn),on+an<rn&&(rn=an+on,X=Y,J=nn.centroids,Z=nn.clusterAssigned)}for(var K=0;K<Z.length;K++)Z[K][0]===0?Z[K][0]=X:Z[K][0]===1&&(Z[K][0]=j.length);j[X]=J[0],j.push(J[1]);for(var K=0,Y=0;K<I.length&&Y<Z.length;K++)O(K)===X&&(P(K,Z[Y][0]),q(K,Z[Y++][1]));var sn=[];if(!L){for(var K=0;K<j.length;K++){sn[K]=[];for(var Y=0;Y<I.length;Y++)O(Y)===K&&sn[K].push(I[Y])}H.pointsInCluster=sn}ln++}else H.isEnd=!0}if(U.stepByStep)H.next=function(){return fn(),h(H,A),H};else for(;fn(),!H.isEnd;);return h(H,A),H}function h(x,N){var M=N.outputCentroidDimensions;if(!(N.outputType!==o.SINGLE||M==null))for(var U=x.data,T=x.centroids,A=0;A<U.length;A++)for(var L=U[A],I=L[N.outputClusterIndexDimension],F=T[I],B=Math.min(F.length,M.length),P=0;P<B;P++)L[M[P]]=F[P]}function E(x,N){for(var M=D(x,N.length),U=0;U<N.length;U++)for(var T=N[U],A=0;A<x;A++)M[A][U]=T.min+T.span*Math.random();return M}function y(x,N,M){for(var U=0,T=M.dimensions,A=M.rawExtents,L=0;L<T.length;L++){var I=A[L].span;if(I){var F=T[L],B=(x[F]-N[L])/I;U+=i(B,2)}}return U}function b(x,N){var M=d(x);if(M.length<1)throw new Error("The input data of clustering should be two-dimension array.");for(var U=M[1],T=[],A=0;A<U;A++)T.push(A);var L=g(N.dimensions,T),I=N.outputType||o.MULTIPLE,F=N.outputClusterIndexDimension;if(I===o.SINGLE&&!n.isNumber(F))throw new Error("outputClusterIndexDimension is required as a number.");var B=z(x,L);return{dimensions:L,rawExtents:B,outputType:I,outputClusterIndexDimension:F,outputCentroidDimensions:N.outputCentroidDimensions}}function z(x,N){for(var M=[],U=N.length,T=0;T<U;T++)M.push({min:1/0,max:-1/0});for(var T=0;T<x.length;T++)for(var A=x[T],L=0;L<U;L++){var I=M[L],F=A[N[L]];I.min>F&&(I.min=F),I.max<F&&(I.max=F)}for(var T=0;T<U;T++)M[T].span=M[T].max-M[T].min;return M}return{OutputType:o,hierarchicalKMeans:a}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(3),S=m.isArray,g=m.size,f=r(4),d=f.isNumber;function p(n,s){return typeof n=="number"?[n]:n??s}function e(n,s){s=s||{};var i=s.dimensions,o={};if(i!=null)for(var l=0;l<i.length;l++)o[i[l]]=!0;var c=s.toOneDimensionArray?i?i[0]:0:null;function a(x){return!i||o.hasOwnProperty(x)}if(!S(n))throw new Error("Invalid data type, you should input an array");var h=[],E=g(n);if(E.length===1)for(var l=0;l<E[0];l++){var y=n[l];d(y)&&h.push(y)}else if(E.length===2)for(var l=0;l<E[0];l++){for(var b=!0,y=n[l],z=0;z<E[1];z++)a(z)&&!d(y[z])&&(b=!1);b&&h.push(c!=null?y[c]:y)}return h}function D(n){var s=n.toString(),i=s.indexOf(".");return i<0?0:s.length-1-i}return{normalizeDimensions:p,dataPreprocess:e,getPrecision:D}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=Object.prototype.toString,S=Array.prototype,g=S.map;function f(o){for(var l=[];d(o);)l.push(o.length),o=o[0];return l}function d(o){return m.call(o)==="[object Array]"}function p(o,l){for(var c=[],a=0;a<o;a++){c[a]=[];for(var h=0;h<l;h++)c[a][h]=0}return c}function e(o){for(var l=0,c=0;c<o.length;c++)l+=o[c];return l}function D(o,l){for(var c=0,a=0;a<o.length;a++)c+=o[a][l];return c}function n(o,l){return o>l?1:o<l?-1:o===l?0:NaN}function s(o,l,c,a){for(c==null&&(c=0),a==null&&(a=o.length);c<a;){var h=Math.floor((c+a)/2),E=n(o[h],l);if(E>0)a=h;else if(E<0)c=h+1;else return h+1}return c}function i(o,l,c){if(o&&l){if(o.map&&o.map===g)return o.map(l,c);for(var a=[],h=0,E=o.length;h<E;h++)a.push(l.call(c,o[h],h,o));return a}}return{size:f,isArray:d,zeros:p,sum:e,sumOfColumn:D,ascending:n,bisect:s,map:i}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){function m(f){return f=f===null?NaN:+f,typeof f=="number"&&!isNaN(f)}function S(f){return isFinite(f)&&f===Math.round(f)}function g(f){if(f===0)return 0;var d=Math.floor(Math.log(f)/Math.LN10);return f/Math.pow(10,d)>=10&&d++,d}return{isNumber:m,isInteger:S,quantityExponent:g}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(2),S=m.dataPreprocess,g=m.normalizeDimensions,f={linear:function(e,D){for(var n=D.dimensions[0],s=D.dimensions[1],i=0,o=0,l=0,c=0,a=e.length,h=0;h<a;h++){var E=e[h];i+=E[n],o+=E[s],l+=E[n]*E[s],c+=E[n]*E[n]}for(var y=(a*l-i*o)/(a*c-i*i),b=o/a-y*i/a,z=[],x=0;x<e.length;x++){var E=e[x],N=E.slice();N[n]=E[n],N[s]=y*E[n]+b,z.push(N)}var M="y = "+Math.round(y*100)/100+"x + "+Math.round(b*100)/100;return{points:z,parameter:{gradient:y,intercept:b},expression:M}},linearThroughOrigin:function(e,D){for(var n=D.dimensions[0],s=D.dimensions[1],i=0,o=0,l=0;l<e.length;l++){var c=e[l];i+=c[n]*c[n],o+=c[n]*c[s]}for(var a=o/i,h=[],E=0;E<e.length;E++){var c=e[E],y=c.slice();y[n]=c[n],y[s]=c[n]*a,h.push(y)}var b="y = "+Math.round(a*100)/100+"x";return{points:h,parameter:{gradient:a},expression:b}},exponential:function(e,D){for(var n=D.dimensions[0],s=D.dimensions[1],i=0,o=0,l=0,c=0,a=0,h=0,E=0;E<e.length;E++){var y=e[E];i+=y[n],o+=y[s],h+=y[n]*y[s],l+=y[n]*y[n]*y[s],c+=y[s]*Math.log(y[s]),a+=y[n]*y[s]*Math.log(y[s])}for(var b=o*l-h*h,z=Math.pow(Math.E,(l*c-h*a)/b),x=(o*a-h*c)/b,N=[],M=0;M<e.length;M++){var y=e[M],U=y.slice();U[n]=y[n],U[s]=z*Math.pow(Math.E,x*y[n]),N.push(U)}var T="y = "+Math.round(z*100)/100+"e^("+Math.round(x*100)/100+"x)";return{points:N,parameter:{coefficient:z,index:x},expression:T}},logarithmic:function(e,D){for(var n=D.dimensions[0],s=D.dimensions[1],i=0,o=0,l=0,c=0,a=0;a<e.length;a++){var h=e[a];i+=Math.log(h[n]),o+=h[s]*Math.log(h[n]),l+=h[s],c+=Math.pow(Math.log(h[n]),2)}for(var E=(a*o-l*i)/(a*c-i*i),y=(l-E*i)/a,b=[],z=0;z<e.length;z++){var h=e[z],x=h.slice();x[n]=h[n],x[s]=E*Math.log(h[n])+y,b.push(x)}var N="y = "+Math.round(y*100)/100+" + "+Math.round(E*100)/100+"ln(x)";return{points:b,parameter:{gradient:E,intercept:y},expression:N}},polynomial:function(e,D){var n=D.dimensions[0],s=D.dimensions[1],i=D.order;i==null&&(i=2);for(var o=[],l=[],c=i+1,a=0;a<c;a++){for(var h=0,E=0;E<e.length;E++){var y=e[E];h+=y[s]*Math.pow(y[n],a)}l.push(h);for(var b=[],z=0;z<c;z++){for(var x=0,N=0;N<e.length;N++)x+=Math.pow(e[N][n],a+z);b.push(x)}o.push(b)}o.push(l);for(var M=d(o,c),U=[],a=0;a<e.length;a++){for(var T=0,y=e[a],E=0;E<M.length;E++)T+=M[E]*Math.pow(y[n],E);var A=y.slice();A[n]=y[n],A[s]=T,U.push(A)}for(var L="y = ",a=M.length-1;a>=0;a--)a>1?L+=Math.round(M[a]*Math.pow(10,a+1))/Math.pow(10,a+1)+"x^"+a+" + ":a===1?L+=Math.round(M[a]*100)/100+"x + ":L+=Math.round(M[a]*100)/100;return{points:U,parameter:M,expression:L}}};function d(e,D){for(var n=0;n<e.length-1;n++){for(var s=n,i=n+1;i<e.length-1;i++)Math.abs(e[n][i])>Math.abs(e[n][s])&&(s=i);for(var o=n;o<e.length;o++){var l=e[o][n];e[o][n]=e[o][s],e[o][s]=l}for(var c=n+1;c<e.length-1;c++)for(var a=e.length-1;a>=n;a--)e[a][c]-=e[a][n]/e[n][n]*e[n][c]}for(var h=new Array(D),E=e.length-1,i=e.length-2;i>=0;i--){for(var l=0,n=i+1;n<e.length-1;n++)l+=e[n][i]*h[n];h[i]=(e[E][i]-l)/e[i][i]}return h}var p=function(e,D,n){var s=typeof n=="number"?{order:n}:n||{},i=g(s.dimensions,[0,1]),o=S(D,{dimensions:i}),l=f[e](o,{order:s.order,dimensions:i}),c=i[0];return l.points.sort(function(a,h){return a[c]-h[c]}),l};return p}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m={};return m.max=r(7),m.deviation=r(8),m.mean=r(10),m.median=r(12),m.min=r(14),m.quantile=r(13),m.sampleVariance=r(9),m.sum=r(11),m}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(4),S=m.isNumber;function g(f){for(var d=-1/0,p=0;p<f.length;p++)S(f[p])&&f[p]>d&&(d=f[p]);return d}return g}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(9);return function(S){var g=m(S);return g&&Math.sqrt(g)}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(4),S=m.isNumber,g=r(10);function f(d){var p=d.length;if(!p||p<2)return 0;if(d.length>=2){for(var e=g(d),D=0,n,s=0;s<d.length;s++)S(d[s])&&(n=d[s]-e,D+=n*n);return D/(d.length-1)}}return f}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(11);function S(g){var f=g.length;return f?m(g)/g.length:0}return S}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(4),S=m.isNumber;function g(f){var d=f.length;if(!d)return 0;for(var p=0,e=0;e<d;e++)S(f[e])&&(p+=f[e]);return p}return g}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(13);function S(g){return m(g,.5)}return S}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){return function(m,S){var g=m.length;if(!g)return 0;if(S<=0||g<2)return m[0];if(S>=1)return m[g-1];var f=(g-1)*S,d=Math.floor(f),p=m[d],e=m[d+1];return p+(e-p)*(f-d)}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(4),S=m.isNumber;function g(f){for(var d=1/0,p=0;p<f.length;p++)S(f[p])&&f[p]<d&&(d=f[p]);return d}return g}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(7),S=r(14),g=r(13),f=r(8),d=r(2),p=d.dataPreprocess,e=d.normalizeDimensions,D=r(3),n=D.ascending,s=D.map,i=r(16),o=D.bisect,l=r(17);function c(O,E){for(var y=typeof E=="string"?{method:E}:E||{},b=y.method==null?a.squareRoot:a[y.method],z=e(y.dimensions),x=p(O,{dimensions:z,toOneDimensionArray:!0}),N=m(x),M=S(x),U=b(x,M,N),T=l(M,N,U),A=T.step,L=T.toFixedPrecision,I=i(+(Math.ceil(M/A)*A).toFixed(L),+(Math.floor(N/A)*A).toFixed(L),A,L),F=I.length,B=new Array(F+1),P=0;P<=F;P++)B[P]={},B[P].sample=[],B[P].x0=P>0?I[P-1]:I[P]-M===A?M:I[P]-A,B[P].x1=P<F?I[P]:N-I[P-1]===A?N:I[P-1]+A;for(var P=0;P<x.length;P++)M<=x[P]&&x[P]<=N&&B[o(I,x[P],0,F)].sample.push(x[P]);var O=s(B,function(V){return[+((V.x0+V.x1)/2).toFixed(L),V.sample.length,V.x0,V.x1,V.x0+" - "+V.x1]}),q=s(B,function(V){return[V.x0,V.x1,V.sample.length]});return{bins:B,data:O,customData:q}}var a={squareRoot:function(h){var E=Math.ceil(Math.sqrt(h.length));return E>50?50:E},scott:function(h,E,y){return Math.ceil((y-E)/(3.5*f(h)*Math.pow(h.length,-1/3)))},freedmanDiaconis:function(h,E,y){return h.sort(n),Math.ceil((y-E)/(2*(g(h,.75)-g(h,.25))*Math.pow(h.length,-1/3)))},sturges:function(h){return Math.ceil(Math.log(h.length)/Math.LN2)+1}};return c}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(2),S=m.getPrecision;return function(g,f,d,p){var e=arguments.length;e<2?(f=g,g=0,d=1):e<3?d=1:e<4?(d=+d,p=S(d)):p=+p;for(var D=Math.ceil(((f-g)/d).toFixed(p)),n=new Array(D+1),s=0;s<D+1;s++)n[s]=+(g+s*d).toFixed(p);return n}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(4);return function(S,g,f){var d=Math.abs(g-S)/f,p=m.quantityExponent(d),e=Math.pow(10,p),D=d/e;D>=Math.sqrt(50)?e*=10:D>=Math.sqrt(10)?e*=5:D>=Math.sqrt(2)&&(e*=2);var n=p<0?-p:0,s=+(g>=S?e:-e).toFixed(n);return{step:s,toFixedPrecision:n}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(5),S=r(19),g=2;return{type:"ecStat:regression",transform:function(d){var p=d.upstream,e=d.config||{},D=e.method||"linear",n=m(D,p.cloneRawData(),{order:e.order,dimensions:S.normalizeExistingDimensions(d,e.dimensions)}),s=n.points,i=e.formulaOn;i==null&&(i="end");var o;if(i!=="none"){for(var l=0;l<s.length;l++)s[l][g]=i==="start"&&l===0||i==="all"||i==="end"&&l===s.length-1?n.expression:"";o=p.cloneAllDimensionInfo(),o[g]={}}return[{dimensions:o,data:s}]}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(3),S=r(4),g=r(20);function f(p,e){if(e==null)return;var D=p.upstream;if(m.isArray(e)){for(var n=[],s=0;s<e.length;s++){var i=D.getDimensionInfo(e[s]);o(i,e[s]),n[s]=i.index}return n}else{var i=D.getDimensionInfo(e);return o(i,e),i.index}function o(l,c){if(!l)throw new Error("Can not find dimension by "+c)}}function d(p){if(m.isArray(p)){for(var e=[],D=[],n=0;n<p.length;n++){var s=i(p[n]);e.push(s.name),D.push(s.index)}return{name:e,index:D}}else if(p!=null)return i(p);function i(o){if(S.isNumber(o))return{index:o};if(g.isObject(o)&&S.isNumber(o.index))return o;throw new Error("Illegle new dimensions config. Expect `{ name: string, index: number }`.")}}return{normalizeExistingDimensions:f,normalizeNewDimensions:d}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){function m(g,f){if(Object.assign)Object.assign(g,f);else for(var d in f)f.hasOwnProperty(d)&&(g[d]=f[d]);return g}function S(g){const f=typeof g;return f==="function"||!!g&&f==="object"}return{extend:m,isObject:S}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(15),S=r(19);return{type:"ecStat:histogram",transform:function(f){var d=f.upstream,p=f.config||{},e=m(d.cloneRawData(),{method:p.method,dimensions:S.normalizeExistingDimensions(f,p.dimensions)});return[{dimensions:["MeanOfV0V1","VCount","V0","V1","DisplayableName"],data:e.data},{data:e.customData}]}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(R){var m=r(1),S=r(4),g=r(19),f=S.isNumber;return{type:"ecStat:clustering",transform:function(p){var e=p.upstream,D=p.config||{},n=D.clusterCount;if(!f(n)||n<=0)throw new Error('config param "clusterCount" need to be specified as an interger greater than 1.');if(n===1)return[{},{data:[]}];var s=g.normalizeNewDimensions(D.outputClusterIndexDimension),i=g.normalizeNewDimensions(D.outputCentroidDimensions);if(s==null)throw new Error("outputClusterIndexDimension is required as a number.");for(var o=m.hierarchicalKMeans(e.cloneRawData(),{clusterCount:n,stepByStep:!1,dimensions:g.normalizeExistingDimensions(p,D.dimensions),outputType:m.OutputType.SINGLE,outputClusterIndexDimension:s.index,outputCentroidDimensions:(i||{}).index}),l=e.cloneAllDimensionInfo(),c=[],a=0;a<l.length;a++){var h=l[a];c.push(h.name)}if(c[s.index]=s.name,i)for(var a=0;a<i.index.length;a++)i.name[a]!=null&&(c[i.index[a]]=i.name[a]);return[{dimensions:c,data:o.data},{data:o.centroids}]}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)}])})})(Dn);const yn=""+new URL("../arrow-down-thin-green.svg",import.meta.url).href,xn=""+new URL("../arrow-up-thin-red.svg",import.meta.url).href,Mn=""+new URL("../arrow-down-thin.svg",import.meta.url).href,Nn=""+new URL("../arrow-up-thin.svg",import.meta.url).href;const k=Q=>(pn("data-v-524219df"),Q=Q(),En(),Q),An={class:"right-items"},Sn={class:"title"},Pn={class:"content"},In={class:"t-content"},Tn={class:"f"},Un={key:0},Ln={key:0,style:{color:"#10be00","font-weight":"700"}},Rn=k(()=>W("img",{style:{"vertical-align":"bottom"},src:yn,alt:"",srcset:""},null,-1)),Fn={key:1,style:{color:"#be0010","font-weight":"700"}},Cn=k(()=>W("img",{style:{"vertical-align":"bottom"},src:xn,alt:"",srcset:""},null,-1)),zn={key:1},Bn={key:0,style:{color:"#be0010","font-weight":"700"}},Kn=k(()=>W("img",{style:{"vertical-align":"bottom"},src:Mn,alt:"",srcset:""},null,-1)),bn={key:1,style:{color:"#10be00","font-weight":"700"}},Wn=k(()=>W("img",{style:{"vertical-align":"bottom"},src:Nn,alt:"",srcset:""},null,-1)),On={class:"b-content"},Xn={style:{"border-right":"1px solid #f0f1f3"},class:"bottom"},Vn=k(()=>W("div",null,"Actual",-1)),Yn={class:"bottom"},Gn=k(()=>W("div",null,"Plan",-1)),Hn={__name:"index",props:["title","body","precent","height","isPositive"],setup(Q){const C=Q;return(v,u)=>(w(),_("div",An,[W("div",{style:gn({height:Q.height+"px"}),class:"right-item"},[W("div",Sn,$(C.title),1),W("div",Pn,[W("div",In,[W("span",Tn,$(C.body&&C.body.length>0?C.body[0]:null),1),C.isPositive?(w(),_("span",Un,[C.precent&&C.precent.indexOf("-")!==-1?(w(),_("span",Ln,[Rn,W("span",null,$(C.precent),1)])):C.precent?(w(),_("span",Fn,[Cn,W("span",null,$(C.precent),1)])):cn("",!0)])):(w(),_("span",zn,[C.precent&&C.precent.indexOf("-")!==-1?(w(),_("span",Bn,[Kn,W("span",null,$(C.precent),1)])):C.precent?(w(),_("span",bn,[Wn,W("span",null,$(C.precent),1)])):cn("",!0)]))]),W("div",On,[W("div",Xn,[W("span",null,$(C.body&&C.body.length>0?C.body[1]:null),1),Vn]),W("div",Yn,[W("span",null,$(C.body&&C.body.length>0?C.body[2]!==null&&C.body[2]!==void 0?C.body[2]:C.body[1]:null),1),Gn])])])],4)]))}},Zn=mn(Hn,[["__scopeId","data-v-524219df"]]);export{Zn as C};