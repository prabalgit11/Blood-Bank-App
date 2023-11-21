const testController = (req, res) => {
    res.status(200).send({
        message: "Test Controller",
        success: true
    })

}
module.exports = { testController }