import {getSession, signOut} from "next-auth/react";
import {NextPageContext} from "next";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import AnimeList from "@/components/AnimeList";
import useAnimeList from "@/hooks/useAnimeList";

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

    const { data: animes = [] } = useAnimeList();
    //protect dashboard route
  return (
    <>
        <Navbar />
        <Billboard />
        <div className="pb-40">
            <AnimeList title="Trending Now" data={animes}/>
        </div>

    </>
  )
}
