'use client'
import { useUser } from "@/hook/context/userContext";
import { useCart } from "@/hook/context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faCartShopping, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useCycle } from "framer-motion";
import { isTokenExpired } from "@/utils/jwt";
import { useRouter } from 'next/navigation';
import { CartComponent } from "@/modules/layout/templates/cart/index";
import { useTranslations } from 'next-intl';
import { useCallback } from "react";


export default function AccountWishListCart() {
    const { dispatch: dispatchCart, state: stateCart } = useCart();
    const [isOpenCart, setOpenCart] = useCycle(false, true);
    const { state, dispatch } = useUser();
    const router = useRouter()
    const t = useTranslations('MenuBar');


    const changeIsOpenCart = useCallback(() => {
        setOpenCart();
    }, []);

    function clearContex() {
        dispatch({ type: 'LOGUOT' });
        dispatchCart({
            type: 'CLEAR_CART',
            payload: {
                data: {
                    id: 0,
                    image: "",
                    title: "",
                    type: "",
                    description: "",
                    defaultPrice: 0,
                    category: undefined,
                    isActive: false,
                    isDelete: false,
                    quantity: 0,
                    inventories: {
                        length: 0,
                        id: 0,
                        color: undefined,
                        size: undefined,
                        value: 0,
                        price: 0,
                        quantity: 0,
                        isActive: false,
                        isDelete: false
                    }
                },
                index: 0
            }
        })
    }

    function handleClickUser() {
        if (isTokenExpired(state.exp)) {
            router.replace('/login')
        } else {
            router.replace('/')
        }
    }
    function handleClickLogout() {
        clearContex();
    }
    function handleClickCart() {
        if (isTokenExpired(state.exp)) {
            router.replace('/login')
        } else {
            setOpenCart();
        }
    }
    const cssAccount = 'flex px-3 my-auto lg:justify-end justify-start'
    return <>
        <div className='flex w-[100%]  my-auto lg:justify-end justify-start'>
            <div className={state?.userName ? ` w-[80%] ` + cssAccount : cssAccount}>
                {
                    state?.userName ?
                        <>
                            <div className="flex my-auto text-2xl">
                                {t('hi')}:
                                <span className='font-normal  text-right text-[var(--text-orange-color)] font-[family-name:var(--font-geist-chilanka)] '>
                                    {state?.fullName.split(" ")[0] || ""}
                                </span>
                                <span> / </span>
                                <a className="px-1" onClick={() => handleClickLogout()}>
                                    <FontAwesomeIcon icon={faRightFromBracket} />
                                </a>
                            </div>
                        </> : <>
                            <a className="px-3 " onClick={() => handleClickUser()}>
                                <FontAwesomeIcon className="text-xl" icon={faUser} />
                            </a>
                        </>
                }
                <a className="px-3 my-auto " >
                    <FontAwesomeIcon className="text-xl" icon={faHeart} />
                </a>
            </div>
            <div className=" px-1 p-[3px] w-[20%] cursor-pointer lg:justify-end justify-start" onClick={() => handleClickCart()}>
                <FontAwesomeIcon className="absolute text-xl" icon={faCartShopping} />
                <div className='absolute rounded-full bg-[var(--background-color)] text-[var(--text-white-color)] top-[5px] ml-2'>
                    <span className="px-3 text-[12px] text-center">{stateCart.items.length}</span>
                </div>
            </div>
        </div >
        <CartComponent isOpenCart={isOpenCart} changeIsOpenCart={changeIsOpenCart} />
    </>
}