import { ProductType } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import BTAddCart from "../button-add-cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import BTAddWishlist from "../button-add-wishlist";

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
                    <div className="pr-3" >
                        <Link className="lg:text-xl text-sm" href={`product-detail/${item.id}`}>
                            {/* <a href={`product-detail/${item.id}`} className=" lg:text-xl  text-sm"> */}
                            <Image className="lg:w-[100%] w-[85%]  rounded-lg" src={item.image} width={350} height={275} alt='Picture of the author ' />
                        </Link>
                        <div className="text-left pt-6">
                            <h3 className=" lg:text-3xl  text-2xl font-[family-name:var(--font-geist-chilanka)] ">{item.title}</h3>
                        </div>

                        {/* </a> */}
                        <div className="text-left mb-2 ">
                            <a className="text-[var(--text-orange-color)] lg:text-xl  text-sm">{item.defaultPrice ? item.defaultPrice : 0}</a>
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

                </div >
            </>
        )
    });

    return (
        <div className="lg:flex  flex-wrap w-full  align-items-center  lg:pt-12 lg:pb-12">
            {listItems}
        </div>
    );

}