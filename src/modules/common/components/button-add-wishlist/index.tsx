import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BTAddWishlist() {
    return <>
        <button className=" w-full uppercase cursor-pointer rounded-md border border-[--bs-light-border-subtle] border-slate-300">
            <FontAwesomeIcon className="pt-2" icon={faHeart} />
        </button>

    </>
}