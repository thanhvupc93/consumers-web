"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IngredientType } from "@/types/ingredient";
import { ProductType } from "@/types/product";
type AllCategoryProps = {
    initialTabs: IngredientType[];
    data: ProductType[];
}

export default function ProductInfo({ initialTabs, data }: AllCategoryProps) {

    function handleSelectedTab(item: IngredientType) {
        if (item.label === 'All') {
            setSelectedData(data);
        } else {
            setSelectedData(data?.filter(element => element.type == item.label));
        }
        setSelectedTab(item);
    }

    const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
    const [selectedData, setSelectedData] = useState<ProductType[]>(data);
    const classNameLi = 'px-7 pt-3 rounded-md border border-[--bs-light-border-subtle] border-slate-300 bg-[var(--text-orange-color)]  border-b-2 border-b-[var(--text-orange-color)] ';
    return (
        <>
            <div className="hidden lg:block w-[30%] pr-7">
                <div className="flex  justify-left">
                    <nav className="w-full">
                        <ul className=" pt-6 pb-6">
                            {initialTabs.map((item) => (
                                // eslint-disable-next-line react/jsx-key
                                <div className="px-4 py-2 text-2xl font-light font-[family-name:var(--font-geist-chilanka)] ">
                                    <li
                                        key={item.label}
                                        className={item === selectedTab ? classNameLi : "px-7 pt-3"}
                                        onClick={() => handleSelectedTab(item)}
                                    >
                                        {`${item.icon} ${item.label}`}
                                        {item === selectedTab ? (
                                            <motion.div className="underline" layoutId="underline" />
                                        ) : null}
                                    </li>
                                </div>

                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="hidden lg:block w-[70%] px-7">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab ? selectedTab.icon : "😋"}
                        <div className="px-4 py-2 text-2xl font-light font-[family-name:var(--font-geist-chilanka)]">{selectedTab.label}</div>
                        <div>
                            Product Description
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
                            Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                            Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus.
                            Donec consectetuer ligula vulputate sem tristique cursus.

                            Donec nec justo eget felis facilisis fermentum.
                            Suspendisse urna viverra non, semper suscipit pede.
                            Aliquam porttitor mauris sit amet orci.
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros.
                            Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede.
                            Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.
                            Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus.
                            Donec consectetuer ligula vulputate sem tristique cursus.
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}

