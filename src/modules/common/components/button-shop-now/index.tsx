import { useTranslations } from 'next-intl';

export default function BTShowNow() {
    const t = useTranslations('Cart');
    return <>
        <button className="lg:w-[70%] lg:h-[80%] uppercase rounded-md  w-full
                        border border-[--foreground] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--text-white-color)]">
            <a className="lg:text-xl text-sm  ">{t('shopnow')}</a>
        </button></>
}