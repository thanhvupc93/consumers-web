import Image from "next/image";
import NavMenu from "@/modules/layout/templates/menu/index"
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
              <div className='h-[80%] rounded-md border border-[--bs-light-border-subtle] border-slate-300 pr-4 pl-4 flex '>
                <input
                  type='text'
                  className='w-[95%] text-left pl-5 pt-5 pb-5 outline-none'
                  placeholder='Search For More 1000 Products'
                ></input>
                <div>
                </div>
                <svg
                  className='justify-center mt-4 text-right'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path
                    fill='currentColor'
                    d='M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z'
                  ></path>
                </svg>
              </div>
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
