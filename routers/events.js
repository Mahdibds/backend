const router = require("express").Router()
const Club = require("../models/club")
const Event = require("../models/event")
const User = require("../models/user")
const verifyClubAdmin = require("../helper/verifyClubAdmin")

//create event
router.post("/", async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.body.club })
    verifyClubAdmin(club, req.user)
    const event = new Event({ ...req.body })
    await event.save()
    club.events.push(event._id)
    await club.save()
    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})


//get event participants
router.get("/:id/participants", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id }).populate(
      "participants"
    )

    res.send(event.participants)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

//delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const club = await Club.findOne({ _id: event.club })
    verifyClubAdmin(club, req.user)

    await event.deleteOne({ _id: req.params.id })

    res.send({ success: true })
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

// update event
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const club = await Club.findOne({ _id: req.body.clubId })
    verifyClubAdmin(club, req.user)

    const { name, description, dates } = req.body
    event.name = name
    event.description = description
    
    event.dates = dates
    await event.save()

    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

//register in event or add Participants
router.post("/:id/register", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const participant = await User.findOne({ _id: req.user._id })

    if (!event.participants.includes(req.user._id)) {
      participant.participatedEvents.push(event.id)
      event.participants.push(req.user._id)
    }

    await event.save()
    await participant.save()
    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

//remove participants or leave event
router.delete("/:id/participants", async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id })
    const participantId = req.body.participant
    const participant = await User.findOne({ _id: participantId })

    event.participants = event.participants.filter(
      (id) => id.toString() !== participantId
    )
    participant.participatedEvents = participant.participatedEvents.filter(
      (id) => id.toString() !== event._id
    )
    await event.save()
    res.send(event)
  } catch (err) {
    console.log(err)
    res.status(400).send({ error: err.message })
  }
})

//get all event details
router.get("/", async (req, res) => {
  try {
    const events = await Event.find({}).populate("participants club")

    res.send(events)
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

module.exports = router