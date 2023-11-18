console.log('hi')
// 1.

function getFirstWord(a:string) {
    return a.split(/ +/)[0].length;
}

// 2.

function getUserNamings(a: {name:string, surname: string}) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
//console.log(getUserNamings({name:"Kyrylo", surname:'Tronyk'}))
// 3.

// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a: {products: {name: string}[]}) {
    return a?.products?.map(prod => prod?.name) || [];
}

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
interface HasName {
    name: () => string;
    cuteness?: number;
    coolness?: number
}
// function hey(a: HasName) {
//     return "hey! i'm " + a.name();
// }
// console.log(hey({name: () => "roma", cuteness: 100}))
// hey({name: () => "vasya", coolness: 100})

// 4.2

// class AbstractPet{
//     constructor(public _name: string) {
//     }
//     name(){
//         return this._name
//     }
// }
// class Cat extends AbstractPet{
//     constructor(_name: string, public hasTail: boolean) {
//         super(_name);
//     }
//
// }
// class Dog extends AbstractPet{
//     constructor(_name: string, public id: number) {
//         super(_name);
//     }
// }
// function hey(abstractPet: AbstractPet) {
//     return "hey! i'm " + abstractPet.name();
// }
// let a = new Cat("myavchik", true)
// let b = new Dog("gavchik", 333)
// console.log(hey(a))
// console.log(hey(b))

// // 4.3
// interface HasAnimal{
//     name: () => string;
//     type: string
//     cuteness?: number;
//     coolness?: number
// }
// function hey(a: HasAnimal) {
//     return "hey! i'm " + a.name()
//         + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
// }
// console.log(hey({name: () => "roma", type: "cat", cuteness: 100}))
// console.log(hey({name: () => "vasya", type: "dog", coolness: 100}))

// // 5.
//
// // google for Record type
// type ArrOrObj = [] | {}
// function stringEntries(a: ArrOrObj) {
//     return Array.isArray(a) ? a : Object.keys(a)
// }

// 6.

// you don't know Promises and async/await yet. Or do you?
// ....can be hard, don't worry and SKIP if you do not know how to do it

// async function world(a) {
//     return "*".repeat(a)
// }
// const hello = async () => {
//     return await world(10)
// }
// hello().then(r => console.log(r)).catch(e => console.log("fail"))