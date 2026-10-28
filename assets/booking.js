(function(){
  var PHONE='31614255832';
  var L=(document.documentElement.lang||'en').slice(0,2)==='nl'?'nl':'en';
  var C={en:{title:'Book an appointment',back:'Back',stepOf:function(a,b){return 'Step '+a+' of '+b},skip:'Skip and just message',q1:'How big is your dog?',q2:'What breed?',
        q3:'How do they feel about grooming?',q4:'And what’s their name?',
        ph2:'Cockapoo, Shih Tzu, mix...',ph4:'Their name',next:'Continue',go:'Send booking request',
        q5:function(n){return 'Would you like to treat '+(n||'your dog')+' to something extra?'},sub5:'Pick as many as you like. Anna will confirm the total.',none:'No thanks, just the groom',
        addons:[['nails','Nail clipping','\u20ac10','nail clipping'],['teeth','Teeth cleaning','\u20ac10','a teeth clean'],['spa','Spa treatment','\u20ac30\u201340','the spa treatment'],['deep','Deep teeth cleaning','\u20ac100','a deep teeth clean']],
        also:' I\u2019d also like to add ',and:' and ',
        pol:'<b>Cancellation policy:</b> cancelling less than 24 hours before your appointment costs 50% of the service; not showing up costs 100%. Your message will say you\u2019re ok with it.',more:'Read the policy',ack:' And I\u2019m ok with your cancellation policy.',
        sizes:[['Small','small'],['Medium','medium'],['Large','large'],['Extra large','extra large']],
        moods:[['Totally relaxed','relaxed'],['A little nervous','nervous'],['It’s their first time','first']]},
   nl:{title:'Afspraak maken',back:'Terug',stepOf:function(a,b){return 'Stap '+a+' van '+b},skip:'Sla over en stuur gewoon een bericht',q1:'Hoe groot is je hond?',q2:'Welk ras?',
        q3:'Hoe vindt hij het om getrimd te worden?',q4:'En hoe heet hij?',
        ph2:'Cockapoo, Shih Tzu, kruising...',ph4:'Zijn of haar naam',next:'Verder',go:'Verstuur aanvraag',
        q5:function(n){return 'Wil je '+(n||'je hond')+' nog iets extra\u2019s geven?'},sub5:'Kies er zoveel als je wilt. Anna bevestigt het totaal.',none:'Nee dank je, alleen de trimbeurt',
        addons:[['nails','Nagels knippen','\u20ac10','nagels knippen'],['teeth','Gebitsreiniging','\u20ac10','een gebitsreiniging'],['spa','Spa-behandeling','\u20ac30\u201340','de spa-behandeling'],['deep','Diepe gebitsreiniging','\u20ac100','een diepe gebitsreiniging']],
        also:' Ik wil er ook graag ',and:' en ',alsoEnd:' bij.',
        pol:'<b>Annuleringsbeleid:</b> annuleer je minder dan 24 uur voor je afspraak, dan betaal je 50% van de behandeling; kom je niet opdagen, dan betaal je 100%. In je bericht staat dat je ermee akkoord gaat.',more:'Lees het beleid',ack:' En ik ga akkoord met je annuleringsbeleid.',
        sizes:[['Klein','small'],['Middel','medium'],['Groot','large'],['Extra groot','extra large']],
        moods:[['Helemaal ontspannen','relaxed'],['Een beetje onzeker','nervous'],['Het is de eerste keer','first']]}}[L];
  var S={size:'',breed:'',mood:'',name:'',addons:[],service:document.body.getAttribute('data-service')||''};
  /* add-on step: skipped on the teeth & nails page itself; spa only goes with a bath or full groom */
  var SV=S.service.toLowerCase();
  var ADDONS=/teeth|tanden/.test(SV)?[]:C.addons.filter(function(a){
    if(a[0]==='spa'&&/puppy|pup|hand|strip/.test(SV)) return false;   /* spa only with bath or full groom */
    if(a[0]==='deep'&&/puppy|pup/.test(SV)) return false;               /* no deep clean for puppies */
    return true;});
  /* link to the policy on this language's homepage, from any depth */
  var POLICY=(location.pathname.indexOf('/services/')>-1?'../':'')+'index.html#cancellation';
  var STEPS=ADDONS.length?5:4, step=0;

  var wrap=document.createElement('div');
  wrap.id='bk'; wrap.setAttribute('aria-hidden','true');
  wrap.innerHTML=
   '<div class="bk-card" role="dialog" aria-modal="true" aria-label="Book an appointment">'+
    '<div class="bk-head"><span class="bk-title">'+C.title+'</span><span class="bk-count"></span><button class="bk-x" aria-label="Close">&times;</button></div>'+
    '<div class="bk-steps" aria-hidden="true"></div>'+
    '<div class="bk-body"></div>'+
    '<p class="bk-policy">'+C.pol+' <a href="'+POLICY+'">'+C.more+'</a></p>'+
    '<div class="bk-foot"><button class="bk-back">'+C.back+'</button><button class="bk-skip">'+C.skip+'</button></div>'+
   '</div>';
  document.body.appendChild(wrap);
  var body=wrap.querySelector('.bk-body'), segs=wrap.querySelector('.bk-steps'), count=wrap.querySelector('.bk-count'), back=wrap.querySelector('.bk-back');

  var WA='<svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" style="vertical-align:-3px;margin-right:8px"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .4-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.2.5.2.6.4 0 .1 0 .7-.3 1.3z"/></svg>';
  function opts(list,key){return list.map(function(o){
    return '<button class="bk-opt" data-k="'+key+'" data-v="'+o[1]+'" aria-pressed="'+(S[key]===o[1])+'">'+o[0]+'</button>';}).join('');}

  function render(){
    var h=''; for(var k=0;k<STEPS;k++) h+='<i class="'+(k<step?'done':(k===step?'on':''))+'"></i>'; segs.innerHTML=h;
    segs.style.gridTemplateColumns='repeat('+STEPS+',1fr)';
    count.textContent=C.stepOf(step+1,STEPS);
    back.style.visibility=step>0?'visible':'hidden';
    if(step===0) body.innerHTML='<p class="bk-q">'+C.q1+'</p><div class="bk-grid">'+
      opts(C.sizes,'size')+'</div>';
    else if(step===1) body.innerHTML='<p class="bk-q">'+C.q2+'</p>'+
      '<input class="bk-in" id="bkBreed" placeholder="'+C.ph2+'" autocomplete="off" value="'+S.breed.replace(/"/g,'&quot;')+'">'+
      '<button class="bk-next" data-k="breed">'+C.next+'</button>';
    else if(step===2) body.innerHTML='<p class="bk-q">'+C.q3+'</p><div class="bk-grid one">'+
      opts(C.moods,'mood')+'</div>';
    else if(step===3&&STEPS===5) body.innerHTML='<p class="bk-q">'+C.q4+'</p>'+
      '<input class="bk-in" id="bkName" placeholder="'+C.ph4+'" autocomplete="off" value="'+S.name.replace(/"/g,'&quot;')+'">'+
      '<button class="bk-next" data-k="name">'+C.next+'</button>';
    else if(step===4) body.innerHTML='<p class="bk-q">'+C.q5(S.name.trim())+'</p><p class="bk-sub">'+C.sub5+'</p><div class="bk-adds">'+
      ADDONS.map(function(a){var on=S.addons.indexOf(a[0])>-1;return '<button class="bk-add" data-a="'+a[0]+'" aria-pressed="'+on+'"><i aria-hidden="true"></i><span>'+a[1]+'</span><b>'+a[2]+'</b></button>'}).join('')+
      '</div><button class="bk-next bk-go" data-k="addons">'+WA+C.go+'</button><button class="bk-none">'+C.none+'</button>';
    else body.innerHTML='<p class="bk-q">'+C.q4+'</p>'+
      '<input class="bk-in" id="bkName" placeholder="'+C.ph4+'" autocomplete="off">'+
      '<button class="bk-next bk-go" data-k="name"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true" style="vertical-align:-3px;margin-right:8px"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.7-1.3 1.3-1.9 1.4-.5.1-1.1.1-1.8-.1-.4-.1-.9-.3-1.6-.6-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.8.8 1.9.1.1.1.3 0 .4-.1.2-.1.3-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.7.8 2 .9.3.2.5.2.6.4 0 .1 0 .7-.3 1.3z"/></svg>'+C.go+'</button>';
    var i=body.querySelector('.bk-in'); if(i) setTimeout(function(){i.focus()},60);
  }

  var SIZE={en:{small:'small',medium:'medium',large:'large','extra large':'extra large'},
            nl:{small:'klein',medium:'middelgroot',large:'groot','extra large':'extra groot'}}[L];
  function msg(){
    var n=S.name?S.name.trim():'', b=S.breed?S.breed.trim():'', sz=SIZE[S.size]||'';
    var d=[]; if(b)d.push(b); if(sz)d.push(sz);
    var t;
    if(L==='nl'){
      var who=n?n:'mijn hond';
      t='Hoi Anna! Ik wil graag '+(S.service?S.service:'een trimbeurt')+' boeken voor '+who;
      if(d.length) t+=', een '+d.join(', ');
      t+='.';
      if(S.mood==='nervous') t+=' '+(n?n:'Hij')+' kan een beetje onzeker zijn, dus een rustige sessie zou fijn zijn.';
      if(S.mood==='first') t+=' Het wordt '+(n?n+'s':'zijn')+' eerste keer in een trimsalon.';
      if(S.mood==='relaxed') t+=' '+(n?n:'Hij')+' vindt trimmen helemaal prima.';
      t+=extras();
      t+=' Laat je weten wanneer je tijd hebt?';
    } else {
      var who=n?n:'my dog';
      t='Hi Anna! I\u2019d like to book '+(S.service?S.service+' ':'a groom ')+'for '+who;
      if(d.length) t+=', a '+d.join(', ');
      t+='.';
      if(S.mood==='nervous') t+=' '+(n?n:'They')+' can be a little nervous, so a calm session would be lovely.';
      if(S.mood==='first') t+=' It would be '+(n?n+'\u2019s':'their')+' first time at a salon.';
      if(S.mood==='relaxed') t+=' '+(n?n:'They')+' is totally relaxed about grooming.';
      t+=extras();
      t+=' Could you let me know your availability?';
    }
    return t;
  }
  function extras(){
    var l=ADDONS.filter(function(a){return S.addons.indexOf(a[0])>-1}).map(function(a){return a[3]});
    if(!l.length) return '';
    var txt=l.length>1?l.slice(0,-1).join(', ')+C.and+l[l.length-1]:l[0];
    return C.also+txt+(C.alsoEnd||'.');
  }
  function T(n,p){ if(window.tfsTrack) window.tfsTrack(n,p||{}); }
  function go(text,how){
    T('booking_submit',{method:how||'quiz',service:S.service||'general',dog_size:S.size||'',
      dog_breed:S.breed||'',dog_mood:S.mood||'',named_dog:S.name?'yes':'no',addons:S.addons.join(',')||'none',addon_count:S.addons.length});
    window.open('https://wa.me/'+PHONE+'?text='+encodeURIComponent(text+C.ack),'_blank','noopener'); close();
  }
  function open(src){ step=0; S.addons=[]; S.name=''; S.size=''; S.breed=''; S.mood=''; render(); wrap.classList.add('on'); wrap.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    T('booking_start',{service:S.service||'general',source:src||'cta'}); }
  function close(){ wrap.classList.remove('on'); wrap.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

  wrap.addEventListener('click',function(e){
    if(e.target.closest('.bk-policy a')){ close(); return; }
    if(e.target===wrap||e.target.classList.contains('bk-x')){ T('booking_abandon',{step:step+1}); return close(); }
    if(e.target.classList.contains('bk-back')){ if(step>0){ step--; render(); } return; }
    if(e.target.classList.contains('bk-skip')){ T('booking_skip',{step:step+1}); return go(L==='nl'?'Hoi Anna! Ik wil graag een afspraak maken voor mijn hond.':'Hi Anna! I\u2019d like to book an appointment for my dog.','skip'); }
    var ad=e.target.closest('.bk-add');
    if(ad){ var k=ad.dataset.a, i=S.addons.indexOf(k); if(i>-1)S.addons.splice(i,1); else S.addons.push(k);
            ad.setAttribute('aria-pressed',String(i<0)); return; }
    if(e.target.closest('.bk-none')){ S.addons=[]; T('booking_step',{step:5,field:'addons',value:'none'}); return go(msg()); }
    var o=e.target.closest('.bk-opt');
    if(o){ S[o.dataset.k]=o.dataset.v; T('booking_step',{step:step+1,field:o.dataset.k,value:o.dataset.v});
           step++; return step<STEPS?render():go(msg()); }
    var n=e.target.closest('.bk-next');
    if(n){ var f=body.querySelector('.bk-in'); if(f) S[n.dataset.k]=f.value;
           if(n.dataset.k==='addons') T('booking_step',{step:step+1,field:'addons',value:S.addons.join(',')||'none'});
           else T('booking_step',{step:step+1,field:n.dataset.k,filled:(f&&f.value.trim())?'yes':'no'});
           step++; return step<STEPS?render():go(msg()); }
  });
  document.addEventListener('keydown',function(e){
    if(!wrap.classList.contains('on'))return;
    if(e.key==='Escape') close();
    if(e.key==='Enter'){ var n=body.querySelector('.bk-next'); if(n) n.click(); }
  });
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href*="wa.me/"]');
    if(a){ e.preventDefault(); open(a.classList.contains('wa-float')?'float':(a.closest('nav')?'nav':'page')); }
  });
})();
