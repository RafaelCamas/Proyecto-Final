require("dotenv").config();
const express = require("express");
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const bandsRouter = require('./routes/bandsRouter');
const autenticar = require('./controllers/autenticar');

const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use("/user", userRouter);
app.use("/band", bandsRouter);


app.listen(process.env.PORT, () =>
    console.log('Running on ', process.env.PORT)
);