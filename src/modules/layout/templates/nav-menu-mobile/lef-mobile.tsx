'use client'
import SwitcherLanguage from "../switcher-language";
import AccountWishListCart from "../account-cart-wishlist";
export default function NavLeftMenuMobile() {
    return (
        <div className=' flex w-[100%]'>
            <div className="px-1 p-2 w-[30%] " >
                <SwitcherLanguage />
            </div>
            <div className="flex p-3 w-[70%] " >
                <AccountWishListCart />
            </div>
        </div>
    );
};

