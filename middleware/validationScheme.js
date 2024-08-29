const {body} = require("express-validator");

const validationScheme = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("title can't be empty")
            .isLength({min: 2})
            .withMessage("title must be more than 2 characters"),
        body("content")
            .notEmpty()
            .withMessage("price is required & cannot be zero")
    ]
}

module.exports = { 
    validationScheme
}