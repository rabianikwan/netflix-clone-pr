import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    //check if current session is exist if not protect '/' routes
    if(!session) {
        return {
            redirect: {
                destination : '/login',
                permanent: false
            }
        }
    }

    return  {
        props: {}
    }
}

export default function Home() {
    const { data: user} = useCurrentUser();

    //protect dashboard route
  return (
    <>
        <Navbar />
    </>
  )
}
