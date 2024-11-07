import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

const SwitcherLanguage = () => {
    const currentPath = usePathname();
    const path = currentPath.substring(3);
    return (
        <div className="flex lg:space-x-3 ">
            <Link
                href={`/en/${path}`}
                className="bg-blue-500 text-white font-semibold rounded-md p-1"
            >
                <Image className="rounded-lg lg:max-h-20 lg:max-w-20 max-h-7 max-w-7" src='/images/en.jpg' width={40} height={40} alt='Picture of the author ' />
            </Link>
            <Link
                href={`/vi/${path}`}
                className="bg-blue-500 text-white font-semibold rounded-md p-1"
            >
                <Image className="rounded-lg lg:max-h-20 lg:max-w-20 max-h-7 max-w-7" src='/images/vn.jpg' width={40} height={40} alt='Picture of the author ' />
            </Link>

        </div>
    );
};

export default SwitcherLanguage;