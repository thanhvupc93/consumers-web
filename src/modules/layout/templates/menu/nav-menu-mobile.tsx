import NavLeftMenuMobile from "./nav-menu-lef-mobile";
import NavRighttMenuMobile from "./index-mobile";

export default function NavMenuMobile() {
    return (
        <div className="flex flex-row">
            <div className='flex w-[80%] ' >
                <NavLeftMenuMobile></NavLeftMenuMobile>
            </div>
            <div className='flex w-[20%] ' >
                <NavRighttMenuMobile></NavRighttMenuMobile>
            </div>
        </div>
        

    );
};