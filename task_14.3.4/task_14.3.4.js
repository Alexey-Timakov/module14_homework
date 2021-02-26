document.addEventListener("DOMContentLoaded", function(){
    
    const resultHeaderDiv = document.querySelector(".table-header");
    const resultElementDiv = document.querySelector(".table-amount");
    const button = document.querySelector(".request__button");
    const linkDiv = document.querySelector(".table-link");
    
    button.addEventListener("click", function(){
        const selectItem = document.querySelector("#request__select-year").options.selectedIndex;
        const selectYear = document.querySelector("#request__select-year").options[selectItem].text;
        console.log(selectItem, selectYear);    

        if (selectItem === 0) {
            alert("Выберите, пожалуйста, год!");
        } else {
            getRequest("https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440", selectYear, displayResult);
        }
    })

    function getRequest(url, year, callback) {
        // let tempString = `[{"year":2017,"sales":{"q1":86879,"q2":28566,"q3":89457,"q4":27707}},{"year":2018,"sales":{"q1":45219,"q2":52851,"q3":76766,"q4":83064}},{"year":2019,"sales":{"q1":35645,"q2":56145,"q3":38550,"q4":47825}}]`;
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.onload = function (){
            if (xhr.status != 200){
                console.log(`Статус ответа: ${xhr.status}`);
            } else {
                const resultRequest = JSON.parse(xhr.response);
                // const resultRequest = JSON.parse(tempString);
                console.log(resultRequest);
                if (callback) {
                    callback(resultRequest, year);
                }
            }
        }

        xhr.onerror = function(){
            console.log(`Ошибка! Статус ответа: ${xrh.status}`);
        }

        xhr.send();
    }

    function displayResult(data, year){
        resultElementDiv.innerHTML = "";
        let tableAmount = "";
        let label = [];
        let amount = [];

        data.forEach(function (element) {
            if (element.year === +year) {
                
                resultHeaderDiv.textContent = element.year;

                for (item in element.sales) {
                    tableAmount = `<div class="table-column">
                    <div class="table-element-header">${item}</div>
                    <div class="table-element">${element.sales[item]}</div>
                    </div>`;
                    resultElementDiv.innerHTML += tableAmount;
                    label.push(item);
                    amount.push(element.sales[item]);
                }
            }
        })
        let link = `https://quickchart.io/chart?c={type:\'bar\',data:
        {labels:[\`${label.join("\`,\`")}\`],
        datasets:[{label:\'Выручка за ${year} год\',
        data:[\`${amount.join("\`,\`")}\`]}]}}`;
        
        linkDiv.innerHTML = `<a href="${link}"><label>Открыть график</label></a>`;
    }
});