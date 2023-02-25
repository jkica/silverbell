const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require('dotenv').config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: process.env.ALLOWED_ORIGIN,
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    user: "jkica",
    host: "localhost",
    password: "password",
    database: "silverbell",
});

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(403).send(err)
            console.log(err);
        }

        db.query(
            "INSERT INTO users (email, password, full_name) VALUES (?,?,?)",
            [email, hash, name],
            (err, result) => {
                console.log(err);
            }
        );
    });
});

app.get("/me", (req, res) => {
    console.log('banana', req.session.user)
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ?;",
        email,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.status(403).send({ msg: "Wrong username/password combination" });
                    }
                });
            } else {
                res.status(403).send({ msg: "User doesn't exist" });
            }
        }
    );
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});