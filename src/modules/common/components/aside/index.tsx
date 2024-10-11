'use client'
import InputSearch from "../input-search";
import CustomErrorPage from "@/app/error";
import useSWR from "swr";
import { CategoryType } from "@/types/category";
import Loading from "@/app/loading";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { ProductSearchType } from "@/types/products_search";
import { DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK, DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT } from "@/utils/constants_css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
interface AsideProps {
    changeProductSearch: (data1: ProductSearchType) => void;
}

export default function Aside({ changeProductSearch }: AsideProps) {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const categoryId = Number(searchParams.get('categoryId'));

    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, fetcher);

    function changeParam(id: number) {
        replace(`${pathName}?categoryId=${id}`)
    }
    function handleClick(id: number) {
        const data: ProductSearchType = {
            categoryId: id
        }
        changeProductSearch(data);
        changeParam(id)
    }


    if (isLoading) return <Loading></Loading>
    if (error) return <CustomErrorPage></CustomErrorPage>
    if (data) {
        return <>
            <div>
                <InputSearch text={"Search For Product"} changeProductSearch={changeProductSearch} ></InputSearch>
            </div>
            <div id="default-sidebar" className="absolute w-64 h-screen" aria-label="Sidebar">
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
                        // eslint-disable-next-line react/jsx-key
                            <div id={`aside-search-${item.id}`} className={item.id == categoryId ? DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK : DEFAULT_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT} onClick={() => handleClick(item.id)}>
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

