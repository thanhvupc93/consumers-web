import Image from "next/image";

export default function FooterImage() {
    const userItems = [];
    for (let i = 0; i < 6; i++) {
        userItems.push(<div className="pl-2 pt-3  md:w-[calc(100%/6)] h-[100%]">
            <Image className="rounded-lg min-h-[300px] min-w-[300px]" src={`/images/insta${i + 1}.jpg`} width={290} height={290} alt='Picture of the author ' />
        </div>)
    }

    return <>
        <div className="flex align-items-center py-6">
            {userItems}
        </div>
    </>
}