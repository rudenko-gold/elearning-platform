const router = require("express").Router();

const login_router = require("./auth/login.router");
const register_router = require("./auth/register.router");
const verify = require("../middlewares/verify_token");

const { onGetUser } = require("../../controllers/users/utils/get_user.controller");

router.use("/auth", login_router);
router.use("/auth", register_router);
router.get("/", verify, async (req, res) => {
    const { error, result } = await onGetUser(req);

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

module.exports = router;