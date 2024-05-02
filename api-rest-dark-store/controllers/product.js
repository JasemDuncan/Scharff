const test = (req, res)=>{
    return res.status(200).json({
        message: "Test action from product controller "
    });
}

module.exports = {
    test
}