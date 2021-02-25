document.addEventListener("DOMContentLoaded", function(){

    const button = document.querySelector("#input-button");
    
    checkLocalStorage();
    
    button.addEventListener("click", checkPageAndLimit);
    
    function checkPageAndLimit(){

        const page = document.querySelector("#input-page").value;
        const limit = document.querySelector("#input-limit").value;
        console.log (page, limit);

        if ((page <= 0 || page > 10 || page == "") && (limit <= 0 || limit > 10 || limit == "")){
            errorPageAndLimit();
        }
        else if (page <= 0 || page > 10 || page == "") {
            errorPage();
        }
        else if (limit <= 0 || limit > 10 || limit == "") {
            errorLimit();
        }
        else {
            getRequest(page, limit);
        }
    }

    function getRequest(page, limit) {
        const link = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
        console.log(link);
        userWasNotHere(page, limit);

        fetch(link)
        .then(function(response) {
            console.log("Response:", response);
            const result = response.json();
            console.log("Result:", result);
            return result;                   
        })
        .then(function(data) {
            console.log("done!");
            showImages(data);
        })
        .catch(function() {
            console.log('error') });
    }

    function showImages(data){
        const resultDiv = document.querySelector(".result");
        console.log(data);
        resultDiv.innerHTML = "";
        data.forEach(item => {
            const imageDiv = `<div class="single-image-div">
            <img src="${item.download_url}" class="image">
            <p>Author: ${item.author}</p>
            <p>Width: ${item.width} Height: ${item.height}</p>
            </div>`;
            resultDiv.innerHTML += imageDiv;
        });
    }

    function errorPageAndLimit (){
        const resultDiv = document.querySelector(".result");
        resultDiv.innerHTML = "<p>Номер страницы и лимит вне диапазона от 1 до 10</p>";   
    }
    
    function errorPage (){
        const resultDiv = document.querySelector(".result");
        resultDiv.innerHTML = "<p>Номер страницы вне диапазона от 1 до 10</p>";   
    }

    function errorLimit (){
        const resultDiv = document.querySelector(".result");
        resultDiv.innerHTML = "<p>Лимит вне диапазона от 1 до 10</p>";   
    }

    function checkLocalStorage(){
        const userJSON = localStorage.getItem("userJSON");
        if (userJSON) {
            userWasHere(userJSON);
        } else {
            // userNotExist();
        }
    }

    function userWasHere(user){
        let userObject = JSON.parse(user);
        let userPage = userObject.page;
        let userLimit = userObject.limit;
        
        getRequest(userPage, userLimit);
    }

    function userWasNotHere(page, limit){
        const newUser = {
            page: page,
            limit: limit
        }
    
        localStorage.setItem("userJSON", JSON.stringify(newUser));
    }
})