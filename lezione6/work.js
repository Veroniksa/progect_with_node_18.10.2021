const worker_threads = require('worker_threads');

const passwordBytestSize = (size) => {
    return new Promise((resolve, reject) => {
        const worker = new worker_threads.Worker('./worker.js', {
            workerData: size,
        });
        worker.on('message', resolve);
        worker.on('error', reject);
    });
}

(async () => {//try
    const passwordBytestSize = 10;
    try{
        const result = await genPassword(passwordBytestSize);
        console.log(result);
    }catch(e){
        console.log(e);
    }
})();