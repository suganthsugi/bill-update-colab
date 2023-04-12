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

const calculate_payableAmt = (x) => {
    const currProd = x[json_keys.PRODUCTS];
    const payableAmt = currProd.reduce((acc, ele) => acc + ele[json_keys.paidAmt], 0);
    return payableAmt;
}

const add_payableAmt = (json) => {
    const all_bills = json[json_keys.BILLS];
    all_bills.map((x) => {
        x[json_keys.payableAmt] = calculate_payableAmt(x);
    })
    return json;
}


const find_grossTot = (ele) => {
    const price = ele[json_keys.PRICE];
    const quantity = ele[json_keys.QUANTITY];
    const taxAmt = ele[json_keys.taxAmt];
    const grossTotal = (price * quantity) + taxAmt;
    return grossTotal;
}


const add_grossTotal = (json) => {
    json[json_keys.BILLS].map((x) => {
        const grossTotal = x[json_keys.PRODUCTS].reduce((acc, ele) => {
            return acc + find_grossTot(ele);
        }, 0);
        x[json_keys.grossTotal] = grossTotal;
    });

    return json;
}




// add your functions here
const update_bill_functions = [add_grossTotal, add_payableAmt];



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