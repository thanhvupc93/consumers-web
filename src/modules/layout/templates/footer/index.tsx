import Image from "next/image";

export default function Footer() {
    return <>
        <main className="pb-28 align-items-center pt-20  px-3 py-12 flex flex-wrap">
            <div className="pb-3 pt-3  md:w-[25%] w-[100%]  min-h-24 min-w-24 max-h-60 m-w-50 px-3">
                <Image src='/images/logo.jpg' width={206} height={57} alt='Picture of the author ' />
                <p className='py-4 text-base font-light font-[family-name:var(--secondary-font)] '>
                    {"Subscribe to our newsletter to get updates about our grand offers."}
                </p>

            </div>
            <div className="pb-3 pt-3 md:w-[25%] w-[100%]  min-h-24 min-w-24 max-h-60 m-w-50 px-3">
                <h3 className='text-3xl font-light font-[family-name:var(--font-geist-chilanka)] '>
                    {"Quick Links"}
                </h3>
                <ul className="text-xl  font-[family-name:var(--font-geist-chilanka)] '">
                    <li className="pb-2">Home</li>
                    <li className="pb-2">About us</li>
                    <li className="pb-2">Offer </li>
                    <li className="pb-2">Services</li>
                    <li className="pb-2">Conatct Us</li>
                </ul>
            </div>
            <div className="pb-3 pt-3 md:w-[25%] w-[100%]  min-h-24 min-w-24 max-h-60 m-w-50 px-3">
                <h3 className='text-3xl font-light font-[family-name:var(--font-geist-chilanka)] '>
                    {"Help Center"}
                </h3>
                <ul className="text-xl  font-[family-name:var(--font-geist-chilanka)] '">
                    <li className="pb-2">FAQs</li>
                    <li className="pb-2">Payment</li>
                    <li className="pb-2">Returns & Refunds </li>
                    <li className="pb-2">Checkout</li>
                    <li className="pb-2">Delivery Information</li>
                </ul>
            </div>
            <div className=" md:w-[25%] w-[100%]  min-h-24 min-w-24 max-h-60 m-w-50 px-3">
                <h3 className='pb-3 pt-3 text-3xl font-light font-[family-name:var(--font-geist-chilanka)] '>
                    {"Our Newsletter"}
                </h3>
                <p className='py-4 text-base font-light font-[family-name:var(--secondary-font)] '>
                    {"Subscribe to our newsletter to get updates about our grand offers."}
                </p>
            </div>

            
        </main>
        <main >
            <div className='bg-bottom border border-[--bs-light-border-subtle]'></div>
        </main >
        <main >
            <div className='flex'>
                <div className='w-[50%]'>
                    <p className='py-4 text-base font-light font-[family-name:var(--secondary-font)] '>
                        {"© 2023 Waggy. All rights reserved."}
                    </p>
                </div>
                <div className='w-[50%] text-right'>
                    <p className='py-4 text-base font-light font-[family-name:var(--secondary-font)] '>
                        {"Free HTML Template by TemplatesJungle"}
                    </p>
                </div>
            </div>
           
        </main>
        
    </>
};
