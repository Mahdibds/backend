// Packages and Libraries

var cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
// const Router = require("./routers/users")
// const Router1 = require("./routers/clubs")
const Router2 = require("./routers/events")




const app = express();

app.use(cors());

app.use(express.json());

const username = "Inesktiti";
const password = "Inesktiti";
const cluster = "realmcluster.0qx4f.mongodb.net";
const dbname = "myFirstDatabase";


mongoose.connect(
    `mongodb+srv://${username}:${password}@realmcluster.0qx4f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
     
        useUnifiedTopology: true
    }
);
require("./models/event")
require("./models/club")
require("./models/user")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// app.use(Router);
// app.use(Router1);
app.use("/events",Router2);



app.listen(3000, () => {
    console.log("Server is running at port 3000");
});


/*
//Routers
const clubsRouter = require ('./routers/clubs');
const usersRouter = require ('./routers/users');
const eventsRouter = require ('./routers/events');

const api = process.env.API_URL;

app.use( `${api}/clubs`, clubsRouter);
app.use( `${api}/users`, usersRouter);
app.use( `${api}/events`, eventsRouter);

*/
module.exports = app;

// Starting to listen to requests



