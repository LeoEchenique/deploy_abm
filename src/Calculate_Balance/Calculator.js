const Calculator = (type, mount, balance) => {
    let newBalance;
    if (type === "Income") newBalance = parseInt(balance) + parseInt(mount);
    if (type === "Expense") newBalance = balance - mount;
    if (newBalance < 0) newBalance = "Denied";
    return newBalance;
};

module.exports = {
    Calculator,
};
