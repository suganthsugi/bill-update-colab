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


const get_recent_billDate = (recent, curr) => {
    const recentDate = new Date(recent);
    const currDate = new Date(curr);
    return recentDate > currDate ? recentDate : currDate;
}

const add_lastBillDate = (json) => {
    var lastBillDate = json[json_keys.BILLS].reduce((acc, ele) => get_recent_billDate(acc, ele[json_keys.DATE]), 0);
    json.lastBillDate = lastBillDate;
    return json;
}


function add_ltv(json) {
    const ltv = json[json_keys.BILLS].reduce((acc, ele) => ele[json_keys.payableAmt] + acc, 0);
    json[json_keys.ltv] = ltv;
    return json;
}





// add your functions here
const update_bill_functions = [add_ltv, add_lastBillDate];



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