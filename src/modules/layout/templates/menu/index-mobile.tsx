'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/types/constants';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';
import { motion, useCycle } from 'framer-motion';

type MenuItemWithSubMenuProps = {
    item: SideNavItem;
    toggleOpen: () => void;
};

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(0px at 100% 0)',
        transition: {
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

const NavRighttMenuMobile = () => {
    const pathname = usePathname();
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const [isOpen, toggleOpen] = useCycle(false, true);

    return (
        
        <motion.nav
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            custom={height}
            className={`flex staic inset-0 w-full md:block lg:hidden xl:hidden ${isOpen ? '' : 'pointer-events-none'
                }`}
            ref={containerRef}
        >
            <motion.div
                className="fixed  bg-orange inset-0 right-0 w-full bg-white  z-[2]"
                variants={sidebar}
            />
            <MenuToggle toggle={toggleOpen} />
            <motion.ul
                variants={variants}
                className="fixed grid w-full gap-3 px-10 py-16 max-h-screen overflow-y-auto z-[3]"
            >
                {SIDENAV_ITEMS.map((item, idx) => {
                    const isLastItem = idx === SIDENAV_ITEMS.length - 1; // Check if it's the last item

                    return (
                        <div key={idx}>
                                {item.submenu ? (
                                    <MenuItemWithSubMenu item={item} toggleOpen={toggleOpen} />
                                ) : (
                                    <MenuItem>
                                        <Link
                                            href={item.path}
                                            onClick={() => toggleOpen()}
                                            className={`flex w-full text-2xl z[4] ${item.path === pathname ? 'font-bold' : ''}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </MenuItem>
                                )}

                                {!isLastItem && (
                                    <MenuItem className="my-3 h-px w-full bg-gray-300" />
                                )}
                            </div>
                    );
                })}
            </motion.ul>
            
        </motion.nav>
    );
};

export default NavRighttMenuMobile;

const MenuToggle = ({ toggle }: { toggle: never }) => (
    <button
        onClick={toggle}
        className="rounded-md border border-[--foreground] border-slate-300 absolute pointer-events-auto z-[4]"
    > <div className='w-[100%] flex items-center justify-center pt-1'>
            <svg width="23" height="23" viewBox="0 0 23 23">
                <Path
                    variants={{
                        closed: { d: 'M 2 2.5 L 20 2.5' },
                        open: { d: 'M 3 16.5 L 17 2.5' },
                    }}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.1 }}
                />
                <Path
                    variants={{
                        closed: { d: 'M 2 16.346 L 20 16.346' },
                        open: { d: 'M 3 2.5 L 17 16.346' },
                    }}
                />
            </svg> 
        </div>

    </button>
);

const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuItem = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <motion.li variants={MenuItemVariants} className={className}>
            {children}
        </motion.li>
    );
};

const MenuItemWithSubMenu: React.FC<MenuItemWithSubMenuProps> = ({
    item,
    toggleOpen,
}) => {
    const pathname = usePathname();
    const [subMenuOpen, setSubMenuOpen] = useState(false);

    return (
        <>
            <MenuItem>
                <button
                    className="flex w-full text-2xl"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                >
                    <div className="flex flex-row justify-between w-full items-center">
                        <span
                            className={`${pathname.includes(item.path) ? 'font-bold' : ''}`}
                        >
                            {item.title}
                        </span>
                        <div className={`${subMenuOpen && 'rotate-180'}`}>
                            <Icon icon="lucide:chevron-down" width="24" height="24" />
                        </div>
                    </div>
                </button>
            </MenuItem>
            <div className="mt-2 ml-2 flex flex-col space-y-2">
                {subMenuOpen && (
                    <>
                        {item.subMenuItems?.map((subItem, subIdx) => {
                            return (
                                <MenuItem key={subIdx}>
                                    <Link
                                        href={subItem.path}
                                        onClick={() => toggleOpen()}
                                        className={` ${subItem.path === pathname ? 'font-bold' : ''
                                            }`}
                                    >
                                        {subItem.title}
                                    </Link>
                                </MenuItem>
                            );
                        })}
                    </>
                )}
            </div>
        </>
    );
};

const MenuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
            duration: 0.02,
        },
    },
};

const variants = {
    open: {
        transition: { staggerChildren: 0.02, delayChildren: 0.15 },
    },
    closed: {
        transition: { staggerChildren: 0.01, staggerDirection: -1 },
    },
};

const useDimensions = (ref: any) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            dimensions.current.width = ref.current.offsetWidth;
            dimensions.current.height = ref.current.offsetHeight;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref]);

    return dimensions.current;
};