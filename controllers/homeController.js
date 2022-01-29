const bigPromise = require("../middlewares/bigPromise")

exports.home = bigPromise((req, res) => {
    res.status(200).json({
        success: true,
        message: "In home routes"
    })
})