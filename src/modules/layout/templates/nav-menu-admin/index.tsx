'use client'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUser } from '@/hook/context/userContext';
import { checkIsAdmin } from '@/utils/validate';

export default function NavCenterMenuAdmin() {
    const m = useTranslations('Menu');
    const { state } = useUser();
    if (checkIsAdmin(state.roles)) {
        return (<></>)
    } else {
        const cssMenu = `flex flex-row font-[family-name:var(--font-geist-chilanka)] text-xl grid gap-4 hover:text-[var(--text-orange-color)]
   font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer`;
        return (
            <ul className='flex '>
                <ol className={cssMenu}>
                    <Link href="/"> {m('home')} </Link>
                </ol>
                <ol className={cssMenu}>
                    <Link href="/"> {m('product')} </Link>
                </ol>
                <ol className={cssMenu}>
                    <Link href="/"> {m('order')} </Link>
                </ol>
                <ol className={cssMenu}>
                    <Link href="/admin/account"> {m('user')} </Link>
                </ol>
            </ul>
        )
    }
};

