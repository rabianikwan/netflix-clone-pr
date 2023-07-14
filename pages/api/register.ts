import bcrypt from 'bcrypt';
import  { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if method not post it send status code 405
    if (req.method !== 'POST') {
        return res.status(405)
            .end();
    }
    try {
        // taken email name password from body
        const { email, name, password } = req.body
        // search if user has been exist
        const existingUser = await prismadb.user.findUnique({
            where: {
                email,
            }
        });

        // if register same email
        if(existingUser) {
            return res.status(422).json({
                error : 'Email has been taken'
            })
        }

        //generate hashed password
        const hashedPassword = await bcrypt.hash(password, 12)

        // write in collection
        const user = await prismadb.user.create({
            data: {
                email,
                name,
                hashedPassword,
                image: '',
                emailVerified: new Date()
            }
        });

    } catch (e) {
        console.log(e)
        return res.status(400)
            .end();
    }
}
