import Image from "next/image";
import NavMenuMobile from "../menu/nav-menu-mobile";

export default async function NavMobile() {
  return (
    <>
      <div className="md:block lg:hidden xl:hidden">
        <main className="flex align-items-center  pt-7 pb-5 px-3 py-2 '">
          <div className="flex-initial my-auto mx-auto">
            <Image src='/images/logo.jpg' width={206} height={57} alt='Picture of the author ' />
          </div>
        </main>
        <div className='mt-3 mb-3bg-bottom border border-[--bs-light-border-subtle]'></div>
        <div className='relative mt-5  z-50'>
          <NavMenuMobile></NavMenuMobile>
        </div>
        
      </div>
      
      
    </>
  );
}
