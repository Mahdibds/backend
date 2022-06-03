// Packages and Libraries
var bodyParser = require('body-parser')
var cors = require('cors');
const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routers/users")
const Router1 = require("./routers/clubs")
const Router2 = require("./routers/events")




const app = express()
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded())


mongoose.connect('mongodb+srv://test:test@cluster0.c9o2yvh.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

app.use("/users", Router);
app.use("/clubs", Router1);
app.use("/events", Router2);



app.listen(3000, () => {
    console.log("Server is running at port 4000");
});



//Routers
const clubsRouter = require('./routers/clubs');
const usersRouter = require('./routers/users');
const eventsRouter = require('./routers/events');


app.use(`/clubs`, clubsRouter);
app.use(`http://localhost:3000/users`, usersRouter);
app.use(`/events`, eventsRouter);


module.exports = app;

//Starting to listen to requests

