"use client"
import { useUser } from "@/hook/context/userContext";
import { PagingDto, ResponseCustom } from "@/types/response";
import { UserType } from "@/types/user";
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
import ModalUser from "@/modules/common/components/popup-user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { RoleType } from "@/types/role";
import ModalCOnfirmDelete from "@/modules/common/components/popup-confirm-delete";
import { Bounce, ToastContainer, toast } from 'react-toastify';

export default function Account() {
    const u = useTranslations('Admin_User');
    const p = useTranslations('Paging');
    const [error, setEror] = useState(false);
    const [users, setUsers] = useState<UserType[]>();
    const [paging, setPaging] = useState<PagingDto>();
    const [selectPaging, setSelectPaging] = useState<number>(1);
    const [userSearch, setUerSearch] = useState<string>();
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [id, setSelectId] = useState<number>(0);
    const [userName, setUserName] = useState<string>("");

    const openModal = () => setIsModalOpen(true);
    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectId(0);
    }
    const closeDeleteModal = () => { setIsModalDeleteOpen(false); setSelectId(0); setUserName("") }
    const { state, dispatch } = useUser();

    const changeSelecePagePaging = useCallback((i: number) => {
        setSelectPaging(i + 1);
    }, []);

    const onDelete = async () => {
        const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_USER_URL}/${id}`, 'DELETE', null);
        if (response.status === 200) {

            toast.success(`${u('deleteSuccess')}`, {
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
            closeDeleteModal();
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const key = `?search=${userSearch}&page=${selectPaging}`
                const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_USER_URL}/${key}`, 'GET', null);
                if (response.status === 200) {
                    const data: UserType[] = response.data;
                    setUsers(data)
                    if (response.paging) {
                        setPaging(response.paging)
                    }
                }
                if (response.status === 401) {
                    dispatch({ type: 'LOGUOT' });
                    router.replace('/login')
                }
            } catch (err) {
                setUsers([])
                console.log(err)
                setEror(true);
            }
        };
        fetchData();
    }, [dispatch, router, selectPaging, userSearch, isModalOpen]);

    const changeSearch = useCallback((data: string) => {
        if (data || data == "") {
            setUerSearch(data)
        }
        setSelectPaging(1);
    }, []);
    const converRolseToString = async (data: RoleType[]) => {
        let formatRoles = "";
        if (data) {
            data.map(item => formatRoles += (item.name + ", "));
        }
        return formatRoles.substring(0, formatRoles.length - 2);

    }
    function handleClickEdit(id: number) {
        setSelectId(id);
        openModal();
    }
    function handleClickDelete(id: number, userName: string) {
        setUserName(userName);
        setSelectId(id);
        openDeleteModal();
    }

    if (checkIsAdmin(state.roles)) {
        return <CustomErrorPage message={u('needAdmin')}></CustomErrorPage>
    } else {
        if (!users) return <Loading></Loading>
        if (error) return <CustomErrorPage message='Loading fail.....' />
        if (users && paging && !error) {
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
                    <div className="flex w-[100%]">
                        <div className=" flex w-[33%]">
                            <span className='font-normal text-xl font-[family-name:var(--font-geist-chilanka)] '>
                                {` ${p('showing')}
                    ${Number(paging?.page) == 1 ? 1 : (Number(paging?.page - 1) * Number(paging.take) + 1)}
                    - ${(Number(paging?.page) == 1 ? Number(paging.take) : (Number(paging?.page) * Number(paging.take)))}
                    ${p('of')} ${paging?.itemCount} ${p('results')}`}
                            </span>
                        </div>
                        <div className=" flex w-[33%]">
                            <InputSearch text={u('userName')} changeSearch={changeSearch} />
                        </div>
                        <div className=" flex w-[34%] justify-end">
                            <div className="h-[80%]  flex" onClick={openModal}>
                                <BTAddNew />
                            </div>
                        </div>
                    </div>
                    <ModalUser isOpen={isModalOpen} onClose={closeModal} id={id} />
                    <ModalCOnfirmDelete isOpen={isModalDeleteOpen} onClose={closeDeleteModal} onDelete={onDelete} message={'deleteAccount'} name={userName} />
                    <table className='font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        <thead>
                            <tr >
                                <th>{u('userName')}</th>
                                <th>{u('fullName')}</th>
                                <th>{u('phone')}</th>
                                <th>{u('role')}</th>
                                <th>{u('isActive')}</th>
                                <th>{u('action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((item: UserType) => (
                                <><tr>
                                    <td>{item.userName}</td>
                                    <td>{item.fullName}</td>

                                    <td>{item.phone}</td>
                                    <td>{item.roles ? converRolseToString(item.roles) : ""}</td>
                                    <td>{item.isActive ? u('yes') : u('no')}</td>
                                    <td className="flex items-center justify-center">
                                        <div className="w-[20%]" onClick={() => handleClickEdit(item.id)} ><FontAwesomeIcon icon={faPenToSquare} /></div>
                                        <div className="w-[20%]" onClick={() => handleClickDelete(item.id, item.userName)}><FontAwesomeIcon icon={faTrash} /></div>
                                    </td>
                                </tr></>
                            ))}
                        </tbody>
                    </table>
                    <Paging paging={paging} selectPaging={selectPaging} changeSelecePagePaging={changeSelecePagePaging}></Paging>
                </main>
            </>
        }
    }

}