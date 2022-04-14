import express = require('express');

module.exports = function(app: express.Application) {
    app.get("/ola", async (req, res) => {
        res.send("oli");
    })
}