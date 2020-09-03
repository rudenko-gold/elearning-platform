const router = require("express").Router();
const verify = require("../middlewares/verify_token");

const { onCreateCourse } = require("../../controllers/courses/onCreateCourse.controller");
const { onGetCourses } = require("../../controllers/courses/onGetCourses.controller");

const { onAddLesson } = require("../../controllers/courses/onAddLesson.controller");
const { onGetLessons } = require("../../controllers/courses/onGetLessons.controller");
const { onGetLesson } = require("../../controllers/courses/onGetLesson.controller");

const { onGetDeadlines } = require("../../controllers/courses/onGetDeadlines.controller") 

const { onAddDoneTask } = require("../../controllers/courses/onAddDoneTask.controller");
const { onMarkDoneTask } = require("../../controllers/courses/onMarkDoneTask.controller");
const { onGetDoneTask } = require("../../controllers/courses/onGetDoneTask.controller");
const { onGetDoneTasks } = require("../../controllers/courses/onGetDoneTasks.controller");

const { onGetMark } = require("../../controllers/courses/onGetMark.controller");

router.post("/add_lesson", verify, async (req, res) => {
    const { error, result } = await onAddLesson(req);
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

router.post("/create_course", verify, async (req, res) => { 
    const { error, result } = await onCreateCourse(req);

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

router.get("/get_courses", verify, async (req, res) => {
    console.log("GET_COURSES");

    const { error, result } = await onGetCourses(req);

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


router.get("/get_lessons", verify, async (req, res) => {
    const { error, result } = await onGetLessons(req);

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

router.get("/get_lesson", verify, async (req, res) => {
    const { error, result } = await onGetLesson(req);
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

router.get("/get_deadlines", verify, async (req, res) => {
    const { error, result } = await onGetDeadlines(req);

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

router.post("/add_done_task", verify, async (req, res)=> {
    const { error, result } = await onAddDoneTask(req);
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

router.post("/mark_done_task", verify, async (req, res)=> {
    const { error, result } = await onMarkDoneTask(req);
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

router.get("/get_done_task", verify, async (req, res) => {
    const { error, result } = await onGetDoneTask(req);

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

router.get("/get_done_tasks", verify, async (req, res) => {
    const { error, result } = await onGetDoneTasks(req);

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

router.get("/get_mark", verify, async (req, res) => {
    const { error, result } = await onGetMark(req);
    if (error) {
        if (error.details) {
            res.status(400).send(error.details[0].message);
        } else if (error.message && error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(400).send(error);
        }
    } else {
        res.status(200).send({result});
    }
});

module.exports = router;