const cpu=document.getElementById('cpus'),jobs=document.getElementById('jobs'),inputs=document.getElementById('inputs');
function makeInputs(v=[10,8,7,6,4,3,2,9]){let n=+jobs.value;inputs.innerHTML='';for(let i=0;i<n;i++)inputs.innerHTML+=`<div class="job"><span>Job ${i+1}</span><input class="bt" type="number" min="1" value="${v[i]??5}"></div>`}
jobs.oninput=()=>makeInputs();
function sample(){cpu.value=4;jobs.value=8;makeInputs([10,8,7,6,4,3,2,9]);run()}
function run(){
 let n=+cpu.value, b=[...document.querySelectorAll('.bt')].map(x=>Math.max(1,+x.value||1));
 let r=b.map((x,i)=>({id:i+1,rem:x})), T=Array.from({length:n},()=>[]),steps=[],t=0,done=0;
 while(done<b.length){
  let a=r.filter(x=>x.rem>0).sort((x,y)=>y.rem-x.rem||x.id-y.id).slice(0,n), names=[];
  for(let c=0;c<n;c++){let j=a[c];if(j){names.push(`J${j.id} (${j.rem}→${j.rem-1})`);T[c].push(j.id);j.rem--;if(!j.rem)done++}else{names.push('IDLE');T[c].push(0)}}
  steps.push(`Time ${t}–${t+1}: ${names.join(' | ')}`);t++;
 }
 let work=b.reduce((a,x)=>a+x,0), util=work/(n*t)*100,load=T.map(x=>x.filter(Boolean).length),avg=work/n,imb=(Math.max(...load)-Math.min(...load))/avg*100;
 document.getElementById('metrics').innerHTML=[['CPUs',n],['Jobs',b.length],['Total Work',work+' units'],['Makespan',t+' units'],['Utilization',util.toFixed(2)+'%']].map(x=>`<div class="metric"><small>${x[0]}</small><strong>${x[1]}</strong></div>`).join('');
 let mx=Math.max(...load);document.getElementById('loads').innerHTML=load.map((x,i)=>`<div class="load"><b>CPU ${i+1}</b><div class="barbg"><div class="bar" style="width:${x/mx*100}%"></div></div><b>${x}</b></div>`).join('');
 document.getElementById('donut').style.setProperty('--p',util+'%');document.getElementById('util').textContent=util.toFixed(1)+'%';
 let g='<div class="grow"><div class="lab">Time</div>'+Array.from({length:t},(_,i)=>`<div class="cell time">${i}</div>`).join('')+'</div>';
 const colors=['#4f46e5','#0ea5e9','#16a34a','#f59e0b','#db2777','#7c3aed','#0891b2','#ea580c'];
 T.forEach((row,c)=>{g+=`<div class="grow"><div class="lab">CPU ${c+1}</div>`;row.forEach(j=>g+=`<div class="cell" style="background:${j?colors[(j-1)%colors.length]:'#98a2b3'}">${j?'J'+j:'IDLE'}</div>`);g+='</div>'});
 document.getElementById('gantt').innerHTML=g;
 document.getElementById('steps').innerHTML=steps.map((x,i)=>`<div class="step"><b>${i+1}.</b> ${x}</div>`).join('');
 document.getElementById('analysis').innerHTML=`<b>CPU Utilization:</b> ${util.toFixed(2)}% = ${work} ÷ (${n} × ${t}) × 100.<br><b>Average CPU Load:</b> ${avg.toFixed(2)} units.<br><b>Load Imbalance:</b> ${imb.toFixed(2)}%. Lower is better.<br><b>Rule:</b> At every time unit, the unfinished jobs with the largest remaining burst times are selected first.`;
}
makeInputs();run();