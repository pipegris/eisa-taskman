const Sequelize = require('sequelize');
const Reading = require('../models').reading;

module.exports = {
    create(req, res) {
        console.log(req.body);
        return Reading
            .create({
                temperature: req.body.temperature,
                moisture: req.body.moisture,
                level: req.body.level
            })
            .then(resource => res.status(201).send(resource))
            .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return Reading
            .update({
                temperature: req.body.temperature,
                moisture: req.body.moisture,
                level: req.body.level
            }, { where: { id: req.params.id } })
            .then(() => res.sendStatus(204))
            .catch(error => res.status(400).send(error))
    },

    list(req, res) {
        return Reading.findAll({})
            .then(resource => res.status(200).send(resource))
            .catch(error => res.status(400).send(error))
    },


};