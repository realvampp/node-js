class AbstractProduct {
    ID;
    name;
    description = '';
    price;
    quantity = 0;
    reviews = [new Review()];
    images = [];
    date;
    brand;

    static idCount = 0;
    #reviewID = 0;

    constructor({name = '', price, brand, quantity, images = []}) {
        this.ID = AbstractProduct.idCount++;
        this.name = name;
        this.price = price;
        this.brand = brand;
        this.quantity = quantity;
        this.date = new Date();
        this.reviews = [];
        this.images = images;
    }

    getterSetter(toDo = 'get', param = 'name', value) {
        if (toDo === 'get') {
            return this[param]
        } else if (toDo === 'set') {
            this[param] = value;
        } else {
            return `${toDo} should be get or set`
        }
    }

    getFullInformation() {
        let fullInf = '';
        for (let key in this) {
            fullInf += `${key} - ${this[key]}\n`
        }
        return fullInf;
    }

    getPriceForQuantity(int = 1) {
        if (typeof int !== "number") {
            return ` ${int} isn\`t number, input number`
        }
        return `$${(this.price * int).toFixed(2)}`
    }

    getReviewByID(ID) {
        for (let review of this.reviews) {
            if (review.ID === ID) {
                return review;
            }
        }
    }

    getImage(n = 0) {
        return n < this.images.length ? this.images[n] : this.images[0];
    }

    addReview(review) {
        review.ID = this.#reviewID++;
        this.reviews.push(review)
    }

    deleteReview(ID) {
        for (let review of this.reviews) {
            if (review.ID === ID) {
                this.reviews.splice(this.reviews.indexOf(review), 1);
            }
        }
    }

    getAverageRating() {
        let sum = 0;
        let num = 0;
        for (let review of this.reviews) {
            for (let assessment in review.rating) {
                sum += review.rating[assessment];
                num++;
            }
        }
        return sum / num;
    }

    getID() {
        return this.ID;
    }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getPrice() {
        return this.price;
    }

    getBrand() {
        return this.brand;
    }

    getQuantity() {
        return this.quantity;
    }

    getDate() {
        return this.date.toDateString();
    }

    getReviews() {
        return this.reviews;
    }

    getImages() {
        return this.images;
    }

    setID(ID) {
        this.ID = ID;
    }

    setName(name) {
        this.name = name;
    };

    setDescription(description) {
        this.description = description;
    }

    setPrice(price) {
        this.price = price;
    }

    setBrand(brand) {
        this.brand = brand;
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    setDate(date) {
        this.date = date;
    }

    setReviews(reviews) {
        this.reviews = reviews;
    }

    setImages(images) {
        this.images = images;
    }
}

class Review {
    constructor(author, comment, rating = {service: 5, price: 5, value: 5, quality: 5}) {
        this.ID = -1;
        this.author = author;
        this.date = new Date();
        this.comment = comment;
        this.rating = rating;
    }
}

class Clothes extends AbstractProduct {
    sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    activeSize;
    material;
    color;

    constructor({activeSize, material, color, ...rest}) {
        super(rest);
        this.activeSize = activeSize;
        this.material = material;
        this.color = color;
    }

    getSizes() {
        return this.sizes;
    }

    getActiveSize() {
        return this.activeSize;
    }

    getMaterial() {
        return this.material;
    }

    getColor() {
        return this.color;
    }

    setSizes(sizes) {
        this.sizes = sizes;
    }

    setActiveSize(activeSize) {
        this.activeSize = activeSize;
    }

    setMaterial(material) {
        this.material = material;
    }

    setColor(color) {
        this.color = color;
    }
}

class Electronics extends AbstractProduct {
    warranty;
    power;

    constructor({warranty, power, ...rest}) {
        super(rest);
        this.warranty = warranty;
        this.power = power;
    }

    getWarranty() {
        return this.warranty;
    }

    getPower() {
        return this.power;
    }

    setWarranty(warranty) {
        this.warranty = warranty;
    }

    setPower(power) {
        this.power = power;
    }
}

function searchProducts(products = [new AbstractProduct()], search = '') {
    search = search.toLowerCase();
    let extSrch = false;
    let result = [];

    if (search.at(-1) === '*') {
        extSrch = true;
        search = search.slice(0, -1);
    }

    for (let product of products) {
        let nameIndx = product.name.toLowerCase().search(search);
        let descIndx = product.description.toLowerCase().search(search);

        if (nameIndx !== -1) {
            if (extSrch) {
                result.push(product);
            } else if (product.name[nameIndx + search.length] === ' ' || nameIndx + search.length === product.name.length) {
                result.push(product);
            }
        } else if (descIndx !== -1) {
            if (extSrch) {
                result.push(product);
            } else if (product.description[descIndx + search.length] === ' ' || descIndx + search.length === product.description.length) {
                result.push(product);
            }
        }
    }
    return result;
}

function sortProducts(products = [new AbstractProduct()], sortRule = 'ID') {
    let sorted = [];
    if (sortRule === 'name') {
        let names = [];
        for (let product of products) {
            names.push(product.name)
        }
        names.sort()
        for (let name of names) {
            for (let product of products) {
                if (name === product.name) {
                    sorted.push(product);
                    break;
                }
            }
        }
        products = sorted;
    } else {
        products.sort((a, b) => a[sortRule] - b[sortRule])
    }

    return products;
}


// let product = new AbstractProduct({name: "Футболка", price: 52.3, brand: 'Nike', quantity: 10, images: [1, 2, 3]});
// let product1 = new AbstractProduct({name: "Майка", price: 42.4, brand: 'Adidas', quantity: 3, images: [1]});
// let product2 = new AbstractProduct({name: "Бутси", price: 162.0, brand: 'Puma', quantity: 2});
// let product3 = new AbstractProduct({name: "Кед", price: 72.7, brand: 'Umbro', quantity: 4});
// product.setDescription('Спортивна утболка бренда Nike');
// product1.setDescription('Спортивна майка бренда Adidas');
// product2.setDescription('Футболні бутси Puma');
// product3.setDescription('Стильні кеди Umbro');

// let products = searchProducts([product, product1, product2, product3], 'спорт*');
// let products2 = sortProducts([product3, product, product1, product2], 'ID');

let tShirt = new Clothes({
    activeSize: 'XS', material: 'хлопок', color: 'червоний',
    name: "Футболка", price: 52.3, brand: 'Nike', quantity: 10, images: [1, 2, 3]
})
let buts = new Clothes({
    activeSize: 'L', material: 'кожа', color: 'синій',
    name: "Бутси", price: 162.0, brand: 'Puma', quantity: 2
})
let maika = new Clothes({
    activeSize: 'L',
    material: 'кожа',
    color: 'чорний',
    name: "Майка",
    price: 42.4,
    brand: 'Adidas',
    quantity: 3,
    images: [1]
})
let ked = new Clothes({
    activeSize: 'L', material: 'кожа', color: 'синій',
    name: "Кед", price: 72.7, brand: 'Umbro', quantity: 4
})

tShirt.setDescription('Спортивна утболка бренда Nike');
maika.setDescription('Спортивна майка бренда Adidas');
buts.setDescription('Футболні бутси Puma');
ked.setDescription('Стильні кеди Umbro');

let products = searchProducts([tShirt, maika, buts, ked], 'футбол*');
let products2 = sortProducts([tShirt, maika, buts, ked], 'price');


let moika = new Electronics({
    warranty: 12, power: 42,
    name: "Посудомойка", price: 1072.7, brand: 'Kenwood', quantity: 4
})
moika.getterSetter('set', 'price', 425)
console.log(moika.getterSetter('get', 'price'))

