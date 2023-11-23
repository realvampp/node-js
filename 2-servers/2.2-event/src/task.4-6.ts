import fetch from 'node-fetch'
import {getMyIp} from "./test-node-fetch.js";

// 4
interface GenderAndName {
    name: string
    gender: string
}

function requestFemale() {
    return new Promise<string>((resolve, reject) => {
        fetch("https://random-data-api.com/api/users/random_user")
            .then((response) => {
                return response.json() as Promise<GenderAndName>
            })
            .then(data => {
                let gender = data.gender;
                if (gender === "Female") {
                    resolve(gender)
                } else {
                    reject(gender)
                }
            })
    })
}

function waitFemale() {
    requestFemale().then(gender => console.log(gender), gender => {
        console.log(gender)
        waitFemale()
    })
}

// waitFemale()

async function requestWithAsync() {
    let count = 0;
    let gender;
    do {
        count++;
        let response = await fetch("https://random-data-api.com/api/users/random_user");
        let obj = await response.json() as GenderAndName;
        gender = obj.gender
        console.log(gender)
    } while (gender !== "Female")
    return count;
}

//requestWithAsync().then(count => console.log(count))

// 5

function function1(callback: (ipAddr: number) => void) {
    fetch("https://api.ipify.org/?format=json")
        .then(response => response.json() as Promise<{ ip: number }>)
        .then(obj => callback(obj.ip))
}

async function function2() {
    try {
        let myIp = await getMyIp();
        return new Promise((resolve, reject) => {
            function1(IP => {
                if (myIp === IP) {
                    resolve(`${myIp} === ${IP}`)
                } else {
                    reject(`${myIp} !== ${IP}`)
                }
            })
        })
    } catch (err: any) {
        return Promise.reject(err.message)
    }
}

//console.log(await function2())
// 6

async function function1_6() {
    return await getMyIp() + ''
}

function function2_6(callback: (IP: string) => string) {
    return new Promise(resolve => {
        function1_6().then(myIp => {
            resolve(callback(myIp))
        })
    })
}

function2_6(IP => {
    return `Your IP is: ${IP}`
}).then(result => console.log(result))

// console.log(await function2_6(IP => {
//     return `Your IP is: ${IP}`
// }))