import { CartItemType } from "@/types/cartItem";
import formatCurrency from "@/utils/format";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

type OrderItemPros = {
    data: CartItemType,

}
export default function OrderItem({ data }: OrderItemPros) {
    const o = useTranslations('Order');
    const locale = useLocale();
    return <>
        <li key={data.id}>
            <div className="flex h-30 pt-10 w-[100%]">
                <div className="flex flex-col  w-[25%]">
                    <Image className="rounded-lg lg:min-h-[100px] lg:min-w-[100px] min-h-[60px] min-w-[60px]" src={data.image} width={50} height={50} alt='Picture image ' />
                </div>
                <div className="flex flex-col w-[55%] h-full">
                    <div className="h-[60%] font-bold lg:text-3xl  text-xlfont-[family-name:var(--font-geist-chilanka)]">{data.title}</div>
                    <div className="flex h-[20%] pt-1 align-items-center lg:text-xl text-sm">{data.inventories.color?.title}</div>
                    <div className="flex h-[20%] pt-1 align-items-center lg:text-xl text-sm">
                        <div className="flex w-[50%] pt-1 align-items-center lg:text-xl text-sm">
                            {data.inventories.size?.title}
                        </div>
                        <div className="flex w-[50%] pt-1 align-items-center lg:text-xl text-sm">
                            X {data.quantity}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[20%]">
                    <div className="pt-2 text-center" >
                        {formatCurrency(data.inventories.price, locale)}
                    </div>
                </div>
            </div>
        </li>
    </>
}