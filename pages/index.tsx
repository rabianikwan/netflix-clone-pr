import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";
import useCurrentUser from "@/hooks/useCurrentUser";

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
    <div>
      <h1 className="text-white text-4xl">
          Profil
      </h1>
        <p className="text-white">
            Logged in as : { user?.name }
        </p>
        <button
        className="h-10 w-20 bg-white"
        onClick={() => signOut()}>
            Sign Out
        </button>
    </div>
  )
}
