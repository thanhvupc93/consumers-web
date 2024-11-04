'use client'
import Link from "next/link";
import "@/app/globals.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";

type ErorProps = {
    message: string;
}

export default function CustomErrorPage({ message }: ErorProps) {
    const p = useTranslations('Page');
    toast.error(message, {
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

    // You can add any UI inside Loading, including a Skeleton.
    return <>
        <ToastContainer />
        <main className="text-center my-40 font-normal text-xl font-[family-name:var(--font-geist-chilanka)] ">
            <h1>404 - {p('notFound')}</h1>
            <Link className="text-blue underline underline-offset-2" href="/">{p('backToHome')}
            </Link>
        </main>
    </>
}