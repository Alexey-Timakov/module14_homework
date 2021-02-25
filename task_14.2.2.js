let userName = "Anton";
let userAge = 36;
let userSalary = 80000;
let userSkills = ["Javascript","HTML","CSS"];

let testObject = {
    name: userName,
    age: userAge,
    skills: userSkills,
    salary: userSalary
}

const jsonString = JSON.stringify(testObject,"/t");

console.log(jsonString);