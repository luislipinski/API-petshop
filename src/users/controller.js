const pool = require('../../db')
const queries = require('./queries')
const jwt =require('jsonwebtoken');
const SECRET = "testepetshop"

function verifyJWT(req, res, next){
    const token = req.headers['token'];
    jwt.verify(token, SECRET, (err,decoded) =>{
        if(err) return res.status(401).end();

        req.login = decoded.login;
        next();

    })
}

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getUsersById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getUsersById, [id], (error, results) => {
        const noUsersFound = !results.rows.length;
        if(noUsersFound) {
            res.send("Users does not exist!");
        }if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const addUsers = (req, res) => {
    const { login, password } = req.body;

    pool.query(queries.checkLoginExist, [login], (error, results) => {
        console.log(req.login + ' fez esta chamada')
        if (results.rows.length) {
            res.send("Login already exists.");
        }else {
            pool.query(queries.addUsers, [login, password], (error, results) => {
                if(error) throw error;
                res.status(201).send("User Created Succesfully!");
            })
        }
        
    })
}

const removeUsers = (req, res) => {
    const id= parseInt(req.params.id);
    pool.query(queries.getUsersById, [id], (error,results) => {
        const noUsersFound = !results.rows.length;
        if(noUsersFound) {
            res.status(404).send("Users does not exist!");
        }else {
            pool.query(queries.removeUsers, [id], (error, results) => {
                if(error) throw error;
                res.status(200).send("Users deleted with succesfuly")
            })
        }
    })
}
const updateUsers = (req, res) => {
    const id = parseInt(req.params.id)
    const { password } = req.body;

    pool.query(queries.getUsersById, [id], (error, results) => {
        const noUsersFound =!results.rows.length;
        if (noUsersFound) {
            res.send("User does not exist")
        } else {
            pool.query(queries.updateUsers, [password, id], (error, results) => {
                if(error) throw error;
                res.status(200).send("User update succesfully");
            })
        }
    })
}

const loginUser = (req, res) => {
    const { login, password } = req.body;

    pool.query(queries.loginUser, [login, password], (error, results) => {
        if (results.rows.length) {
            const token = jwt.sign({login: req.body.login}, SECRET, {expiresIn: 300})
            return res.json({auth: true, token})
            
            res.status(200).send("Login succesfully.");
        } else {
            res.status(401).send("login or password incorrect!")
        }
    })
}

module.exports = {
    getUsers, 
    getUsersById, 
    addUsers,
    removeUsers,
    updateUsers,
    loginUser,
    verifyJWT
};