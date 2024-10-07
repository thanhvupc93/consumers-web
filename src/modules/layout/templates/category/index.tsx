'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone, faCat, faShirt, faVolleyball, faBottleDroplet } from "@fortawesome/free-solid-svg-icons";
import { CategoryType } from "@/types/category";
import Link from "next/link";
import { useAllCategoryHomeContex } from "@/hook/context";

function getIdOrTitle(data: CategoryType[], equalTitle: string, title: boolean) {
    if (data.length > 0) {
        return title ? data?.filter((i) => i.type == equalTitle)[0].title : data?.filter((i) => i.type == equalTitle)[0].id
    } else {
        return ""
    }
};

export default function Categories() {
    const data: CategoryType[] = useAllCategoryHomeContex();

    if (!data) {
        return <><div>Loading</div></>
    } else {
        const cssLabel = "pt-4 text-3xl text-[var(--text-o-secondary-color) font-light font-[family-name:var(--font-geist-chilanka)]";
        const cssIcon = "lg:w-[250px] lg:h-[170px] w-[120px] h-[70px] text-[var(--text-orange-color)] ";

        return (<>
            <main className="pt-7 pb-5 px-3 py-12 flex flex-wrap  text-[100px] ">
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[33%]">
                    <Link href={`products/${getIdOrTitle(data, 'dog', false)}`} className="flex flex-col">
                        <FontAwesomeIcon className={cssIcon} icon={faBone} />
                        <span className={cssLabel}> {getIdOrTitle(data, 'dog', true)}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[33%]">
                    <Link href={`products/${getIdOrTitle(data, 'cat', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faCat} />
                        <span className={cssLabel}> {getIdOrTitle(data, 'cat', true)}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[33%]">
                    <Link href={`products/${getIdOrTitle(data, 'clothing', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faShirt} />
                        <span className={cssLabel}> {getIdOrTitle(data, 'clothing', true)}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[50%]">
                    <Link href={`products/${getIdOrTitle(data, 'toy', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faVolleyball} />
                        <span className={cssLabel}> {getIdOrTitle(data, 'toy', true)}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[50%]">
                    <Link href={`products/${getIdOrTitle(data, 'toy', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faBottleDroplet} />
                        <span className={cssLabel}> {getIdOrTitle(data, 'toy', true)}</span>
                    </Link>
                </div>
            </main>
        </>);
    }


};