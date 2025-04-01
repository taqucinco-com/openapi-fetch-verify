import express, { query, Request, Response } from 'express'
import createClient from "openapi-fetch"
import type { paths } from "./generated/api.d.ts"
import cors from 'cors' 

interface ErrorResponse {
    code: number;
    reason: string;
}

interface SuccessResponse {
    id: number;
}

const app = express()
const port: number = 3030
// CORSミドルウェアを設定
app.use(cors({ origin: 'http://localhost:8000' }))


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
    } else if (param === 'unknown') {
        res.status(200).json({ bar: 'foo' })
    } else {
        res.status(200).json({ id: 0 } as SuccessResponse)
    }
})

app.get('/openapi-fetch', async (req: Request, res: Response) => {
    const client = createClient<paths>({ baseUrl: "http://localhost:3030/" });
    const { data, error, response } = await client.GET("/sample", {
        params: {
            query: { param: '500' },
        },
    })
    console.log(response)

    if (error) {
        res.status(500).json(error as ErrorResponse)
    } else {
        res.status(200).json(data as SuccessResponse)
    }
})

app.get('/fetch', async (req: Request, res: Response) => {
    const response = await fetch("http://localhost:3030/sample?param=200")
    console.log(response)
    const json = await response.json()
    const data = json as paths["/sample"]["get"]["responses"]["200"]["content"]["application/json"];

    res.status(response.status).json({ ...data });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
