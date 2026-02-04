// Demo dataset (expanded)
let currentApplyInternship = null;

const internships = [
  {id:1,title:'Frontend Intern',company:'BlueLabs',domain:'Web Development',skills:['React','HTML','CSS'],stipend:15000,posted:'2025-11-01',desc:'Build UI components & dashboards.'},
  {id:2,title:'ML Research Intern',company:'AICore',domain:'Machine Learning',skills:['Python','PyTorch','NLP'],stipend:25000,posted:'2025-10-22',desc:'Prototype text-classification models.'},
  {id:3,title:'Data Analyst Intern',company:'InsightX',domain:'Data Science',skills:['SQL','Python','Pandas'],stipend:12000,posted:'2025-11-10',desc:'Analyze product & user data.'},
  {id:4,title:'Android Developer Intern',company:'MobilityHub',domain:'Mobile',skills:['Kotlin','Android'],stipend:13000,posted:'2025-09-20',desc:'Implement app features.'},
  {id:5,title:'UI/UX Intern',company:'Designo',domain:'UI/UX',skills:['Figma','Prototyping'],stipend:10000,posted:'2025-11-15',desc:'Design product mockups.'},
  {id:6,title:'Backend Intern',company:'CloudServe',domain:'Web Development',skills:['Node.js','Express','DB'],stipend:20000,posted:'2025-10-01',desc:'Work on microservices & APIs.'},
  {id:7,title:'Embedded Intern',company:'IoTrix',domain:'Embedded',skills:['C','RTOS'],stipend:16000,posted:'2025-11-05',desc:'Sensor integration & firmware.'},
  {id:8,title:'Data Engineer Intern',company:'Pipeliner',domain:'Data Science',skills:['Spark','Python'],stipend:22000,posted:'2025-08-20',desc:'Build ETL pipelines.'},
  {id:9,title:'NLP Intern',company:'TextSense',domain:'Machine Learning',skills:['NLP','Transformers','Python'],stipend:26000,posted:'Summarization & retrieval systems.'},
  {id:10,title:'Fullstack Intern',company:'BuildIt',domain:'Web Development',skills:['React','Node.js'],stipend:18000,posted:'2025-11-12',desc:'Full stack feature development.'},
  {id:11,title:'Robotics Intern',company:'RoboWorks',domain:'Embedded',skills:['ROS','C++'],stipend:17000,posted:'2025-10-09',desc:'Robot navigation & control.'},
  {id:12,title:'PM Intern',company:'PlanIt',domain:'Product',skills:['Prioritization','Communication'],stipend:14000,posted:'2025-11-02',desc:'Assist PMs with roadmaps.'},
  {id:13,title:'CV Intern',company:'Visionary',domain:'Machine Learning',skills:['OpenCV','PyTorch'],stipend:24000,posted:'2025-11-20',desc:'Prototype CV models.'},
  {id:14,title:'iOS Developer Intern',company:'AppMakers',domain:'Mobile',skills:['Swift','UIKit'],stipend:15000,posted:'2025-11-08',desc:'iOS feature development.'},
  {id:15,title:'Analytics Intern',company:'MetricsLab',domain:'Data Science',skills:['SQL','Tableau'],stipend:13000,posted:'2025-11-06',desc:'Dashboards & reports.'}
];

// ----- Tabs -----
const navLinks = document.querySelectorAll('.nav-link');
const panels = document.querySelectorAll('.panel');
navLinks.forEach(n => n.addEventListener('click', ()=>openTab(n.dataset.tab)));

function openTab(name){
  navLinks.forEach(n => n.classList.toggle('active', n.dataset.tab===name));
  panels.forEach(p => p.classList.toggle('active', p.id===name));
}

// Get started -> Opportunities
const getStartBtn = document.getElementById('get-start');
if(getStartBtn){
  getStartBtn.addEventListener('click', ()=> openTab('opportunities'));
}

// ----- Render Cards -----
const cardsEl = document.getElementById('cards');
function renderCards(list){
  cardsEl.innerHTML = '';
  if(list.length === 0){
    cardsEl.innerHTML = '<div class="muted">No internships found.</div>';
    return;
  }
  list.forEach(i => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="tag">${i.domain}</div>
      <h4>${i.title}</h4>
      <div style="font-weight:700">${i.company} · <span class="muted">Posted: ${i.posted}</span></div>
      <p class="muted">${i.desc}</p>
      <div style="margin-top:10px;display:flex;justify-content:space-between;align-items:center">
        <div class="muted">Skills: ${i.skills.join(', ')}</div>
        <div style="display:flex;gap:8px">
          <button class="btn" onclick="viewDetails(${i.id})">View</button>
          <button class="btn primary" onclick="applyIntern(${i.id})">Apply</button>
        </div>
      </div>
    `;
    cardsEl.appendChild(div);
  });
}

function viewDetails(id){
  const it = internships.find(x=>x.id===id);
  if(!it){ alert('Internship not found'); return; }
  alert(`Title: ${it.title}
Company: ${it.company}
Domain: ${it.domain}
Skills: ${it.skills.join(', ')}

${it.desc}`);
}
window.viewDetails = viewDetails;

// ----- Search & Filter -----
const searchEl = document.getElementById('search');
const domainEl = document.getElementById('domain');
const sortEl = document.getElementById('sort');

function filterAndRender(){
  let out = internships.slice();
  const q = (searchEl.value||'').toLowerCase().trim();
  if(q) out = out.filter(it => (it.title+' '+it.company+' '+it.skills.join(' ')+' '+it.desc).toLowerCase().includes(q));
  const dom = domainEl.value;
  if(dom) out = out.filter(it => it.domain === dom);
  const sort = sortEl.value;
  if(sort === 'recent') out.sort((a,b)=> new Date(b.posted) - new Date(a.posted));
  else if(sort === 'stipend' || sort === 'best') out.sort((a,b)=> b.stipend - a.stipend);
  renderCards(out);
}

searchEl.addEventListener('input', filterAndRender);
domainEl.addEventListener('change', filterAndRender);
sortEl.addEventListener('change', filterAndRender);
filterAndRender();

// ----- Local auth: simple demo using localStorage -----
const modal = document.getElementById('modal');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const modalTitle = document.getElementById('modal-title');
const openLogin = document.getElementById('open-login');
const openSignup = document.getElementById('open-signup');
const switchAuth = document.getElementById('switch-auth');

openLogin.addEventListener('click', ()=> showModal('login'));
openSignup.addEventListener('click', ()=> showModal('signup'));
document.getElementById('modal-close').addEventListener('click', hideModal);

switchAuth.addEventListener('click', ()=>{
  if(loginForm.style.display === 'none'){ showModal('login'); }
  else showModal('signup');
});

function showModal(mode='login'){
  modal.style.display = 'flex';
  if(mode === 'login'){
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    modalTitle.textContent = 'Login';
    switchAuth.textContent = 'Switch to Sign up';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    modalTitle.textContent = 'Sign up';
    switchAuth.textContent = 'Switch to Login';
  }
}
function hideModal(){ modal.style.display = 'none'; }

// Demo users store
function getUsers(){ return JSON.parse(localStorage.getItem('internify_users') || '[]'); }
function saveUsers(u){ localStorage.setItem('internify_users', JSON.stringify(u)); }
function setSession(email){ localStorage.setItem('internify_session', email); }
function getSession(){ return localStorage.getItem('internify_session'); }
function clearSession(){ localStorage.removeItem('internify_session'); }

// Signup (pure frontend)
document.getElementById('signup-btn').addEventListener('click', ()=>{
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const pw = document.getElementById('signup-password').value;
  const skills = document.getElementById('signup-skills').value.trim();
  if(!name||!email||!pw){
    alert('Please fill required fields');
    return;
  }
  const users = getUsers();
  if(users.some(u=>u.email===email)){
    alert('Email already registered');
    return;
  }
  users.push({id:Date.now(), name, email, password:pw, skills, applied:[]});
  saveUsers(users);
  setSession(email);
  hideModal();
  refreshUI();
  alert('Welcome, '+name);
});

// Login (pure frontend)
document.getElementById('login-btn').addEventListener('click', ()=>{
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const pw = document.getElementById('login-password').value;
  const users = getUsers();
  const u = users.find(x=>x.email===email && x.password===pw);
  if(!u){
    alert('Invalid credentials');
    return;
  }
  setSession(email);
  hideModal();
  refreshUI();
  alert('Welcome back, '+u.name);
});

// Refresh UI
function refreshUI(){
  const email = getSession();
  if(email){
    openLogin.style.display = 'none';
    openSignup.textContent = 'Profile';
    openSignup.onclick = ()=> toggleProfile(true);
    populateProfile();
  } else {
    openLogin.style.display = 'inline-block';
    openSignup.textContent = 'Sign up';
    openSignup.onclick = ()=> showModal('signup');
    toggleProfile(false);
  }
}

// ---- Apply Modal Elements ----
const applyBackdrop = document.getElementById('apply-modal-backdrop');
const applyTitleEl = document.getElementById('apply-modal-title');
const applyCompanyEl = document.getElementById('apply-modal-company');

const applyNameEl = document.getElementById('apply-name');
const applyEmailEl = document.getElementById('apply-email');
const applyResumeEl = document.getElementById('apply-resume');
const applyMessageEl = document.getElementById('apply-message');

document.getElementById('apply-modal-close').addEventListener('click', closeApplyModal);
document.getElementById('apply-cancel').addEventListener('click', closeApplyModal);

function openApplyModal(it){
  currentApplyInternship = it;   // {id,title,company}
  applyTitleEl.textContent = `Apply for ${it.title}`;
  applyCompanyEl.textContent = `${it.company} · ${it.domain || ''}`;

  const email = getSession();
  const users = getUsers();
  const u = users.find(x=>x.email===email);

  applyNameEl.value = u ? u.name : '';
  applyEmailEl.value = email || '';
  applyResumeEl.value = '';
  applyMessageEl.value = '';

  applyBackdrop.style.display = 'flex';
}

function closeApplyModal(){
  applyBackdrop.style.display = 'none';
  currentApplyInternship = null;
}

// Profile sidebar
const profileSide = document.getElementById('profile-side');
function toggleProfile(open=true){
  if(open) profileSide.classList.add('open');
  else profileSide.classList.remove('open');
}

function populateProfile(){
  const email = getSession();
  if(!email) return;
  const users = getUsers();
  const u = users.find(x=>x.email===email);
  if(!u) return;
  document.getElementById('pname').textContent = u.name;
  document.getElementById('pemail').textContent = u.email;
  document.getElementById('pskills').textContent = 'Skills: ' + (u.skills || '—');
}

document.getElementById('logout-btn').addEventListener('click', ()=>{
  clearSession();
  refreshUI();
  alert('Logged out');
});

// Edit profile
document.getElementById('edit-profile-btn').addEventListener('click', ()=>{
  const email = getSession();
  if(!email){
    alert('Login first');
    return;
  }
  const users = getUsers();
  const u = users.find(x=>x.email===email);
  document.getElementById('edit-name').value = u.name;
  document.getElementById('edit-skills').value = u.skills || '';
  document.getElementById('profile-content').style.display = 'none';
  document.getElementById('edit-profile').style.display = 'block';
});

document.getElementById('cancel-edit').addEventListener('click', ()=>{
  document.getElementById('edit-profile').style.display = 'none';
  document.getElementById('profile-content').style.display = 'block';
});

document.getElementById('save-profile').addEventListener('click', ()=>{
  const name = document.getElementById('edit-name').value.trim();
  const skills = document.getElementById('edit-skills').value.trim();
  const email = getSession();
  const users = getUsers();
  const u = users.find(x=>x.email===email);
  u.name = name;
  u.skills = skills;
  saveUsers(users);
  populateProfile();
  document.getElementById('edit-profile').style.display = 'none';
  document.getElementById('profile-content').style.display = 'block';
  alert('Profile updated');
});

// Apply (pure frontend – localStorage only)
function applyIntern(id){
  const email = getSession();
  if(!email){
    if(confirm('Please login to apply. Open signup?')) showModal('signup');
    return;
  }

  const it = internships.find(x=>String(x.id)===String(id));
  if(!it){
    alert('Internship not found');
    return;
  }

  const users = getUsers();
  const u = users.find(x=>x.email===email);
  u.applied = u.applied || [];
  if(u.applied.includes(id)){
    alert('Already applied');
    return;
  }

  // Open modal to collect extra info (resume/message) – stored only in memory
  openApplyModal(it);
}
window.applyIntern = applyIntern;

// Apply submit (just mark locally)
document.getElementById('apply-submit').addEventListener('click', ()=>{
  if(!currentApplyInternship){
    alert('No internship selected');
    return;
  }

  const name = applyNameEl.value.trim();
  const email = applyEmailEl.value.trim();
  if(!name || !email){
    alert('Name and email are required');
    return;
  }

  const it = currentApplyInternship;

  const users = getUsers();
  const u = users.find(x=>x.email===getSession());
  if(!u){
    alert('Please login again');
    closeApplyModal();
    return;
  }

  u.applied = u.applied || [];
  if(!u.applied.includes(it.id)){
    u.applied.push(it.id);
    saveUsers(users);
  }

  closeApplyModal();
  alert('Application submitted — Good luck!');
});

// Contact
document.getElementById('send-contact').addEventListener('click', ()=>{
  const n = document.getElementById('cname').value.trim();
  const e = document.getElementById('cemail').value.trim();
  const m = document.getElementById('cmessage').value.trim();
  if(!n||!e||!m){
    alert('Please fill all fields');
    return;
  }
  alert('Thanks, '+n+' — we will contact you at '+e);
  document.getElementById('cname').value='';
  document.getElementById('cemail').value='';
  document.getElementById('cmessage').value='';
});

// Modal close & click outside support
document.getElementById('modal-close').addEventListener('click', hideModal);
document.getElementById('modal').addEventListener('click', (e)=>{
  if(e.target === document.getElementById('modal')) hideModal();
});

// init
refreshUI();