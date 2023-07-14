import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

import prismadb from "@/lib/prismadb";

const serverAuth = async (req: NextApiRequest) => {
    const session = await getSession({req})

    // if there is no email in session
    if (!session?.user?.email) {
        throw new Error('Not signed in')
    }

    // check current user has registered
    const currentUser = await prismadb.user.findUnique({
        where : {
            email : session.user?.email,
        }
    });

    // if not registered throw error not sign in
    if(!currentUser) {
        throw new Error('Not signed in')
    }

    return { currentUser }
};

export default serverAuth;
