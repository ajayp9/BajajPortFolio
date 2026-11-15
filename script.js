const menu=document.getElementById('menu'),nav=document.getElementById('nav');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// Reveal content as it enters the viewport.
const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Filter the six product cards by category.
const filters=document.querySelectorAll('[data-filter]');
const cards=document.querySelectorAll('.card');
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  const filter=btn.dataset.filter;
  cards.forEach(card=>card.classList.toggle('hide',filter!=='all'&&card.dataset.category!==filter));
}));

// Product details shown in an accessible modal.
const details={
personal:['01 / CREDIT','Personal Loan','A personal loan is an unsecured borrowing option that may help eligible customers meet planned or unexpected personal expenses. Amount, rate, fees, tenure and approval depend on eligibility and lender terms.'],
home:['02 / HOME','Home Loan','A home loan can support eligible customers in purchasing, constructing or improving a residential property. Review the applicable terms, property requirements, fees and eligibility before applying.'],
business:['03 / BUSINESS','Business Loan','A business loan may help eligible businesses manage working capital, purchase equipment or support expansion. Terms depend on the business profile, credit assessment and lender approval.'],
fd:['04 / SAVINGS','Fixed Deposit','A fixed deposit allows a customer to place money for a selected tenure at an applicable interest rate. Check the current rate card, payout options and withdrawal conditions.'],
emi:['05 / PURCHASES','EMI Network Card','An EMI network card can provide access to eligible purchases through instalment-based payment options at participating merchants, subject to card eligibility, available limit and transaction terms.'],
insurance:['06 / COVER','Insurance','Insurance products are designed to provide financial protection against specified risks, subject to policy coverage, exclusions, premiums and policy conditions.']
};
const modal=document.getElementById('modal');
function openModal(key){const d=details[key];if(!d)return;document.getElementById('kicker').textContent=d[0];document.getElementById('title').textContent=d[1];document.getElementById('desc').textContent=d[2];modal.classList.add('open');document.body.style.overflow='hidden';}
function closeModal(){modal.classList.remove('open');document.body.style.overflow='';}
document.querySelectorAll('[data-product]').forEach(btn=>btn.addEventListener('click',()=>openModal(btn.dataset.product)));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// Back-to-top button.
const topBtn=document.getElementById('topBtn');
window.addEventListener('scroll',()=>topBtn.classList.toggle('show',window.scrollY>450),{passive:true});
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.getElementById('year').textContent=new Date().getFullYear();
