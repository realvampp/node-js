import fetch from "node-fetch";

// 2 //
export async function getMyIp() {
    let response = await fetch("https://api.ipify.org/?format=json")
    let obj = await response.json() as { ip: number }
    return obj.ip
}

let response = await getMyIp()

// console.log(response)

// 3.1 ////////////////
async function requestName() {
    let response = await fetch('https://random-data-api.com/api/name/random_name')
    let data = await response.json() as { name: string }
    return data.name
}

async function getThreeNamesPromiseAll() {
    return Promise.all([requestName(), requestName(), requestName()]).then(values => values)
}

// 3.2 ////////////////
async function getThreeNameWithoutPromiseAll() {
    let names: string[] = [];
    for (let i = 0; i < 3; i++) {
        names.push(await requestName())
    }
    return names
}

let names = await getThreeNamesPromiseAll()
// console.log(names)
let names2 = await getThreeNameWithoutPromiseAll();

// console.log(names2)

// 3.3 ////////////////
function getRandomName() {
    return new Promise<string>((resolve) => {
        fetch('https://random-data-api.com/api/name/random_name')
            .then((response) => {
                return response.json() as Promise<{ name: string }>
            })
            .then(data => resolve(data.name))
    })
}

function getThreeNames() {
    // let promise1 = getRandomName();
    // let promise2 = getRandomName();
    // let promise3 = getRandomName();

    let promises: Promise<string>[] = [];
    for (let i = 0; i < 3; i++) {
        promises.push(getRandomName())
    }
    return new Promise<string[]>(resolve => {
        let results: string[] = [];
        for (let promise of promises) {
            promise.then(name => {
                results.push(name)
                if (results.length === promises.length) {
                    resolve(results);
                }
            })
        }
    })
    // return new Promise<string[]>((resolve) =>{
    //     promise1.then((name1) => {
    //         promise2.then(name2 => {
    //             promise3.then(name3 => {
    //                 resolve([name1, name2, name3])
    //             })
    //         })
    //     })
    // })

}

getThreeNames().then(result => console.log(result))

