const inputContainer = document.getElementById('input_container')
const inputForm = document.getElementById('input_form')
const dateElement = document.getElementById('date_picker')

const countdownContainer = document.getElementById('countdown_container')
const countdownElTitle = document.getElementById('countdown_title')
const countdownButton = document.getElementById('countdown_button')
const timeElements = document.querySelectorAll('span')

const completeContainer = document.getElementById('complete_container')
const completeInfo = document.getElementById('complete_info')
const completeButton = document.getElementById('complete_button')

let SaveCountdown = ''
// Global Variables
let countdownTitle = ''
let countdownDate = ''
let countdownValue = new Date()
let coundownActive
const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
// Set input with min attribute for today's Date
const today = new Date().toISOString().split('T')[0]
dateElement.setAttribute('min', today)
// Calculate and populate dom with countdown
function updateDoM() {
  coundownActive = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownValue - now
    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    const seconds = Math.floor((distance % minute) / second)
    //   hide Input Container
    inputContainer.hidden = true
    // if countdown ended show Complete
    if (distance < 0) {
      countdownContainer.hidden = true
      clearInterval(coundownActive)
      completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`
      completeContainer.hidden = false
    } else {
      //   Populate Countdown
      countdownElTitle.textContent = `${countdownTitle}`
      timeElements[0].textContent = `${days}`
      timeElements[1].textContent = `${hours}`
      timeElements[2].textContent = `${minutes}`
      timeElements[3].textContent = `${seconds}`
      // Show Coundown Container
      completeContainer.hidden = true
      countdownContainer.hidden = false
    }
  }, second)
}

function updateCountdown(e) {
  e.preventDefault()
  countdownTitle = e.srcElement[0].value
  countdownDate = e.srcElement[1].value
  SaveCountdown = { title: countdownTitle, date: countdownDate }
  console.log(SaveCountdown)
  localStorage.setItem('countdown', JSON.stringify(SaveCountdown))
  if (countdownDate === '') {
    alert('Please Select a Date')
  } else {
    //  Get countdown Date number format to update Dom
    countdownValue = new Date(countdownDate).getTime()
    updateDoM()
  }
}
// Reset All values
function reset() {
  // Hide Countdown and show inputContainer
  countdownContainer.hidden = true
  completeContainer.hidden = true
  inputContainer.hidden = false
  // Stop countdown
  clearInterval(coundownActive)
  //   Reseting value for countdownvalue and countdownDate
  countdownTitle = ''
  countdownDate = ''
  localStorage.removeItem('countdown')
}

function restorePreviousCountdown() {
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true
    SaveCountdown = JSON.parse(localStorage.getItem('countdown'))
    countdownTitle = SaveCountdown.title
    countdownDate = SaveCountdown.date
    countdownValue = new Date(countdownDate).getTime()
    updateDoM()
  }
}
// Event Listener
inputForm.addEventListener('submit', updateCountdown)
countdownButton.addEventListener('click', reset)
completeButton.addEventListener('click', reset)
// On Start, Check Local Storage
restorePreviousCountdown()
