'use client'
import Image from "next/image";
import NavMenuMobile from "../nav-menu-mobile";
import { useEffect, useState } from "react";

export default function NavMobile() {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    setIsSticky(window.scrollY > 100);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="md:block lg:hidden xl:hidden">
        <main className="flex align-items-center  pt-7 pb-5 px-3 py-2 '">
          <div className="flex-initial my-auto mx-auto">
            <Image src='/images/logo.jpg' width={206} height={57} alt='Picture of the author ' />
          </div>
        </main> 
        <div className='mt-1 mb-1 bg-bottom border border-[--bs-light-border-subtle]'></div>
        <div className={isSticky ? 'menu fixed top-0 left-0 right-0 z-10 align-items-center ' : 'menu relative align-items-center py-3'}>
          <NavMenuMobile></NavMenuMobile>
        </div>
      </div >
    </>
  );
}
