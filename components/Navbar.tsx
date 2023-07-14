import  { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import {useCallback, useEffect, useState} from "react";

import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu"
import NavbarItem from "@/components/NavbarItem";

const SCROLL_SET = 70;
const Navbar = () => {
    const [ showMobileMenu, setShowMobileMenu ] = useState(false);
    const [ showAccountMenu, setAccountMenu ] = useState(false);
    const [ showBackground, setShowBackground ] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= SCROLL_SET) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])


    const toogleAccountMenu = useCallback(() => {
        setAccountMenu((current) => !current)
    }, [])

    const toogleMobileMenu = useCallback(() => {
        setShowMobileMenu((current) => !current)
    }, [])

    return(
        <nav className="w-full fixed z-40 ">
            <div
            className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
            `}>
                <img src="/images/logo.png"
                className="h-4 lg:h-7" alt="logo"/>
                <div className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Film" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div onClick={toogleMobileMenu}
                    className="
                lg:hidden
                flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className="text-white transition"/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="
                flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />
                    </div>

                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />
                    </div>


                    <div onClick={toogleAccountMenu} className="flex-row flex items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-blue.png" alt="current-pofile" />
                        </div>
                        <BsChevronDown className="text-white transition"/>
                        <AccountMenu visible={showAccountMenu} />
                    </div>


                </div>
            </div>
        </nav>
    )
}

export default Navbar;
