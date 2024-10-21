'use client'
import Slider from "@/modules/common/components/image-slider/index";
import Categories from "@/modules/layout/templates/category/index";
import AllCategory from "@/modules/common/components/all-category";
import DataAllCategory from "@/../public/data/allCategory.json";
import { ProductType } from "@/types/product";
import CategoryProduct from "@/modules/layout/templates/category-product";
import Loading from "./loading";
import { HomeContextType } from "@/types/homeContext";
import { HomeContext } from "@/hook/context/homeContext";
import CustomErrorPage from "./error";
import { useEffect, useState } from "react";
import { fetchAPI } from "@/utils/fetch";
import { useTranslations } from "next-intl";


export default function Home() {
  const h = useTranslations('HomePage');

  const [loading, setLoading] = useState(true);
  const [error, setEror] = useState(false);
  const [homecontext, setHomecontext] = useState<HomeContextType>({
    allCategory: [],
    allProduct: []
  });
  const [clothings, setClothings] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}`, 'GET', null),
          await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_CATEGORY_URL}`, 'GET', null),
          await fetchAPI(`/${process.env.NEXT_PUBLIC_PRODUCT_SEARCH_BY_CATEROGY_URL}/2`, 'GET', null),
        ]);
        const homecontext: HomeContextType = {
          allCategory: responses[1].data,
          allProduct: responses[0].data
        }
        setHomecontext(homecontext);
        setClothings(responses[2].data);
        setLoading(false);
      } catch (err) {
        console.log(err)
        setLoading(false);
        setEror(true)
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loading></Loading>
  if (error) return <CustomErrorPage message='Loading fail.....' />
  if (!loading) {
    return (
      <>
        <HomeContext.Provider value={homecontext}>
          <div className='relative'>
            <Slider width={400} height={300}></Slider>
          </div>
          <Categories></Categories>
          <AllCategory title={h('petfood')} initialTabs={DataAllCategory.allIngredients}></AllCategory>
          <CategoryProduct title={h('petclothing')} data={clothings} ></CategoryProduct >
        </HomeContext.Provider>
      </>
    );
  }

}
