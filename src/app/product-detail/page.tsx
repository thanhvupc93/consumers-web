import HeroContent from "@/modules/common/components/hero-content";
import SliderThumbnails from "@/modules/common/components/image-thumbnails";

export default async function ProductDetail() {
    return <>
        <HeroContent></HeroContent>
        <div className="pt-20"></div>
        <main>
            <div className="flex flex-wrap">
                <div className="  lg:w-[50%]  w-[100%] px-7">
                    <SliderThumbnails></SliderThumbnails>
                </div>
                <div className="lg:w-[50%]  w-[100%] px-7">
                    <div className="lg:pt-1 pt-10">
                        <span className='font-normal text-4xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Jump Suit"}
                        </span>
                    </div>
                    <div className="">
                        <span className='lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal text-4xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" $170.00"}
                        </span>
                        <span className='line-through decoration-gray-600 font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" $240.00"}
                        </span>
                    </div>
                    <div className="flex flex-wrap pt-10">
                        <span className='lg:pr-3 pr-1 font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Justo, cum feugiat imperdiet nulla molestie ac vulputate scelerisque amet. Bibendum adipiscing platea blandit sit sed quam semper rhoncus. Diam ultrices maecenas consequat eu tortor orci, cras lectus mauris, cras egestas quam venenatis neque."}
                        </span>

                    </div>
                    <div className="pt-10">
                        <span className='lg:pr-3 pr-1 text-[var(--text-o-secondary-color)] font-normal text-3xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Colour"}
                        </span>

                    </div>
                    <div className="">
                        <ul className='flex lg:pr-3 pr-1 pb-5 text-black font-normal text-sm  font-[family-name:var(--font-geist-chilanka)] '>
                            <div className="flex">
                                <li className=" px-[5px] ">
                                    <button className="bg-[var(--bs-btn-active-border-color)] uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300 ">
                                        <a className="text-sm">{"Gray"}</a>
                                    </button >
                                </li>
                                <li className=" px-[5px] ">
                                    <button className="uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300">
                                        <a className="text-sm">{"Black"}</a>
                                    </button >
                                </li>
                                <li className=" px-[5px] ">
                                    <button className="uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300">
                                        <a className="text-sm">{"Blue"}</a>
                                    </button >
                                </li>
                            </div>
                        </ul>

                    </div>
                    <div className="pt-5">
                        <span className='lg:pr-3 pr-1 text-[var(--text-o-secondary-color)] font-normal text-3xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Size:"}
                        </span>

                    </div>
                    <div className="">
                        <ul className='flex lg:pr-3 pr-1 pb-5 text-black  text-sm  font-[family-name:var(--font-geist-chilanka)] '>
                            <div className="flex">
                                <li className="px-[5px]">
                                    <button className="bg-[var(--bs-btn-active-border-color)] uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300 ">
                                        <a className="text-sm">{"XL"}</a>
                                    </button >
                                </li>
                                <li className="px-[5px]">
                                    <button className="uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300">
                                        <a className="text-sm">{"L"}</a>
                                    </button >
                                </li>
                                <li className="px-[5px]">
                                    <button className="uppercase rounded-md border border-[--bs-light-border-subtle] border-slate-300">
                                        <a className="text-sm">{"M"}</a>
                                    </button >
                                </li>
                            </div>
                        </ul>

                    </div>

                    <div className="flex pt-5 ">
                        <span className='lg:pr-3 pr-1  font-bold text-2xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" SKU:"}
                        </span>
                        <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" 1223"}
                        </span>
                    </div>

                    <div className="flex pt-5">
                        <span className='lg:pr-3 pr-1 font-normal text-text-[var(--text-o-secondary-color)]  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Category:"}
                        </span>
                        <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Pet, Dog"}
                        </span>
                    </div>

                    <div className="flex pt-5">
                        <span className='lg:pr-3 pr-1  font-normal text-text-[var(--text-o-secondary-color)]  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Tags:"}
                        </span>
                        <span className='lg:pr-3 my-auto font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            {" Clothes, Hoodies"}
                        </span>

                    </div>
                </div>
            </div>
        </main>

    </>
}