/* The Fur Salon: real Google reviews, rotated on every visit.
   Source: the salon's Google Maps listing, read 4 Nov 2026 (153 reviews, 151 five-star).
   Text is the reviewer's own words (original language, never Google's translation).
   Long reviews are cut to whole, consecutive sentences; emojis are dropped. Nothing is reworded.

   Fields:  n = name as on Google   l = language (en / nl)   t = text
            c = what it's about:
                full   full grooming / cut & styling
                bath   bath, brush, de-matting, coat care
                puppy  puppies and first visits
                strip  hand-stripping / plucking (wire-haired)
                care   nails, teeth, ears
                calm   nervous, anxious, rescue or difficult dogs
                big    big or strong dogs
                gen    the salon in general
            q = 1 if short and strong enough for the big quote on the homepage

   To add a review: copy a line, keep the words exactly as written on Google. */
window.TFS_REVIEWS = [
  /* ---------- English ---------- */
  {n:'Anna Raymond', l:'en', c:['full','gen'], t:'Anna was super friendly, gave my dog a treat on arrival! Mia was very long and desperate for a haircut and she came out looking beautiful!!'},
  {n:'Marti Mitchell', l:'en', c:['bath','care'], t:'Our dog came back so soft and beautiful! Nails clipped, bathed, soft, brushed (undercoat gone too yay!) deep cleaning on his teeth, and they followed our instructions on not clipping too much fur or on his tail etc.'},
  {n:'Mahsa Majlsi', l:'en', c:['puppy'], t:'They did an amazing job with my puppy Mocha. He came home looking absolutely adorable, clean, fluffy and beautifully groomed.'},
  {n:'Evelyn Prohn', l:'en', c:['calm','bath'], t:'Bobbi was first given plenty of time to feel comfortable and at ease, which made such a difference. She was treated with so much patience and care, especially when dealing with her tangles.'},
  {n:'Sara Ennes', l:'en', c:['full','gen'], t:'Anna welcomed us and took the time to ask what we were looking for. She really listened and understood that our main goal was to help Chloe’s coat look healthy again.'},
  {n:'Yael Kerkmeester', l:'en', c:['strip','calm'], t:'We took our dachshund for a stripping treatment. Anna is very capable and knowledgeable on dogs and their coats. She took her time as our dog was quite anxious in the beginning so it was nice not to rush the treatment.'},
  {n:'Aleksandra S.', l:'en', c:['puppy'], t:'Very happy with our first appointment for my puppy! Anna was very gentle and kind and did a great job!'},
  {n:'Giulia Macaluso', l:'en', c:['full'], t:'She took the time to carefully discuss exactly what we wanted before starting, and it was clear how much she loves dogs and how knowledgeable she is. Our Cocker Spaniel was groomed beautifully and looked absolutely amazing afterwards.'},
  {n:'Maor Groch', l:'en', c:['gen'], t:'It’s a small, welcoming salon with personal attention, and the owner clearly loves dogs. Luna was well looked after and came home looking lovely.'},
  {n:'Naomi Alinajad', l:'en', c:['full','bath'], t:'Our sweet goldendoodle Willow went to the Fur Salon about a week ago, and came back looking even cuter than we left her. I feel like they took good care of her, were patient and made her feel comfortable.'},
  {n:'Gabi C', l:'en', c:['care','full'], t:'Brought my mini poodle in and Ana did a fantastic job! He’s notoriously difficult with nail trims, but Ana handled him perfectly. The cut looks excellent.'},
  {n:'Vera Savevska', l:'en', c:['gen'], t:'Anna is friendly, professional, and I could see she cares about my pet’s comfort and well-being. The grooming was done exactly as requested, and my dog came back looking beautiful'},
  {n:'Amy Waterman', l:'en', c:['bath','big'], t:'Anna did a wonderful job on my Golden Retriever who was very long overdue for a bath and grooming. It was so much work and she looks so great!'},
  {n:'Anna Tran', l:'en', c:['puppy'], t:'She gave our puppy Koko an amazing first experience at the groomer. Communication was also top notch.'},
  {n:'Rosa Hsu', l:'en', c:['gen'], t:'Anna is the best groomer we’ve found in Amsterdam after trying a few over the past couple of years. She always does a fabulous job with our teckel, George, and he comes home looking like such a handsome boy!'},
  {n:'Priyanka Emani', l:'en', c:['full'], t:'Very kind and considerate groomer. My standard poodle looks handsome after the grooming and has been a head turner. Also very responsive on WhatsApp and overall a very positive experience.'},
  {n:'Irene Kanter Schlifke', l:'en', c:['calm'], t:'Our little Maltipoo was much more relaxed with her than with the groomer he used to go to previously.'},
  {n:'Nikita Anufriev', l:'en', c:['bath','full'], t:'My German Spitz hadn’t been groomed for quite a while and had quite a lot of mats. The groomer did an amazing job - he looks like a completely new dog now!'},
  {n:'Bonny Reyneveld', l:'en', c:['full'], t:'Anna is super kind and a real pro. We have a Springer Spaniël and Anna has the skills to make him look like a little king!'},
  {n:'Luiza', l:'en', c:['gen'], t:'The owner was friendly, followed all of my instructions, and was right on time. I also appreciated receiving a cute video update of Joey during his appointment.'},
  {n:'Isaiah Pochman', l:'en', c:['calm'], t:'Our dog is incredibly shy around new people, so leaving her is usually a huge stress for us. However, Anna made us feel completely at ease.'},
  {n:'N Warmerdam', l:'en', c:['gen'], q:1, t:'Anna did an incredible job with my senior dog Quentin. Best grooming he has ever received!'},
  {n:'Susi', l:'en', c:['full'], t:'Anna took our wishes into account and, with calm and patience, cut our doodle very nicely and very professionally.'},
  {n:'Özge Koçer', l:'en', c:['care','calm'], t:'She was very patient and kind, even when Lucy was nervous and trying to escape the table multiple times as always. The nail trim and paw pad trim were done perfectly.'},
  {n:'Matthieu Vermeulen', l:'en', c:['bath'], t:'Bowie went for a wash ‘n’ groom to the Fur Salon and came back relaxed and smelling super nice.'},
  {n:'Emma Hoogendijk', l:'en', c:['calm','bath'], t:'Anna was very patient and took all the time needed to get my dog comfortable with washing and drying, as well as trimming his nails.'},
  {n:'秦季元', l:'en', c:['calm'], t:'I especially appreciate how she handles his fear of the hair dryer and keeps me informed throughout.'},
  {n:'Damla Y. B.', l:'en', c:['full'], t:'I guess we found our forever groomer for our poodles :) she is very affectionate, calm, patient, understanding and professional.'},
  {n:'Eirini Karyotaki', l:'en', c:['full','gen'], t:'I have tried many grooming places in Amsterdam, and by far this has been the best experience. Anna is wonderful, so kind, patient, and incredibly gentle with my toy poodle, Luffy.'},
  {n:'Arno d’Haens', l:'en', c:['puppy','full'], t:'My labradoodle Kiki has been groomed by Anna since she was 3 months old and we couldn’t be more happy!'},
  {n:'Alejandra Pampillon', l:'en', c:['calm'], t:'She was very patient answering all my questions previous to the appointment, and she put an incredible amount of care in how she treated my dog, a Pomerania who can be quite anxious and dramatic at times.'},
  {n:'Cosme Aranguren', l:'en', c:['calm','big'], t:'Our rescue dog is normally very cautious with strangers and Anna managed to make her feel at home in no time!'},
  {n:'Minsung Kim', l:'en', c:['bath'], t:'My little Pomeranian, Diva visits this salon once a month for her bath and hygiene care. The owner is very sweet and treats Diva with genuine love and patience.'},
  {n:'Jiaqi Wei', l:'en', c:['puppy'], t:'My pup Juno had such a wonderful experience getting his first puppy groom from Anna! He was treated with the utmost care, and we cannot recommend this place enough.'},
  {n:'Emily Thomas', l:'en', c:['gen'], q:1, t:'Our dog comes home looking great and feeling happy after every visit. Best dog groomer in the city!'},
  {n:'Barbara Austin', l:'en', c:['calm'], q:1, t:'The relaxed atmosphere was perfect for my anxious dog. She looks gorgeous!'},
  {n:'Hanna Gans', l:'en', c:['calm'], t:'Anna was so lovely and patient with my anxious dog, Ernest.. she made him feel so relaxed and we both left very happy (and him a lot cleaner and cuter).'},
  {n:'Valerie Verseveldt', l:'en', c:['full'], t:'Anna is a real skilled groomer! My Cocker Spaniel’s coat is quite high maintenance so I bring him to The Fur Salon every 6 to 8 weeks.'},
  {n:'Simona Bartaskaite', l:'en', c:['full','gen'], t:'My 4-year-old English Cocker Spaniel gets the best spa treatment in town every time we visit. He always leaves happy, smelling like roses, and looking incredibly handsome.'},
  {n:'Lucia', l:'en', c:['full'], t:'We brought our maltese to Anna’s salon, and we are so happy with the results! Anna understood exactly what we wanted and groomed our maltese to perfection.'},
  {n:'Rayanne Bastos', l:'en', c:['gen'], t:'You can really tell how much she loves pets by the care and attention she gives them. And Tina always comes back looking great.'},
  {n:'Kaisa Paavo', l:'en', c:['puppy','full'], t:'Have been going to the Fur Salon with my cavapoo puppy and always left with the cutest haircut.'},
  {n:'Danae Bouwer', l:'en', c:['strip'], t:'My newly adopted wired hair dachshund had the best time at the Fur Salon. Not only was he super happy when I picked him up, but he was also transformed from a little scruffy boy into a distinguished gentleman.'},
  {n:'Georgios Mantzavrakos', l:'en', c:['care','gen'], t:'My 4 year old, mid-sized dog had a great grooming, nails clipping and dental basic cleaning day. The owner truly cares about the result and the dog’s experience.'},
  {n:'Isobel Roblin', l:'en', c:['full','puppy'], t:'We have been bringing our cockapoo here since he was just a little puppy! She always does an amazing job and is so patient with him.'},
  {n:'Curtis Stecyk', l:'en', c:['gen'], q:1, t:'Exceptional service and results. Every time. Flexible and good communication.'},
  {n:'Nathalie Hoogkamp', l:'en', c:['gen'], t:'Great service and excellent work from Anna. She took really good care of Max and Jip.'},
  {n:'Bruno Lazzarin', l:'en', c:['full'], t:'Ana did an outstanding job with Ollie, trimming him exactly as we asked.'},
  {n:'Fran', l:'en', c:['full'], t:'My labradoodle got a very nice grooming with Anna, we were very happy with her care and expertise'},
  {n:'Marcela Pontara', l:'en', c:['calm'], t:'Anna is amazing! Very professional and really good with dogs. My dog is generally afraid of groomers and with Anna was so easy.'},
  {n:'Vytautas Baranauskas', l:'en', c:['gen'], t:'Very clean and welcoming. The owner is friendly, professional and took the time to listen.'},
  {n:'Mijke Dieben', l:'en', c:['gen','calm'], t:'My dog looks great and seemed very much at ease. The place looks clean and Anna’s service was perfect.'},
  {n:'Bettina Baumgartner', l:'en', c:['puppy'], q:1, t:'Our pup came back super pretty and soft! Anna is great with dogs and we will definitely go again :)'},

  /* ---------- Nederlands ---------- */
  {n:'Annemiek K', l:'nl', c:['strip'], t:'Ik ben heel blij met hoe zij Mickey heeft getrimd en deels geplukt. Hij ziet er geweldig uit en ik kom zeker terug.'},
  {n:'Ramon Wonink', l:'nl', c:['gen'], q:1, t:'Wat een fijne salon, en wat is Anna een top artiest in haar vak.'},
  {n:'Melany Onclin', l:'nl', c:['puppy','full'], t:'Wij zijn gisteren voor de eerste keer met Snoesie onze Shih-Tzu van 10 maanden bij The Fur Salon geweest en zijn heel erg tevreden. Anna is professioneel, behulpzaam, en superlief.'},
  {n:'Suus Biermann', l:'nl', c:['gen'], t:'Een fijne, moderne en schone hondensalon. De trimster is erg aardig, kundig en flexibel. Ze neemt de tijd, denkt goed mee en gaat prettig met de hond om.'},
  {n:'Fernando ten Kate', l:'nl', c:['calm','big'], q:1, t:'Ana is echt geweldig met honden zo relaxt dat onze stuiterbal er zelfs rustig van werd.'},
  {n:'Jordy Hazebroek', l:'nl', c:['full','gen'], t:'Omdat we in een dierenwinkel in Den Haag een prachtig getrimde hond zagen, hebben we gevraagd waar hij werd getrimd. Dat bleek The Fur Salon te zijn, en de rit van Den Haag naar Amsterdam was het meer dan waard!'},
  {n:'Jussi Virtanen', l:'nl', c:['full'], t:'Wij zijn ontzettend tevreden over de trimbeurt van onze Cocker Spaniel. Het resultaat is prachtig en zoals we hadden gehoopt.'},
  {n:'Candy de Werth', l:'nl', c:['care'], t:'Anna heeft vakkundig & professioneel diepte reiniging gebit bij teckel uitgevoerd. Super tevreden!'},
  {n:'Aneta Mar', l:'nl', c:['full'], t:'Mijn hondje ziet er prachtig uit en de vacht is heel mooi in model geknipt. Je merkt meteen dat er met veel zorg en ervaring wordt gewerkt, zeker bij een ras als een Pomeranian.'},
  {n:'Branko Peelen', l:'nl', c:['full','calm'], t:'Onze toy poedel heeft het heel fijn gehad bij The Fur Salon! Hij werd super goed behandeld en was daardoor erg relaxed.'},
  {n:'Shirley B.', l:'nl', c:['calm','gen'], t:'Anna straalt een enorme rust uit, die energie voel je als je de frisse mooie salon binnenstapt. Je merkt meteen dat ze een groot hart voor dieren heeft.'},
  {n:'Daniel Asscher', l:'nl', c:['calm','gen'], t:'Het is een rustige omgeving, waar slechts een hond tegelijk geholpen wordt.'},
  {n:'Marieke D', l:'nl', c:['calm','bath'], t:'Mijn hond is bang voor water en had mede daardoor een ontzettende hekel aan de trimsalon. Ik heb hem nu 2x naar de Fur Salon gebracht en dit is de perfecte plek voor hem.'},
  {n:'L Nessen', l:'nl', c:['calm'], t:'Anna heeft heel veel geduld en is heel rustig. Dit merkte ik terug bij het ophalen, ze was heel relaxed en totaal niet gestrest, ze wilde alleen maar meer snacks.'},
  {n:'Veerle Bens', l:'nl', c:['full'], t:'Mijn hond is mooi geknipt, en zelfs na een week ziet ze er nog mooi uit.'},
  {n:'Luca Ron', l:'nl', c:['gen'], t:'Er was een fijne rustige sfeer voor de honden, en mijn hond is super geknipt en verzorgd.'},
  {n:'Hélène Meijler', l:'nl', c:['strip'], t:'Onze Griffon Korthals komt graag bij Anna en ziet er na het trimmen prachtig uit.'},
  {n:'Jossine Modderman', l:'nl', c:['full'], t:'Onze poedel Vinnie zag er geweldig verzorgd uit. Lieve mensen, salon ziet er goed en netjes uit.'},
  {n:'Eelif El', l:'nl', c:['full','bath'], t:'Hij is prachtig geknipt en ziet er weer verzorgd en stralend uit. Ook ruikt hij heerlijk fris.'},
  {n:'Michelle Schieving', l:'nl', c:['bath','full'], t:'Onze hond heeft snel last van klitten en ze hebben hem daar erg goed mee geholpen. Er werd goed de tijd genomen en met veel zorg en aandacht gewerkt.'},
  {n:'Marleen Heidinga', l:'nl', c:['calm'], t:'Dit was voor onze Jack (een Kooiker mix) erg spannend. Anna heeft zijn vertrouwen gewonnen en Jack ziet er geweldig uit, hij lijkt wel een echte rashond ;-)'},
  {n:'Irena Borcuch', l:'nl', c:['calm'], t:'Hij voelde zich zichtbaar op zijn gemak en kwam ontspannen en prachtig verzorgd weer terug.'},
  {n:'Marlies B', l:'nl', c:['gen'], t:'Je merkt echt dat Anna met aandacht en liefde werkt. Hele fijne trimsalon en aanwinst in Amsterdam Oost.'},
  {n:'S H', l:'nl', c:['strip'], t:'Super tevreden over de stripvacht van mijn teckel! Heel vriendelijk en echt een passie voor haar werk.'},
  {n:'Mirte Monica', l:'nl', c:['strip'], t:'Onze Bobbie (5 jaar) is vandaag voor het eerst geplukt bij Anna, en wat zijn we blij met het resultaat! Ze ziet er weer prachtig uit.'},
  {n:'Diana Boer', l:'nl', c:['strip','puppy'], t:'Ana heeft onze ruwharige teckel Bikkel echt geweldig getrimt. Bikkel is al vanaf zijn eerst puppy trim bij Ana en voelt zich erg bij haar op zijn gemak.'},
  {n:'Marieke Renshoff', l:'nl', c:['calm'], q:1, t:'Onze Koen vind het altijd heel spannend, maar hij is bij Anna zo op zijn gemak. Zoveel geduld en liefde.'},
  {n:'Irma Wijsman', l:'nl', c:['strip'], t:'Voor mij was het de eerste keer dat ik mijn podenco draadhaar liet plukken. Ik houd eigenlijk van zijn punky kapsel maar toen ik hem kwam ophalen zag hij er echt fantastisch uit!'},
  {n:'Marina Soler', l:'nl', c:['calm'], t:'Rumi was bij The Fur Salon in hele goede handen en voelde zich duidelijk op haar gemak. Ze bleef rustig tijdens haar bezoek.'},
  {n:'Sannie Vander Made', l:'nl', c:['care'], t:'Ik ben met me hond geweest voor een gebitsreiniging...fantastisch gedaan en heel vriendelijk..'},
  {n:'Martina Zuñiga', l:'nl', c:['gen'], t:'Mijn huisdier kwam blij, goed verzorgd en met een perfect kapsel naar buiten.'},
  {n:'Kritische Klant', l:'nl', c:['bath','big'], t:'Mijn Golden Retriever had wat TLC (tender loving care) nodig. Dit is voor het eerst dat zij zo vrolijk en vooral mooi ! uit een salon is gekomen.'}
];

/* ---------- Rotation ----------
   Every page load picks fresh reviews. A service page shows one from its own
   category; if there isn't one in the page's language, a general one. The
   homepage shows one short quote and three cards from different categories.
   The reviews seen on the last visit are skipped where possible. */
(function () {
  var R = window.TFS_REVIEWS || [];
  if (!R.length || !document.querySelector) return;
  var nl = (document.documentElement.lang || 'en').slice(0, 2) === 'nl';
  var L = nl ? 'nl' : 'en', ON = nl ? 'op Google' : 'on Google';
  var KEY = 'tfs_seen_reviews', seen = [];
  try { seen = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) {}
  var used = [];

  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function has(r, cats) { return cats.some(function (c) { return r.c.indexOf(c) > -1; }); }
  /* best match: right language and category, not used on this page, not seen last time */
  function pick(cats, test) {
    var tries = [
      function (r) { return r.l === L && has(r, cats); },
      L === 'nl' ? function (r) { return r.l === 'en' && has(r, cats); } : null,
      function (r) { return r.l === L && has(r, ['gen']); }
    ];
    for (var k = 0; k < tries.length; k++) {
      if (!tries[k]) continue;
      var pool = R.filter(function (r) { return tries[k](r) && (!test || test(r)) && used.indexOf(r) < 0; });
      var fresh = pool.filter(function (r) { return seen.indexOf(r.n) < 0; });
      var list = shuffle(fresh.length ? fresh : pool);
      if (list.length) { used.push(list[0]); return list[0]; }
    }
    return null;
  }
  function quote(t) { return '<span class="qm">“</span>' + esc(t) + '<span class="qm">”</span>'; }
  function who(r) { return '<b>' + esc(r.n) + '</b> <span>' + ON + '</span>'; }

  /* service page */
  var sp = document.querySelector('.sp-review');
  if (sp) {
    var f = location.pathname.split('/').pop().replace('.html', '');
    var MAP = { 'full-grooming': ['full'], 'bath-brush': ['bath'], 'puppy': ['puppy'], 'hand-stripping': ['strip'],
                'spa-extras': ['care'], 'bull-breeds': ['calm', 'big'], 'bulltypes': ['calm', 'big'] };
    var r = pick(MAP[f] || ['gen']);
    var q = sp.querySelector('.q'), w = sp.querySelector('.who');
    if (r && q && w) { q.innerHTML = quote(r.t); w.innerHTML = who(r); }
  }

  /* homepage */
  var big = document.querySelector('#reviews .rev-quote');
  var cards = document.querySelectorAll('#reviews .rev-card');
  if (big) {
    var b = pick(['calm', 'gen'], function (r) { return r.q || r.t.length < 110; });
    if (b) big.innerHTML = quote(b.t);
  }
  if (cards.length) {
    var plan = shuffle([['full'], ['puppy', 'bath'], ['calm', 'gen']]);
    [].forEach.call(cards, function (card, i) {
      var r = pick(plan[i % plan.length], function (x) { return x.t.length >= 70 && x.t.length <= 240; }) || pick(plan[i % plan.length]);
      var p = card.querySelector('p'), w = card.querySelector('.who');
      if (r && p && w) { p.innerHTML = quote(r.t); w.innerHTML = who(r); }
    });
  }

  try { localStorage.setItem(KEY, JSON.stringify(used.map(function (r) { return r.n; }))); } catch (e) {}
})();
