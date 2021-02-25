document.addEventListener("DOMContentLoaded", function (){

    const buttonGet = document.querySelector("#button-get");
    
    buttonGet.addEventListener("click", getUserTasks);
    resultDivHeader = document.querySelector(".result-header");
    resultDiv = document.querySelector(".result-tasklist");

    function getUserTasks() {
        // console.log("click");
        const userId = document.getElementById("user-id").value;
        // console.log(userId);
        const url = `https://jsonplaceholder.typicode.com/users/${userId}/todos`;
        // console.log(url);
        fetch(url)
            .then(function(response) {
                console.log("Response:", response);
                const result = response.json();
                console.log("Result:", result);
                return result;                   
            })
            .then(function(data) {
                    showUserTasks(data);
            })
            .catch(function() {
                console.log('error') });
    }
    
    function showUserTasks(data){
        resultDivHeader.innerHTML = "";
        resultDiv.innerHTML = "";
        let taskLi = "";
        console.log(data);
        if (data.length === 0) {
            showUserNotExist();
        } else {

            let textHeader = `Задачи для UserId${data[0].userId}`;
            resultDivHeader.insertAdjacentHTML('afterbegin', textHeader);

            data.forEach(item => {
                if (item.completed) {
                    taskLi = `<li class="completed">${item.title}</li>`;
                } else {
                    taskLi =`<li class="to-do">${item.title}</li>`;
                }
                resultDiv.innerHTML += taskLi;
            });
    
        }
    }

    function showUserNotExist(){
        resultDiv.innerHTML = "Пользователь с указанным id не найден";
    }
});