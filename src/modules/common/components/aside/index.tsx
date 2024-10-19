'use client'
import InputSearch from "../input-search";
import CustomErrorPage from "@/app/error";
import { CategoryType } from "@/types/category";
import Loading from "@/app/loading";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ProductSearchType } from "@/types/products_search";
import { DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK, DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT } from "@/utils/constants_css";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/utils/fetch";
import { ResponseCustom } from "@/types/response";

interface AsideProps {
    changeProductSearch: (data1: ProductSearchType) => void;
}

export default function Aside({ changeProductSearch }: AsideProps) {
    const [data, setData] = useState<CategoryType[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const categoryId = Number(searchParams.get('categoryId'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_CATEGORY_URL}`, 'GET', null)
                if (response) {
                    setData(response.data)
                }
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError(true);
                setLoading(false);
            }

        };
        fetchData();
    }, []);


    function changeParam(id: number) {
        router.push(`${pathName}?categoryId=${id}`, { scroll: false });
    }
    function handleClick(id: number) {
        const data: ProductSearchType = {
            categoryId: id
        }
        changeProductSearch(data);
        changeParam(id)
    }


    if (loading) return <Loading></Loading>
    if (error) return <CustomErrorPage message='Loading fail.....' ></CustomErrorPage>
    if (data) {
        return <>
            <div>
                <InputSearch text={"Search For Product"} changeProductSearch={changeProductSearch} ></InputSearch>
            </div>
            <div id="default-sidebar" className="w-64 z-11 h-screen" aria-label="Sidebar">
                <div className="pt-8">
                    <ul className="font-light font-[family-name:var(--font-geist-chilanka)]">
                        <div className="pb-5" ><span className="text-3xl mb-5"> Categories </span>
                        </div>
                        <div id={`aside-search-0`} className={0 == categoryId ? DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK : DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT} onClick={() => handleClick(0)}>
                            <li
                                key={0}
                                className="pb-2"
                            >
                                {"All"}

                            </li>
                        </div>

                        {data.map((item: CategoryType) => (
                            <div key={`div_aside_search_${item.id}`} id={`aside-search-${item.id}`} className={item.id == categoryId ? DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK : DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT} onClick={() => handleClick(item.id)}>
                                <li
                                    key={item.id}
                                    className="pb-2"
                                >
                                    {item.title}

                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    }


}

