function mySum(a, b) {
    const r = a + b
    console.log(r)
    return r
}
function myMult(a, b) {
    const r = a * b
    console.log(r)
    return r
}

module.exports = {
    mySum: mySum,
    myMult
};