'use client'
import Map from '@/modules/common/components/google-map'
import CheckOutOrderSummary from '@/modules/layout/templates/checkout/order-summary';
import CheckOutUserInfo from '@/modules/layout/templates/checkout/user-info';
import { AddressType } from '@/types/address';
import { BUTTON_BS_COLOR_CSS_DEFAULT } from '@/utils/constants_css';
import { useCallback, useState } from 'react';
import { useTranslations } from "next-intl";
import { OrderType } from '@/types/order';
import { useCart } from '@/hook/context/cartContext';
import { OrderItemsType } from '@/types/orderItems';
import { Bounce, toast, ToastContainer } from 'react-toastify';

export default function Checkout() {
    const { dispatch } = useCart();
    const o = useTranslations('Order');

    const { state } = useCart();
    const [order, setOrder] = useState<OrderType>();

    const changeAddress = useCallback((data: AddressType) => {
        const dataOrder = order;
        if (dataOrder) {
            dataOrder.address = data.full;
        }
    }, [order]);

    const changeUserInfo = useCallback((dataUserInfo: OrderType) => {
        setOrder(dataUserInfo);
    }, []);

    const checkSubmit = (): boolean => {
        if (!order?.fullName || !order?.email || !order?.phone || !order?.userName || !order?.address || order.orderItems.length < 1) {
            toast.error(o('validateSubmitOrder'), {
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
            return false;
        } return true;
    };

    const byOrder = async () => {
        const orderItems: OrderItemsType[] = [];
        state.items.map(item => {
            const orderItem: OrderItemsType = {
                quantity: item.quantity,
                price: item.inventories.price,
                inventories: item.inventories
            }
            orderItems.push(orderItem);
        });

        const dataOrder = order;
        if (dataOrder) {
            dataOrder.orderItems = orderItems;
        }
        setOrder(dataOrder);
        if (checkSubmit()) {
            console.log('checkOut', order)
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/order`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(order),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                dispatch({
                    type: 'CLEAR_CART', payload: {
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
                });
                toast.success(o('orderSuccess'), {
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

            } catch (err) {
                console.log(err)
                toast.error(o('orderError   '), {
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

    };


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
        <main>
            <div className="flex flex-wrap">
                <div className="lg:w-[50%] w-[100%] px-2 lg:pl-10">
                    <CheckOutUserInfo changeUserInfo={changeUserInfo} />
                    <Map changeAddress={changeAddress} />
                </div>
                <div className="flex lg:w-[50%] w-[100%]  px-2 lg:pr-10">
                    <div className="lg:pl-10 w-[100%] mt-5 px-2 bg bg-[var(--background-hero-banner)] border-slate-300 rounded-md">
                        <CheckOutOrderSummary />
                    </div>
                </div>
                <div className="lg:pl-10 pt-5 w-[50%] px-2 text-center justify-center" onClick={() => byOrder()}>
                    <button
                        className={`w-[100%] button_submit` + BUTTON_BS_COLOR_CSS_DEFAULT}
                        onClick={() => { }} >
                        <a className="text-sm">{o('buy')}</a>
                    </button>
                </div>
            </div>
        </main>
    </>
}