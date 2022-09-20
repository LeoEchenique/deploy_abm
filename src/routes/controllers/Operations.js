const { Router } = require("express");
const { Wallet, Operation, User } = require("../../db");
const { Calculator } = require("../../Calculate_Balance/Calculator");
const router = Router();

router.post("/New", async (req, res) => {
    const { Reason, Mount, Type, Token } = req.body;

    try {
        const user = await User.findOne({
            where: {
                Token: Token,
            },
            include: "Wallet",
        });
        const wallet = await Wallet.findByPk(user.WalletId);
        const balance = wallet.dataValues.Funds;
        const newBalance = Calculator(Type, Mount, balance);
        if (newBalance === "Denied")
            throw new Error("Not enough funds to realize the operation.");
        const date = new Date();

        const operation = await Operation.create({
            Reason,
            Mount,
            Type,
            Balance: newBalance,
            Date: date,
        });
        await operation.setWallet(wallet.dataValues.Id);
        wallet.Funds = newBalance;
        await wallet.save();
        res.status(202).send({
            operation,
        });
    } catch (error) {
        res.status(402).send(error.message);
    }
});

router.get("/Latest/:Token", async (req, res) => {
    let { Token } = req.params;

    try {
        let user = await User.findOne({
            where: {
                Token: Token,
            },
            attributes: ["WalletId"],
        });

        let operations = await Operation.findAll({
            where: {
                WalletId: user.dataValues.WalletId,
            },
            limit: 10,
            order: [["Date", "DESC"]],
        });
        res.status(200).send(operations);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    let { id } = req.params;

    try {
        let operation = await Operation.findByPk(id);
        res.status(200).send(operation);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.get("/All", async (req, res) => {
    try {
        let operations = await Operation.findAll({
            order: [["Date", "DESC"]],
        });
        res.status(200).send(operations);
    } catch (error) {
        res.status(404).send(error.message);
    }
});

router.put("/UpDate/:id", async (req, res) => {
    let { Reason, Mount } = req.body;

    let { id } = req.params;
    let newDate = new Date();
    try {
        let operation = await Operation.findByPk(id);
        if (operation !== null) {
            let wallet = await Wallet.findByPk(operation.WalletId);
            let newBalance = Calculator(
                operation.Type,
                Mount - operation.Mount,
                wallet.Funds
            );
            operation.Reason = Reason.length ? Reason : operation.Reason;
            operation.Mount = Mount.length ? Mount : operation.Mount;
            operation.Date = newDate;
            if (newBalance === "Denied")
                throw new Error("Not enough funds to realize the operation.");
            operation.Balance = newBalance;
            await operation.save();
            wallet.Funds = newBalance;
            await wallet.save();
            return res.status(200).send(operation);
        }
        throw new Error("Operation not found");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/Delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let operation = await Operation.findByPk(id);
        await operation.destroy();
        res.status(200).send("Delete successful");
    } catch (error) {
        res.status(403).send(error.message);
    }
});

module.exports = router;
