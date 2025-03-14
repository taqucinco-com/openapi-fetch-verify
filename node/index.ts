import express, { Request, Response } from 'express'

interface ErrorResponse {
    code: number;
    reason: string;
}

interface SuccessResponse {
    id: number;
}

const app = express()
const port: number = 3030

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/sample', (req: Request, res: Response) => {
    const param: string | undefined = req.query.param as string
    console.log(param)

    if (param === '400') {
        res.status(400).json({ code: 0, reason: 'Bad Request' } as ErrorResponse)
    } else if (param === '401') {
        res.status(401).json({ code: 1, reason: 'Unauthorized' } as ErrorResponse)
    } else if (param === '403') {
        res.status(403).json({ code: 2, reason: 'Forbidden' } as ErrorResponse)
    } else {
        res.status(200).json({ id: 0 } as SuccessResponse)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})