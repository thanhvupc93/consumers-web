import "./globals.css";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <>
        <div className="flex text-center loading-container">
            <div className="flex loader"></div>
        </div>
    </>
}