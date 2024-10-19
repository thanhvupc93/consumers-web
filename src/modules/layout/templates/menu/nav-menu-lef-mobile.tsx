'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faCartShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { isTokenExpired } from "@/utils/jwt";
import { useRouter } from 'next/navigation';

export default function NavLeftMenuMobile() {
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

    return (
        <div className='flex-auto w-[75%] ' >
            <div className=' flex flex-row w-[100%] '>
                <a className="px-3" onClick={() => handleClickUser()}>
                    <FontAwesomeIcon className="text-xl" icon={faUser} />
                </a>

                <a className="px-3" >
                    <FontAwesomeIcon className="text-xl" icon={faHeart} />
                </a>


                <a className="px-3" >
                    <FontAwesomeIcon className="text-xl" icon={faCartShopping} />

                </a>

                <div className='text-[6px] rounded-full bg-[var(--background-color)] text-[var(--text-white-color)] pt-2 pr-2 pl-2 pb-2 translate-x-[-130%] translate-y-[-64%]'>
                    {" "}
                    03
                </div>
                <a className="px-3" >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </a>
            </div>
        </div>

    );
};