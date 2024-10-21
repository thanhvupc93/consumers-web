'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faCartShopping, faMagnifyingGlass, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { isTokenExpired } from "@/utils/jwt";
import { useRouter } from 'next/navigation';
import { TokenType } from "@/types/token";
import { useEffect, useState } from "react";
import jwt from 'jsonwebtoken';
import SwitcherLanguage from "../switcher-language/switcher";

export default function NavLeftMenuMobile() {
    const [data, setData] = useState<TokenType>();

    useEffect(() => {
        const checkStorage = () => {
            const newToken = localStorage.getItem('access_token') || '';
            const decoded: TokenType = jwt.decode(newToken);
            if (decoded !== data) {
                setData(decoded);
            }
        };
        const intervalId = setInterval(checkStorage, 600); // Check every 100ms
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [data]);

    const router = useRouter()

    function handleClickUser() {
        // Optionally check if the token is expired
        if (isTokenExpired()) {
            console.error('Token is expired. Logging out.');
            router.replace('/login')
        } else {
            router.replace('/')
        }
    }

    function handleClickLogout() {
        localStorage.clear();
        router.replace('/')
    }

    return (
        <div className=' flex w-[100%]'>
            <div className="px-1 p-2 w-[30%] " >
                <SwitcherLanguage />
            </div>
            <div className="flex px-2 p-3 w-[70%] " >
                {
                    data?.fullName ?

                        <>
                            <div className="flex">
                                <span className='font-normal text-sm text-right text-[var(--text-orange-color)] font-[family-name:var(--font-geist-chilanka)] '>
                                    {data?.fullName.split(" ")[0] || ""}
                                </span>
                                <a className="px-1"> / </a>
                                <div className="" onClick={() => handleClickLogout()}>
                                    <span className='font-normal cursor-pointer hover:text-[var(--text-orange-color)] text-sm text-right  font-[family-name:var(--font-geist-chilanka)] '>
                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                    </span>
                                </div>
                            </div>
                        </> :
                        <>
                            <div className="px-3" onClick={() => handleClickUser()}>
                                <FontAwesomeIcon className="text-xl" icon={faUser} />
                            </div></>
                }
                <div className="px-3" >
                    <FontAwesomeIcon className="text-xl" icon={faHeart} />
                </div>


                <div className="px-3" >
                    <FontAwesomeIcon className="text-xl" icon={faCartShopping} />

                </div>
                <div className='relative top-[-10px] left-[-18px] text-[6px] rounded-full bg-[var(--background-color)] text-[var(--text-white-color)] pt-2 pr-2 pl-2 pb-2 '>
                    {" "}
                    03
                </div>
                <div className="px-3 text-right" >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>

        </div>

    );
};