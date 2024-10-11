'use client'
import Link from "next/link";
import "./globals.css";

export default function CustomErrorPage() {
    // You can add any UI inside Loading, including a Skeleton.
    return <>
        <main className="text-center my-40 font-normal text-xl font-[family-name:var(--font-geist-chilanka)] ">
            <h1>404 - Page Not Found</h1>
            <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
            <Link className="text-blue underline underline-offset-2" href="/">Quay về trang chính
            </Link>
        </main>
    </>
}