"use client"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IngredientType } from "@/types/ingredient";
import ProductsCarouselProps from "@/modules/common/components/products-carousel/index";
import { CategoryProductType } from "@/types/category-product";

type AllCategoryProps = {
    title: string;
    initialTabs: IngredientType[];
    data: CategoryProductType[];
}

export default function AllCategory({ title, initialTabs, data }: AllCategoryProps) {

    function handleSelectedTab(item: IngredientType) {
        if (item.label === 'All') {
            setSelectedData(data);
        } else {
            setSelectedData(data?.filter(element => element.type == item.label));
        }
        setSelectedTab(item);
    }

    const [selectedTab, setSelectedTab] = useState(initialTabs[0]);
    const [selectedData, setSelectedData] = useState<CategoryProductType[]>(data);
    const classNameLi = 'border-b-2 border-b-[#DEAD6F] border-solid ';
    return (
        <>
            <main className="px-3">
                <div className="flex  pt-12 lg:pb-12  flex-wrap pb-1 ">
                    <div className="lg:w-[40%] lg:mb-2 ">
                        <h3 className='lg:text-7xl text-5xl  font-light font-[family-name:var(--font-geist-chilanka)] '>
                                {title}
                            </h3>
                        </div>
                    <div className="flex lg:w-[30%]  justify-center">
                            <nav>
                                <ul className="flex pt-6 pb-6">
                                    {initialTabs.map((item) => (
                                        // eslint-disable-next-line react/jsx-key
                                        <div className="pr-5  text-2xl font-light font-[family-name:var(--font-geist-chilanka)] ">
                                            <li
                                                key={item.label}
                                                className={item === selectedTab ? classNameLi : ""}
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
                    <div className="lg:w-[30%] lg:flex justify-end w-[60%] pr-3">
                        <div className="lg:w-[70%] lg:h-[80%]  uppercase rounded-md 
                                border border-[--foreground] border-slate-300 text-center py-5 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--text-white-color)]">
                            <a className="lg:text-xl text-center  text-sm">{"shop now ->"}</a>
                        </div>
                    </div>
                </div>    
                    <div>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedTab ? selectedTab.label : "empty"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                {selectedTab ? selectedTab.icon : "😋"}
                            <ProductsCarouselProps listsData={selectedData}></ProductsCarouselProps>
                            </motion.div>
                        </AnimatePresence>
                    </div>
            </main>
        </>
    );
}

