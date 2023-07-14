import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);


    //check if current session is exist if not protect '/' routes
    if(!session) {
        return {
            redirect: {
                destination : '/auth',
                permanent: false
            }
        }
    }

    return  {
        props: {}
    }
}

export default function Home() {
    //protect dashboard route

  return (
    <div>
      <h1 className="text-white text-4xl">
          Login Succesfull!!
      </h1>
        <button
        className="h-10 w-20 bg-white"
        onClick={() => signOut()}>
            Sign Out
        </button>
    </div>
  )
}
