import { CategoryType } from "@/types/category";
import InputSearch from "../input-search";


export default async function Aside() {
    const allCategories = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, { method: 'GET' });
    const categories: CategoryType[] = await allCategories.json();

    return <>
        <div>
            <InputSearch text='Search For Product'></InputSearch>
        </div>
        <div id="default-sidebar" className="absolute w-64 h-screen" aria-label="Sidebar">
            <div className="pt-8">
                <ul className="font-light font-[family-name:var(--font-geist-chilanka)]">
                    <div className="pb-5" ><span className="text-3xl mb-5"> Categories </span>
                    </div>
                    {categories.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="text-xl  hover:text-[var(--text-orange-color)] cursor-pointer">
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

