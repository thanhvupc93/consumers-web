import { ProductType } from "@/types/category-product";
import Image from "next/image";

type ProductsCarouselProps = {
    listsData?: ProductType[];
    numberItem?: number

}
export default function ProductsCarousel({ listsData, numberItem }: ProductsCarouselProps) {
    const listItems = listsData?.map((item: ProductType) => {
        let showItem = "pb-5 pt-5 ";
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        numberItem === 3 ? showItem += "lg:w-[33%]" : showItem += "lg:w-[25%] ";
        return (
            <>
                <div className={showItem}>
                    <div className="pr-3">
                        <Image className="lg:w-[100%] w-[85%]  rounded-lg" src={item.image} width={350} height={275} alt='Picture of the author ' />
                        <div className="text-left pt-6">
                            <a className=" lg:text-xl  text-sm">{item.title}</a>

                        </div>
                        <div className="text-left mb-2 ">
                            <a className="text-[var(--text-orange-color)] lg:text-xl  text-sm">{item.price}</a>
                        </div>
                        <div className="flex flex-auto  font-[family-name:var(--font-geist-chilanka)] ">
                            <div className="w-[60%] pr-4">
                                <div className="uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300 text-center py-3 ">
                                    <a className="text-sm">{"add to cart"}</a>
                                </div>
                            </div>
                            <div className="w-[25%] ">
                                <div className="uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300 text-center py-3">
                                    <a className="text-sm">
                                        <svg className="text-sm m-auto" xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 28 28"><path fill="currentColor" d="M14.604 6.193a6.519 6.519 0 1 1 9.509 8.913l-9.58 9.672a.75.75 0 0 1-1.066 0l-9.58-9.672a6.52 6.52 0 0 1-.263-8.892c2.588-2.943 7.17-2.953 9.772-.021l.604.68z"></path></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
            </>
        )
    });

    return (
        <div className="lg:flex  flex-wrap w-full  align-items-center  lg:pt-12 lg:pb-12">
            {listItems}
        </div>
    );

}