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
const is_date_lies_btw_range = (dob, bill) => {
    const bill_date = bill[json_keys.DATE]
    dob = bill_date.slice(0, 4) + dob.slice(4, dob.length);
    const birthday = new Date(dob).getTime();
    const orderDate = new Date(bill_date).getTime();

    const days_diff = Math.floor((birthday - orderDate) / (1000 * 3600 * 24));

    return days_diff <= 30
}


const is_bought_for_birthday = (json) => {
    const all_bills = json[json_keys.BILLS];
    const dob = json[json_keys.DOB];
    all_bills.map((x) => {
        ordered_for_bday = is_date_lies_btw_range(dob, x)
        x[json_keys.boughtForBirthday] = ordered_for_bday;
    })

    return json;
}



// add your functions here
const update_bill_functions = [is_date_lies_btw_range,is_bought_for_birthday];

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