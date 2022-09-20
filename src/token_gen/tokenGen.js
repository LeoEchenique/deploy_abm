const TokenGen = (extra) => {
    let tok = () => Math.random().toString(36);
    let sum = tok() + tok();
    sum = sum.replaceAll(".", "");
    return sum;
};

module.exports = {
    TokenGen,
};
