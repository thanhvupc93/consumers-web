import { ProductType } from "@/types/product";
import Image from "next/image";
import BTAddCart from "../button-add-cart";
import BTAddWishlist from "../button-add-wishlist";
import { formatCurrency } from "@/utils/format";

type ProductsCarouselProps = {
    listsData?: ProductType[];
    numberItem?: number

}
export default function ProductsCarousel({ listsData, numberItem }: ProductsCarouselProps) {
    let showItem = "pb-5 pt-5 ";
    return (
        <div className="lg:pt-12 lg:pb-12">
            <ul className="lg:flex  flex-wrap w-full align-items-center">
                {listsData?.map((item: ProductType) => (
                    <div key={`ProductsCarousel_div_${item.id}`} className={numberItem === 3 ? showItem += "lg:w-[33%]" : showItem += "lg:w-[25%] "}>
                        <li key={`ProductsCarousel_li_${item.id}`}>
                            <div className="pr-3" >
                                <a className="lg:text-xl text-sm" href={`product-detail/${item.id}`}>
                                    <Image className="lg:w-[100%] w-[85%]  rounded-lg" src={item.image} width={350} height={275} alt='Picture of the author ' />
                                </a>
                                <div className="text-left pt-6">
                                    <h3 className=" lg:text-3xl text-2xl font-[family-name:var(--font-geist-chilanka)] ">{item.title}</h3>
                                </div>
                                <div className="text-left mb-2 ">
                                    <a className="text-[var(--text-orange-color)] lg:text-xl  text-sm">{formatCurrency(item.defaultPrice) ? formatCurrency(item.defaultPrice) : formatCurrency(0)}</a>
                                </div>
                                <div className="flex font-[family-name:var(--font-geist-chilanka)] ">
                                    <div className="w-[60%] pr-4">
                                        <BTAddCart></BTAddCart>
                                    </div>
                                    <div className="w-[25%] ">
                                        <BTAddWishlist></BTAddWishlist>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div >
                ))}
            </ul>
        </div>
    );

}