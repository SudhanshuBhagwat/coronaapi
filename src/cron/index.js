const runCron = require('./CronTasks');
const cron = require('node-cron');

cron.schedule('* * * * *', () => {
    console.log('Cron job started');
    runCron();
});
