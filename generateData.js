/**
 * generateData.js
 *
 * Use it to generate random data on the database
 *
 */
const FormData = require("form-data");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

function random(i, j) {
  return Math.floor(Math.random() * (j - i) + i);
}

function randomString() {
  let length = random(5, 64);
  let output = "";
  const abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  while (--length) {
    output += abc[random(0, abc.length - 1)];
  }
  return output;
}

function generateUser() {
  const form = new FormData();
  form.append("fName", randomString());
  form.append("lName", randomString());
  form.append(
    "dBirth",
    `${("" + random(0, 9999)).padStart(4, 0)}-${("" + random(0, 12)).padStart(
      2,
      0
    )}-${("" + random(0, 30)).padStart(2, 0)}`
  );

  return fetch("http://localhost:8000/addUser", {
    body: form,
    method: "POST",
  });
}

generateUser().then((x) => console.log(x));
