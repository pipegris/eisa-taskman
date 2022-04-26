const express = require('express')
const { body, matchedData, validationResult } = require('express-validator');
const taskController = require('../controllers/task');

const router = express.Router()

router.get('/', taskController.list);

router.get('/:id(\\d+)', taskController.find);

router.post('/',
    body('title').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    body('status').isIn(['todo', 'inprogress', 'blocked', 'done']).withMessage('Must be a valid status (todo, inprogress, blocked, done)'),
    body('expiration').optional({nullable: true, checkFalsy: true}).isAfter().withMessage('Must be a valid date in the future'),
    checkErrors,
    taskController.create
);

router.put('/:id',
    body('title').isLength({ min: 5 }).withMessage('Must be at least 5 chars long'),
    body('status').isIn(['todo', 'inprogress', 'blocked', 'done']).withMessage('Must be a valid status (todo, inprogress, blocked, done)'),
    body('expiration').optional({nullable: true, checkFalsy: true}).isAfter().withMessage('Must be a valid date in the future'),
    checkErrors,
    taskController.update
);

router.delete('/:id', taskController.delete);


function checkErrors(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        req.matchedData = matchedData(req);
        return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

    return res.status(422).json({
        errors: extractedErrors,
    });
}
module.exports = router