import { useCart } from "@/hook/context/cartContext";
import formatCurrency from "@/utils/format";
import { useTranslations } from "next-intl";
import OrderItem from "./order-item";
import { useLocale } from "next-intl";

export default function CheckOutOrderSummary() {
    const locale = useLocale();
    const { state } = useCart();
    const o = useTranslations('Order');
    const userItems = [];
    let totalPrice = 0;
    for (let i = 0; i < state.items.length; i++) {
        totalPrice = totalPrice + Number(state.items[i].inventories.price);
        userItems.push(
            <OrderItem data={state.items[i]} />
        );
    }
    const cssTexLeft = 'text-left w-[50%] font-bold lg:text-3xl text-xl font-[family-name:var(--font-geist-chilanka)]';
    const cssTexRight = "text-right w-[50%]  font-bold lg:text-3xl text-xl font-[family-name:var(--font-geist-chilanka)]";
    return <>
        <h2 className="lg:text-6xl text-3xl pt-10 pb-10 font-semibold"> {o('orderSummary')}</h2>
        <ul>
            {userItems}
        </ul>
        <div className="end_table_boot  mt-20 w-[100%]  bg bg-[var(--background-hero-banner)]" />
        <div className="flex w-[100%] ">
            <span className={cssTexLeft}> {o('subtotal')}</span>
            <span className={cssTexRight}> {formatCurrency(totalPrice, locale)}</span>
        </div>
        <div className="end_table_boot  mt-10 w-[100%]  bg bg-[var(--background-hero-banner)]" />
        <div className="flex w-[100%] ">
            <span className={cssTexLeft}> {o('shipping')}</span>
            <span className={cssTexRight}> {formatCurrency(10, locale)}</span>
        </div>

        <div className="end_table_boot  mt-10 w-[100%]  bg bg-[var(--background-hero-banner)]" />

        <div className="flex w-[100%] ">
            <span className={cssTexLeft}> {o('total')}</span>
            <span className={cssTexRight}> {formatCurrency(totalPrice + 10, locale)}</span>
        </div>
    </>
}