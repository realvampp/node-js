'use strict';


function Review(author, comment, rating = {service: 5, price: 5, value: 5, quality: 5}) {
    this.ID = -1;
    this.author = author;
    this.date = new Date();
    this.comment = comment;
    this.rating = rating;
}

function Product(ID, name = '', price, brand, activeSize) {

    this.ID = ID;
    this.name = name;
    this.description = '';
    this.price = price;
    this.brand = brand;
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    this.activeSize = activeSize;
    this.quantity = 0;
    this.date = new Date();
    this.reviews = [];
    this.images = [];

    this.reviewID = 0;

    this.getReviewByID = function (ID) {
        for (let review of this.reviews) {
            if (review.ID === ID) {
                return review;
            }
        }
    }

    this.getImage = function (n = 0) {
        return n < this.images.length ? this.images[n] : this.images[0];
    }

    this.addSize = function (size) {
        this.sizes.push(size);
    }

    this.deleteSize = function (n) {
        if (!(n === undefined)) {
            this.sizes.splice(n, 1)
        }
    }

    this.addReview = function (review) {
        review.ID = this.reviewID++;
        this.reviews.push(review)
    }

    this.deleteReview = function (ID) {
        for (let review of this.reviews) {
            if (review.ID === ID) {
                this.reviews.splice(this.reviews.indexOf(review), 1);
            }
        }
    }

    this.getAverageRating = function () {
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

    this.getID = function () {
        return this.ID;
    }
    this.getName = function () {
        return this.name;
    }
    this.getDescription = function () {
        return this.description;
    }
    this.getPrice = function () {
        return this.price;
    }
    this.getBrand = function () {
        return this.brand;
    }
    this.getSizes = function () {
        return this.sizes;
    }
    this.getActiveSize = function () {
        return this.activeSize;
    }
    this.getQuantity = function () {
        return this.quantity;
    }
    this.getDate = function () {
        return this.date.toDateString();
    }
    this.getReviews = function () {
        return this.reviews;
    }
    this.getImages = function () {
        return this.images;
    }
    this.setID = function (ID) {
        this.ID = ID;
    }
    this.setName = function (name) {
        this.name = name;
    };
    this.setDescription = function (description) {
        this.description = description;
    }
    this.setPrice = function (price) {
        this.price = price;
    }
    this.setBrand = function (brand) {
        this.brand = brand;
    }
    this.setSizes = function (sizes) {
        this.sizes = sizes;
    }
    this.setActiveSize = function (activeSize) {
        this.activeSize = activeSize;
    }
    this.setQuantity = function (quantity) {
        this.quantity = quantity;
    }
    this.setDate = function (date) {
        this.date = date;
    }
    this.setReviews = function (reviews) {
        this.reviews = reviews;
    }
    this.setImages = function (images) {
        this.images = images;
    }
}

function searchProducts(products = [new Product()], search = '') {
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

function sortProducts(products = [new Product()], sortRule = 'ID') {
    let sorted = [];
    if (sortRule === 'name'){
        let names = [];
        for (let product of products){
            names.push(product.name)
        }
        names.sort()
        for (let name of names){
            for (let product of products){
                if (name === product.name){
                    sorted.push(product);
                    break;
                }
            }
        }
        products = sorted;
    } else {
        products.sort((a,b) => a[sortRule] - b[sortRule])
    }

    return products;
}

let product = new Product(0, "Футболка", 52.3, 'Nike', 'L');
let product1 = new Product(10, "Майка", 42.4, 'Adidas');
let product2 = new Product(2, "Бутси", 162.0, 'Puma');
let product3 = new Product(3, "Кед", 72.7, 'Umbro');

product.setDescription('Спортивна утболка бренда Nike');
product1.setDescription('Спортивна майка бренда Adidas');
product2.setDescription('Футболні бутси Puma');
product3.setDescription('Стильні кеди Umbro');

let products = searchProducts([product, product1, product2, product3], 'спорти');

let products2 = sortProducts([product3, product, product1, product2], 'price');



for (let product of products2) {
    console.log(product.price);
}

product.addReview(new Review("Sam", "All fine", {service: 5, price: 2, value: 3, quality: 4}));
product.addReview(new Review("Man", "Bad", {service: 1, price: 1, value: 1, quality: 1}));
// console.log(product.getAverageRating())
// console.log(product.getReviewByID(0))

product.setImages(["2", "54", '41'])
// console.log(product.getImages())
// console.log(product.getImage(2))
product.addSize('XXS')
// console.log(product.getSizes())
product.deleteSize(4)
// console.log(product.getSizes())
product.deleteReview(0)
// console.log(product.getReviews())





