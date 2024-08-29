const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpsStatusText");
const bcrypt = require("bcryptjs");
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
    try {
        const existingUser = await Author.findOne({username: req.body.username})
    
        if(existingUser) {
            return res.status(400).json({msg: "duplicated username or email"})
        }
    
        // password hasing
        const password = await bcrypt.hash(req.body.password, 10);
    
        const author = new Author({
            ...req.body,
            password
        });
        await author.save();
    
        return res.status(201).json({
            status: httpStatusText.SUCCESS, 
            data:{author}}
        );
    } catch (error) {
        return res.status(400).json({
            status: Error,
            message: "Internal Server Error"
        })
    }
}

const login = () => {}

module.exports = {
    getAllAuthors,
    register,
    login
}