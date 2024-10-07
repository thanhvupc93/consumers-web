'use client'
import Slider from "@/modules/common/components/image-slider/index";
import Categories from "@/modules/layout/templates/category/index";
import AllCategory from "@/modules/common/components/all-category";
import DataAllCategory from "@/../public/data/allCategory.json";
import { ProductType } from "@/types/product";
import CategoryProduct from "@/modules/layout/templates/category-product";
import useSWR from 'swr'
import { HomeContext } from "@/hook/context";
import { HomeContextType } from "@/types/homeContext";
import Loading from "./loading";
const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function Home() {

  let clothings: ProductType[] = [];
  const { data: all, error: userError, isLoading: isLoadingAll } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}`, fetcher);
  const { data: allCategory, error: userErrorCategory, isLoading: isLoadingCategory } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_ALL_CATEGORY_URL}`, fetcher);
  const { data: allClothings, error: userErrorClothings, isLoading: isLoadingClothings } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_PRODUCT_SEARCH_BY_CATEROGY_URL}/2`, fetcher);
  clothings = allClothings;

  const homecontext: HomeContextType = {
    allCategory: allCategory,
    allProduct: all
  }

  if (isLoadingAll || isLoadingCategory || isLoadingClothings) return <Loading></Loading>
  if (userError || userErrorCategory || userErrorClothings) return <div>404</div>
  return (
    <>
      <HomeContext.Provider value={homecontext}>
        <div className='relative'>
          <Slider width={400} height={300}></Slider>
        </div>
        <Categories></Categories>
        <AllCategory title="Pet Foodies" initialTabs={DataAllCategory.allIngredients}></AllCategory>
        <CategoryProduct title="Pet Clothing" data={clothings} ></CategoryProduct >
      </HomeContext.Provider>
    </>
  );
}
