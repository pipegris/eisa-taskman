const Sequelize = require('sequelize');
const Task = require('../models').task;

module.exports = {
    create(req, res) {
        console.log(req.body);
        return Task
            .create({
                title: req.body.title,
                status: req.body.status,
                expiration: req.body.expiration || null
            })
            .then(resource => res.status(201).send(resource))
            .catch(error => res.status(400).send(error))
    },

    update(req, res) {
        return Task
            .update({
                title: req.body.title,
                status: req.body.status,
                expiration: req.body.expiration || null
            }, { where: { id: req.params.id } })
            .then(() => res.sendStatus(204))
            .catch(error => res.status(400).send(error))
    },

    list(req, res) {
        let list;
        if (!req.query.title) {
            list = Task.findAll({})
        } else {
            list = Task.findAll({ where: { title: { [Sequelize.Op.like]: '%' + req.query.title + '%' } } })
        }
        return list
            .then(resource => res.status(200).send(resource))
            .catch(error => res.status(400).send(error))
    },

    find(req, res) {
        return Task.findByPk(req.params.id)
            .then(resource => res.status(200).send(resource))
            .catch(error => res.status(400).send(error))
    },

    delete(req, res) {
        return Task.destroy({ where: { id: req.params.id } })
            .then(count => {
                if (!count) {
                    return res.status(404).send({ error: `Task ${req.params.id} doesn't exist` });
                }
                return res.sendStatus(204)
            })
            .catch(error => res.status(400).send(error))
    },


};