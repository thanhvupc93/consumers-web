import Slider from "@/modules/common/components/image-slider/index";
import Category from "@/modules/layout/templates/category/index";
import AllCategory from "@/modules/common/components/all-category";
import DataAllCategory from "@/../public/data/allCategory.json";
import { ProductType } from "@/types/product";
import CategoryProduct from "@/modules/layout/templates/category-product";



export default async function Home() {
  const allFoods = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/food`, { method: 'GET' });
  const foods: ProductType[] = await allFoods.json();

  const allClothings = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/clothing`, { method: 'GET' });
  const clothings: ProductType[] = await allClothings.json();
  return (
    <>
      <div className='relative'>
        <Slider width={400} height={300}></Slider>
      </div>
      <Category></Category>
      <CategoryProduct title="Pet Clothing" data={clothings} ></CategoryProduct>
      <AllCategory title="Pet Foodies" data={foods} initialTabs={DataAllCategory.allIngredients}></AllCategory>
    </>
  );
}
