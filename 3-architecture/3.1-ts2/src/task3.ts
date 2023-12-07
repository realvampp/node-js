interface Obj {
    [key: string]: undefined | { cvalue: string | number | undefined | Obj }
}

function summ(a: Obj) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === 'undefined') return 2023;
        if (typeof elem.cvalue === 'undefined') return 2023;
        if (typeof elem.cvalue === 'string') return +elem.cvalue || 2023;
        if (typeof elem.cvalue === 'object') return summ(elem.cvalue);
        return elem.cvalue;
    });

    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}

console.log(summ({
    man: undefined, woman: {cvalue: undefined}, hello: {cvalue: 1}, husid: {cvalue: 'sdsd'}, sas: {cvalue: '12'},
    world: {cvalue: {yay: {cvalue: "2"}}},
}))