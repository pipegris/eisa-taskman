const express = require('express')
const { body, matchedData, validationResult } = require('express-validator');
const readingController = require('../controllers/reading');

const router = express.Router()

router.get('/', readingController.list);

router.post('/', readingController.create);


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