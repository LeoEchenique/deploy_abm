const { Router } = require("express");
const Wallet = require("./controllers/Wallet");
const Operations = require("./controllers/Operations");
const Login = require("./controllers/login");
const router = Router();

router.get("/", (req, res) => {
    res.status(200).send("NOICE!")
})

router.use("/auth", Login);
router.use("/Operations", Operations);
router.use("/Wallet", Wallet);


module.exports = router;
