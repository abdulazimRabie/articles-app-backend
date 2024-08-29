const express = require("express");
const router = express.Router();

const authorsController = require("../controllers/authors.controller");
const { validationScheme } = require("../middleware/validationScheme");
 
router.route("/")
    .get(authorsController.getAllAuthors)
    
router.route("/register")
    .post(authorsController.register)

router.route("/login")
    .get(authorsController.login)

router.route("/:authorId")
    .get(authorsController.getAuthor)

module.exports = router;