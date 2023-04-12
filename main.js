// enum for reusability
const json_keys = {
    AGE: "age",
    DOB: "dob",
    BILLS: "bills",
    PRICE: "price",
    QUANTITY: "quantity",
    DISCOUNT: "discount",
    taxAmt: "taxAmt",
    PRODUCTS: "products",
    DATE: "date",
    grossTotal: "grossTotal",
    boughtForBirthday: "boughtForBirthday",
    payableAmt: "payableAmt",
    ltv: "ltv",
    paidAmt: "paidAmt",
    payableAmt: "payableAmt",
}

// define your functions here






// add your functions here
const update_bill_functions = [];



// driver code to read and write json file
var json = require('./bill.json')
update_bill_functions.reduce((acc, funcs) => funcs(acc), json)

console.log(json);

const fs = require('fs');
fs.writeFile('updated_bill.json', JSON.stringify(json), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('File created successfully');
});