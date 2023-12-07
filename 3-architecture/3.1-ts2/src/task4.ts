interface Obj<Type> {
    [key: string]: Type
}

type Transformer<Type, Output> = (x: Type) => Output;

function mapObject<Type, Output>(a: Obj<Type>, transformer: Transformer<Type, Output>): Obj<Output> {
    let result: Obj<Output> = {};
    for (let key in a) {
        let value = a[key]
        result[key] = transformer(value);
    }
    return result;
}
console.log(mapObject({ "roma" : 5, "vasya": 2 }, x => x>2))

/// More beautiful version)
function mapObject2<Type, Output>(a: Obj<Type>, transformer: Transformer<Type, Output>): Obj<Output> {
    return Object.keys(a).reduce((acc, key) => {
        acc[key] = transformer(a[key])
        return acc
    }, {} as Obj<Output>)
}
console.log(mapObject2({ "roma" : 5, "vasya": 2 }, x => `Your assessment is ${x}`)) 