const express= require ('express');
const router = express.Router();
const Club = require('../models/club');








router.get("/clubs", async (request, response) => {
    const clubs = await Club.find({});

    try {
        response.send(clubs);
    } catch (error) {
        response.status(500).send(error);
    }
});


router.get("/club/:id", async (req, res) =>{
    const club = await Club.findById(req.params.id);

    if(!club){
        res.status(404),json({message: 'The club with the given ID was not found .'})
    }
    res.status(200).send(club);
})




router.post("/add_club", async (request, req) => {
    const club = new Club(request.body);
    try {
        await club.save();
        req.send(club);
    } catch (error) {
        req.status(500).send(error);
    }
});


module.exports=router;
