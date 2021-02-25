const testPromise = new Promise((resolve, reject) => {
    console.log("Start");
    setTimeout(function() {
        const randomNum = Math.floor(Math.random() * 100);
        // console.log(randomNum);
        if (randomNum % 2 == 0){
            resolve(randomNum);
        } else {
            reject(randomNum);
        }
    },3000);

});

testPromise
.then((value) => {
    console.log("Завершено успешно. Сгенерированное число - " + value);
})
.catch((error) => {
    console.log("Завершено с ошибкой. Сгенерированное число - " + error);
})