/* Alineacion voz -> guion. Funciones puras, sin dependencias ni DOM.
   Uso: var tk=Alineacion.prep(palabrasDelGuion); var est=Alineacion.nuevo(0);
        var r=Alineacion.paso(est,tk,textoOido); // r.avanzo, r.ptr, r.score
   ptr = indice de la PROXIMA palabra por decir (las anteriores ya se leyeron). */
(function(root){
"use strict";
var STOP={};("de la que el en y a los del se las por un para con no una su al lo como mas pero sus le ya o este si porque esta entre cuando muy sin sobre tambien me hasta hay donde quien desde todo nos durante todos uno les ni contra otros ese eso ante ellos e esto mi antes algunos unos yo otro otras otra tanto esa estos mucho quienes nada muchos cual poco ella estar estas algunas algo nosotros es son ser fue ha he te tu tus mis sea era eran sido esta estan estoy hacer vez asi aqui alli ahi cada tan").split(" ").forEach(function(w){STOP[w]=1});
var FILL={};("eh ehh eeh eee em emm mm mmm hmm hm ah aah uh aja ajam osea digamos bueno pues viste").split(" ").forEach(function(w){FILL[w]=1});

function norm(w){
  return String(w).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]/g,"");
}
function peso(n){return n?(STOP[n]?0.25:1):0}

/* palabras del guion (solo texto, sin marcas) -> tokens alineados 1:1 */
function prep(palabras){
  return palabras.map(function(p){var n=norm(p);return {n:n,w:peso(n)}});
}
/* texto oido -> lista de palabras normalizadas sin muletillas */
function oido(texto){
  var out=[];
  String(texto||"").split(/\s+/).forEach(function(p){
    var n=norm(p);if(n&&!FILL[n])out.push({n:n,w:peso(n)});
  });
  return out;
}
function lev1(a,b){ /* distancia de edicion <=1 ? */
  var la=a.length,lb=b.length;if(Math.abs(la-lb)>1)return false;
  var i=0,j=0,d=0;
  while(i<la&&j<lb){
    if(a[i]===b[j]){i++;j++;continue}
    if(++d>1)return false;
    if(la===lb){i++;j++}else if(la>lb)i++;else j++;
  }
  return d+(la-i)+(lb-j)<=1;
}
function sim(a,b){
  if(a===b)return 1;
  var m=Math.min(a.length,b.length);
  if(m>=4&&lev1(a,b))return 0.85;
  if(m>=5){var k=0;while(k<m&&a[k]===b[k])k++;if(k>=5&&k>=m-1)return 0.7;if(k>=6&&k>=m*0.75)return 0.6}
  return 0;
}
var OPT={atras:8,adelante:60,umbral:0.55,pesoMin:1.75,salto:20,saltoScore:0.8,ult:8};

/* Busca la mejor ubicacion. Devuelve {pos,score,peso} o null. */
function ubicar(tk,hab,ptr,o){
  o=o||OPT;
  if(hab.length>o.ult)hab=hab.slice(hab.length-o.ult);
  if(!hab.length)return null;
  var tot=0,i,j;for(i=0;i<hab.length;i++)tot+=hab[i].w;
  if(tot<=0)return null;
  var lo=Math.max(0,ptr-o.atras),hi=Math.min(tk.length-1,ptr+o.adelante);
  if(hi<lo)return null;
  var L=Math.min(hab.length+3,12),best=null;
  for(var e=lo;e<=hi;e++){
    var s=Math.max(lo,e-L+1),usado={},ms=0,mw=0,last=-1,lastC=-1,tailOk=0;
    for(i=0;i<hab.length;i++){
      var bj=-1,bs=0;
      for(j=s;j<=e;j++){
        if(usado[j]||!tk[j].n)continue;
        var v=sim(hab[i].n,tk[j].n);
        if(v>bs||(v===bs&&v>0&&bj>=0&&Math.abs(j-e)<Math.abs(bj-e))){bs=v;bj=j}
      }
      if(bj>=0&&bs>=0.6){
        usado[bj]=1;var g=bs*hab[i].w;ms+=g;
        if(hab[i].w>=1){mw+=g;if(bj>lastC)lastC=bj}
        if(bj>last)last=bj;
        if(i===hab.length-1)tailOk=1;
      }
    }
    if(last<0)continue;
    var pos=(lastC>=0?lastC:last)+1,score=ms/tot;
    var adj=score+(tailOk?0.08:0)-(pos<ptr?0.03*(ptr-pos):0.003*(pos-ptr));
    if(!best||adj>best.adj)best={pos:pos,score:score,peso:ms,adj:adj,cont:mw};
  }
  return best;
}
function nuevo(ptr){return {ptr:ptr||0,ultOk:false}}
/* Un evento de voz (parcial o final). Devuelve {ptr,avanzo,coincide,score} y muta est. */
function paso(est,tk,texto,o){
  o=o||OPT;
  var r=ubicar(tk,oido(texto),est.ptr,o);
  var res={ptr:est.ptr,avanzo:false,coincide:false,score:r?r.score:0};
  if(!r||r.score<o.umbral||r.peso<o.pesoMin){est.ultOk=false;return res}
  if(r.pos-est.ptr>o.salto&&r.score<o.saltoScore){est.ultOk=false;return res}
  res.coincide=true;est.ultOk=true;
  if(r.pos>est.ptr){est.ptr=r.pos;res.ptr=r.pos;res.avanzo=true}
  return res;
}
var API={norm:norm,prep:prep,oido:oido,sim:sim,ubicar:ubicar,nuevo:nuevo,paso:paso,OPT:OPT};
if(typeof module!=="undefined"&&module.exports)module.exports=API;else root.Alineacion=API;
})(typeof self!=="undefined"?self:this);
