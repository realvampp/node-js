let csvText = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некомент

#
46.49,36.58,Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в цьому файлі три рядки-коментарі :)`
let toObjects = (line) => {
    let str = line.split(',')
    return {name: str[2], population: str[3] / 1};
}
function csvParser(str = '') {
    let result = str.split('\n')
        .filter((line) => /^\d/.test(line))
        .map(toObjects)
        .sort((a, b) => b.population - a.population)
        .slice(0, 9)
        .reduce((newObj, currentCity, index) => {
            newObj[`${currentCity.name}`] = {population: currentCity.population, rating: index + 1}
            return newObj
        }, {})
    return (text) => {
        let cities = Object.getOwnPropertyNames(result)
        cities.forEach(city => {
            text = text.replaceAll(city, ` ${city}(${result[city].rating} місце в ТОП-10 найбільших міст України, населення ${result[city].population} чоловік)`)
        })
        return text;
    };
}

let parsed = csvParser(csvText);

console.log(parsed("Вінниця. Алушта"))
