const menu=document.getElementById('menuToggle');
const links=document.getElementById('navLinks');
if(menu&&links){
    menu.addEventListener('click',()=>{
        const open=links.classList.toggle('open');
        menu.setAttribute('aria-expanded',String(open));
        menu.textContent=open?'×':'☰'
    });
    links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')))
}const progress=document.getElementById('progress');
function updateProgress(){
    const total=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(total>0?scrollY/total*100:0)+'%'
}addEventListener('scroll',updateProgress,{
    passive:true
});
updateProgress();
const steps=[['01. Entrada da água','A água salgada é colocada em um recipiente raso, dentro do destilador.'],['02. Aquecimento','A luz do Sol aquece o recipiente. Uma superfície escura pode ajudar a absorver mais energia.'],['03. Evaporação','Parte da água vira vapor. O sal e grande parte das substâncias dissolvidas ficam no recipiente.'],['04. Condensação','O vapor encontra a cobertura mais fria e volta ao estado líquido, formando gotinhas.'],['05. Coleta','As gotas escorrem pela cobertura inclinada e seguem por um cano até outro recipiente.']];
let current=0;
const title=document.getElementById('simTitle');
const desc=document.getElementById('simText');
const visual=document.getElementById('labSimulator');
const dots=document.querySelectorAll('[data-step]');
function showStep(n){
    if(!title)return;
    current=n;
    title.textContent=steps[n][0];
    desc.textContent=steps[n][1];
    visual.dataset.phase=String(n);
    document.getElementById('labStepNumber').innerHTML=String(n+1).padStart(2,'0')+' <span>/ 05</span>';
    document.getElementById('simStatus').textContent=`ETAPA ${n+1} DE 5`;
    dots.forEach((b,i)=>{
        b.classList.toggle('selected',i===n);
        b.setAttribute('aria-pressed',String(i===n))
    })
}if(title){
    dots.forEach(b=>b.addEventListener('click',()=>showStep(Number(b.dataset.step))));
    document.getElementById('nextStep').addEventListener('click',()=>showStep((current+1)%5));
    document.getElementById('restartStep').addEventListener('click',()=>showStep(0));
    showStep(0)
}
