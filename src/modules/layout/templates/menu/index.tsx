'use client'
import SwitcherLanguage from "../switcher-language";
import AccountWishListCart from "../account-cart-wishlist";
import NavCenterMenu from "../nav-menu";
import NavCenterMenuAdmin from "../nav-menu-admin";

export default function NavMenu() {

  return (
    <menu className='flex px-3 pt-1 pb-1 mr-[12px] ml-[12px] align-items-center'>
      <div className='flex  w-[15%]'>
        <SwitcherLanguage />
      </div>
      <div className='w-[60%] my-auto'>
        <NavCenterMenu /> <NavCenterMenuAdmin />
      </div>
      <div className='flex  w-[25%] my-auto'>
        <AccountWishListCart />
      </div>
    </menu>

  );
}
