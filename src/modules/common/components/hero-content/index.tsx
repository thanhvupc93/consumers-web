export default function HeroContent() {
    return <>
        <div className="pt-3 bg bg-[var(--background-hero-banner)]">
            <main>
                <div className='pt-20 pb-2'>
                    <span className='font-normal text-5xl text-left font-[family-name:var(--font-geist-chilanka)] hover:text-blue-500'>Shop</span>
                </div>
                <div className="flex pt-5 pb-20 ">
                    <ul className='hover:text-[var(--text-orange-color)] font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer'>
                        <ol className='flex flex-row text-xl text-left font-[family-name:var(--font-geist-chilanka)] '>
                            {" Home / "}

                        </ol>
                    </ul>
                    <ul className='hover:text-[var(--text-orange-color)] font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer'>
                        <ol className='flex flex-row text-xl text-left font-[family-name:var(--font-geist-chilanka)] '>
                            {" Pages / "}
                        </ol>
                    </ul>
                    <ul className='hover:text-[var(--text-orange-color)] font-normal pr-[var(--bs-navbar-nav-link-padding-x)] pl-[var(--bs-navbar-nav-link-padding-x)] cursor-pointer'>
                        <ol className='flex flex-row text-xl text-left font-[family-name:var(--font-geist-chilanka)] '>
                            {" Shop"}
                        </ol>
                    </ul>

                </div>


            </main>

        </div>
    </>
}