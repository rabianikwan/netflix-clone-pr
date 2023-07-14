import Input from "@/components/input";
import {useCallback, useState} from "react";
import axios from "axios";
import { signIn } from 'next-auth/react'
import {sign} from "crypto";
import { useRouter } from "next/router";

const Auth = () => {
    const router = useRouter();

    //set initial state for email, password and username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // create default variant w/ value 'login', switch to register onclick
    const [variant, setVariant] = useState('login');
    const toogleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []);

    //handler for login
    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: false,
                callbackUrl: '/'
            });

            await router.push('/')
        } catch (e) {
            console.log(e)
        }
    }, [email, password, router])

    //handler for register
    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            })
            await login()
        } catch (e) {
            console.log(e)
        }
    }, [email, name, password, login]);

    // @ts-ignore
    return (
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
                            {variant === 'login' ||
                                <Input
                                    label="Username"
                                    onChange={(event:any) => setName(event.target.value)}
                                    id="name"
                                    type="name"
                                    value={name}/>
                            }
                            <Input
                            label="Email"
                            onChange={(event:any) => setEmail(event.target.value)}
                            id="email"
                            type="email"
                            value={email}/>

                            <Input
                                label={variant === 'login' ? "Password" : "Password"}
                                onChange={(event:any) => setPassword(event.target.value)}
                                id="password"
                                type="password"
                                value={password}/>
                        </div>
                        <button
                            onClick= {variant === 'login' ? login : register}
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
