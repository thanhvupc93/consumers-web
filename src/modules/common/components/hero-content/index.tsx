"use client"
import { BreadcrumbsType } from "@/types/breadcrumbs"
import Link from "next/link"
import { useTranslations } from "next-intl";

type BreadcrumbsProps = {
    data: BreadcrumbsType[]
}

export default function HeroContent({ data }: BreadcrumbsProps) {
    const h = useTranslations('HomePage');
    const userItems = [];
    for (let i = 0; i < data.length - 1; i++) {
        userItems.push(
            <a key={`heroContent_a_${i}`} className="px-1"> {"/"}</a>
        );
        userItems.push(
            <ul key={`heroContent_${i}`} className='text-xl font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)]'>
                <li key={`heroContent_li_${i}`}>
                    <Link key={`heroContent_link_${i}`} href={data[i].url} className='hover:text-[var(--text-orange-color)] hover:underline hover:underline-offset-2  text-left font-[family-name:var(--font-geist-chilanka)]'>
                        {i === (data.length - 2) ? data[i].name : h(`${data[i].name}`)}
                    </Link>
                </li>
            </ul>
        );
    }
    return <>
        <div className="pt-3 bg bg-[var(--background-hero-banner)]">
            <main>
                <div className='pt-20 pb-2'>
                    <span className='font-normal text-5xl text-left font-[family-name:var(--font-geist-chilanka)] hover:text-blue-500'>Shop</span>
                </div>

                <div className="flex pt-3 pb-20 ">
                    <ul key={"heroContent_Home"} className='text-xl font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)]'>
                        <li key={`heroContent_Home_li`}>
                            <Link key={"heroContent_link_Home"} href="/" className='hover:text-[var(--text-orange-color)] hover:underline hover:underline-offset-2  text-left font-[family-name:var(--font-geist-chilanka)] '>
                                {h('home')}
                            </Link>
                        </li>
                    </ul>
                    {userItems}
                </div>
            </main>
        </div>
    </>
}