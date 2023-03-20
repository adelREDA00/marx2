'use strict';



// select all DOM elements

const headerTime = document.querySelector("[data-header-time]");
const menuTogglers = document.querySelectorAll("[data-menu-toggler]");
const menu = document.querySelector("[data-menu]");
const themeBtns = document.querySelectorAll("[data-theme-btn]");
const modalTogglers = document.querySelectorAll("[data-modal-toggler]");
const welcomeNote = document.querySelector("[data-welcome-note]");
const taskList = document.querySelector("[data-task-list]");
const taskInput = document.querySelector("[data-task-input]");
const modal = document.querySelector("[data-info-modal]");
const htitle = document.querySelector(".header-title")
const info = document.querySelector(".info")

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

// store current date from build-in date object
const date = new Date();

// import task complete sound
const taskCompleteSound = new Audio("./sounds/task-complete.mp3");



/**
 * convert weekday number to weekday name
 * totalParameter: 1;
 * parameterValue: <number> 0-6;
 */

const getWeekDayName = function (dayNumber) {
  switch (dayNumber) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Satureday";
    default:
      return "Not a valid day";
  }
}



/**
 * convert month number to month name
 * totalParameter: 1;
 * parameterValue: <number> 0-11;
 */

const getMonthName = function (monthNumber) {
  switch (monthNumber) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "Not a valid month";
  }
}



// store weekday name, month name & month-of-day number
const weekDayName = getWeekDayName(date.getDay());
const monthName = getMonthName(date.getMonth());
const monthOfDay = date.getDate();

// update headerTime date
headerTime.textContent = `${weekDayName}, ${monthName} ${monthOfDay}`;



/**
 * toggle active class on element
 * totalParameter: 1;
 * parameterValue: <object> elementNode;
 */

const elemToggler = function (elem) { elem.classList.toggle("active"); }



/**
 * toggle active class on multiple elements
 * totalParameter: 2;
 * parameterValue: <object> elementNode, <function> any;
 */

const addEventOnMultiElem = function (elems, event) {
  for (let i = 0; i < elems.length; i++) {
    elems[i].addEventListener("click", event);
  }
}






/**
 * task input validation
 * totalParameter: 1;
 * parameterValue: <string> any
 */

const taskInputValidation = function (taskIsValid) {
  if (taskIsValid) {
    info.innerHTML= ' '
    document.querySelector(".visual").innerHTML = '<canvas id="myChart"></canvas>';
    ctx = document.getElementById('myChart');
    call()
  
    
    /**
     * if there is an existing task
     * then the new task will be added before it
     */


    // after adding task on taskList, input field should be empty
    taskInput.value = "";

    // hide the welcome note

    // update taskItem DOM selection


  } else {
    // if user pass any falsy value like(0, "", undefined, null, NaN)
    console.log("Please write something!");
  }
}









/**
 * add keypress listener on taskInput
 */

taskInput.addEventListener("keypress", function (e) {

  // addTask if user press 'Enter'
  switch (e.key) {
    case "Enter":
      taskInputValidation(taskInput.value);
      break;
  }

});



// toggle active class on menu when click on menuBtn or dropdownLink 
const toggleMenu = function () { elemToggler(menu); }
addEventOnMultiElem(menuTogglers, toggleMenu);

// toggle active class on modal when click on dropdownLink or modal Ok button
const toggleModal = function () { elemToggler(modal); }
addEventOnMultiElem(modalTogglers, toggleModal);



/**
 * add "loaded" class on body when website is fully loaded
 */

window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});



/**
 * change body background when click on any themeBtn
 */

const themeChanger = function () {
  // store hue value from clicked themeBtn
  const hueValue = this.dataset.hue;

  // create css custom property on root and set value from hueValue
  document.documentElement.style.setProperty("--hue", hueValue);

  // remove "active" class from all themeBtns
  for (let i = 0; i < themeBtns.length; i++) {
    if (themeBtns[i].classList.contains("active")) {
      themeBtns[i].classList.remove("active");
    }
  }

  // add "active" class on clicked themeBtn
  this.classList.add("active");
}

// add event on all themeBtns
addEventOnMultiElem(themeBtns, themeChanger);

//////////here merge----------







//geting the predictions from the API
async function call(){
  htitle.innerHTML =""
  htitle.innerHTML= taskInput.value

  gsap.from(htitle, {
    opacity: 0, 
    y: 10, 
    duration: .3
  });

    const Na = taskInput.value
    const api_url = `predict/${Na}`
    const data = await fetch(api_url)
    const prediction = await data.json()

    first = prediction.country[0].country_id
    second= prediction.country[1].country_id
    third = prediction.country[2].country_id



    
    Pfirst = prediction.country[0].probability
    Psecond= prediction.country[1].probability
    Pthird = prediction.country[2].probability


    let arr = [first,second,third]

    //geting arr of cunt names
const responses = await Promise.all(
	arr.map(async id => {
		const res = await fetch(
			`Fid/${id}`
		); // Send request for each id

    const test = await res.json()

    return test[1][0].name
	})
);

//rendring the info



info.innerHTML= ' '
info.innerHTML = `
           
<div class="card p1">
<h3> ${responses[0]} </h3>
<p> proba of ${Pfirst} </p>
</div>
<div class="card p2">
<h3> ${responses[1]}</h3>
<p> proba of ${Psecond} </p>
</div>
<div class="card p3">
<h3> ${responses[2]}</h3>
<p> proba of ${Pthird} .</p>
</div>
`

gsap.from( ".card", {
  opacity: 0, 
  y: 100, 
  duration: .5,
  stagger:.1,
  delay:.1,
});


    //show the data
    show(first,second,third,Pfirst,Psecond,Pthird)
    gsap.from(".visual", {
      opacity: 0, 
      y: 100, 
      duration: 1
    });
    taskCompleteSound.play()
}

//show data
Chart.defaults.color = '#fff';
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
                'hsl(0, 0%, 98.4313725490196%)',
                '#000',
                '#8685EF'
              ],
              hoverOffset: 4,
              borderWidth:7,
              cutout: '85%',
              borderWidth:"0",
              color:"#fff"
            
            }]
          },

    })
}
