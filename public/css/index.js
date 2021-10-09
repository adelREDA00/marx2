const input = document.querySelector(".input")
const btn = document.querySelector(".btn")
const para = document.querySelector(".dec")
const logos = document.querySelector(".logos")
const Mlogo = document.querySelector(".Mlogo")

//predictions result as objects
let first
let second
let third
//probabilty
let Pfirst
let Psecond
let Pthird
//canvas var
let ctx



btn.addEventListener("click",async()=>{
  Mlogo.style.display=`none`
  gsap.to(".title", {duration: 1.94, text: `${input.value.toUpperCase()}`, ease: "power2",fontSize:`1.6rem`});
  para.style.display=`none`
  logos.style.display=`none`
  document.querySelector(".info").innerHTML=``
  //creating a new canvas
  document.querySelector(".visual").innerHTML = '<canvas id="myChart"></canvas>';
  ctx = document.getElementById('myChart');
    call()
    input.value=""

})

//text animation

gsap.from(".title", {duration: 1.4, text: "", ease: "none"});
gsap.from(".Mlogo", {
  x: 100, 
  duration: 1.4
});
//geting the predictions from the API
async function call(){
    const Na = input.value
    const api_url = `predict/${Na}`
    const data = await fetch(api_url)
    const prediction = await data.json()

    first = prediction.country[0].country_id
    second= prediction.country[1].country_id
    third = prediction.country[2].country_id

    
    Pfirst = prediction.country[0].probability
    Psecond= prediction.country[1].probability
    Pthird = prediction.country[2].probability

    
    const info = await fetch(`Fid/${first}`)
    const Cinfo = await info.json()
    const Cname = Cinfo[1][0].name
    document.querySelector(".info").innerHTML = `
     <p class="Pinfo" >
    you are most likely from<br><span class="infoC F">${Cname}
    </span> with a probabilty of 
    <span class="infoProba">${Pfirst.toFixed(3)} </span><br>
    <span class="infoC S">${second}
    </span> with a probabilty of 
    <span class="infoProba">${Psecond.toFixed(3)} </span><br>
    <span class="infoC T">${third}
    </span> with a probabilty of 
    <span class="infoProba">${Pthird.toFixed(3)} </span>
    </p>`;
    gsap.from(".Pinfo", {
      opacity: 0, 
      y: 100, 
      duration: 1
    });

    show(first,second,third,Pfirst,Psecond,Pthird)
    gsap.from(".visual", {
      opacity: 0, 
      y: 100, 
      duration: 1
    });
}

//show data

function show(f,s,t,p1,p2,p3){
    const myChart = new Chart(ctx,{
        type: 'doughnut',
        data: {
            labels: [
              f,
              s,
              t
            ],
            datasets: [{
              label: 'My First Dataset',
              data: [p1,p2,p3],
              backgroundColor: [
                '#0C0A3E',
                '#F9564F',
                '#F3C677'
              ],
              hoverOffset: 4,
              borderWidth:7,
              cutout: '80%',
            
            }]
          },

    })
}