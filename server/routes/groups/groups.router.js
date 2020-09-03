const router = require("express").Router();
const verify = require("../middlewares/verify_token");

const { onCreate } = require("../../controllers/groups/create.controller");
const { onAddStudent } = require("../../controllers/groups/add_student.controller");
const { onGetGroups } = require("../../controllers/groups/get.controller");
const { onGetStudents } = require("../../controllers/groups/get_students.controller");

router.post("/create", verify, async (req, res) => {
    const { error, result } = await onCreate(req);

    if (error) {
        if (error.details) {
            res.status(400).send(error.details[0].message);
        } else if (error.message && error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(400).send(error);
        }
    } else {
        res.status(200).send(result);
    }
});

router.delete("/", verify, async (req, res) => {

});

router.get("/students", verify, async (req, res) => {
    const { error, result } = await onGetStudents(req);

    if (error) {
        if (error.details) {
            res.status(400).send(error.details[0].message);
        } else if (error.message && error.status) {
            res.status(error.status).send({ error: error.message });
        } else {
            res.status(400).send({error});
        }
    } else {
        res.status(200).send(result);
    }
});

router.get("/", verify, async (req, res) => {
    const { error, result } = await onGetGroups(req);

    if (error) {
        if (error.details) {
            res.status(400).send(error.details[0].message);
        } else if (error.message && error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(400).send(error);
        }
    } else {
        res.status(200).send(result);
    }
});

router.post("/add", verify, async (req, res) => {
    const { result, error } = await onAddStudent(req);
    //console.log(req);
    if (error) {
        if (error.details) {
            res.status(400).send(error.details[0].message);
        } else if (error.message && error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(400).send(error);
        }
    } else {
        res.status(200).send(result);
    }
});

router.post("/remove", verify, async (req, res) => {

});

module.exports = router;