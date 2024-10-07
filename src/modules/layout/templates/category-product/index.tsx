"use client"
import { ProductType } from "@/types/category-product";
import ProductsCarouselProps from "@/modules/common/components/products-carousel/index";
import useWindowSize from "@/hook/windown-size";
import BTShowNow from "@/modules/common/components/button-shop-now";



type CategoryProductProps = {
    title: string;
    data?: ProductType[];
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
                <div className="flex flex-wrap pt-12 lg:pb-3 pb-1">
                    <div className="lg:w-[70%] g:mb-2 w-full mb-2">
                        <h2 className='lg:text-6xl text-4xl font-[family-name:var(--font-geist-chilanka)] '>
                            {title}
                        </h2>
                    </div>
                    <div className="lg:w-[30%] w-[60%] lg:flex justify-end pr-3 ">
                        <BTShowNow></BTShowNow>
                    </div>
                </div>
                <div>
                    <ProductsCarouselProps listsData={data}></ProductsCarouselProps>
                </div>
            </main>
        </>
    );

};