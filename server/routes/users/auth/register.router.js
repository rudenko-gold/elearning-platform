const router = require("express").Router();
const { onRegister } = require("../../../controllers/users/auth/register.controller");

router.post("/register", async (req, res) => {
    console.log(req.body);

    const { error, result } = await onRegister(req);
    
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