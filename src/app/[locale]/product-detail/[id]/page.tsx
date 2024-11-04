'use client'
import CustomErrorPage from "@/app/[locale]/error";
import Loading from "@/app/[locale]/loading";
import BTAddCart from "@/modules/common/components/button-add-cart";
import BTAddWishlist from "@/modules/common/components/button-add-wishlist";
import HeroContent from "@/modules/common/components/hero-content";
import SliderThumbnails from "@/modules/common/components/image-thumbnails";
import ProductInfo from "@/modules/common/components/product-info";
import { BreadcrumbsType } from "@/types/breadcrumbs";
import { InventoryType } from "@/types/inventory";
import { ProductType } from "@/types/product";
import { BUTTON_BS_COLOR_CSS_ACTIVE, BUTTON_BS_COLOR_CSS_DEFAULT } from "@/utils/constants_css";
import { useCallback, useEffect, useState } from "react";
import { allTags } from "../../../../../public/data/productTag";
import { useCart } from "@/hook/context/cartContext";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAPI } from "@/utils/fetch";
import { ResponseCustom } from "@/types/response";
import InputQuanlity from "@/modules/common/components/input-quanlity";
import { useTranslations, useLocale } from "next-intl";
import { CartItemType } from "@/types/cartItem";
import formatCurrency from "@/utils/format";
const breadcrumbsPropsData: BreadcrumbsType[] = [
    {
        name: 'productList',
        url: '/products'
    }
]

type ProductStateType = {
    select_color: number,
    select_size: number,
}

export default function ProductDetail({ params }: { params: { id: string } }) {
    const locale = useLocale();
    const p = useTranslations('Product');
    const c = useTranslations('Category');
    const page = useTranslations('Page');
    const [error, setEror] = useState(false);
    const [loading, setLoading] = useState(true);
    const [productDetailtState, setProductDetailState] = useState<ProductType>();
    const [quantity, setQuantity] = useState<number>(1);
    const [inventory, setInventoryState] = useState<InventoryType>();
    const [productState, setProductState] = useState<ProductStateType>({
        select_color: 0,
        select_size: 0,
    });

    const changeQuantity = useCallback((data: number) => {
        setQuantity(data);
    }, []);

    function setDataInventoryState(data: InventoryType[], select_size: number, select_color: number) {
        const inventory: InventoryType[] = data.filter((e) => {
            return e.size?.id === select_size && e.color?.id === select_color;
        });
        setInventoryState(inventory[0]);
    }

    // useMemo(() => {
    //     if (inventory && productDetailtState && productState && count) {
    //         const priceElement = document.getElementById('product_detail_price');
    //         if (priceElement && inventory) {
    //             priceElement.textContent = formatCurrency(inventory.price, locale); // Thay đổi giá trị hiển thị
    //         }
    //     }
    // }, [inventory, locale, productDetailtState, productState, count]);

    function handleClick(id: number, type: string) {
        if (type === "_color") {
            setProductState({
                select_color: id,
                select_size: productState.select_size
            })
            setDataInventoryState(productDetailtState?.inventories || [], productState.select_size, id);
        } else {
            setProductState({
                select_size: id,
                select_color: productState.select_color
            })
            setDataInventoryState(productDetailtState?.inventories || [], id, productState.select_color);
        }


    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}/${params.id}`, 'GET', null);
                if (response) {
                    const data: ProductType = response.data;
                    let colorId = 0
                    let sizeId = 0
                    if (data.colors.length > 0) {
                        colorId = data.colors[0].id;
                    }
                    if (data.sizes.length > 0) {
                        sizeId = data.sizes[0].id;
                    }

                    setProductState({
                        select_color: colorId,
                        select_size: sizeId,
                    });
                    breadcrumbsPropsData.push(
                        {
                            name: `${data.title}`,
                            url: ``
                        }
                    );
                    setProductDetailState(data);
                    setDataInventoryState(data.inventories, sizeId, colorId);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err)
                setProductState({
                    select_color: 0,
                    select_size: 0,
                });
                setEror(true)
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    const { state, dispatch } = useCart();

    const addToCart = () => {
        try {
            if (inventory) {
                const indexProductCart = state.items.findIndex(data => data.inventories.id === inventory.id);
                //new
                if (indexProductCart < 0) {
                    if (quantity <= inventory.quantity) {
                        const cartProduct: CartItemType = {
                            id: productDetailtState?.id || 0,
                            image: productDetailtState?.image || '',
                            title: productDetailtState?.title || '',
                            type: productDetailtState?.type || '',
                            description: productDetailtState?.description || '',
                            defaultPrice: productDetailtState?.defaultPrice || 0,
                            inventories: inventory,
                            category: productDetailtState?.category,
                            isActive: productDetailtState?.isActive || false,
                            isDelete: productDetailtState?.isDelete || false,
                            quantity
                        }
                        dispatch({ type: 'CHANGE_QUANTITY_ITEM', payload: { data: cartProduct, index: indexProductCart } });
                        toast.success('Add cart success', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    } else {
                        toast.error('Please down quantity', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    }
                } else {
                    //change
                    const dataUpdate = state.items[indexProductCart];
                    const newQuantity = dataUpdate.quantity + quantity;
                    if (newQuantity <= inventory.quantity) {
                        dataUpdate.quantity = newQuantity;
                        dispatch({ type: 'CHANGE_QUANTITY_ITEM', payload: { data: dataUpdate, index: indexProductCart } });
                        toast.success('Add cart success', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    } else {
                        toast.error('Please down quantity', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                    }
                }
            }
            } catch (error) {
                console.log(error);
                toast.error('Add cart fail', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
        }
    };

    if (loading) return <Loading></Loading>
    if (error) return <CustomErrorPage message={page('notFound')}></CustomErrorPage>
    if (productDetailtState) {
        return <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            ></ToastContainer>

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
                                {productDetailtState.title}
                            </span>
                        </div>
                        <div className="">
                            <span id="product_detail_price" className='lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal text-4xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {formatCurrency(inventory ? inventory.price : productDetailtState.defaultPrice, locale)}
                            </span>
                            <span className='line-through decoration-gray-600 font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {formatCurrency(240.00, locale)}
                            </span>
                        </div>
                        <div className="flex flex-wrap pt-5">
                            <span className='lg:pr-3 pr-1 font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {productDetailtState.description}
                            </span>

                        </div>
                        <div className="pt-5">
                            <span className='lg:pr-3 pr-1 text-[var(--text-o-secondary-color)] font-normal text-2xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {p('color')}
                            </span>

                        </div>
                        <div className="">
                            <ul className='flex lg:pr-3 pr-1 pb-5 text-black font-normal text-sm  font-[family-name:var(--font-geist-chilanka)] '>
                                <div className="flex flex-grow">
                                    {productDetailtState.colors?.map((e) => (
                                        <li key={`${e.id}_color`} className=" button_silver_hover px-[5px]">
                                            <button id={`${e.id}_color`}
                                                className={productState.select_color == e.id ? '' + BUTTON_BS_COLOR_CSS_ACTIVE : BUTTON_BS_COLOR_CSS_DEFAULT}
                                                onClick={() => handleClick(e.id, `_color`)} >
                                                <a className="text-sm">{e.title}</a>
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            </ul>

                        </div>
                        <div className="pt-1">
                            <span className='lg:pr-3 pr-1 text-[var(--text-o-secondary-color)] font-normal text-2xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {p('size')}
                            </span>

                        </div>
                        <div className="">
                            <ul className='flex lg:pr-3 pr-1 pb-5 text-black  text-sm  font-[family-name:var(--font-geist-chilanka)] '>
                                <div className="flex">
                                    {productDetailtState?.sizes.map((e) => (
                                        <li key={`${e.id}_size`} className="button_silver_hover px-[5px]">
                                            <button id={`${e.id}_size`} className={productState.select_size == e.id ? BUTTON_BS_COLOR_CSS_ACTIVE : BUTTON_BS_COLOR_CSS_DEFAULT}
                                                onClick={() => handleClick(e.id, `_size`)} >
                                                <a className="text-sm">{e.title}</a>
                                            </button>
                                        </li>
                                    ))}
                                </div>
                            </ul>

                        </div>
                        <div className="flex flex-row">
                            <span id='produce_detail_stock' className='lg:pr-3 pr-1  font-bold text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {inventory ? inventory.quantity : 0} {p('inStock')}
                            </span>
                        </div>

                        <div className="flex pt-1">
                            <InputQuanlity value={quantity} changeQuantity={changeQuantity} />
                        </div>
                        <div className="flex  pt-5 font-[family-name:var(--font-geist-chilanka)] ">
                            <div className="lg:w-[35%] w-[65%] pr-4" onClick={() => addToCart()}>
                                <BTAddCart ></BTAddCart>
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
                                {c('category')}
                            </span>
                            <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>

                                {productDetailtState?.category.title}
                            </span>
                        </div>

                        <div className="flex pt-5">
                            <span className='lg:pr-3 pr-1  font-bold text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                {p('tags')}
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


