'use client'
import CustomErrorPage from "@/app/error";
import Loading from "@/app/loading";
import BTAddCart from "@/modules/common/components/button-add-cart";
import BTAddWishlist from "@/modules/common/components/button-add-wishlist";
import HeroContent from "@/modules/common/components/hero-content";
import SliderThumbnails from "@/modules/common/components/image-thumbnails";
import ProductInfo from "@/modules/common/components/product-info";
import { BreadcrumbsType } from "@/types/breadcrumbs";
import { InventoryType } from "@/types/inventory";
import { ProductType } from "@/types/product";
import { BUTTON_BS_COLOR_CSS_ACTIVE, BUTTON_BS_COLOR_CSS_DEFAULT } from "@/utils/constants_css";
import { formatCurrency } from "@/utils/format";
import { useEffect, useState } from "react";
import useSWR from 'swr'
import { allTags } from "../../../../public/data/productTag";

const breadcrumbsPropsData: BreadcrumbsType[] = [
    {
        name: "Product List",
        url: '/products'
    }
]

const fetcher = (url: string) => fetch(url).then((res) => res.json());
type ProductStateType = {
    select_color: number,
    select_size: number,
}

export default function ProductDetail({ params }: { params: { id: string } }) {
    const [productDetailtState, setProductDetailState] = useState<ProductType>();
    const [productState, setProductState] = useState<ProductStateType>({
        select_color: 0,
        select_size: 0,
    });

    useEffect(() => {
        if (productDetailtState) {
            const inventory: InventoryType[] = productDetailtState.inventories?.filter((e) => {
                return e.size?.id === productState.select_size && e.color?.id === productState.select_color;
            });
            const priceElement = document.getElementById('product_detail_price');
            if (priceElement) {
                priceElement.textContent = inventory.length > 0 ? formatCurrency(inventory[0].price) : formatCurrency(productDetailtState.defaultPrice); // Thay đổi giá trị hiển thị
            }
            const stockElement = document.getElementById('produce_detail_stock');
            if (stockElement) {
                stockElement.textContent = `${inventory[0]?.quantity || 0} in stock`
            }
        }
    }, [productDetailtState, productState]);

    function handleClick(productDetail: ProductType, id: number, type: string) {
        if (type === "_color") {
            setProductState({
                select_color: id,
                select_size: productState.select_size
            })
        } else {
            setProductState({
                select_size: id,
                select_color: productState.select_color
            })

        }
    }

    const { data, error, isLoading } = useSWR<ProductType>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}/${params.id}`, fetcher, {
        onSuccess: (data) => {
            const colorId = data.colors[0].id;
            const sizeId = data.sizes[0].id;
            setProductState({
                select_color: colorId,
                select_size: sizeId,
            });
            breadcrumbsPropsData.push(
                {
                    name: `${data.title}`,
                    url: `/product-detail/${data.id}`
                }
            );
            setProductDetailState(data);
        },
    })



    if (isLoading) return <Loading></Loading>
    if (error) return <CustomErrorPage></CustomErrorPage>
    if (productDetailtState) {
        return <>
            <HeroContent data={breadcrumbsPropsData}></HeroContent>
            <div className="pt-20"></div>
            <main>
                <div className="flex flex-wrap">
                    <div className="lg:w-[50%] w-[100%] px-7">
                        <SliderThumbnails data={[productDetailtState.image]} height={740} width={740}></SliderThumbnails>
                    </div>
                    <div className="lg:w-[50%]  w-[100%] px-7">
                        <div className="lg:pt-1 pt-10">
                            <span className='font-normal text-4xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {data.title}
                            </span>
                        </div>
                        <div className="">
                            <span id="product_detail_price" className='lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal text-4xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {formatCurrency(productDetailtState.defaultPrice) ? formatCurrency(productDetailtState.defaultPrice) : formatCurrency(0)}
                            </span>
                            <span className='line-through decoration-gray-600 font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {formatCurrency(240.00)}
                            </span>
                        </div>
                        <div className="flex flex-wrap pt-5">
                            <span className='lg:pr-3 pr-1 font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {data.description}
                            </span>

                        </div>
                        <div className="pt-5">
                            <span className='lg:pr-3 pr-1 text-[var(--text-o-secondary-color)] font-normal text-2xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" Color"}
                            </span>

                        </div>
                        <div className="">
                            <ul className='flex lg:pr-3 pr-1 pb-5 text-black font-normal text-sm  font-[family-name:var(--font-geist-chilanka)] '>
                                <div className="flex flex-grow">
                                    {productDetailtState.colors?.map((e) => (
                                        <li key={`${e.id}_color`} className=" button_silver_hover px-[5px]">
                                            <button id={`${e.id}_color`}
                                                className={productState.select_color == e.id ? '' + BUTTON_BS_COLOR_CSS_ACTIVE : BUTTON_BS_COLOR_CSS_DEFAULT}
                                                onClick={() => handleClick(productDetailtState, e.id, `_color`)} >
                                                <a className="text-sm">{e.title}</a>
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            </ul>

                        </div>
                        <div className="pt-1">
                            <span className='lg:pr-3 pr-1 text-[var(--text-o-secondary-color)] font-normal text-2xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" Size:"}
                            </span>

                        </div>
                        <div className="">
                            <ul className='flex lg:pr-3 pr-1 pb-5 text-black  text-sm  font-[family-name:var(--font-geist-chilanka)] '>
                                <div className="flex">
                                    {data.sizes?.map((e) => (
                                        <li key={`${e.id}_size`} className="button_silver_hover px-[5px]">
                                            <button id={`${e.id}_size`} className={productState.select_size == e.id ? BUTTON_BS_COLOR_CSS_ACTIVE : BUTTON_BS_COLOR_CSS_DEFAULT}
                                                onClick={() => handleClick(data, e.id, `_size`)} >
                                                <a className="text-sm">{e.title}</a>
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            </ul>

                        </div>
                        <div className="flex ">
                            <span id='produce_detail_stock' className='lg:pr-3 pr-1  font-bold text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {`0  in stock`}
                            </span>
                        </div>

                        <div className="flex pt-1">
                            <div className="button_silver_hover">
                                <button id={`_size`} className={' button_mini' + BUTTON_BS_COLOR_CSS_DEFAULT} >
                                    <a className="">{"-"}</a>
                                </button>
                            </div>
                            <div className="">
                                <input className={' input_custom p-2  max-w-28 mx-1 button_mini'} type="number" value="1"></input>
                            </div>

                            <div className="button_silver_hover">
                                <button id={`_size`} className={' button_mini' + BUTTON_BS_COLOR_CSS_DEFAULT} >
                                    <a className="">{"+"}</a>
                                </button>
                            </div>
                        </div>
                        <div className="flex  pt-5 font-[family-name:var(--font-geist-chilanka)] ">
                            <div className="lg:w-[35%] w-[65%] pr-4">
                                <BTAddCart></BTAddCart>
                            </div>
                            <div className="lg:w-[15%]  w-[25%] ">
                                <BTAddWishlist></BTAddWishlist>
                            </div>
                        </div>
                        <div className="flex pt-5 ">
                            <span className='lg:pr-3 pr-1  font-bold text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" SKU:"}
                            </span>
                            <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" 1223"}
                            </span>
                        </div>

                        <div className="flex pt-5">
                            <span className='lg:pr-3 pr-1  font-bold text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" Category:"}
                            </span>
                            <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>

                                {data.category?.title}
                            </span>
                        </div>

                        <div className="flex pt-5">
                            <span className='lg:pr-3 pr-1  font-bold text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" Tags:"}
                            </span>
                            <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {" Clothes, Hoodies"}
                            </span>

                        </div>
                    </div>
                </div >
                <div className="flex pt-5">
                    <ProductInfo initialTabs={allTags} ></ProductInfo>
                </div>
            </main >

        </>
    }

}