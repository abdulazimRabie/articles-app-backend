const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpsStatusText");
let Author = require("../models/authors.model");

// get all users
// register
// login

const getAllAuthors = async (req, res) => {
    const query = req.query;
    const limit = query.limit || 1;
    const page = query.page || 1;
    const skip = limit * (page - 1);

    const authors = await Author.find().limit(limit).skip(skip);
    return res.json({
        status: httpStatusText.SUCCESS,
        data: {
            authors
        }
    })
}

const register = async (req, res) => {
    const author = new Author(req.body);
    const userHasBenCreated = Author.find({username: req.body.username})
    if(!userHasBenCreated) {
        await author.save();
    
        return res.status(201).json({
            status: httpStatusText.SUCCESS, 
            data:{author}}
        );
    }
    return res.status(400).json({msg: "duplicated username or email"})
}

const login = () => {}

module.exports = {
    getAllAuthors,
    register,
    login
}