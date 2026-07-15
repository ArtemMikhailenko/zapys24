const NICHES=[
 {kw:'салонів краси',c:'#7C3AED',label:'Краса',sv:['Стрижка','Манікюр','Колір','Укладка','Барбер','Брови']},
 {kw:'стаєнь',c:'#A9763E',label:'Кінний спорт',sv:['Виїздка','Урок','Ветогляд','Конкур','Чищення','Група']},
 {kw:'автосервісів',c:'#2F6E8F',label:'Авто',sv:['ТО','Шиномонтаж','Діагностика','Мийка','Розвал','Ремонт']},
 {kw:'фітнес-залів',c:'#C2562F',label:'Фітнес',sv:['Йога','Кросфіт','Персональне','Пілатес','Бокс','Розтяжка']},
 {kw:'клінік',c:'#2E8B73',label:'Медицина',sv:['Огляд','УЗД','Аналізи','Консультація','Процедура','Контроль']}
];
const DAYS=['Пн 10','Вт 11','Ср 12','Чт 13','Пт 14','Сб 15'];
const SLOTS=[[0,'09:00'],[0,'14:00'],[1,'11:00'],[1,'16:00'],[2,'10:00'],[2,'15:30'],[3,'12:00'],[3,'17:00'],[4,'09:30'],[4,'13:00'],[5,'11:00'],[5,'15:00']];
const CHIPC=['#A78BFA','#F9A8D4','#7DD3FC','#86EFAC','#FBBF77','#C4B5FD'];
const kw=document.getElementById('kw'),h2ac=document.getElementById('h2ac'),weekEl=document.getElementById('week'),calpills=document.getElementById('calpills');
function renderWeek(n){
  if(!weekEl)return;
  weekEl.innerHTML=DAYS.map((d,di)=>'<div class="day"><div class="dh">'+d+'</div><div class="daybk" data-d="'+di+'"></div></div>').join('');
  SLOTS.forEach((s,i)=>{var col=weekEl.querySelector('.daybk[data-d="'+s[0]+'"]');if(!col)return;
    var bk=document.createElement('div');bk.className='bk';bk.style.animationDelay=(i*45)+'ms';
    bk.innerHTML='<span class="bkbar" style="background:'+CHIPC[i%CHIPC.length]+'"></span><div><div class="bkt">'+s[1]+'</div><div class="bks">'+n.sv[i%n.sv.length]+'</div></div>';
    col.appendChild(bk);});
}
let ni=0;
function setNiche(i){ni=(i+NICHES.length)%NICHES.length;var n=NICHES[ni];
  if(kw){kw.style.opacity=0;setTimeout(()=>{kw.textContent=n.kw;kw.style.color=n.c;kw.style.opacity=1;},250);}
  if(h2ac)h2ac.style.color=n.c;
  renderWeek(n);
  if(calpills)Array.prototype.forEach.call(calpills.children,c=>c.classList.toggle('on',+c.dataset.i===ni));
}
if(calpills){NICHES.forEach((n,i)=>{var b=document.createElement('div');b.className='calpill';b.dataset.i=i;b.textContent=n.label;b.onclick=()=>{clearInterval(heroTimer);setNiche(i);heroTimer=setInterval(()=>setNiche(ni+1),3800);};calpills.appendChild(b);});if(calpills.children[0])calpills.children[0].classList.add('on');}
let heroTimer;
if(weekEl){renderWeek(NICHES[0]);heroTimer=setInterval(()=>setNiche(ni+1),3800);}

const names=['Beauty Bar','Cut & Co','Стайня «Вітер»','AutoPro','Nail Studio','FitZone','Lash Room','Барбер Хата','SPA Lotus','Drive Service'];
let mh='';for(let r=0;r<2;r++){names.forEach(n=>{mh+='<span>'+n+'</span><i>✦</i>';});}
var _mq=document.getElementById('marq');if(_mq)_mq.innerHTML=mh;

const baw=document.getElementById('baw');
if(baw){
  const setP=x=>{const r=baw.getBoundingClientRect();let p=(x-r.left)/r.width*100;p=Math.max(4,Math.min(96,p));baw.style.setProperty('--p',p.toFixed(1)+'%');};
  let drag=false;
  baw.addEventListener('pointerdown',e=>{drag=true;setP(e.clientX);try{baw.setPointerCapture(e.pointerId)}catch(_){}});
  baw.addEventListener('pointermove',e=>{if(drag)setP(e.clientX);});
  window.addEventListener('pointerup',()=>{drag=false;});
}
const htrack=document.getElementById('htrack');
const hprev=document.getElementById('hprev'),hnext=document.getElementById('hnext');
if(htrack){
  htrack.style.transform='';
  htrack.scrollLeft=0;
  const hStep=()=>Math.max(260,Math.round(htrack.clientWidth*0.7));
  const hUpd=()=>{
    if(!hprev||!hnext)return;
    const max=htrack.scrollWidth-htrack.clientWidth-2;
    hprev.classList.toggle('off',htrack.scrollLeft<=2);
    hnext.classList.toggle('off',htrack.scrollLeft>=max);
  };
  hprev&&hprev.addEventListener('click',()=>htrack.scrollBy({left:-hStep(),behavior:'smooth'}));
  hnext&&hnext.addEventListener('click',()=>htrack.scrollBy({left:hStep(),behavior:'smooth'}));
  htrack.addEventListener('scroll',hUpd,{passive:true});
  window.addEventListener('resize',hUpd);
  hUpd();
}
const PRICING={
  'Краса':{dot:'#C2547A',plans:[
    {n:'Старт',d:'Соло-майстер',p:'₴0',sub:'назавжди безкоштовно',cta:'Почати',f:['1 майстер','Онлайн-запис 24/7','База клієнтів','Нагадування в застосунку']},
    {n:'Бізнес',d:'Салон чи студія',p:'₴790',per:'/міс',sub:'−20% при оплаті за рік',pop:1,cta:'Спробувати 14 днів',f:['До 10 майстрів','SMS-нагадування','Фінанси та зарплати','Аналітика й звіти','Публічний віджет запису']},
    {n:'Профі',d:'Мережа філій',p:'₴1490',per:'/міс',sub:'−20% при оплаті за рік',cta:'Зв’язатися',f:['Без лімітів майстрів','Кілька філій','API та інтеграції','Пріоритетна підтримка']}]},
  'Кінний спорт':{dot:'#A9763E',plans:[
    {n:'Конюшня',d:'Невелика стайня',p:'₴0',sub:'до 5 коней',cta:'Почати',f:['До 5 коней','Запис на тренування','Картки коней','Ветжурнал']},
    {n:'Клуб',d:'Кінний клуб',p:'₴990',per:'/міс',sub:'−20% при оплаті за рік',pop:1,cta:'Спробувати 14 днів',f:['Без лімітів коней','Абонементи вершників','Розклад тренерів','Виплати тренерам','Групові заняття']},
    {n:'Центр',d:'Великий центр',p:'₴1890',per:'/міс',sub:'−20% при оплаті за рік',cta:'Зв’язатися',f:['Кілька локацій','Облік амуніції','API та інтеграції','Пріоритетна підтримка']}]},
  'Авто':{dot:'#2F6E8F',plans:[
    {n:'Старт',d:'Один бокс',p:'₴0',sub:'назавжди безкоштовно',cta:'Почати',f:['1 бокс','Онлайн-запис','Історія авто','Нагадування']},
    {n:'Сервіс',d:'СТО чи мийка',p:'₴890',per:'/міс',sub:'−20% при оплаті за рік',pop:1,cta:'Спробувати 14 днів',f:['До 10 майстрів','SMS-нагадування','Картка авто клієнта','Фінанси','Віджет запису']},
    {n:'Мережа',d:'Кілька СТО',p:'₴1690',per:'/міс',sub:'−20% при оплаті за рік',cta:'Зв’язатися',f:['Без лімітів','Кілька локацій','API','Пріоритетна підтримка']}]},
  'Фітнес':{dot:'#C2562F',plans:[
    {n:'Старт',d:'Соло-тренер',p:'₴0',sub:'назавжди безкоштовно',cta:'Почати',f:['1 тренер','Запис на заняття','База клієнтів','Нагадування']},
    {n:'Студія',d:'Зал чи студія',p:'₴690',per:'/міс',sub:'−20% при оплаті за рік',pop:1,cta:'Спробувати 14 днів',f:['Абонементи','Групові заняття','Розклад тренерів','Аналітика','Віджет запису']},
    {n:'Мережа',d:'Кілька залів',p:'₴1390',per:'/міс',sub:'−20% при оплаті за рік',cta:'Зв’язатися',f:['Без лімітів','Кілька локацій','API','Пріоритетна підтримка']}]}
};
const pio=document.getElementById('pindtoggle'),pco=document.getElementById('pricegrid');
function renderP(ind){
  pco.innerHTML=PRICING[ind].plans.map(pl=>'<div class="pcard glass'+(pl.pop?' pop':'')+'">'+(pl.pop?'<div class="pbadge">Популярний</div>':'')+'<div class="pname">'+pl.n+'</div><div class="pdesc">'+pl.d+'</div><div class="price">'+pl.p+(pl.per?'<small>'+pl.per+'</small>':'')+'</div><div class="pyear">'+pl.sub+'</div><ul class="pfeat">'+pl.f.map(x=>'<li><span class="ck">✓</span>'+x+'</li>').join('')+'</ul><a class="btn '+(pl.pop?'btn-ink':'btn-glass')+'" href="#">'+pl.cta+'</a></div>').join('');
  Array.prototype.forEach.call(pio.children,c=>c.classList.toggle('on',c.dataset.k===ind));
}
if(pio){Object.keys(PRICING).forEach(k=>{var b=document.createElement('div');b.className='pind';b.dataset.k=k;b.innerHTML='<span class="pd" style="background:'+PRICING[k].dot+'"></span>'+k;b.onclick=()=>renderP(k);pio.appendChild(b);});renderP('Краса');}
document.querySelectorAll('.intnode').forEach(n=>{var w=document.getElementById('path'+n.dataset.i);if(!w)return;n.addEventListener('mouseenter',()=>w.classList.add('act'));n.addEventListener('mouseleave',()=>w.classList.remove('act'));});
var cEl=document.getElementById('intcount');if(cEl){var ic=1247;setInterval(()=>{ic+=1+Math.floor(Math.random()*3);cEl.textContent=ic.toLocaleString('uk-UA');},1700);}
var hiwSteps=document.getElementById('hiwSteps'),hfill=document.getElementById('hprogFill');
if(hiwSteps&&hfill){
  var hsteps=hiwSteps.querySelectorAll('.hstep'),hscenes=document.querySelectorAll('.hscene'),hprog=hiwSteps.querySelector('.hprog'),hi=0,htimer;
  function setHiw(i){hi=(i+3)%3;hsteps.forEach((s,k)=>s.classList.toggle('on',k===hi));hscenes.forEach((s,k)=>s.classList.toggle('on',k===hi));
    var d=hsteps[hi].querySelector('.hdot'),pr=hprog.getBoundingClientRect(),dr=d.getBoundingClientRect();hfill.style.height=Math.max(0,(dr.top+dr.height/2)-pr.top)+'px';}
  hsteps.forEach((s,k)=>s.addEventListener('click',()=>{clearInterval(htimer);setHiw(k);htimer=setInterval(()=>setHiw(hi+1),3400);}));
  setHiw(0);htimer=setInterval(()=>setHiw(hi+1),3400);
  window.addEventListener('resize',()=>setHiw(hi));
}
var shSlides=document.querySelectorAll('.sh-slide'),shDots=document.querySelectorAll('.sh-dots span'),shi=0;

/* hero: mock CRM cards per industry (beauty → horses → medicine), synced with the photo slider */
var shIndustries=[
  {
    title:'Записи сьогодні',tag:'18 записів',
    rows:[
      {c:'#C9B6FF',t:'09:00',n:'Стрижка + укладка',s:'Олена · майстер Аня',st:'ok'},
      {c:'#F4B0D4',t:'11:30',n:'Манікюр гель',s:'Ірина · майстер Віка',st:'ok'},
      {c:'#A6D8F2',t:'14:00',n:'Фарбування',s:'Софія · майстер Аня',st:'new'},
      {c:'#A6E8BE',t:'16:30',n:'Чоловіча стрижка',s:'Андрій · майстер Олег',st:'ok'},
      {c:'#F2C79A',t:'18:00',n:'Укладка',s:'Марія · майстер Віка',st:'new'}
    ],
    avatar:'/img/quote.webp',name:'Олена Кравець',meta:'12 візитів · майстер Аня',
    noteLabel:'Нотатка',note:'алергія на аміак · кава без цукру',
    tags:['VIP','Постійний клієнт'],
    last:'Останній візит · 12 травня · Фарбування ₴800',
    noteTitle:'Новий запис',noteSub:'Ірина · сьогодні 14:00',
    chips:['₴9 400 цей тиждень · ↑38%','⟳ Нагадати клієнту автоматично','◷ Запис онлайн · 24/7']
  },
  {
    title:'Заняття сьогодні',tag:'14 занять',
    rows:[
      {c:'#C9B6FF',t:'09:00',n:'Прогулянка у лісі',s:'Олена · кінь Вітер',st:'ok'},
      {c:'#F2C79A',t:'11:30',n:'Верхова їзда · група',s:'6 вершників · тренер Марта',st:'ok'},
      {c:'#A6D8F2',t:'14:00',n:'Індивідуальне заняття',s:'Софія · тренер Ігор',st:'new'},
      {c:'#A6E8BE',t:'16:30',n:'Прокат коня · 1 год',s:'Андрій · кінь Грім',st:'ok'},
      {c:'#F4B0D4',t:'18:00',n:'Іпотерапія',s:'Марія · тренер Оксана',st:'new'}
    ],
    avatar:'/img/p2.webp',name:'Софія Мельник',meta:'24 заняття · тренер Марта',
    noteLabel:'Нотатка',note:'їздить на Вітрі · боїться галопу',
    tags:['Абонемент','Постійний вершник'],
    last:'Останнє заняття · 12 травня · Верхова їзда ₴600',
    noteTitle:'Новий запис на заняття',noteSub:'Софія · сьогодні 14:00',
    chips:['₴12 800 цей тиждень · ↑24%','⟳ Нагадати про заняття автоматично','◷ Бронювання коня · 24/7']
  },
  {
    title:'Прийоми сьогодні',tag:'22 прийоми',
    rows:[
      {c:'#A6D8F2',t:'09:00',n:'Плановий огляд',s:'Олена · лікар Коваль',st:'ok'},
      {c:'#A6E8BE',t:'11:30',n:'УЗД щитоподібної',s:'Ірина · лікар Шевчук',st:'ok'},
      {c:'#C9B6FF',t:'14:00',n:'Консультація терапевта',s:'Андрій · лікар Коваль',st:'new'},
      {c:'#F2C79A',t:'16:30',n:'Забір аналізів',s:'Марія · медсестра Ніна',st:'ok'},
      {c:'#F4B0D4',t:'18:00',n:'Повторний прийом',s:'Олег · лікар Шевчук',st:'new'}
    ],
    avatar:'/img/p3.webp',name:'Андрій Ткаченко',meta:'8 візитів · лікар Коваль',
    noteLabel:'Анамнез',note:'алергія на пеніцилін · тиск 130/85',
    tags:['Страховка','Диспансерний облік'],
    last:'Останній візит · 12 травня · Плановий огляд ₴550',
    noteTitle:'Новий запис на прийом',noteSub:'Андрій · сьогодні 14:00',
    chips:['₴21 300 цей тиждень · ↑16%','⟳ Нагадати про прийом автоматично','◷ Онлайн-запис · 24/7']
  }
];
var shEls={
  title:document.getElementById('shcTitle'),tag:document.getElementById('shcTag'),
  list:document.getElementById('shcList'),avatar:document.getElementById('shcAvatar'),
  name:document.getElementById('shcName'),meta:document.getElementById('shcMeta'),
  note:document.getElementById('shcNote'),tags:document.getElementById('shcTags'),
  last:document.getElementById('shcLast'),noteTitle:document.getElementById('shcNoteTitle'),
  noteSub:document.getElementById('shcNoteSub'),
  chips:[document.querySelector('.sh-chip0'),document.querySelector('.sh-chip1'),document.querySelector('.sh-chip2')],
  cards:document.querySelectorAll('.sh-card')
};
function shEsc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function shRender(i){
  var d=shIndustries[i];if(!d||!shEls.list)return;
  shEls.title.textContent=d.title;shEls.tag.textContent=d.tag;
  shEls.list.innerHTML=d.rows.map(function(r){
    var badge=r.st==='new'?'<span class="shc-rnew">Новий</span>':'<span class="shc-rok">✓</span>';
    return '<div class="shc-r"><span class="shc-bar" style="background:'+r.c+'"></span>'+
      '<span class="shc-rtm">'+shEsc(r.t)+'</span>'+
      '<span class="shc-rtx"><b>'+shEsc(r.n)+'</b><i>'+shEsc(r.s)+'</i></span>'+badge+'</div>';
  }).join('');
  shEls.avatar.style.backgroundImage='url('+d.avatar+')';
  shEls.name.textContent=d.name;shEls.meta.textContent=d.meta;
  shEls.note.innerHTML='<span>'+shEsc(d.noteLabel)+'</span>'+shEsc(d.note);
  shEls.tags.innerHTML=d.tags.map(function(t){return '<span>'+shEsc(t)+'</span>';}).join('');
  shEls.last.textContent=d.last;
  shEls.noteTitle.textContent=d.noteTitle;shEls.noteSub.textContent=d.noteSub;
  shEls.chips.forEach(function(c,k){if(c)c.textContent=d.chips[k];});
}
function shSwap(i){
  var fade=[].slice.call(shEls.cards).concat(shEls.chips.filter(Boolean));
  fade.forEach(function(el){el.classList.add('sh-fade');});
  setTimeout(function(){shRender(i);fade.forEach(function(el){el.classList.remove('sh-fade');});},380);
}
if(shSlides.length>1){setInterval(function(){shSlides[shi].classList.remove('on');if(shDots[shi])shDots[shi].classList.remove('on');shi=(shi+1)%shSlides.length;shSlides[shi].classList.add('on');if(shDots[shi])shDots[shi].classList.add('on');shSwap(shi%shIndustries.length);},5000);}
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* nav: hide on scroll down, reveal on scroll up (smooth) */
(function(){
  var navEl=document.querySelector('nav');
  if(!navEl)return;
  var lastY=window.scrollY||0,ticking=false;
  function upd(){
    var y=window.scrollY||0;
    if(y>lastY+5 && y>140){navEl.classList.add('nav-hidden');}
    else if(y<lastY-5){navEl.classList.remove('nav-hidden');}
    if(y<60){navEl.classList.remove('nav-hidden');}
    lastY=y;ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(upd);ticking=true;}},{passive:true});
})();
