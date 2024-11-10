"use client"
import { useUser } from "@/hook/context/userContext";
import HeroContent from "@/modules/common/components/hero-content";
import LoginCommon from "@/modules/layout/templates/login";
import SignUpCommon from "@/modules/layout/templates/singup";
import { BreadcrumbsType } from "@/types/breadcrumbs";
import { IngredientType } from "@/types/ingredient";
import { UserType } from "@/types/user";
import { TAG_ACTIVI } from "@/constants/css";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { useTranslations } from "next-intl";
import { fetchAPI } from "@/utils/fetch";
import { ResponseCustom } from "@/types/response";

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
    const { dispatch: dispatchUser } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedTab, setSelectedTab] = useState(allIngredients[0]);
    const u = useTranslations('Admin_User');
    function handleSelectedTab(item: IngredientType) {
        setSelectedTab(item);
    }

    const handleSubmitLogin = async (formData: UserType) => {
        try {
            const response: ResponseCustom = await fetchAPI(`${process.env.NEXT_PUBLIC_LOGIN}`, 'POST', JSON.stringify(formData));
            switch (response.statusText) {
                case 'account not exist':
                    toast.error(`${u('accountNotExist')}`, {
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
                    break;
                case 'wrong password':
                    toast.error(`${u('wrongPassword')}`, {
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
                    break;
                default:
                    const token = response.statusText;
                    localStorage.setItem('access_token', token);
                    const decode: { id: number, userName: string } = jwtDecode(token);
                    dispatchUser({ type: 'LOGIN', payload: { token: token } });
                    const callbackUrl = searchParams.get('callbackUrl');
                    if (callbackUrl) {
                        await signIn('credentials', {
                            id: decode.id + "",
                            username: decode.userName,
                            redirect: true,
                            callbackUrl: callbackUrl,
                        })
                    } else {
                        await signIn('credentials', {
                            id: decode.id + "",
                            username: decode.userName,
                            redirect: false
                        })
                        router.replace('/')
                    }
                    break;
            }
        } catch (err) {
            console.log(err)
            toast.error(`${err}`, {
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

            const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_USER_URL}`, 'POST', JSON.stringify(formData));
            switch (response.statusText) {
                case 'account exist':
                    toast.error(`${u('accountExist')}`, {
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
                    break;

                default:
                    dispatchUser({ type: 'LOGIN', payload: { token: response.statusText } });
                    router.replace('/')
            }
        } catch (err) {
            console.log(err)
            toast.error(`${u('singUpFail')}`, {
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
        />
        <HeroContent data={breadcrumbsPropsData} />

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

                        {selectedTab.icon == 'login' ? <LoginCommon onSubmit={handleSubmitLogin} /> : <SignUpCommon id={0} onSubmit={handleSubmitSingUp} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main >


    </>
}