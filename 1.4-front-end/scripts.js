window.onload = function () {
    let rects = document.querySelectorAll('.blackRect');
    let cssJs = document.getElementById('css+js')
    let red = document.querySelector('.redRect')
    let green = document.querySelector('.greenRect')
    let input = document.querySelector('input')
    let imageBtn = document.getElementById('image')
    let inputImg = document.getElementById('img')
    let body = document.getElementsByTagName('body')[0]
    let tracker = document.querySelector('.mouseTracker')
    let info = document.querySelector('#language')
    let language = navigator.language
    let lat, long;
    let editableBlocks = document.querySelectorAll('.editable-block')

    let scrollBtn = document.querySelector('.scrollTop')
    window.addEventListener('scroll', (e) => {
        scrollBtn.classList.remove('hidden')
    })
    scrollBtn.addEventListener('click', (e) => {
        let y = -window.scrollY / 15
        let scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, y);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15)
    })

    if (localStorage.getItem('block0')) {
        editableBlocks[0].innerHTML = localStorage.getItem('block0')
    }
    if (document.cookie) {
        editableBlocks[1].innerHTML = document.cookie
    }
    if (sessionStorage.getItem('block2')) {
        editableBlocks[2].innerHTML = sessionStorage.getItem('block2')
    }

    editableBlocks[0].addEventListener('blur', () => {
        let value = editableBlocks[0].innerHTML
        console.log(value)
        localStorage.setItem('block0', value)
    })
    editableBlocks[1].addEventListener('blur', () => {
        let value = editableBlocks[1].innerHTML
        console.log(value)
        document.cookie = value
    })
    editableBlocks[2].addEventListener('blur', () => {
        let value = editableBlocks[2].innerHTML
        console.log(value)
        sessionStorage.setItem('block2', value)
    })

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude
            long = position.coords.longitude
        });
    }
    info.innerHTML = ``
    document.addEventListener('mousemove', (e) => {
        let x = e.pageX;
        let y = e.pageY;
        tracker.innerHTML = `X:${x} Y:${y}<br>Customer language: ${language}<br>Customer coordinates<br>latitude: ${lat}<br> 
        longitude: ${long}`
    })

    imageBtn.addEventListener('click', () => {
        let inputValue = inputImg.value;
        let values = inputValue.split('\n')
        for (let value of values) {
            console.log('img')
            let image = document.createElement('img')
            image.src = value;
            image.width = 300
            image.height = 300
            body.appendChild(image)
        }
    })
    cssJs.addEventListener('click', () => {
        let inputValue = input.value
        let elements = document.querySelectorAll(inputValue);
        for (let element of elements) {
            element.classList.toggle('hidden')
        }

    })

    input.addEventListener('focus', () => green.classList.remove('hidden'))
    input.addEventListener('input', () => green.classList.add('hidden'))

    cssJs.addEventListener('mouseover', () => {
        red.classList.remove('hidden')
    })
    cssJs.addEventListener('mouseout', () => {
        red.classList.add('hidden')
    })

    let yellow = document.querySelector('.yellowRect')
    let clickNums = 0;
    yellow.addEventListener('click', (ev) => {
        clickNums++;
        if (clickNums < 2) {
            alert('Привіт')
        } else {
            yellow.classList.toggle('hidden')
        }
        console.log(ev)
    })
// css.addEventListener('click', () => {
//     if (rects.style.display === 'none') {
//         rects.style.display = 'block'
//     } else {
//         rects.style.display = 'none'
//     }
// })
//
// js.addEventListener('click', () =>{
//     rects.remove()
//     // let body = document.getElementsByTagName('body')[0]
//     // body.appendChild(rects)
// })

}