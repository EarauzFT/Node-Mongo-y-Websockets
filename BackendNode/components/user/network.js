const express = require('express');
const response = require('../../network/response');
const controller = require('./controller')
const router = express.Router();

router.post('/', (req, res) => {
    controller.addUser(req.body.name)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch(e => {
            response.error(req, res, 'Internal erro', 500, err)
        })
})

router.get('/', (req, res) => {
    controller.listUsers()
        .then((users) => {
            response.success(req, res, users, 200)
        })
        .catch(e => {
            response.error(req, res, 'Internal erro', 500, err)
        })
})

module.exports = router;