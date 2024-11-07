'use client'

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ControlledMenu, MenuItem, SubMenu, useHover } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/zoom.css';
import Link from "next/link";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useUser } from "@/hook/context/userContext";
import { checkIsAdmin } from "@/utils/validate";

export default function NavCenterMenu() {
    const m = useTranslations('Menu');
    const [isOpenDog, setOpenDog] = useState(false);
    const { anchorProps, hoverProps } = useHover(isOpenDog, setOpenDog);
    const [isOpenCat, setOpenCat] = useState(false);
    const { anchorProps: anchorPropsCat, hoverProps: hoverPropsCat } = useHover(isOpenCat, setOpenCat);
    const ref = useRef(null);
    const refCat = useRef(null);
    const { state } = useUser();
    if (!checkIsAdmin(state.roles)) {
        return (<></>)
    } else {
        const cssMenu = `flex flex-row font-[family-name:var(--font-geist-chilanka)] text-xl grid gap-4 hover:text-[var(--text-orange-color)]
   font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer`;
        return (
            <ul className='flex '>
                <ol className={cssMenu}>
                    <Link href="/"> {m('home')} </Link>
                </ol>
                <ol className={cssMenu + " group"}>
                    <div ref={ref} {...anchorProps}>
                        {m('dog')} <FontAwesomeIcon className="px-3 transition-transform duration-200 transform group-hover:rotate-180" icon={faCaretDown} />
                    </div>
                    <ControlledMenu
                        {...hoverProps}
                        state={isOpenDog ? 'open' : 'closed'}
                        anchorRef={ref}
                        onClose={() => setOpenDog(false)}
                    >
                        <SubMenu className="mt-2" label={m('food')}>
                            <MenuItem>{m('nuts')}</MenuItem>
                            <MenuItem>{m('wet')}</MenuItem>
                        </SubMenu>
                        <MenuItem>{m('snack')}</MenuItem>
                        <MenuItem>{m('toy')}</MenuItem>
                    </ControlledMenu>
                </ol>

                <ol className={cssMenu + " group"}>
                    <div ref={refCat} {...anchorPropsCat}>
                        {m('cat')} <FontAwesomeIcon className="px-3 transition-transform duration-200 transform group-hover:rotate-180" icon={faCaretDown} />
                    </div>
                    <ControlledMenu
                        {...hoverPropsCat}
                        state={isOpenCat ? 'open' : 'closed'}
                        anchorRef={ref}
                        onClose={() => setOpenCat(false)}
                    >
                        <SubMenu className="mt-2" label={m('food')}>
                            <MenuItem>{m('nuts')}</MenuItem>
                            <MenuItem>{m('wet')}</MenuItem>
                        </SubMenu>
                        <MenuItem>{m('toy')}</MenuItem>
                        <MenuItem>{m('snack')}</MenuItem>
                    </ControlledMenu>
                </ol>
                <ol className={cssMenu}>
                    <Link href="/"> {m('clothing')} </Link>
                </ol>
                <ol className={cssMenu}>
                    <Link href="/"> {m('branch')} </Link>
                </ol>
                <ol className={cssMenu}>
                    <Link href="/"> {m('toy')} </Link>
                </ol>
            </ul>
        );
    };
}
