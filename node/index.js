import express from 'express'
const app = express()
const port = 3030

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/sample', (req, res) => {
    const param = req.query.param
    console.log(req.query.param)

    if (param === '400') {
        res.status(400).json({ code: 0, reason: 'Bad Request' })
    } else if (param === '401') {
        res.status(401).json({ code: 1, reason: 'Unauthorized' })
    } else if (param === '403') {
        res.status(403).json({ code: 2, reason: 'Forbidden' })
    } else {
        res.status(200).json({ id: 0 })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})