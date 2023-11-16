let testOut = document.getElementById('out')
let testIn = document.getElementById('in')
let grayBtn = document.getElementById('grayrc')
let grayRect = document.querySelector('.grayRect')
let body = document.getElementsByTagName('body')[0]
let submit = document.querySelector('input[type="submit"]')
submit.addEventListener('click', (e) => {
    console.log('asda')
    e.preventDefault()
})

grayBtn.addEventListener('click', () => {
    grayRect.classList.remove('hidden')
    body.classList.add('stopScroll')

})
grayRect.addEventListener('click', () => {
    grayRect.classList.add('hidden')
    body.classList.remove('stopScroll')

})
let myAlert = (e) => {
    if (e.eventPhase === 2) {
        console.log(e.target)
        alert('Hello')
        e.stopPropagation();
    }
}
testOut.addEventListener('click', myAlert)
testIn.addEventListener('click', myAlert)
