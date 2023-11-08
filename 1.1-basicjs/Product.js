'use strict';

function Review(ID, author, comment, rating = {service: 5, price: 5, value: 5, quality: 5}) {
    this.ID = ID;
    this.author = author;
    this.date = new Date();
    this.comment = comment;
    this.rating = rating;
}

function Product(ID, name, price, brand, activeSize) {

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

let myProduct = new Product(52162, "Sam", 52.3, 'L');
let myProduct2 = Object.create(new Product());
console.log(myProduct2)
console.log(myProduct.getID())
myProduct.setID(1234)
console.log(myProduct.getID())

