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
};

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

function get_discount_format(discount) {
  const discount_string = discount.slice(0, discount.length - 1); // to remove %
  return Number(discount_string);
}

const calculate_paidAmt = (product, discount) => {
  const price = product[json_keys.PRICE];
  const quantity = product[json_keys.QUANTITY];
  const price_for_n_items = price * quantity;
  discount = get_discount_format(discount);
  const discountAmt = (discount / 100) * price_for_n_items;

  const taxAmt = product[json_keys.taxAmt];

  const paidAmt = price_for_n_items - discountAmt + taxAmt;
  return paidAmt;
};

const add_paidAmt = (json) => {
  for (var i = 0; i < json[json_keys.BILLS].length; i++) {
    const currBill = json[json_keys.BILLS][i];
    const currProd = currBill[json_keys.PRODUCTS];
    currProd.map((x) => {
      x.paidAmt = calculate_paidAmt(x, currBill[json_keys.DISCOUNT]);
    });
  }
  return json;
};

const find_age = (dob) => {
  const currDate = Date.now();
  dob = new Date(dob);
  const age = Math.floor((currDate - dob) / (365.25 * 24 * 3600000));

  return age;
};

const add_age = (json) => {
  const dob = json[json_keys.DOB];
  json.age = find_age(dob);
  return json;
};

// add your functions here
const update_bill_functions = [add_age, add_paidAmt, add_ltv, add_lastBillDate];

// driver code to read and write json file
var json = require("./bill.json");
update_bill_functions.reduce((acc, funcs) => funcs(acc), json);

console.log(json);

const fs = require("fs");
fs.writeFile("updated_bill.json", JSON.stringify(json), (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File created successfully");
});
