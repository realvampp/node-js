import {json, response} from "express";

enum Buttons {
    Plus, Minus
}

console.log('Start')
let countPlus = document.getElementById('plusCount') as HTMLElement
let countMinus = document.getElementById('minusCount') as HTMLElement
let btPlus = document.getElementById('plus') as HTMLElement
let btMinus = document.getElementById('minus') as HTMLElement


btPlus.addEventListener('click', () => {
    fetch('http://localhost:3005/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({button: Buttons.Plus})
    }).then(res => res.json())
        .then(response => {
            console.log('here')
            console.log(response['count'])
            countPlus.innerHTML = response['count'];
        })
})

btMinus.addEventListener('click', () => {
    fetch('http://localhost:3005/', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({button: Buttons.Minus})
    }).then(res => res.json())
        .then(response => {
            console.log('here')
            console.log(response['count'])
            countMinus.innerHTML = response['count'];
        })
})


