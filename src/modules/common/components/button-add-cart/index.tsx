import { useTranslations } from 'next-intl';

export default function BTAddCart() {
    const t = useTranslations('Cart');
    return <>
        <button className=" w-full uppercase cursor-pointer rounded-md border border-[--bs-light-border-subtle] border-slate-300">
            <a className="lg:text-xl text-sm ">{t('addtocart')}</a>
        </button>

    </>
}