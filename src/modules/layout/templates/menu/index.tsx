'use client'

import SwitcherLanguage from "../switcher-language/switcher";
import AccountWishListCart from "./account-cart-wishlist";
const listsMenu = [
  {
    label: "Home",
    Child: null,
    No: 1,
  },
  {
    label: "Page",
    Child: null,
    No: 2,
  },

  {
    label: "Shop",
    Child: null,
    No: 3,
  },
  {
    label: "Blog",
    Child: null,
    No: 4,
  },
  {
    label: "Contract",
    Child: null,
    No: 5,
  },
  {
    label: "Other",
    Child: null,
    No: 6,
  },
  {
    label: "GET PRO",
    Child: null,
    No: 7,
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortMenu(listsMenu: any) {
  return listsMenu.sort((r1: { No: number }, r2: { No: number }) =>
    r1.No > r2.No ? 1 : r1.No < r2.No ? -1 : 0
  );
}

export default function NavMenu() {

  const listItems = sortMenu(listsMenu).map((item: { label: string }) => (
    <li key={`nav_${item.label}`} className='grid gap-4 hover:text-[var(--text-orange-color)] font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer'>
      {item.label}
    </li>
  ));

  return (
    <menu className='flex px-3 pt-1 pb-1 mr-[12px] ml-[12px] align-items-center'>
      <div className='flex  w-[25%]'>
        <SwitcherLanguage />
      </div>
      <div className='flex  w-[50%] my-auto'>
        <ul className='ml-[10%]'>
          <ol className='flex flex-row text-xl text-left font-[family-name:var(--font-geist-chilanka)] '>
            {" "}
            {listItems}
          </ol>
        </ul>
      </div>
      <div className='flex  w-[25%] my-auto'>
        <AccountWishListCart />
      </div>
    </menu>

  );
}
