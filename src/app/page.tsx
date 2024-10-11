'use client'
import Slider from "@/modules/common/components/image-slider/index";
import Categories from "@/modules/layout/templates/category/index";
import AllCategory from "@/modules/common/components/all-category";
import DataAllCategory from "@/../public/data/allCategory.json";
import { ProductType } from "@/types/product";
import CategoryProduct from "@/modules/layout/templates/category-product";
import useSWR from 'swr'
import Loading from "./loading";
import { HomeContextType } from "@/types/homeContext";
import { HomeContext } from "@/hook/context/homeContext";
import CustomErrorPage from "./error";
import { ResponseCustom } from "@/types/response";
import { useFetch } from "@/hook/useFetch";


export default function Home() {

  let clothings: ProductType[] = [];

  const { data: all, error: userError, isLoading: isLoadingAll } = useFetch(`/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}`);
  const { data: allCategory, error: userErrorCategory, isLoading: isLoadingCategory } = useFetch(`/${process.env.NEXT_PUBLIC_ALL_CATEGORY_URL}`);
  const { data: allClothing, error: userErrorClothings, isLoading: isLoadingClothings } = useFetch(`/${process.env.NEXT_PUBLIC_PRODUCT_SEARCH_BY_CATEROGY_URL}/2`);

  if (isLoadingAll || isLoadingCategory || isLoadingClothings) return <Loading></Loading>
  if (userError || userErrorCategory || userErrorClothings) return <CustomErrorPage></CustomErrorPage>
  if (all && allCategory && allClothing) {

    const alls: ResponseCustom = new ResponseCustom(all.data, all.paging);
    // allClothings = new ResponseCustom(allClothing.data, allCategory.paging);
    const homecontext: HomeContextType = {
      allCategory: allCategory,
      allProduct: alls.data
    }
    clothings = allClothing;

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

}
