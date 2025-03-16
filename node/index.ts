import express, { Request, Response } from 'express'
import createClient from "openapi-fetch"
import type { paths } from "./generated/api.d.ts"

interface ErrorResponse {
    code: number;
    reason: string;
}

interface SuccessResponse {
    id: number;
}

const app = express()
const port: number = 3030
const client = createClient<paths>({ baseUrl: "http://localhost:3030/" });

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!')
})

app.get('/sample', async (req: Request, res: Response) => {
    const param: string | undefined = req.query.param as string
    console.log(`${req.path} + ${req.query.param}`)
    if (param === '400') {
        res.status(400).json({ code: 0, reason: 'Bad Request' } as ErrorResponse)
    } else if (param === '401') {
        res.status(401).json({ code: 1, reason: 'Unauthorized' } as ErrorResponse)
    } else if (param === '403') {
        res.status(403).json({ code: 2, reason: 'Forbidden' } as ErrorResponse)
    } else if (param === '500') {
        res.status(500).json({ foo: 'bar' })
    } else {
        res.status(200).json({ id: 0 } as SuccessResponse)
    }
})

app.get('/echo', async (req: Request, res: Response) => {
    const { data, error } = await client.GET("/sample", {
        params: {
            query: { param: '500' },
        },
    })
    console.log(data)
    console.log(error)

    if (error) {
        res.status(500).json(error as ErrorResponse)
    } else {
        res.status(200).json(data as SuccessResponse)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})