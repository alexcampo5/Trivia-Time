console.log('working')
//This is how you check if a box is checked: document.getElementById("checkbox-id").checked = true;

//Gathering all of the necessary variables from the DOM:

let checkboxes = document.querySelectorAll('.checkbox')
let easyBox = document.querySelector('#easy-checkbox')
let mediumBox = document.querySelector('#medium-checkbox')
let hardBox = document.querySelector('#hard-checkbox')
let gkBox = document.querySelector('#gk-checkbox')
let sportsBox = document.querySelector('#sports-checkbox')
let geoBox = document.querySelector('#geo-checkbox')
let questionArea = document.querySelector('.question-list')
