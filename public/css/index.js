const input = document.querySelector(".input")
const btn = document.querySelector(".btn")
const para = document.querySelector(".dec")

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
  gsap.to(".title", {duration: 1, text: `${input.value.toUpperCase()}`, ease: "power2"});
  para.style.display=`none`
  //creating a new canvas
  document.querySelector(".visual").innerHTML = '<canvas id="myChart"></canvas>';
  ctx = document.getElementById('myChart');
    call()
    input.value=""
})

//text animation

gsap.from(".title", {duration: 1.4, text: "", ease: "none"});

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

    console.log(Pfirst*100,Psecond*100,Pthird*100);

    show(first,second,third,Pfirst,Psecond,Pthird)
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
