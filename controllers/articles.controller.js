const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpsStatusText");
let Article = require("../models/articles.model");

const getAllArticles = async (req,res) => {
    const query = req.query;
    const limit = query.limit || 1;
    const page = query.page || 1;
    const skip = limit * (page - 1);

    const articles = await Article
    .find({}, {"__v": false})
    .limit(limit)
    .skip(skip);

    res.json({
        status : httpStatusText.SUCCESS,
        data: {articles}
    });
};

const getArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.articleId);
        if (!article) {
            return res.status(404).send({
                status: httpStatusText.ERROR, 
                message: "not found article"
            });
        }
        return res.send({
            status: httpStatusText.SUCCESS, 
            data: {article}
        });
    } catch (error) {
        return res.status(400).json({
            status: httpStatusText, 
            data: {msg: error.message}
        });
    }
};

const createArticle = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send(errors)
    }

    const articleData = {
        ...req.body,
        author: {
            firstName: req.author.firstName,
            lastName: req.author.lastName,
            username: req.author.username,
            id: req.author.id
        },
        createdTime: new Date().toISOString(), // Automatically set the creation time
    };

    console.log(
        "\n\n\n========Article Data========\n\n\n",
        articleData
    )

    const article = new Article(articleData);
    await article.save();

    res.status(201).send({
        status: httpStatusText.SUCCESS, 
        data:{article}}
    );
};

const updateArticle = async (req, res) => {
    const articleId = req.params.articleId;
    try {
        // const updatedarticle = await article.findByIdAndUpdate(articleId, {...req.body});
        const updatedarticle = await Article.updateOne(
            {_id: articleId}, 
            {...req.body, createdTime: new Date()}
        );
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                article: await Article.findById(articleId)
            }
        });
    } catch (e) {
        return res.status(400).json({error : e});
    }
};

const deleteArticle = async (req, res) => {
    const courseId = req.params.articleId;
    const data = await Article.deleteOne({_id: articleId});

    res.status(200).json({
        status : "success",
        data : null
    })
};

module.exports = {
    getAllArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
}