import{aI as un}from"./index-dfa3d926.js";var an={exports:{}};(function(on,vn){(function(u,r){on.exports=r()})(un,function(){return function(v){var u={};function r(t){if(u[t])return u[t].exports;var L=u[t]={exports:{},id:t,loaded:!1};return v[t].call(L.exports,L,L.exports,r),L.loaded=!0,L.exports}return r.m=v,r.c=u,r.p="",r(0)}([function(v,u,r){var t;t=function(L){return{clustering:r(1),regression:r(5),statistics:r(6),histogram:r(15),transform:{regression:r(18),histogram:r(21),clustering:r(22)}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(2),S=g.dataPreprocess,d=g.normalizeDimensions,l=r(3),n=r(4),m=l.size,E=l.sumOfColumn,e=l.sum,p=l.zeros,n=r(4),o=n.isNumber,s=Math.pow,a={SINGLE:"single",MULTIPLE:"multiple"};function f(M,N,y){for(var F=p(M.length,2),T=D(N,z(M,y.dimensions)),A=!0,U,I,R,C;A;){A=!1;for(var P=0;P<M.length;P++){U=1/0,I=-1;for(var W=0;W<N;W++)R=x(M[P],T[W],y),R<U&&(U=R,I=W);F[P][0]!==I&&(A=!0),F[P][0]=I,F[P][1]=U}for(var P=0;P<N;P++){C=[];for(var W=0;W<F.length;W++)F[W][0]===P&&C.push(M[W]);T[P]=c(C,y)}}var Q={centroids:T,clusterAssigned:F};return Q}function c(M,N){for(var y=[],F,T,A=0;A<N.dimensions.length;A++){var U=N.dimensions[A];F=0;for(var I=0;I<M.length;I++)F+=M[I][U];T=F/M.length,y.push(T)}return y}function i(M,N,y){var F=(o(N)?{clusterCount:N,stepByStep:y}:N)||{clusterCount:2},T=F.clusterCount;if(T<2)return;var A=K(M,F),U=A.outputType===a.SINGLE,I=S(M,{dimensions:A.dimensions}),R=p(I.length,2),C,P,W;function Q(O,H){R[O][1]=H}function X(O){return R[O][1]}if(U){C=[];var nn=A.outputClusterIndexDimension;P=function(O,H){C[O][nn]=H},W=function(O){return C[O][nn]};for(var V=0;V<I.length;V++)C.push(I[V].slice()),Q(V,0),P(V,0)}else P=function(O,H){R[O][0]=H},W=function(O){return R[O][0]};for(var rn=c(I,A),Z=[rn],V=0;V<I.length;V++){var sn=x(I[V],rn,A);Q(V,sn)}var b,q,j,$,w,k,en=1,G={data:C,centroids:Z,isEnd:!1};U||(G.clusterAssment=R);function tn(){if(en<T){b=1/0;for(var O,H,J,Y=0;Y<Z.length;Y++){q=[],j=[];for(var B=0;B<I.length;B++)W(B)===Y?q.push(I[B]):j.push(X(B));$=f(q,2,A),w=E($.clusterAssigned,1),k=e(j),w+k<b&&(b=k+w,O=Y,H=$.centroids,J=$.clusterAssigned)}for(var B=0;B<J.length;B++)J[B][0]===0?J[B][0]=O:J[B][0]===1&&(J[B][0]=Z.length);Z[O]=H[0],Z.push(H[1]);for(var B=0,Y=0;B<I.length&&Y<J.length;B++)W(B)===O&&(P(B,J[Y][0]),Q(B,J[Y++][1]));var _=[];if(!U){for(var B=0;B<Z.length;B++){_[B]=[];for(var Y=0;Y<I.length;Y++)W(Y)===B&&_[B].push(I[Y])}G.pointsInCluster=_}en++}else G.isEnd=!0}if(F.stepByStep)G.next=function(){return tn(),h(G,A),G};else for(;tn(),!G.isEnd;);return h(G,A),G}function h(M,N){var y=N.outputCentroidDimensions;if(!(N.outputType!==a.SINGLE||y==null))for(var F=M.data,T=M.centroids,A=0;A<F.length;A++)for(var U=F[A],I=U[N.outputClusterIndexDimension],R=T[I],C=Math.min(R.length,y.length),P=0;P<C;P++)U[y[P]]=R[P]}function D(M,N){for(var y=p(M,N.length),F=0;F<N.length;F++)for(var T=N[F],A=0;A<M;A++)y[A][F]=T.min+T.span*Math.random();return y}function x(M,N,y){for(var F=0,T=y.dimensions,A=y.rawExtents,U=0;U<T.length;U++){var I=A[U].span;if(I){var R=T[U],C=(M[R]-N[U])/I;F+=s(C,2)}}return F}function K(M,N){var y=m(M);if(y.length<1)throw new Error("The input data of clustering should be two-dimension array.");for(var F=y[1],T=[],A=0;A<F;A++)T.push(A);var U=d(N.dimensions,T),I=N.outputType||a.MULTIPLE,R=N.outputClusterIndexDimension;if(I===a.SINGLE&&!n.isNumber(R))throw new Error("outputClusterIndexDimension is required as a number.");var C=z(M,U);return{dimensions:U,rawExtents:C,outputType:I,outputClusterIndexDimension:R,outputCentroidDimensions:N.outputCentroidDimensions}}function z(M,N){for(var y=[],F=N.length,T=0;T<F;T++)y.push({min:1/0,max:-1/0});for(var T=0;T<M.length;T++)for(var A=M[T],U=0;U<F;U++){var I=y[U],R=A[N[U]];I.min>R&&(I.min=R),I.max<R&&(I.max=R)}for(var T=0;T<F;T++)y[T].span=y[T].max-y[T].min;return y}return{OutputType:a,hierarchicalKMeans:i}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(3),S=g.isArray,d=g.size,l=r(4),m=l.isNumber;function E(n,o){return typeof n=="number"?[n]:n??o}function e(n,o){o=o||{};var s=o.dimensions,a={};if(s!=null)for(var f=0;f<s.length;f++)a[s[f]]=!0;var c=o.toOneDimensionArray?s?s[0]:0:null;function i(M){return!s||a.hasOwnProperty(M)}if(!S(n))throw new Error("Invalid data type, you should input an array");var h=[],D=d(n);if(D.length===1)for(var f=0;f<D[0];f++){var x=n[f];m(x)&&h.push(x)}else if(D.length===2)for(var f=0;f<D[0];f++){for(var K=!0,x=n[f],z=0;z<D[1];z++)i(z)&&!m(x[z])&&(K=!1);K&&h.push(c!=null?x[c]:x)}return h}function p(n){var o=n.toString(),s=o.indexOf(".");return s<0?0:o.length-1-s}return{normalizeDimensions:E,dataPreprocess:e,getPrecision:p}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=Object.prototype.toString,S=Array.prototype,d=S.map;function l(a){for(var f=[];m(a);)f.push(a.length),a=a[0];return f}function m(a){return g.call(a)==="[object Array]"}function E(a,f){for(var c=[],i=0;i<a;i++){c[i]=[];for(var h=0;h<f;h++)c[i][h]=0}return c}function e(a){for(var f=0,c=0;c<a.length;c++)f+=a[c];return f}function p(a,f){for(var c=0,i=0;i<a.length;i++)c+=a[i][f];return c}function n(a,f){return a>f?1:a<f?-1:a===f?0:NaN}function o(a,f,c,i){for(c==null&&(c=0),i==null&&(i=a.length);c<i;){var h=Math.floor((c+i)/2),D=n(a[h],f);if(D>0)i=h;else if(D<0)c=h+1;else return h+1}return c}function s(a,f,c){if(a&&f){if(a.map&&a.map===d)return a.map(f,c);for(var i=[],h=0,D=a.length;h<D;h++)i.push(f.call(c,a[h],h,a));return i}}return{size:l,isArray:m,zeros:E,sum:e,sumOfColumn:p,ascending:n,bisect:o,map:s}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){function g(l){return l=l===null?NaN:+l,typeof l=="number"&&!isNaN(l)}function S(l){return isFinite(l)&&l===Math.round(l)}function d(l){if(l===0)return 0;var m=Math.floor(Math.log(l)/Math.LN10);return l/Math.pow(10,m)>=10&&m++,m}return{isNumber:g,isInteger:S,quantityExponent:d}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(2),S=g.dataPreprocess,d=g.normalizeDimensions,l={linear:function(e,p){for(var n=p.dimensions[0],o=p.dimensions[1],s=0,a=0,f=0,c=0,i=e.length,h=0;h<i;h++){var D=e[h];s+=D[n],a+=D[o],f+=D[n]*D[o],c+=D[n]*D[n]}for(var x=(i*f-s*a)/(i*c-s*s),K=a/i-x*s/i,z=[],M=0;M<e.length;M++){var D=e[M],N=D.slice();N[n]=D[n],N[o]=x*D[n]+K,z.push(N)}var y="y = "+Math.round(x*100)/100+"x + "+Math.round(K*100)/100;return{points:z,parameter:{gradient:x,intercept:K},expression:y}},linearThroughOrigin:function(e,p){for(var n=p.dimensions[0],o=p.dimensions[1],s=0,a=0,f=0;f<e.length;f++){var c=e[f];s+=c[n]*c[n],a+=c[n]*c[o]}for(var i=a/s,h=[],D=0;D<e.length;D++){var c=e[D],x=c.slice();x[n]=c[n],x[o]=c[n]*i,h.push(x)}var K="y = "+Math.round(i*100)/100+"x";return{points:h,parameter:{gradient:i},expression:K}},exponential:function(e,p){for(var n=p.dimensions[0],o=p.dimensions[1],s=0,a=0,f=0,c=0,i=0,h=0,D=0;D<e.length;D++){var x=e[D];s+=x[n],a+=x[o],h+=x[n]*x[o],f+=x[n]*x[n]*x[o],c+=x[o]*Math.log(x[o]),i+=x[n]*x[o]*Math.log(x[o])}for(var K=a*f-h*h,z=Math.pow(Math.E,(f*c-h*i)/K),M=(a*i-h*c)/K,N=[],y=0;y<e.length;y++){var x=e[y],F=x.slice();F[n]=x[n],F[o]=z*Math.pow(Math.E,M*x[n]),N.push(F)}var T="y = "+Math.round(z*100)/100+"e^("+Math.round(M*100)/100+"x)";return{points:N,parameter:{coefficient:z,index:M},expression:T}},logarithmic:function(e,p){for(var n=p.dimensions[0],o=p.dimensions[1],s=0,a=0,f=0,c=0,i=0;i<e.length;i++){var h=e[i];s+=Math.log(h[n]),a+=h[o]*Math.log(h[n]),f+=h[o],c+=Math.pow(Math.log(h[n]),2)}for(var D=(i*a-f*s)/(i*c-s*s),x=(f-D*s)/i,K=[],z=0;z<e.length;z++){var h=e[z],M=h.slice();M[n]=h[n],M[o]=D*Math.log(h[n])+x,K.push(M)}var N="y = "+Math.round(x*100)/100+" + "+Math.round(D*100)/100+"ln(x)";return{points:K,parameter:{gradient:D,intercept:x},expression:N}},polynomial:function(e,p){var n=p.dimensions[0],o=p.dimensions[1],s=p.order;s==null&&(s=2);for(var a=[],f=[],c=s+1,i=0;i<c;i++){for(var h=0,D=0;D<e.length;D++){var x=e[D];h+=x[o]*Math.pow(x[n],i)}f.push(h);for(var K=[],z=0;z<c;z++){for(var M=0,N=0;N<e.length;N++)M+=Math.pow(e[N][n],i+z);K.push(M)}a.push(K)}a.push(f);for(var y=m(a,c),F=[],i=0;i<e.length;i++){for(var T=0,x=e[i],D=0;D<y.length;D++)T+=y[D]*Math.pow(x[n],D);var A=x.slice();A[n]=x[n],A[o]=T,F.push(A)}for(var U="y = ",i=y.length-1;i>=0;i--)i>1?U+=Math.round(y[i]*Math.pow(10,i+1))/Math.pow(10,i+1)+"x^"+i+" + ":i===1?U+=Math.round(y[i]*100)/100+"x + ":U+=Math.round(y[i]*100)/100;return{points:F,parameter:y,expression:U}}};function m(e,p){for(var n=0;n<e.length-1;n++){for(var o=n,s=n+1;s<e.length-1;s++)Math.abs(e[n][s])>Math.abs(e[n][o])&&(o=s);for(var a=n;a<e.length;a++){var f=e[a][n];e[a][n]=e[a][o],e[a][o]=f}for(var c=n+1;c<e.length-1;c++)for(var i=e.length-1;i>=n;i--)e[i][c]-=e[i][n]/e[n][n]*e[n][c]}for(var h=new Array(p),D=e.length-1,s=e.length-2;s>=0;s--){for(var f=0,n=s+1;n<e.length-1;n++)f+=e[n][s]*h[n];h[s]=(e[D][s]-f)/e[s][s]}return h}var E=function(e,p,n){var o=typeof n=="number"?{order:n}:n||{},s=d(o.dimensions,[0,1]),a=S(p,{dimensions:s}),f=l[e](a,{order:o.order,dimensions:s}),c=s[0];return f.points.sort(function(i,h){return i[c]-h[c]}),f};return E}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g={};return g.max=r(7),g.deviation=r(8),g.mean=r(10),g.median=r(12),g.min=r(14),g.quantile=r(13),g.sampleVariance=r(9),g.sum=r(11),g}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(4),S=g.isNumber;function d(l){for(var m=-1/0,E=0;E<l.length;E++)S(l[E])&&l[E]>m&&(m=l[E]);return m}return d}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(9);return function(S){var d=g(S);return d&&Math.sqrt(d)}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(4),S=g.isNumber,d=r(10);function l(m){var E=m.length;if(!E||E<2)return 0;if(m.length>=2){for(var e=d(m),p=0,n,o=0;o<m.length;o++)S(m[o])&&(n=m[o]-e,p+=n*n);return p/(m.length-1)}}return l}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(11);function S(d){var l=d.length;return l?g(d)/d.length:0}return S}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(4),S=g.isNumber;function d(l){var m=l.length;if(!m)return 0;for(var E=0,e=0;e<m;e++)S(l[e])&&(E+=l[e]);return E}return d}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(13);function S(d){return g(d,.5)}return S}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){return function(g,S){var d=g.length;if(!d)return 0;if(S<=0||d<2)return g[0];if(S>=1)return g[d-1];var l=(d-1)*S,m=Math.floor(l),E=g[m],e=g[m+1];return E+(e-E)*(l-m)}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(4),S=g.isNumber;function d(l){for(var m=1/0,E=0;E<l.length;E++)S(l[E])&&l[E]<m&&(m=l[E]);return m}return d}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(7),S=r(14),d=r(13),l=r(8),m=r(2),E=m.dataPreprocess,e=m.normalizeDimensions,p=r(3),n=p.ascending,o=p.map,s=r(16),a=p.bisect,f=r(17);function c(W,D){for(var x=typeof D=="string"?{method:D}:D||{},K=x.method==null?i.squareRoot:i[x.method],z=e(x.dimensions),M=E(W,{dimensions:z,toOneDimensionArray:!0}),N=g(M),y=S(M),F=K(M,y,N),T=f(y,N,F),A=T.step,U=T.toFixedPrecision,I=s(+(Math.ceil(y/A)*A).toFixed(U),+(Math.floor(N/A)*A).toFixed(U),A,U),R=I.length,C=new Array(R+1),P=0;P<=R;P++)C[P]={},C[P].sample=[],C[P].x0=P>0?I[P-1]:I[P]-y===A?y:I[P]-A,C[P].x1=P<R?I[P]:N-I[P-1]===A?N:I[P-1]+A;for(var P=0;P<M.length;P++)y<=M[P]&&M[P]<=N&&C[a(I,M[P],0,R)].sample.push(M[P]);var W=o(C,function(X){return[+((X.x0+X.x1)/2).toFixed(U),X.sample.length,X.x0,X.x1,X.x0+" - "+X.x1]}),Q=o(C,function(X){return[X.x0,X.x1,X.sample.length]});return{bins:C,data:W,customData:Q}}var i={squareRoot:function(h){var D=Math.ceil(Math.sqrt(h.length));return D>50?50:D},scott:function(h,D,x){return Math.ceil((x-D)/(3.5*l(h)*Math.pow(h.length,-1/3)))},freedmanDiaconis:function(h,D,x){return h.sort(n),Math.ceil((x-D)/(2*(d(h,.75)-d(h,.25))*Math.pow(h.length,-1/3)))},sturges:function(h){return Math.ceil(Math.log(h.length)/Math.LN2)+1}};return c}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(2),S=g.getPrecision;return function(d,l,m,E){var e=arguments.length;e<2?(l=d,d=0,m=1):e<3?m=1:e<4?(m=+m,E=S(m)):E=+E;for(var p=Math.ceil(((l-d)/m).toFixed(E)),n=new Array(p+1),o=0;o<p+1;o++)n[o]=+(d+o*m).toFixed(E);return n}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(4);return function(S,d,l){var m=Math.abs(d-S)/l,E=g.quantityExponent(m),e=Math.pow(10,E),p=m/e;p>=Math.sqrt(50)?e*=10:p>=Math.sqrt(10)?e*=5:p>=Math.sqrt(2)&&(e*=2);var n=E<0?-E:0,o=+(d>=S?e:-e).toFixed(n);return{step:o,toFixedPrecision:n}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(5),S=r(19),d=2;return{type:"ecStat:regression",transform:function(m){var E=m.upstream,e=m.config||{},p=e.method||"linear",n=g(p,E.cloneRawData(),{order:e.order,dimensions:S.normalizeExistingDimensions(m,e.dimensions)}),o=n.points,s=e.formulaOn;s==null&&(s="end");var a;if(s!=="none"){for(var f=0;f<o.length;f++)o[f][d]=s==="start"&&f===0||s==="all"||s==="end"&&f===o.length-1?n.expression:"";a=E.cloneAllDimensionInfo(),a[d]={}}return[{dimensions:a,data:o}]}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(3),S=r(4),d=r(20);function l(E,e){if(e==null)return;var p=E.upstream;if(g.isArray(e)){for(var n=[],o=0;o<e.length;o++){var s=p.getDimensionInfo(e[o]);a(s,e[o]),n[o]=s.index}return n}else{var s=p.getDimensionInfo(e);return a(s,e),s.index}function a(f,c){if(!f)throw new Error("Can not find dimension by "+c)}}function m(E){if(g.isArray(E)){for(var e=[],p=[],n=0;n<E.length;n++){var o=s(E[n]);e.push(o.name),p.push(o.index)}return{name:e,index:p}}else if(E!=null)return s(E);function s(a){if(S.isNumber(a))return{index:a};if(d.isObject(a)&&S.isNumber(a.index))return a;throw new Error("Illegle new dimensions config. Expect `{ name: string, index: number }`.")}}return{normalizeExistingDimensions:l,normalizeNewDimensions:m}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){function g(d,l){if(Object.assign)Object.assign(d,l);else for(var m in l)l.hasOwnProperty(m)&&(d[m]=l[m]);return d}function S(d){const l=typeof d;return l==="function"||!!d&&l==="object"}return{extend:g,isObject:S}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(15),S=r(19);return{type:"ecStat:histogram",transform:function(l){var m=l.upstream,E=l.config||{},e=g(m.cloneRawData(),{method:E.method,dimensions:S.normalizeExistingDimensions(l,E.dimensions)});return[{dimensions:["MeanOfV0V1","VCount","V0","V1","DisplayableName"],data:e.data},{data:e.customData}]}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)},function(v,u,r){var t;t=function(L){var g=r(1),S=r(4),d=r(19),l=S.isNumber;return{type:"ecStat:clustering",transform:function(E){var e=E.upstream,p=E.config||{},n=p.clusterCount;if(!l(n)||n<=0)throw new Error('config param "clusterCount" need to be specified as an interger greater than 1.');if(n===1)return[{},{data:[]}];var o=d.normalizeNewDimensions(p.outputClusterIndexDimension),s=d.normalizeNewDimensions(p.outputCentroidDimensions);if(o==null)throw new Error("outputClusterIndexDimension is required as a number.");for(var a=g.hierarchicalKMeans(e.cloneRawData(),{clusterCount:n,stepByStep:!1,dimensions:d.normalizeExistingDimensions(E,p.dimensions),outputType:g.OutputType.SINGLE,outputClusterIndexDimension:o.index,outputCentroidDimensions:(s||{}).index}),f=e.cloneAllDimensionInfo(),c=[],i=0;i<f.length;i++){var h=f[i];c.push(h.name)}if(c[o.index]=o.name,s)for(var i=0;i<s.index.length;i++)s.name[i]!=null&&(c[s.index[i]]=s.name[i]);return[{dimensions:c,data:a.data},{data:a.centroids}]}}}.call(u,r,u,v),t!==void 0&&(v.exports=t)}])})})(an);var ln=an.exports;export{ln as e};
