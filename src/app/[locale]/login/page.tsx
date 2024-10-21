"use client"
import HeroContent from "@/modules/common/components/hero-content";
import LoginCommon from "@/modules/layout/templates/login";
import SignUpCommon from "@/modules/layout/templates/singup";
import { BreadcrumbsType } from "@/types/breadcrumbs";
import { IngredientType } from "@/types/ingredient";
import { UserType } from "@/types/user";
import { TAG_ACTIVI } from "@/utils/constants_css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const breadcrumbsPropsData: BreadcrumbsType[] = [
    {
        name: "Account",
        url: '/login'
    }
]

const allIngredients = [
    { "icon": "login", "label": "LOG IN" },
    { "icon": "singup", "label": "SING  UP" }
]

export default function Login() {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = useState(allIngredients[0]);

    function handleSelectedTab(item: IngredientType) {
        setSelectedTab(item);
    }

    const handleSubmitLogin = async (formData: UserType) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            localStorage.setItem('access_token', result.access_token);
            router.replace('/')
        } catch (err) {
            console.log(err)
            toast.error('Login Fail', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    const handleSubmitSingUp = async (formData: UserType) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            localStorage.setItem('access_token', result.access_token);
            router.replace('/')
        } catch (err) {
            console.log(err)
            toast.error('SingUp Fail', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }

    return <>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        ></ToastContainer>
        <HeroContent data={breadcrumbsPropsData}></HeroContent>

        <div className="pt-20"></div>
        <main>
            <div className="flex lg:w-[100%] justify-center">
                <nav>
                    <ul className="flex pt-6 pb-6">
                        {allIngredients.map((item) => (
                            <div key={`div_${item.label}`} className="pr-5 text-2xl font-light font-[family-name:var(--font-geist-chilanka)] ">
                                <li
                                    key={item.label}
                                    className={item === selectedTab ? TAG_ACTIVI : ""}
                                    onClick={() => handleSelectedTab(item)}
                                >
                                    {`${item.label}`}
                                    {item === selectedTab ? (
                                        <motion.div className="underline" layoutId="underline" />
                                    ) : null}
                                </li>
                            </div>

                        ))}
                    </ul>
                </nav>
            </div>

            <div className='border border-[--bs-light-border-subtle]'></div>


            <div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >

                        {selectedTab.icon == 'login' ? <LoginCommon onSubmit={handleSubmitLogin}></LoginCommon> : <SignUpCommon onSubmit={handleSubmitSingUp}></SignUpCommon>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main >


    </>
}