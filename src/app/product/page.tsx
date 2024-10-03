import Aside from "@/modules/common/components/aside";
import HeroContent from "@/modules/common/components/hero-content";
import { ProductType } from "@/types/product";
import ProductsCarouselProps from "@/modules/common/components/products-carousel/index";

export default async function ProductList() {
    const allClothings = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/clothing`, { method: 'GET' });
    const clothings: ProductType[] = await allClothings.json();

    return <>
        <HeroContent></HeroContent>
        <div className="pt-10"></div>
        <main>
            <div className="flex ">
                <div className="hidden lg:block w-[25%] px-7">
                    <Aside></Aside>
                </div>
                <div className="lg:w-[75%] px-7">
                    <div className="flex justify-content-between align-items-center">
                        <div className="w-[50%] text-left">
                            <span className='font-normal text-xl font-[family-name:var(--font-geist-chilanka)] '>
                                {" Showing 1–9 of 55 results"}
                            </span>
                        </div>
                        <div className="w-[50%] text-right">
                            <span className='font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" Default sorting"}
                            </span>
                        </div>
                    </div>
                    <div>
                        <ProductsCarouselProps listsData={clothings} numberItem={3}></ProductsCarouselProps>
                    </div>

                    <div className="flex justify-center  lg:text-5xl text-sm ">
                        <div className="flex  mx-7">
                            <span className='hover:text-[var(--text-orange-color)] cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"></path></svg>

                            </span>
                            <div className="justify-center ">
                                <span className='hover:text-[var(--text-orange-color)] cursor-pointer font-normal lg:text-5xl text-xl font-[family-name:var(--font-geist-chilanka)]  mx-7 '>
                                    {" 1"}
                                </span>
                                <span className='hover:text-[var(--text-orange-color)] cursor-pointer font-normal lg:text-5xl text-xl font-[family-name:var(--font-geist-chilanka)]  mx-7 '>
                                    {" 2"}
                                </span>
                                <span className='hover:text-[var(--text-orange-color)] cursor-pointer font-normal lg:text-5xl text-xl font-[family-name:var(--font-geist-chilanka)]  mx-7 '>
                                    {" 3"}
                                </span>
                            </div>

                            <span className='hover:text-[var(--text-orange-color)] cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"></path></svg>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main >

    </>
}

