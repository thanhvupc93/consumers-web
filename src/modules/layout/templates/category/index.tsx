'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBone, faCat, faShirt, faVolleyball, faBottleDroplet } from "@fortawesome/free-solid-svg-icons";
import { CategoryType } from "@/types/category";
import Link from "next/link";
import { useAllCategoryHomeContex } from "@/hook/context/homeContext";
import { useTranslations } from "next-intl";



export default function Categories() {
    const t = useTranslations('Category');
    const data: CategoryType[] = useAllCategoryHomeContex();

    function getIdOrType(data: CategoryType[], equalTitle: string, title: boolean) {
        if (data.length > 0) {
            return title ? data?.filter((i) => i.type == equalTitle)[0].type : data?.filter((i) => i.type == equalTitle)[0].id
        } else {
            return ""
        }
    };

    if (!data) {
        return <><div>Loading</div></>
    } else {
        const cssLabel = "pt-4 text-3xl text-[var(--text-o-secondary-color) font-light font-[family-name:var(--font-geist-chilanka)]";
        const cssIcon = "lg:w-[250px] lg:h-[170px] w-[120px] h-[70px] text-[var(--text-orange-color)] ";

        return (<>
            <main className="pt-7 pb-5 px-3 py-12 flex flex-wrap  text-[100px] ">
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[33%]">
                    <Link href={`products?categoryId=${getIdOrType(data, 'dog', false)}`} className="flex flex-col">
                        <FontAwesomeIcon className={cssIcon} icon={faBone} />
                        <span className={cssLabel}> {t(getIdOrType(data, 'dog', true).toString())}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[33%]">
                    <Link href={`products?categoryId=${getIdOrType(data, 'cat', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faCat} />
                        <span className={cssLabel}> {t(getIdOrType(data, 'cat', true).toString())}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[33%]">
                    <Link href={`products?categoryId=${getIdOrType(data, 'clothing', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faShirt} />
                        <span className={cssLabel}> {t(getIdOrType(data, 'clothing', true).toString())}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[50%]">
                    <Link href={`products?categoryId=${getIdOrType(data, 'toy', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faVolleyball} />
                        <span className={cssLabel}> {t(getIdOrType(data, 'toy', true).toString())}</span>
                    </Link>
                </div>
                <div className="text-center items-center flex flex-col lg:w-[20%] w-[50%]">
                    <Link href={`products?categoryId=${getIdOrType(data, 'milk', false)}`} className="flex flex-col ">
                        <FontAwesomeIcon className={cssIcon} icon={faBottleDroplet} />
                        <span className={cssLabel}> {t(getIdOrType(data, 'milk', true).toString())}</span>
                    </Link>
                </div>
            </main>
        </>);
    }


};