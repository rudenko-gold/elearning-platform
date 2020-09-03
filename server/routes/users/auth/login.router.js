const router = require("express").Router();
const { onLogin } = require("../../../controllers/users/auth/login.controller");
    
router.post("/login", async (req, res) => {
    const { error, result } = await onLogin(req);

    if (error) {
        if (error.details) {
            res.status(403).send(error.details[0].message);
        } else if (error.message && error.status) {
            res.status(error.status).send(error.message);
        } else {
            res.status(403).send(error);
        }
    } else {
        res.status(200).header("auth-token", result).send(result);
    }
});

module.exports = router;