import * as React from "react";
import { useRef } from "react";
import { motion } from "framer-motion";
import { Navigation } from "./navigation";
import { useDimensions } from "./use-dimensions";
import "./styles.css";

const sidebar = {
    open: ({
        clipPath: `inset(0 0 0 0px)`,
        transition: {
            type: "spring",
            stiffness: 50,
        }
    }),
    closed: () => (
        {
            clipPath: `inset(0 0 0 500px)`,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    )
};


interface CartComponentProps {
    changeIsOpenCart: () => void;
    isOpenCart: boolean
}
export const CartComponent = ({ isOpenCart, changeIsOpenCart }: CartComponentProps) => {
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);

    return (
        <>
            <motion.nav
                className="cart_menu_nav"
                initial={false}
                animate={isOpenCart ? "open" : "closed"}
                custom={height}
                ref={containerRef}
            >
                <div className="Overlay">
                    {isOpenCart ?
                        <>

                            <motion.div
                                initial={{ opacity: 0 }} // Bắt đầu với độ mờ 0
                                animate={{ opacity: 0.7 }} // Kết thúc với độ mờ 0.7
                                exit={{ opacity: 0 }} // Kết thúc với độ mờ 0 khi rời khỏi
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Màu nền với độ mờ
                                    zIndex: 9, // Đặt z-index cao để lớp phủ nằm trên tất cả
                                }} /></>
                        : <div></div>}

                </div>
                <motion.div className="background lg:w-[500px] w-full" variants={sidebar} />
                <Navigation isOpenCart={isOpenCart} changeIsOpenCart={changeIsOpenCart} />
            </motion.nav></>

    );
};
