const store = require('./store')
const socket = require('../../socket').socket;

function addMessage(chat, user, message, file) {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            reject("Datos incorrectos");
            return false;
        }

        let fileUrl = '';
        if (file) {
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            chat,
            user,
            message,
            date: new Date(),
            file: fileUrl,
        }
        store.add(fullMessage)

        socket.io.emit('message', fullMessage);

        resolve(fullMessage)
    })
}

function getMessages(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser))
    })
}

function updateMessage(id, message) {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Invalid message');
            return false
        }
        const result = await store.updateText(id, message);
        resolve(result)
    })
}

function deleteMessage(id) {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Invalid Id');
            return false
        }
        const result = await store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e)
            })
        resolve(result)
    })
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
};