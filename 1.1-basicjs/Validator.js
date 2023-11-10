"use strict";

function Validator() {

    this.validateEmail = function (str = '') {
        console.log(str)
        let regExp = /^[a-z][a-z0-9-.+]{1,20}@[a-z0-9.!$%&’*+/=?^_-]{1,15}\.[a-z]{1,5}$/
        return regExp.test(str)
    }

    this.validatePhone = function (str = '') {
        console.log(str)
        let regExp = /^(\+(\d(\s|-)*){1,2})?(\s|-)*\(?(\d(\s|-)*){3}\)?(\s|-)*(\d(\s|-)*){7}$/
        if (str.length > 25){
            return false
        }

        return regExp.test(str)
    }

    this.validatePassword = function (str =''){
        console.log(str)
        let regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\w{8,}$/

        return regExp.test(str)
    }
}

let validator = new Validator();
// console.log("TRUE:")
// console.log(validator.validateEmail("fi@secondpart.end"));
// console.log(validator.validateEmail("first-part@.se=cond%p.art.end"));
// console.log(validator.validateEmail("first.part@se=cond%part.r"));
// console.log("FALSE:")
// console.log(validator.validateEmail("f@secondart.end,"));
// console.log(validator.validateEmail("first-part@.se=cond@part.end"));
// console.log(validator.validateEmail("-firstpart@.se=cond%.enddeded"));
// console.log(validator.validateEmail("firs_tpart@.se.en"));
// console.log(validator.validateEmail("firstpart@.se.enddeded"));

// console.log("TRUE:")
// console.log(validator.validatePhone("+38 (099) 567 8901"));
// console.log(validator.validatePhone("+38 099 5 6 7 8 9  01"));
// console.log(validator.validatePhone("(09-9) 567-890-1"));
// console.log(validator.validatePhone("--  (099) 567 890-1"));
// console.log("FALSE:")
// console.log(validator.validatePhone("+38 (099) 567 8901 0"));
// console.log(validator.validatePhone("+38 099 a0000000"));
// console.log(validator.validatePhone("+38 (0989) 567 8901"));
// console.log(validator.validatePhone("+48 (0989) 567 8901"));

console.log("TRUE:")
console.log(validator.validatePassword("C00l_Pass"))
console.log(validator.validatePassword("SupperPas1"))
console.log("FALSE:")
console.log(validator.validatePassword("Cool_pass"))
console.log(validator.validatePassword("C00l"))