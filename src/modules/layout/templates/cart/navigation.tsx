import * as React from "react";
import { motion } from "framer-motion";
import { CartData } from "./item";
import { useCart } from "@/hook/context/cartContext";
import { useTranslations } from "next-intl";
import { BUTTON_BS_COLOR_CSS_DEFAULT } from "@/constants/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Bounce, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const variantsLi = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

interface CartProps {
    changeIsOpenCart: () => void;
    isOpenCart: boolean
}

export const Navigation = ({ isOpenCart, changeIsOpenCart }: CartProps) => {
    const o = useTranslations('Order');
    const p = useTranslations('Cart');
    const router = useRouter()
    const { state, dispatch } = useCart();
    const userItems = [];
    for (let i = 0; i < state.items.length; i++) {
        userItems.push(
            <CartData data={state.items[i]} key={String(i)} index={String(i)} />
        );
    }
    function onChangeDeleteAll() {
        dispatch({
            type: 'CLEAR_CART', payload: {
                data: {
                    id: 0,
                    image: "",
                    title: "",
                    type: "",
                    description: "",
                    defaultPrice: 0,
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
                    },
                    category: undefined,
                    isActive: false,
                    isDelete: false,
                    quantity: 0
                },
                index: 0
            }
        });
        toast.success(o('clear'), {
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

    function onChangeCheckOut() {
        onChangeClose();
        router.replace('/checkout')
    }
    function onChangeClose() {
        changeIsOpenCart();
    }

    const cssUl = 'cart_ul'
    return <>
        <motion.ul id='cart_ul' className={isOpenCart ? cssUl + " lg:w-[460px]  w-[90%] top-[10px] " : cssUl + " top-[-500px] "} variants={variants}>
            <div className=" text-4xl text-center top-2 cursor-pointer" onClick={() => onChangeClose()}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <motion.li
                className="cart_li "
                variants={variantsLi}
                key={`111111`}
            > <span className='pb-4 font-normal text-3xl text-right font-[family-name:var(--font-geist-chilanka)] '>{p('cart')}</span>
            </motion.li >
            {userItems}
            <motion.li
                className=""
                variants={variantsLi}
                key={`1111112`}
            >
                <div className="li_table_boot  lg:w-[480px] w-[calc(100vw-4vw)]">
                </div>
            </motion.li >
            <motion.li
                className=""
                variants={variantsLi}
                key={`1111113`}
            >
                <div className="flex ">
                    <div className="flex w-[50%] justify-start">
                        <button
                            className={`w-[80%] button_clear ` + BUTTON_BS_COLOR_CSS_DEFAULT}
                            onClick={() => { onChangeDeleteAll() }} >
                            <a className="text-sm">{p('clear')}</a>
                        </button>
                    </div>
                    <div className="flex  w-[50%] text-center justify-end">
                        <button
                            className={`w-[80%] button_submit` + BUTTON_BS_COLOR_CSS_DEFAULT}
                            onClick={() => { onChangeCheckOut() }} >
                            <a className="text-sm">{p('checkout')}</a>
                        </button>
                    </div>
                </div>
            </motion.li >
        </motion.ul>
    </>
}


