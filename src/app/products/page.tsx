'use client'
import Aside from "@/modules/common/components/aside";
import HeroContent from "@/modules/common/components/hero-content";
import ProductsCarouselProps from "@/modules/common/components/products-carousel/index";
import { BreadcrumbsType } from "@/types/breadcrumbs";
import { ProductsContext } from "@/hook/context/productsContext";
import { ProductSearchType } from "@/types/products_search";
import { useCallback, useEffect, useState } from "react";
import Loading from "../loading";
import CustomErrorPage from "../error";
import { ProductType } from "@/types/product";
import { PagingDto, ResponseCustom } from "@/types/response";
import { useSearchParams } from "next/navigation";
import Paging from "@/modules/common/components/paging";

const breadcrumbsPropsData: BreadcrumbsType[] = [
  {
    name: "Product List",
    url: '/products'
  }
]

export default function ProductList() {
  let alls: ResponseCustom;
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<ProductType[]>();
  const [paging, setPaging] = useState<PagingDto>();
  const [selectPaging, setSelectPaging] = useState<number>(1);
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get('categoryId'));

  const [productSearch, setProductSearch] = useState<ProductSearchType>({
    key_word: '',
    categoryId: categoryId
  });

  const changeSelecePagePaging = useCallback((i: number) => {
    setSelectPaging(i + 1);
  }, []);

  const changeProductSearch = useCallback((data: ProductSearchType) => {
    if (data.categoryId || data.categoryId == 0) {
      productSearch.categoryId = data.categoryId
    }
    if (data.key_word || data.key_word == "") {
      productSearch.key_word = data.key_word
    }
    setProductSearch(productSearch);
    setCount(prevCount => prevCount + 1);
  }, [productSearch]);


  useEffect(() => {
    const fetchData = async () => {
      const key = `?title=${productSearch.key_word}&category=${productSearch.categoryId}&page=${selectPaging}`
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}/${key}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        alls = new ResponseCustom(result.data, result.paging);
        setProducts(alls.data)
        setPaging(alls.paging)
      } catch (err) {
        console.log(err)
        return <CustomErrorPage></CustomErrorPage>
      } finally {
      }
    };
    fetchData();
  }, [count, selectPaging]);

  if (!products) return <Loading></Loading>
  if (products && paging) {
    console.log('products ')
    return <>
      <ProductsContext.Provider value={productSearch}>
        <HeroContent data={breadcrumbsPropsData}></HeroContent>
        <div className="pt-10"></div>
        <main>
          <div className="flex ">
            <div className="hidden lg:block w-[25%] px-7">
              <Aside changeProductSearch={changeProductSearch}></Aside>
            </div>
            <div className="lg:w-[75%] px-7">
              <div className="flex justify-content-between align-items-center">
                <div className="w-[50%] text-left">
                  <span className='font-normal text-xl font-[family-name:var(--font-geist-chilanka)] '>
                    {/* ${Number(paging?.page) * Number(paging?.take) */}
                    {` Showing 
                    ${Number(paging?.page) == 1 ? 1 : (Number(paging?.page - 1) * Number(paging.take) + 1)} 
                    - ${(Number(paging?.page) == 1 ? Number(paging.take) : (Number(paging?.page) * Number(paging.take)))}
                    of ${paging?.itemCount} results`}
                  </span>
                </div>
                <div className="w-[50%] text-right">
                  <span className='font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                    {" Default sorting"}
                  </span>
                </div>
              </div>
              <div className="product_list">
                <ProductsCarouselProps listsData={products} numberItem={3}></ProductsCarouselProps>
              </div>
              <Paging paging={paging} selectPaging={selectPaging} changeSelecePagePaging={changeSelecePagePaging}></Paging>
            </div>
          </div>
        </main >
      </ProductsContext.Provider>
    </>
  }
}