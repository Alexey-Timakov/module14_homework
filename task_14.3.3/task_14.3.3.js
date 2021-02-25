document.addEventListener("DOMContentLoaded", function(){
    const resultHeaderDiv = document.querySelector(".table-header");
    const resultElementDiv = document.querySelector(".table-amount");
    const button = document.querySelector(".request__button");
    
    button.addEventListener("click", function(){
        const selectItem = document.querySelector("#request__select-year").options.selectedIndex;
        const selectYear = document.querySelector("#request__select-year").options[selectItem].text;
        console.log(selectItem, selectYear);    

        if (selectItem === 0) {
            alert("Выберите, пожалуйста, год");
        } else {
            getRequest("https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440", selectYear, displayResult);
        }
    })

    function getRequest(url, year, callback) {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.onload = function (){
            if (xhr.status != 200){
                console.log(`Статус ответа: ${xhr.status}`);
            } else {
                const resultRequest = JSON.parse(xhr.response);
                // console.log(resultRequest);
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

        data.forEach(function (element) {
            if (element.year === +year) {
                
                resultHeaderDiv.textContent = element.year;

                for (item in element.sales) {
                    tableAmount = `<div class="table-column">
                    <div class="table-element-header">${item}</div>
                    <div class="table-element">${element.sales[item]}</div>
                    </div>`;
                    resultElementDiv.innerHTML += tableAmount;
                }
            }
        })
    }
});