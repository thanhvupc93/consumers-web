'use client'
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUser } from '@/hook/context/userContext';
import { checkIsAdmin } from '@/utils/validate';
import { ControlledMenu, MenuItem, useHover } from '@szhsin/react-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function NavCenterMenuAdmin() {
    const m = useTranslations('Menu');
    const p = useTranslations('Product');
    const ref = useRef(null);
    const [isOpenAttribute, setOpenAttribute] = useState(false);
    const { anchorProps, hoverProps } = useHover(isOpenAttribute, setOpenAttribute);
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
                <ol className={cssMenu + " group"}>
                    <div ref={ref} {...anchorProps}>
                        {m('productAttribute')} <FontAwesomeIcon className="px-3 transition-transform duration-200 transform group-hover:rotate-180" icon={faCaretDown} />
                    </div>
                    <ControlledMenu
                        {...hoverProps}
                        state={isOpenAttribute ? 'open' : 'closed'}
                        anchorRef={ref}
                        onClose={() => setOpenAttribute(false)}
                    >
                        {/* <SubMenu className="mt-2" label={m('food')}>
                            <MenuItem>{m('nuts')}</MenuItem>
                            <MenuItem>{m('wet')}</MenuItem>
                        </SubMenu> */}
                        <MenuItem>
                            <Link href="/admin/size"> {p('size')} </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href="/admin/color"> {p('color')} </Link>
                        </MenuItem>
                    </ControlledMenu>
                </ol>
            </ul>
        )
    }
};

