const router = require("express").Router();

const users_router = require("./routes/users/users.router");
const groups_router = require("./routes/groups/groups.router");
const courses_router = require("./routes/courses/courses.router");

router.use("/users", users_router);
router.use("/groups", groups_router);
router.use("/courses", courses_router);

module.exports = router;