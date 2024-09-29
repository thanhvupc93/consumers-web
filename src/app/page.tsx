import CategoryProduct from "@/modules/common/components/category-product/index";
import Slider from "@/modules/common/components/image-slider/index";
import Category from "@/modules/layout/templates/category/index";
import DataClothing from "@/../public/data/clothing.json";
import AllCategory from "@/modules/common/components/all-category";
import DataAllCategory from "@/../public/data/allCategory.json";
import DataAllProduct from "@/../public/data/allProduct.json";

export default function Home() {
  return (
    <>
      <div className='relative'>
        <Slider width={400} height={300}></Slider>
      </div>
      <Category></Category>
      <CategoryProduct title="Pet Clothing" data={DataClothing.data} ></CategoryProduct>
      <AllCategory title="Pet Foodies" data={DataAllProduct.data }  initialTabs={DataAllCategory.allIngredients}></AllCategory>
    </>
  );
}
