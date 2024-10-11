import { PagingDto } from "@/types/response";
import { PAGING_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK, PAGING_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT } from "@/utils/constants_css";

interface PagingProps {
    paging: PagingDto;
    changeSelecePagePaging: (id: number) => void; // Định nghĩa kiểu cho hàm
    selectPaging: number;
}

export default function Paging({ paging, changeSelecePagePaging, selectPaging }: PagingProps) {

    const userItems = [];
    for (let i = 0; i < paging.pageCount; i++) {
        userItems.push(<span id={`paging-${i}`} onClick={() => changeSelecePagePaging(i)} className={selectPaging === i + 1 ? PAGING_LABEL_TEXT_ORANGE_COLOR_CSS_CLICK : PAGING_LABEL_TEXT_ORANGE_COLOR_CSS_DEFAULT} >
            {Number(i) + 1}
        </span>);
    }
    return <>
        <div className="flex justify-center  lg:text-5xl text-sm ">
            <div className="flex  mx-7">
                <span className='hover:text-[var(--text-orange-color)] cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z"></path></svg>

                </span>
                <div className="justify-center ">
                    {userItems}
                </div>
                <span className='hover:text-[var(--text-orange-color)] cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6z"></path></svg>
                </span>
            </div>
        </div>
    </>
}