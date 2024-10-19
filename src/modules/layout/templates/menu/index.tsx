'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';
import { isTokenExpired } from "@/utils/jwt";
import { useEffect, useState } from "react";
import { TokenType } from "@/types/token";
import jwt from 'jsonwebtoken';

const listsMenu = [
  {
    label: "Home",
    Child: null,
    No: 1,
  },
  {
    label: "Page",
    Child: null,
    No: 2,
  },

  {
    label: "Shop",
    Child: null,
    No: 3,
  },
  {
    label: "Blog",
    Child: null,
    No: 4,
  },
  {
    label: "Contract",
    Child: null,
    No: 5,
  },
  {
    label: "Other",
    Child: null,
    No: 6,
  },
  {
    label: "GET PRO",
    Child: null,
    No: 7,
  },
];

function sortMenu(listsMenu: any) {
  return listsMenu.sort((r1: { No: number }, r2: { No: number }) =>
    r1.No > r2.No ? 1 : r1.No < r2.No ? -1 : 0
  );
}


export default function NavMenu() {
  const [data, setData] = useState<TokenType>();

  useEffect(() => {
    const checkStorage = () => {
      const newToken = sessionStorage.getItem('access_token') || '';
      const decoded: TokenType = jwt.decode(newToken);
      if (decoded !== data) {
        setData(decoded);
      }
    };
    const intervalId = setInterval(checkStorage, 600); // Check every 100ms
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [data]);


  const router = useRouter()

  const listItems = sortMenu(listsMenu).map((item: unknown) => (
    <li key={`nav_${item.label}`} className='grid gap-4 hover:text-[var(--text-orange-color)] font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer'>
      {item.label}
    </li>
  ));

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
    sessionStorage.clear();
    router.replace('/')
  }

  return (
    <menu className='flex px-3 pt-6 pb-6 mr-[12px] ml-[12px] align-items-center'>
      <div className='flex-auto  w-[25%]  '>
        <ol className='font-normal text-xl text-left font-[family-name:var(--font-geist-chilanka)] hover:text-blue-500'>
          {" "}
          Shop by category
        </ol>
      </div>
      <div className='flex-auto  w-[50%] '>
        <ul className='ml-[10%]'>
          <ol className='flex flex-row text-xl text-left font-[family-name:var(--font-geist-chilanka)] '>
            {" "}
            {listItems}
          </ol>
        </ul>
      </div>
      <div className='flex-auto  w-[25%] '>
        <div className=' flex flex-row justify-end'>
          {
            data?.fullName ?
              <>
                <div>
                  Hi:
                  <span className='font-normal text-xl text-right text-[var(--text-orange-color)] font-[family-name:var(--font-geist-chilanka)] '>
                    {data?.fullName.split(" ")[0] || ""}
                  </span>
                  <span> / </span>
                  <a className="px-3" onClick={() => handleClickLogout()}>
                    <span className='font-normal cursor-pointer hover:text-[var(--text-orange-color)] text-xl text-right  font-[family-name:var(--font-geist-chilanka)] '>
                      Loguot
                    </span>
                  </a>
                </div>
              </> : <>
                <a className="px-3" onClick={() => handleClickUser()}>
                  {data?.fullName
                    || ""} <FontAwesomeIcon className="text-xl" icon={faUser} />
                </a>
              </>
          }
          {/* <a className="px-3" onClick={() => handleClickUser()}>
            {data?.fullName
              || ""} <FontAwesomeIcon className="text-xl" icon={faUser} />
          </a> */}
          <a className="px-3" >
            <FontAwesomeIcon className="text-xl" icon={faHeart} />
          </a>
          <a className="px-3" >
            <FontAwesomeIcon className="text-xl" icon={faCartShopping} />

          </a>

          <div className='text-[6px] rounded-full bg-[var(--background-color)] text-[var(--text-white-color)] pt-2 pr-2 pl-2 pb-2 translate-x-[-50%] translate-y-[-50%]'>
            {" "}
            03
          </div>
        </div>
      </div>
    </menu>

  );
}
