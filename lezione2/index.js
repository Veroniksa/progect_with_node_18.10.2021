console.log("Record 1");

setTimeout(() => {
  console.log("Record 2");
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log("Record 3");
      Promise.resolve().then(() => {
        console.log("Record 4");
      });
    });
  });
});

console.log("Record 5");

Promise.resolve().then(() =>
  Promise.resolve().then(() => console.log("Record 6"))
);

//В данном примере будет вывод в консоль:
//Record 1
//Record 5
//Record 6
//Record 2
//Record 3
//Record 4
//1)Для начала выполниться весь синхронный код(макрозадачи):
//'Record 1', 'Record 5'
//2)Затем будет выполняться Ptromise 'Reccord 6'
//3)После будет выполненеие setTimeout:
//для начала выполняться синхронный код
//выполнится 'Record 2'
//затем 'Record 3' и 'Record 4', так как они находятся один внутри другого
//(одна микрозадача внитри другой мирко задачи);