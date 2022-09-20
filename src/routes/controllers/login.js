const { Router } = require("express");
const router = Router();
const { User, Wallet } = require("../../db");
const { TokenGen } = require("../../token_gen/tokenGen");

router.post("/createUser", async (req, res) => {
    let { Name, Email, Password } = req.body;
    if (Name && Email && Password) {
        try {
            let token = TokenGen(Name);
            let founded = await User.findOne({
                where: {
                    Email: Email,
                },
            });
            if (founded) {
                return res.status(401).send("User already created");
            }
            const user = await User.create({
                Name,
                Email,
                Password,
            });
            let wallet = await Wallet.create({ Funds: 0 });
            await user.setWallet(wallet);
            user.Token = token;
            user.save();
            return res.status(202).send(user);
        } catch (error) {
            res.status(500).send("An error has ocurred");
        }
    }
    res.status(500).send("Not all fields provided");
});

router.post("/logUser", async (req, res) => {
    let { Email, Password } = req.body;
    if (Email && Password) {
        try {
            let token = TokenGen(Email);
            let user = await User.findOne({
                where: {
                    Email: Email,
                    Password: Password,
                },
            });
            user.Token = token;
            user.save();
            return res.send({
                Name: user.Name,
                Token: user.Token,
                Picture: user.Picture,
                logged: true,
            });
        } catch (error) {
            return res.status(404).send("User don't exist!");
        }
    }
    res.status(500).send("Not all fields provided");
});

module.exports = router;
