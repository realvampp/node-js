type DialogButtonType = "Yes" | "No";

type Supplementor<T> = (data:Partial<T>)=> T
function complete<T>(a:Partial<T>, supplementor: Supplementor<T>): T{
    return supplementor(a)
}

type HasId = {id: string}
function complete2<T extends HasId>(a:Partial<T>, supplementor: Supplementor<T>){
    return supplementor(a)
}

// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т, но возможно не со всеми полями
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1,
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :)
// нас интересует только ее сигнатура.

// Более сложный вариант:
// Напишите функцию, которая принимает:
// 1) некие данные предполагаемо типа Т (у которого поле id: string),
//    но возможно без поля id
// 2) функцию-дополнятор, которая принимает такие штуки как из п.1,
//    а возвращает полноценный объект типа Т
// ... как вы поняли, саму функцию писать не надо :)
// нас интересует только ее сигнатура.

// Последняя задача:
// Напишите сигнатуру функции, которая принимает
// - некий класс
// - количество
// ...а возвращает массив экземпляров этого класса

class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

type ClassConstructor<T> = new () => T;

// сделайте норм сигнатуру тут.
// НЕТ, Rectangle|Circle это не вариант, надо сделать универсальную функцию
function createObjs<T>(someClass: ClassConstructor<T>, count: number)  {
    let a: T[] = []

    for (let i = 0; i < count; i++)
        a.push(new someClass());

    return a;
}

let a: Rectangle[] = createObjs(Rectangle, 10);
let b: Circle[] = createObjs(Circle, 20)

console.log(new Rectangle())

