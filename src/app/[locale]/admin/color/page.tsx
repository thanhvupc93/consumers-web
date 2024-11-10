"use client"
import { useUser } from "@/hook/context/userContext";
import { PagingDto, ResponseCustom } from "@/types/response";
import { fetchAPI } from "@/utils/fetch";
import { checkIsAdmin } from "@/utils/validate";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Loading from "../../loading";
import CustomErrorPage from "../../error";
import Paging from "@/modules/common/components/paging";
import InputSearch from "@/modules/common/components/input-search";
import BTAddNew from "@/modules/common/components/button-add-new";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalCOnfirmDelete from "@/modules/common/components/popup-confirm-delete";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import RadioTrueFalse from "@/modules/common/components/radio-true-false";
import ModalColor from "@/modules/layout/templates/popup-color";
import { ColorType } from "@/types/color";

export default function Account() {
    const u = useTranslations('Admin_User');
    const p = useTranslations('Product');
    const [error, setEror] = useState(false);
    const [colors, setColors] = useState<ColorType[]>();
    const [paging, setPaging] = useState<PagingDto>();
    const [selectPaging, setSelectPaging] = useState<number>(1);
    const [userSearch, setUerSearch] = useState<string>();
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [id, setSelectId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [selectedValue, setSelectedValue] = useState('true');

    const openModal = () => setIsModalOpen(true);
    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectId(0);
    }
    const closeDeleteModal = () => { setIsModalDeleteOpen(false); setSelectId(0); setTitle("") }
    const { state, dispatch } = useUser();

    const changeSelecePagePaging = useCallback((i: number) => {
        setSelectPaging(i + 1);
    }, []);

    const handleChangeActive = useCallback((value: string) => {
        setSelectedValue(value);
    }, []);

    const onDelete = async () => {
        const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_COLOR_URL}/${id}`, 'DELETE', null);
        if (response.status === 200) {
            toast.success(`${p('deleteColorSuccess')}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setTimeout(() => {
                closeDeleteModal();
            }, 3000);

        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const key = `?search=${userSearch}&page=${selectPaging}&active=${selectedValue}`
                const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_COLOR_URL}/${key}`, 'GET', null);
                if (response.status === 200) {
                    const data: ColorType[] = response.data;
                    setColors(data);
                    if (response.paging) {
                        setPaging(response.paging)
                    }
                }
                if (response.status === 401) {
                    dispatch({ type: 'LOGUOT' });
                    router.replace('/login')
                }
            } catch (err) {
                setColors([])
                console.log(err)
                setEror(true);
            }
        };
        fetchData();
    }, [dispatch, router, selectPaging, userSearch, isModalOpen, selectedValue]);

    const changeSearch = useCallback((data: string) => {
        if (data || data == "") {
            setUerSearch(data)
        }
        setSelectPaging(1);
    }, []);

    function handleClickEdit(id: number) {
        setSelectId(id);
        openModal();
    }
    function handleClickDelete(id: number, title: string) {
        setTitle(title);
        setSelectId(id);
        openDeleteModal();
    }
    if (checkIsAdmin(state.roles)) {
        return <CustomErrorPage message={u('needAdmin')}></CustomErrorPage>
    } else {
        if (!colors) return <Loading></Loading>
        if (error) return <CustomErrorPage message='Loading fail.....' />
        if (colors && paging && !error) {
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
                    theme="light" />
                <main>
                    <div className="flex lg:flex-row flex-col w-[100%]">
                        <div className="flex items-center lg:w-[50%] lg:pt-1 w-[100%]">
                            <InputSearch text={p('searchTitle')} changeSearch={changeSearch} />
                        </div>
                        <div className="flex lg:w-[30%] w-[100%] lg:pl-9 lg:pt-0 pt-3">
                            <RadioTrueFalse selectValue={selectedValue} changeRadio={handleChangeActive}></RadioTrueFalse>
                        </div>
                        <div className=" flex items-center lg:w-[20%] w-[100%] lg:pt-1 pt-3 pb-3 justify-end">
                            <div className="h-[80%]  w-[50%] flex" onClick={openModal}>
                                <BTAddNew />
                            </div>
                        </div>
                    </div>
                    <ModalColor isOpen={isModalOpen} onClose={closeModal} id={id} />
                    <ModalCOnfirmDelete isOpen={isModalDeleteOpen} onClose={closeDeleteModal} onDelete={onDelete} message={'deleteAccount'} name={title} />
                    <div className="table-container">
                        <table className='font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            <thead>
                                <tr >
                                    <th>{p('title')}</th>
                                    <th>{p('value')}</th>
                                    <th>{u('isActive')}</th>
                                    <th>{u('action')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {colors?.map((item: ColorType) => (
                                    <tr key={item.id}>
                                        <td>{item.title}</td>
                                        <td>{item.value}</td>
                                        <td>{item.isActive ? u('yes') : u('no')}</td>
                                        <td className="flex items-center justify-center">
                                            <div className="w-[20%]" onClick={() => handleClickEdit(item.id)} ><FontAwesomeIcon icon={faPenToSquare} /></div>
                                            <div className="w-[20%]" onClick={() => handleClickDelete(item.id, item.value)}><FontAwesomeIcon icon={faTrash} /></div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex pt-5">
                    </div>
                    <Paging paging={paging} selectPaging={selectPaging} changeSelecePagePaging={changeSelecePagePaging}></Paging>
                </main>
            </>
        }
    }

}