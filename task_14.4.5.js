document.addEventListener("DOMContentLoaded", function(){
    // localStorage.removeItem("userJSON");
    checkLocalStorage();
})

function checkLocalStorage(){
    const userJSON = localStorage.getItem("userJSON");
    if (userJSON) {
        userExist(userJSON);
    } else {
        userNotExist();
    }
}

function userExist(user){
    let userObject = JSON.parse(user);
    let userName = userObject.name;
    let dateLastVisit = userObject.date;
    
    alert(`Добрый день, ${userName}! Давно не виделись. В последний раз вы были у нас ${dateLastVisit}`);
    
    userObject.date = getTime();
    
    localStorage.setItem("userJSON", JSON.stringify(userObject));
}

function userNotExist(){
    const newUserName = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
    
    const newUser = {
        name: newUserName,
        date: getTime()
    }

    localStorage.setItem("userJSON", JSON.stringify(newUser));
}

function getTime(){
    const currentDate = new Date;

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() < 10) ? `0${currentDate.getMonth()}` : currentDate.getMonth();
    const dayOfMonth = (currentDate.getDate() < 10) ? `0${currentDate.getDate()}` : currentDate.getDate();
    const hour = (currentDate.getHours() < 10) ? `0${currentDate.getHours()}` : currentDate.getHours();
    const minute = (currentDate.getMinutes() < 10) ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
    const second = (currentDate.getSeconds() < 10) ? `0${currentDate.getSeconds()}` : currentDate.getSeconds();
    
    const lastUserExistDate = `${dayOfMonth}.${month}.${year} года в ${hour}:${minute}:${second}`;
    return lastUserExistDate;
}