import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function anime(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405)
            .end()
    }

    try {
        await serverAuth(req)

        const animes = await prismadb.movie.findMany()

        return res.status(200)
            .json(animes)

    } catch (e) {
        console.log(e)
        return res.status(400)
            .end()
    }
}
