'use client';

import SignUpCommon from "@/modules/layout/templates/singup";
import { UserType } from "@/types/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { fetchAPI } from "@/utils/fetch";
import { ResponseCustom } from "@/types/response";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const ModalUser = ({ isOpen, onClose, id }: ModalProps) => {
    const u = useTranslations('Admin_User');
    if (!isOpen) return null; // Don't render if the modal is not open
    const handleSubmitSingUp = async (formData: UserType) => {
        try {
            delete formData.roles;
            const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_USER_URL}`, id == 0 ? 'POST' : 'PUT', JSON.stringify(formData));
            if (response.statusText === 'account exist') {
                return toast.error(`${u('accountExist')}`, {
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
            } else {
                toast.success(id == 0 ? `${u('createdSuccess')}` : `${u('updateSuccess')}`, {
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
                    onClose();
                }, 3000);
            }

        } catch (err) {
            console.log(err)
            toast.error(id == 0 ? `${u('singUpFail')}` : `${u('updateFail')}`, {
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
    return (
        <>
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
            <div className="overlay">
                <div className="modal">
                    <button className="w-[100%] text-end closeButton" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="content">
                        <h2>{id != 0 ? u('editNewUser') : u('addNewUser')}</h2>
                        <SignUpCommon onSubmit={handleSubmitSingUp} id={id} />
                    </div>
                </div>
            </div></>
    );
};

export default ModalUser;