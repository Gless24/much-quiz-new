/* =================== Datos =================== */
const params = new URLSearchParams(location.search);
const SALA = params.get('sala') || 'Exploración';

const BANK = [
  { text:'📅 ¿En qué año se inauguró el Museo Chiapas (MUCH)?', options:['1994','2003','2010','2015'], correctIndex:1, points:10 },
  { text:'🐆 ¿Cuál es el felino más grande que vive en Chiapas?', options:['Jaguar','Puma','Ocelote','León'], correctIndex:0, points:10 },
  { text:'🐢 ¿Qué animal vive en los ríos y lagunas de Chiapas?', options:['Cocodrilo','Delfín','Foca','Tiburón'], correctIndex:0, points:10 },
  { text:'🕊️ ¿Dónde vive principalmente el quetzal en Chiapas?', options:['Bosque de niebla','Desierto','Pradera','Sabana'], correctIndex:0, points:10 },
  { text:'🏛️ ¿Qué zona arqueológica es famosa por sus murales de colores?', options:['Bonampak','Palenque','Toniná','Chichén Itzá'], correctIndex:0, points:10 },
  { text:'🌲 ¿En qué reserva natural se pueden ver quetzales?', options:['El Triunfo','La Sepultura','La Encrucijada','El Pinacate'], correctIndex:0, points:10 },
  { text:'🏔️ ¿Cuál es el volcán más alto de Chiapas?', options:['Tacaná','Popocatépetl','Nevado de Toluca','Malinche'], correctIndex:0, points:10 },
  { text:'🌊 ¿Cómo se llama el lugar famoso por sus lagos de colores verde y azul?', options:['Lagos de Montebello','Bacalar','Xochimilco','Lagunas de Zempoala'], correctIndex:0, points:10 },
  { text:'🦧 ¿Qué tipo de mono vive en la Selva Lacandona?', options:['Mono araña','Mono titi','Mono ardilla','Mono capuchino'], correctIndex:0, points:10 },
  { text:'🎶 ¿Con qué instrumento musical se identifica a Chiapas?', options:['Marimba','Guitarra','Tambor','Piano'], correctIndex:0, points:10 },
  { text:'🎉 ¿Cómo se llama la fiesta tradicional de Chiapa de Corzo reconocida por la UNESCO?', options:['Parachicos','Guelaguetza','Carnaval de Veracruz','Danza de los Viejitos'], correctIndex:0, points:10 },
  { text:'☕ ¿Qué producto de Chiapas es famoso en todo el mundo?', options:['Café','Vino','Cacao','Té'], correctIndex:0, points:10 },
  { text:'🗣️ ¿Qué lengua indígena se habla mucho en Los Altos de Chiapas?', options:['Tsotsil','Nahuatl','Maya','Zapoteco'], correctIndex:0, points:10 },
  { text:'💧 ¿Qué cañón es un símbolo de Chiapas y tiene un gran río?', options:['Cañón del Sumidero','Cañón del Colorado','Barranca del Cobre','Cañón de Fernández'], correctIndex:0, points:10 },
  { text:'🏛️ ¿Qué gobernante maya de Palenque fue enterrado en el Templo de las Inscripciones?', options:['Moctezuma','Pakal el Grande','Kukulkán','Yax Kuk Mo'], correctIndex:1, points:10 },
  { text:'🏺 ¿Qué zona arqueológica de Chiapas fue rival de Palenque y es famosa por sus esculturas de piedra?', options:['Toniná','Bonampak','Izapa','Uxmal'], correctIndex:0, points:10 },
  { text:'🦅 ¿Qué ave rapaz gigante puede encontrarse en selvas de Chiapas?', options:['Águila pescadora','Águila harpía','Águila real','Cóndor'], correctIndex:1, points:10 },
  { text:'🪶 ¿Qué ave parecida a un pavo está en peligro en Chiapas?', options:['Pava cojolita','Guajolote común','Chachalaca','Pato silvestre'], correctIndex:0, points:10 },
  { text:'⚡ ¿Qué presa hidroeléctrica del río Grijalva está junto al Cañón del Sumidero?', options:['Chicoasén','La Angostura','Malpaso','Peñitas'], correctIndex:0, points:10 },
  { text:'💧 ¿Qué reserva natural costera de Chiapas es famosa por sus manglares?', options:['La Encrucijada','El Vizcaíno','Calakmul','Sian Kaan'], correctIndex:0, points:10 },
  { text:'🌸 ¿Qué familia de plantas es la más diversa en las selvas de Chiapas?', options:['Orquídeas Silvestres','Margaritas','Pastos','Cactus'], correctIndex:0, points:10 },
  { text:'🌐 ¿Qué tecnología usan los planetarios modernos para mostrar imágenes en la cúpula?', options:['Fulldome 360°','Televisión','Proyector plano','Holograma'], correctIndex:0, points:10 },
  { text:'🗓️ ¿En qué año la Fiesta Grande de Chiapa de Corzo (Parachicos) fue reconocida por la UNESCO?', options:['2001','2010','2015','2020'], correctIndex:1, points:10 },
  { text:'🗣️ Además del tsotsil, ¿qué otra lengua maya se habla mucho en Chiapas?', options:['Tseltal','Zapoteco','Rarámuri','Mixteco'], correctIndex:0, points:10 },
  { text:'🦚 Ave que se consideraba extinta en Chiapas, con plumas largas de color turquesa:', options:['Guacamaya','Quetzal','Tucán','Loro'], correctIndex:1, points:10 },
  { text:'🐆 ¿Qué significa la palabra "BALAM" en español?', options:['Puma','Jaguar','León','Tigre'], correctIndex:1, points:10 },
];

const NUM_QUESTIONS = 6;
const shuffle = a => a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const QUESTIONS = shuffle(BANK).slice(0, NUM_QUESTIONS);

/* =================== Clases =================== */
class SoundFX{
  constructor(toggleEl){ this.toggleEl = toggleEl; this.ctx = null; }
  beep(freq=880, dur=0.15, type='sine', vol=0.08){
    if(!this.toggleEl.checked) return;
    this.ctx = this.ctx || new (window.AudioContext||window.webkitAudioContext)();
    const o=this.ctx.createOscillator(), g=this.ctx.createGain();
    o.type=type; o.frequency.value=freq; g.gain.value=vol;
    o.connect(g); g.connect(this.ctx.destination); o.start();
    setTimeout(()=>o.stop(), dur*1000);
  }
  correct(){ this.beep(880,.12,'sine',.08); setTimeout(()=>this.beep(1320,.12,'sine',.07),130); }
  wrong(){ this.beep(200,.18,'sawtooth',.07); }
}

class Confetti{
  constructor(canvas){
    this.canvas = canvas; this.ctx = canvas.getContext('2d');
    this.pieces=[]; this.resize(); addEventListener('resize', ()=>this.resize());
    this.loop();
  }
  resize(){ this.canvas.width = innerWidth; this.canvas.height = innerHeight; }
  launch(n=120){
    for(let i=0;i<n;i++){
      this.pieces.push({ x: Math.random()*this.canvas.width, y:-10, r:4+Math.random()*4, vy:2+Math.random()*3, vx:-2+Math.random()*4, rot:Math.random()*Math.PI*2 });
    }
  }
  loop(){
    requestAnimationFrame(()=>this.loop());
    const {ctx,canvas}=this; ctx.clearRect(0,0,canvas.width,canvas.height);
    this.pieces.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.rot+=0.05;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot);
      const palette = ['#06b6d4','#0891b2','#d946ef','#a21caf','#22d3ee','#f0abfc'];
      ctx.fillStyle = palette[(p.r|0) % palette.length];
      ctx.fillRect(-p.r,-p.r,p.r*2,p.r*2); ctx.restore();
    });
    this.pieces = this.pieces.filter(p=>p.y<canvas.height+20);
  }
}

class PrizeManager{
  constructor(){
    this.PRIZES = [
      { key:'museo',      title:'MUCH · Museo',      label:'Entrada al Museo MUCH',                           lugar:'Museo Chiapas (MUCH)', emoji:'🏛️' },
      { key:'planetario', title:'MUCH · Planetario', label:'Entrada al Planetario MUCH',                      lugar:'Planetario MUCH',      emoji:'🔭' },
      { key:'zoomat',     title:'ZooMAT',            label:'Entrada al Zoológico Miguel Álvarez del Toro',    lugar:'ZooMAT',               emoji:'🐆' },
    ];
  }
  random(){ return this.PRIZES[Math.floor(Math.random()*this.PRIZES.length)]; }
}

class TicketManager{
  constructor({modalEl, folioEl, dateEl, nameEl, nickEl, saveBtn, printBtn, titleEls, accessEl, ubicacionEl, headerLogoEl}){
    this.modal = new bootstrap.Modal(modalEl);
    this.folioEl=folioEl; this.dateEl=dateEl; this.nameEl=nameEl;
    this.nickEl=nickEl; this.saveBtn=saveBtn; this.printBtn=printBtn;
    this.titleEls = titleEls; this.accessEl = accessEl; this.ubicacionEl = ubicacionEl; this.headerLogoEl = headerLogoEl;
    this.currentPrize = null;

    this.saveBtn.addEventListener('click', ()=> this.updateName());
    this.printBtn.addEventListener('click', ()=> window.print());
  }
  setPrize(prize){
    this.currentPrize = prize;
    const folio = 'MUCH-' + Math.random().toString(36).substring(2,8).toUpperCase();
    this.folioEl.textContent = 'Folio: ' + folio;
    const now = new Date();
    this.dateEl.textContent = new Intl.DateTimeFormat('es-MX',{dateStyle:'long'}).format(now);

    this.titleEls.forEach(el => el.textContent = `${prize.emoji} ${prize.title}`);
    this.accessEl.innerHTML    = `<strong>Acceso:</strong> ${prize.label}`;
    this.ubicacionEl.innerHTML = `<strong>Ubicación:</strong> ${prize.lugar}`;
    if (this.headerLogoEl) this.headerLogoEl.textContent = prize.emoji;
  }
  updateName(){ this.nameEl.textContent = this.nickEl.value.trim() ? this.nickEl.value.trim() : 'Visitante'; }
  open(){ if(!this.currentPrize) return; this.updateName(); this.modal.show(); }
}

class UIManager{
  constructor({elements, sound, confetti, ticket, prizeMgr}){
    this.e = elements; this.sound = sound; this.confetti = confetti; this.ticket = ticket; this.prizeMgr = prizeMgr;
    this.state = { idx:0, selected:null, points:0, correct:0, locked:false, answers:[] };

    this.e.pillSala.textContent = `Sala: ${SALA}`;
    this.e.qTotal.textContent = QUESTIONS.length.toString();
    this.bind(); this.render(); this.clock();
  }
  bind(){
    this.e.nextBtn.addEventListener('click', ()=> this.next());
    this.e.openTicketBtn.addEventListener('click', ()=> this.ticket.open());
    this.e.playAgainBtn1.addEventListener('click', ()=> location.reload());
    this.e.playAgainBtn2.addEventListener('click', ()=> location.reload());
  }
  clock(){
    const tick=()=>{
      const t=new Date(), hh=String(t.getHours()).padStart(2,'0'), mm=String(t.getMinutes()).padStart(2,'0');
      this.e.timer.textContent = `⏰ ${hh}:${mm}`;
      setTimeout(tick, 10_000);
    }; tick();
  }
  render(){
    const s=this.state, {e}=this;
    e.bar.style.width = (s.idx/QUESTIONS.length*100)+'%';

    if(s.idx>=QUESTIONS.length){
      e.quizView.classList.add('d-none');
      e.finalView.classList.remove('d-none');
      e.finalPoints.textContent = s.points.toString();
      e.finalCorrect.textContent= s.correct.toString();
      e.finalTotal.textContent  = QUESTIONS.length.toString();

      const allCorrect = s.correct===QUESTIONS.length;
      if(allCorrect){
        const prize = this.prizeMgr.random();
        this.ticket.setPrize(prize);
        e.finalTitle.textContent = '¡Perfecto! 🎉';
        e.finalMsg.textContent   = `¡Te ganaste una ${prize.label}! Presiona el botón para ver tu boleto digital.`;
        e.giftRow.classList.remove('d-none');
        e.retryRow.classList.add('d-none');
        this.confetti.launch(200); this.sound.correct();
      } else {
        e.finalTitle.textContent = 'Buen intento 👀';
        e.finalMsg.textContent   = 'Explora el MUCH y vuelve a intentarlo.';
        e.giftRow.classList.add('d-none');
        e.retryRow.classList.remove('d-none');
      }
      return;
    }

    const q = QUESTIONS[s.idx];
    e.qIndex.textContent = (s.idx+1).toString();
    e.qText.textContent  = q.text;
    e.qDesc.textContent  = q.desc || '';
    e.status.textContent = '';
    e.options.innerHTML  = '';
    s.selected=null; s.locked=false;

    q.options.forEach((label,i)=>{
      const col=document.createElement('div'); col.className='col-12 col-md-6';
      const btn=document.createElement('button'); btn.type='button'; btn.className='option-btn';
      btn.setAttribute('data-index', i);
      btn.innerHTML = `<span class="emoji">🔹</span><span>${label}</span>`;
      btn.addEventListener('click', ()=> this.choose(i));
      col.appendChild(btn); e.options.appendChild(col);
    });

    e.nextBtn.textContent = s.idx===QUESTIONS.length-1 ? 'Finalizar 🎉' : 'Siguiente ➡️';
    e.pointsEl.textContent = s.points.toString();
    e.hint.textContent = 'Tip: solo puedes elegir una respuesta';
  }
  choose(i){
    const s=this.state, {e}=this;
    if(s.locked) return; s.locked=true; s.selected=i;
    const q=QUESTIONS[s.idx], correctIdx=q.correctIndex;
    [...e.options.querySelectorAll('.option-btn')].forEach((btn,idx)=>{
      btn.disabled=true; btn.classList.remove('option-btn--correct','option-btn--incorrect');
      if(idx===correctIdx) btn.classList.add('option-btn--correct');
      if(idx===i && i!==correctIdx) btn.classList.add('option-btn--incorrect');
    });
    if(i===correctIdx){
      e.status.textContent='✅ ¡Correcto!';
      s.points+=q.points; s.correct+=1;
      this.sound.correct(); this.confetti.launch(40);
    } else {
      e.status.textContent='❌ ¡Casi! Sigue intentando';
      this.sound.wrong();
    }
    s.answers.push({ qIndex:s.idx, question:q.text, choice:q.options[i], correct:i===correctIdx });
  }
  next(){
    const s=this.state, {e}=this;
    if(s.selected===null){ e.status.textContent='⚠️ Selecciona una respuesta para continuar.'; return; }
    s.idx+=1; this.render();
  }
}

/* =================== Instanciación =================== */
const elements = {
  pillSala: document.getElementById('pillSala'),
  bar: document.getElementById('bar'),
  timer: document.getElementById('timer'),
  quizView: document.getElementById('quizView'),
  finalView: document.getElementById('finalView'),
  qIndex: document.getElementById('qIndex'),
  qTotal: document.getElementById('qTotal'),
  qText: document.getElementById('qText'),
  qDesc: document.getElementById('qDesc'),
  options: document.getElementById('options'),
  status: document.getElementById('status'),
  nextBtn: document.getElementById('nextBtn'),
  pointsEl: document.getElementById('points'),
  hint: document.getElementById('hint'),
  finalTitle: document.getElementById('finalTitle'),
  finalMsg: document.getElementById('finalMsg'),
  finalPoints: document.getElementById('finalPoints'),
  finalCorrect: document.getElementById('finalCorrect'),
  finalTotal: document.getElementById('finalTotal'),
  giftRow: document.getElementById('giftRow'),
  retryRow: document.getElementById('retryRow'),
  openTicketBtn: document.getElementById('openTicketBtn'),
  playAgainBtn1: document.getElementById('playAgainBtn1'),
  playAgainBtn2: document.getElementById('playAgainBtn2'),
  soundToggle: document.getElementById('soundToggle'),
  logoEmoji: document.getElementById('logoEmoji'),
  ticketModal: document.getElementById('ticketModal'),
  ticketFolio: document.getElementById('ticketFolio'),
  ticketDate:  document.getElementById('ticketDate'),
  ticketName:  document.getElementById('ticketName'),
  nick:        document.getElementById('nick'),
  saveNameBtn: document.getElementById('saveNameBtn'),
  printBtn:    document.getElementById('printBtn'),
  ticketAccess:    document.getElementById('ticketAccess'),
  ticketPlace:     document.getElementById('ticketPlace'),
};

const sound    = new SoundFX(elements.soundToggle);
const confetti = new Confetti(document.getElementById('confetti'));
const prizeMgr = new PrizeManager();

const ticket = new TicketManager({
  modalEl: elements.ticketModal,
  folioEl: elements.ticketFolio,
  dateEl:  elements.ticketDate,
  nameEl:  elements.ticketName,
  nickEl:  elements.nick,
  saveBtn: elements.saveNameBtn,
  printBtn:elements.printBtn,
  titleEls:[ document.querySelector('#ticketModal .modal-title'),
             document.querySelector('.ticket .ticket__title') ],
  accessEl:    elements.ticketAccess,
  ubicacionEl: elements.ticketPlace,
  headerLogoEl:elements.logoEmoji,
});

// Inicio: muestra bienvenida; al click arranca el quiz (1ª pregunta)
document.getElementById('startBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  document.getElementById('welcome').classList.add('hidden');
  document.getElementById('quizShell').classList.remove('hidden');
  new UIManager({ elements, sound, confetti, ticket, prizeMgr });
});
