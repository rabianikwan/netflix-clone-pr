import Input from "@/components/input";
import {useCallback, useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [variant, setVariant] = useState('login');

    const toogleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, [])
    // @ts-ignore
    return(
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo.png" alt="logo" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-75 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-3xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>

                        <div className="flex flex-col gap-4">
                            <Input
                            label="Email or Phone Number"
                            onChange={(event:any) => setEmail(event.target.value)}
                            id="email"
                            type="email"
                            value={email}/>

                            <Input
                                label={variant === 'login' ? "Password" : "Set up password"}
                                onChange={(event:any) => setPassword(event.target.value)}
                                id="password"
                                type="password"
                                value={password}/>
                        </div>
                        <button
                        className="bg-red-600 py-3 text-white rounded-md mt-10 w-full hover:bg-red-700 transition">
                            {variant === 'login' ? 'Sign In' : 'Sign Up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'New to Netfilix?' : 'Already have an account?'}
                            <span onClick={toogleVariant}
                                className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Sign up now.' : 'Sign in now.'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Auth;
