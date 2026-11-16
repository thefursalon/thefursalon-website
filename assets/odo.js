/* Rating odometer: the 5.0 in the reviews block rolls up once when 40% visible.
   The real text stays in the page for screen readers and search engines. */
(function(){
  var odos=[].slice.call(document.querySelectorAll('.odo'));
  if(!odos.length) return;
  odos.forEach(function(o){
    var n=o.getAttribute('data-n'), roll='';
    for(var i=0;i<n.length;i++){
      if(!/[0-9]/.test(n[i])){ roll+='<span class="odo-s">'+n[i]+'</span>'; continue; }
      var col=''; for(var d=0;d<=9;d++) col+='<i>'+d+'</i>';
      roll+='<span class="odo-d"><span class="odo-col" data-d="'+n[i]+'" style="transition-delay:'+(i*70)+'ms">'+col+'</span></span>';
    }
    o.innerHTML='<span class="odo-txt">'+n+'</span><span class="odo-roll" aria-hidden="true">'+roll+'</span>';
  });
  function roll(){ odos.forEach(function(o){ o.querySelectorAll('.odo-col').forEach(function(c){ c.style.transform='translateY(-'+c.getAttribute('data-d')+'em)'; }); }); }
  if(!('IntersectionObserver' in window)) return roll();
  var io=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ roll(); io.disconnect(); } },{threshold:.4});
  io.observe(odos[0]);
})();
