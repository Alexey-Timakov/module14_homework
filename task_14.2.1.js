const newParser = new DOMParser();

const xmlInput = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`;

const xmlDom = newParser.parseFromString(xmlInput, "text/xml");
const list = xmlDom.querySelector("list");
const student = xmlDom.querySelectorAll("student");

function getStudentArray(student) {
    let resultStudent = [];
    student.forEach(function(Item, index){
        const studentName = Item.querySelector("name");
        const firstName = Item.querySelector("first");
        const secondtName = Item.querySelector("second");
        const studentAge = Item.querySelector("age");
        const studentProf = Item.querySelector("prof");
        const studentLang = studentName.getAttribute("lang");
    
        resultStudent[index] = {
        name: `${firstName.textContent} ${secondtName.textContent}`,
        age: studentAge.textContent,
        prof: studentProf.textContent,
        lang: studentLang};
    })
    return resultStudent;  
}

let resultObject = {
    [list.tagName]: getStudentArray(student)
};

console.log(resultObject);