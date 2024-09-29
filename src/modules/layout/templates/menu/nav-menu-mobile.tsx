import NavLeftMenuMobile from "./nav-menu-lef-mobile";
import NavRighttMenuMobile from "./index-mobile";

export default function NavMenuMobile() {
    return (
        <div className="flex-row">
            <div className='flex-initial w-[75%] ' >
                <NavLeftMenuMobile></NavLeftMenuMobile>
            </div>
            <div className='flex-initial w-[25%] ' >
                <NavRighttMenuMobile></NavRighttMenuMobile>
            </div>
        </div>
        

    );
};