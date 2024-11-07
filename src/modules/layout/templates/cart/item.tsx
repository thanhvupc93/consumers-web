import * as React from "react";
import { motion } from "framer-motion";
import { CartItemType } from "@/types/cartItem";
import Image from "next/image";
import { BUTTON_BS_COLOR_CSS_DEFAULT } from "@/constants/css";
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from "@/hook/context/cartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLocale, useTranslations } from "next-intl";
import formatCurrency from "@/utils/format";

const variants = {
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

type CartItemTypePros = {
    data: CartItemType,
    index: string,
    key: string
}

export const CartData = ({ data, index, key }: CartItemTypePros) => {
    const o = useTranslations('Order');
    const { state, dispatch } = useCart();
    const locale = useLocale();
    function onChangeQuantity(dataQuantity: number) {
        data.quantity = dataQuantity;
        dispatch({ type: 'CHANGE_QUANTITY_ITEM', payload: { data, index: Number(index) } });
    }

    function onPlusQuantity() {
        if (data.quantity < state.items[Number(index)].inventories.quantity) {
            dispatch({ type: 'ADD_ONE_ITEM', payload: { data, index: Number(index) } });
        } else {
            toast.error(o('canNotAddMore'), {
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

    function onSubstraction() {
        if (data.quantity > 1) {
            dispatch({ type: 'SUB_ONE_ITEM', payload: { data, index: Number(index) } });
        } else {
            toast.error(o('canNotSub0'), {
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
    function onDeleteItem() {
        dispatch({ type: 'REMOVE_ITEM', payload: { data, index: Number(index) } });
        toast.success(o('delete'), {
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

    return (
        <motion.li
            className="cart_li w-[100%]"
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            key={key}
        >
            <div className="flex li_table h-30 w-[100%]">
                <div className="flex flex-col  w-[25%]">
                    <Image className="rounded-lg lg:min-h-[100px] lg:min-w-[100px] min-h-[60px] min-w-[60px]" src={data.image} width={50} height={50} alt='Picture of product ' />
                </div>
                <div className="flex flex-col w-[75%]">
                    <div className="text_placeholder h-[35%] font-normal text-2xl font-[family-name:var(--font-geist-chilanka)]">{data.title}</div>
                    <div className="flex h-[30%] w-[100%] align-items-center">
                        <div className="text_placeholder w-[30%] text-left">{formatCurrency(data.inventories.price, locale)}</div>
                    </div>
                    <div className="flex h-[30%] w-[100%] align-items-center">
                        <div className="flex w-[80%]">
                            <div className="w-[15%] button_silver_hover">
                                <button onClick={() => onSubstraction()} id={`_size`} className={' button_mini' + BUTTON_BS_COLOR_CSS_DEFAULT} >
                                    <a className="">{"-"}</a>
                                </button>
                            </div>
                            <input className={'w-[60%] input_custom max-h-4 max-w-20 mx-1 button_mini'} value={data.quantity} type="number"
                                onChange={(e) => onChangeQuantity(Number(e.target.value))}></input>

                            <div className=" w-[15%] button_silver_hover">
                                <button onClick={() => onPlusQuantity()} id={`_size`} className={' button_mini' + BUTTON_BS_COLOR_CSS_DEFAULT} >
                                    <a className="">{"+"}</a>
                                </button>
                            </div>
                        </div>
                        <div className="w-[20%] text-center" onClick={() => onDeleteItem()}>
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.li >
    );
};
