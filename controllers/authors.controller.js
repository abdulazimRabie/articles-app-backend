const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpsStatusText");
const bcrypt = require("bcryptjs");
let Author = require("../models/authors.model");
const generateJWT = require("../utils/generateJWT");

// get all authors
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

const getAuthor = async (req, res) => {
    const { authorId } = req.params; // Extract authorId from request parameters

    try {
        // Find the author by ID
        const author = await Author.findById(authorId);

        // If the author is not found, return a 404 status
        if (!author) {
            return res.status(404).json({
                status: httpStatusText.ERROR,
                message: 'Author not found',
            });
        }

        // Return the found author
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: author,
        });
    } catch (error) {
        console.error('Error fetching author:', error);
        return res.status(500).json({
            status: httpStatusText.ERROR,
            message: 'Internal Server Error',
        });
    }
};


const register = async (req, res) => {
    try {
        const existingUser = await Author.findOne({username: req.body.username})
    
        if(existingUser) {
            return res.status(400).json({
                status: httpStatusText.FAIL,
                message: "duplicated username or email"
            })
        }
    
        // password hasing
        const password = await bcrypt.hash(req.body.password, 10);
    
        const author = new Author({
            ...req.body,
            password
        });

        const token = await generateJWT({
            firstName: author.firstName,
            lastName: author.lastName,
            username: author.username,
            id: author._id
        });

        author.token = token;
        await author.save();
    
        return res.status(201).json({
            status: httpStatusText.SUCCESS, 
            data:{author}}
        );
    } catch (error) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: "Internal Server Error"
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                status: httpStatusText,
                message: "Username and password are required"
            });
        }

        const author = await Author.findOne({ username });
        if (!author) {
            return res.status(400).json({
                status: httpStatusText,
                message: "Invalid credentials"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, author.password);
        if (isPasswordValid) {
            const token = await generateJWT({
                firstName: author.firstName,
                lastName: author.lastName,
                username: author.username,
                id: author._id
            })

            return res.status(200).json({
                status: 'SUCCESS',
                message: 'Login successful',
                data: {
                    author : {
                        firstName: author.firstName,
                        lastName: author.lastName,
                        username: author.username,
                        id: author._id,
                        token
                    }
                }
            });
        } else {
            return res.status(400).json({
                status: httpStatusText,
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({
            status: httpStatusText,
            message: "Internal Server Error"
        });
    }
}

module.exports = {
    getAllAuthors,
    getAuthor,
    register,
    login
}