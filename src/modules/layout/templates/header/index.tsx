import Image from "next/image";
import NavMenu from "@/modules/layout/templates/menu/index"
import InputSearch from "@/modules/common/components/input-search";
export default async function Nav() {
  return (
    <>
      <div className="hidden lg:block">
        <main className="pt-2 px-3 ">
          <div className="pt-6 flex align-items-center  pb-5 py-2 ">
            <div className="flex-auto w-[25%] mr-[12px] ml-[12px]">
              <Image src='/images/logo.jpg' width={206} height={57} alt='Picture of the author ' />
            </div>
            <div className="flex-auto w-[45%] border-slate-300 pr-4 pl-4">
              <InputSearch text="Search For More 1000 Products"></InputSearch>
            </div>
            <div className="flex-auto  w-[15%] pt-3 pb-3 text-right">
              <div><span className='text-[var(--text-o-secondary-color)] font-light text-base text-right font-[family-name:var(---font-geist-montserrat)]'>
                Phone
              </span></div>
              <div><span className='font-normal text-xl text-right font-[family-name:var(--font-geist-chilanka)] '>
                {" +980-34984089"}
              </span></div>
            </div>
            <div className="w-[15%] pt-3 pb-3 text-right">
              <div><span className='text-[var(--text-o-secondary-color)] font-light text-base text-right font-[family-name:var(---font-geist-montserrat)]'>
                {" Email"}
              </span></div>
              <div><span className='font-normal text-xl text-right font-[family-name:var(--font-geist-chilanka)] '>
                {"waggy@gmail.com "}
              </span></div>
            </div>
          </div>
        </main>
        <div className='bg-bottom border border-[--bs-light-border-subtle]'></div>
        <main >
          <NavMenu ></NavMenu>
        </main >
        
      </div>
    </>
  );
}
