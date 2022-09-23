//Aqui se agrega toda la logica de almacenamiento
const Model = require('./model')


function addMessage(message) {
    const myMessage = new Model(message);
    myMessage.save();
}

async function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser !== null) {
            filter = { user: filterUser }
        }
        Model.find(filter)
            .populate('user')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated)
            })
    })
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    })
    foundMessage.message = message;
    const MessageUpdated = foundMessage.save();
    return MessageUpdated;
}

async function removeMessage(id) {
    return await Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    remove: removeMessage,
}