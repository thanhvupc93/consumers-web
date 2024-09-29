"use client"
import { CategoryProductType } from "@/types/category-product";
import ProductsCarouselProps from "@/modules/common/components/products-carousel/index";
import useWindowSize from "@/hook/windown-size";


type CategoryProductProps = {
    title: string;
    data?: CategoryProductType[];
}

export default function CategoryProduct({ title, data }: CategoryProductProps) {
        // detect window screen width function
    if (useWindowSize().width < 1024) {
        data = data.slice(0, 1);
        }
    
    return (
        <>
            {/* hidden lg:block */}
            <main className="px-3">
                <div className="flex flex-wrap pt-12 lg:pb-12 pb-1">
                    <div className="lg:w-[70%] g:mb-2 w-full mb-2">
                        <h3 className='lg:text-7xl text-5xl font-light font-[family-name:var(--font-geist-chilanka)] '>
                            {title}
                        </h3> 
                    </div>
                    <div className="lg:w-[30%] lg:flex justify-end pr-3 w-[60%]">
                        <div className="lg:w-[70%] lg:h-[80%] uppercase rounded-md 
                        border border-[--foreground] border-slate-300 text-center py-5 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--text-white-color)]">
                            <a className="lg:text-xl text-sm text-center ">{"shop now ->"}</a>
                        </div>

                    </div>
                </div>
                <div>
                    <ProductsCarouselProps listsData={data}></ProductsCarouselProps>
                </div>
            </main>
        </>
    );

};