'use client'
import Image from "next/image";
import NavMenu from "@/modules/layout/templates/menu/index"
import InputSearch from "@/modules/common/components/input-product-search";
import Logo from "@/../../public/images/logo.jpg";
import { useTranslations } from 'next-intl';
import { useUser } from "@/hook/context/userContext";
import { useEffect, useState } from "react";

export default function Nav() {
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
  const { state } = useUser();
  const t = useTranslations('MenuBar');
  const s = useTranslations('Search');
  return (
    <>
      <div className="hidden lg:block">
        <main className="pt-2 px-3 ">
          <div className="pt-6 flex align-items-center  pb-5 py-2 ">
            <div className="flex-auto w-[25%] mr-[12px] ml-[12px]">
              <Image src={Logo} priority={true} width={206} height={57} alt='Picture of the author ' />
            </div>
            <div className="flex-auto w-[45%] border-slate-300 pr-4 pl-4">
              <InputSearch text={s('searchMoreProducts')}></InputSearch>
            </div>
            <div className="flex-auto  w-[15%] pt-3 pb-3 text-right">
              <div><span className='text-[var(--text-o-secondary-color)] font-light text-base text-right font-[family-name:var(---font-geist-montserrat)]'>
                {t('phone')}: 
              </span></div>
              <div><span className='font-normal text-xl text-right font-[family-name:var(--font-geist-chilanka)] '>
                {state?.phone || ""}
              </span></div>
            </div>
            <div className="w-[15%] pt-3 pb-3 text-right">
              <div><span className='text-[var(--text-o-secondary-color)] font-light text-base text-right font-[family-name:var(---font-geist-montserrat)]'>
                {t('email')}: 
              </span></div>
              <div><span className='font-normal text-xl text-right font-[family-name:var(--font-geist-chilanka)] '>
                {state?.email || ""}
              </span></div>
            </div>
          </div>
        </main>
        <div className='bg-bottom border border-[--bs-light-border-subtle]'></div>
        <div className={isSticky ? 'menu fixed top-0 left-0 right-0 z-10 align-items-center py-3' : 'menu relative align-items-center py-3'}>
        <main >
            <NavMenu ></NavMenu>
        </main >
        </div>
      </div>
    </>
  );
}
