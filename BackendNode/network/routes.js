//Esto es un servidor o archivo de rutas
const express = require('express');
const message = require('../components/mesage/network')
const user = require('../components/user/network')
const chat = require('../components/chat/network')

const routes = function (server) {
    //se le indica al server que todas las llamdas a message las gestione el componente de message
    server.use('/message', message); //al agregarle el nombre de la ruta, ya no habra que ponerlo en el archivo network
    server.use('/user', user);
    server.use('/chat', chat);
}

module.exports = routes;