const db = require('mongoose');

db.Promise = global.Promise;

//'mongodb://localhost:27017/telegrom'
async function connect(url) {
    await db.connect(url, {
        useNewUrlParser: true,
    })
    console.log('[db] Conected successfull')
}

module.exports = connect;