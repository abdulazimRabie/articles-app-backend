const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

const articlesController = require("../controllers/articles.controller");
const { validationScheme } = require("../middleware/validationScheme");

router.route("/")
    .get(articlesController.getAllArticles)
    .post(verifyToken, validationScheme(), articlesController.createArticle)

router.route("/:articleId")
    .get(articlesController.getArticle)
    .patch(articlesController.updateArticle)
    .delete(articlesController.deleteArticle)

module.exports = router;
