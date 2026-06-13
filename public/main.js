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
const hsec=document.getElementById('hsec'),htrack=document.getElementById('htrack');
function hScroll(){
  if(!hsec||!htrack)return;
  if(window.innerWidth<=920){htrack.style.transform='';return;}
  const top=hsec.getBoundingClientRect().top;
  const dist=hsec.offsetHeight-window.innerHeight;
  const p=Math.min(1,Math.max(0,-top/dist));
  const max=Math.max(0,htrack.scrollWidth-window.innerWidth+34);
  htrack.style.transform='translateX('+(-(p*max)).toFixed(1)+'px)';
}
window.addEventListener('scroll',hScroll,{passive:true});
window.addEventListener('resize',hScroll);
hScroll();
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
if(shSlides.length>1){setInterval(function(){shSlides[shi].classList.remove('on');if(shDots[shi])shDots[shi].classList.remove('on');shi=(shi+1)%shSlides.length;shSlides[shi].classList.add('on');if(shDots[shi])shDots[shi].classList.add('on');},5000);}
const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
