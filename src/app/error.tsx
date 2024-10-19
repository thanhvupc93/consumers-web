'use client'
import Link from "next/link";
import "./globals.css";
import { Bounce, toast, ToastContainer } from "react-toastify";

type ErorProps = {
    message: string;
}

export default function CustomErrorPage({ message }: ErorProps) {
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
            <h1>404 - Page Not Found</h1>
            <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
            <Link className="text-blue underline underline-offset-2" href="/">Quay về trang chính
            </Link>
        </main>
    </>
}