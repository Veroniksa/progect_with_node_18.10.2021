//1
/* console.log("Record 1");

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
); */

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

//2
//Напишите программу, которая будет принимать на вход несколько аргументов:
//дату и время в формате «час-день-месяц-год».
//Задача программы — создавать для каждого аргумента таймер с обратным отсчётом:
//посекундный вывод в терминал состояния таймеров (сколько осталось).
//По истечении какого-либо таймера, вместо сообщения о том, сколько осталось,
//требуется показать сообщение о завершении его работы.
//Важно, чтобы работа программы основывалась на событиях.

//partenza node index.js 12-02-2022 10:00:00
//console.log('Tempo rimasto: ${data}' )
//console.clear()
//anni: 0, mese: 2, giorni: 30, ore: 10, minuti: 34, secondi 18
//anni: 0, mese: 2, giorni: 30, ore: 10, minuti: 34, secondi 17
//anni: 0, mese: 2, giorni: 30, ore: 10, minuti: 34, secondi 16
//anni: 0, mese: 2, giorni: 30, ore: 10, minuti: 34, secondi 15
//anni: 0, mese: 2, giorni: 30, ore: 10, minuti: 34, secondi 14
//su un taimer finisce:
//Timpo è finito!
const EventEmitter = require("events");
const emitter = new EventEmitter();

function temer() {
  const timerFuter = Date.parse(process.argv.slice(2));
  const dateNow = Date.now();
  let dateDiff = timerFuter - dateNow;

  let yers = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30 * 12));
  let month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30));
  let days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  let hours = Math.floor(dateDiff / (1000 * 60 * 60));
  let mins = Math.floor(dateDiff / (1000 * 60));
  let secs = Math.floor(dateDiff / 1000);
  console.log(dateDiff);

  let y = yers;
  let mt = month - yers * 12;
  let d = days - month * 30;
  let h = hours - days * 24;
  let m = mins - hours * 60;
  let s = secs - mins * 60;

  if(dateDiff < 0){
    emitter.removeListener("event");
    console.log("finish");
    console.log(emitter.eventNames());
    //TODO error
  }

/*   let tim = console.log(
    `yers: ${y}, month: ${mt}, days: ${d}, hours: ${h}, mints: ${m},seconds: ${s}`
  ); */
  const run = async () => {
      await new Promise((resolve) => setInterval(resolve, 1000));
      emitter.emit("event", `yers: ${y}, month: ${mt}, days: ${d}, hours: ${h}, mints: ${m}, seconds: ${s}`);
      //emitter.emit("error", new Error("woops!"));
      await temer();
    };
    run();
  }
emitter.on("event", console.log);
emitter.on("error", console.log);


temer();
