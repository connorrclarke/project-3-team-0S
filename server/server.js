const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    //res.json({"users": ["userOne", "userTwo", "userThree"]})
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour", "userFive"]})
})

app.listen(5555, () => {console.log("Server started on port 5555") })

