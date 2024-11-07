'use client';
import "./styles.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { BUTTON_BS_COLOR_CSS_DEFAULT } from "@/constants/css";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    name: string;
    onDelete: () => void;
}

const ModalCOnfirmDelete = ({ isOpen, onClose, onDelete, message, name }: ModalProps) => {
    const u = useTranslations('Admin_User');
    if (!isOpen) return null; // Don't render if the modal is not open
    return (
        <>
            <div className="overlay">
                <div className="modal">
                    <button className="w-[100%] text-end closeButton" onClick={onClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <div className="content">
                        <h2>{u(message)}</h2>
                        <h2 className="pt-5 text-[var(--text-orange-color)] font-normal text-3xl  font-[family-name:var(--font-geist-chilanka)]">{name} </h2>
                        <div className="flex   pt-10">
                            <div className="flex w-[50%] justify-start">
                                <button
                                    className={`w-[80%] button_clear ` + BUTTON_BS_COLOR_CSS_DEFAULT}
                                    onClick={onDelete} >
                                    <a className="text-sm">{u('delete')} </a>
                                </button>
                            </div>
                            <div className="flex  w-[50%] text-center justify-end">
                                <button
                                    className={`w-[80%] button_submit` + BUTTON_BS_COLOR_CSS_DEFAULT}
                                    onClick={onClose} >
                                    <a className="text-sm">{u('cancel')}</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    );
};

export default ModalCOnfirmDelete;