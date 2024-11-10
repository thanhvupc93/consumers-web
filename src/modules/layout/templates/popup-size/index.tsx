'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { fetchAPI } from "@/utils/fetch";
import { ResponseCustom } from "@/types/response";
import { CSS_INPUT_DEFAULT } from "@/constants/css";
import { SizeType } from "@/types/size";
import { useCallback, useEffect, useState } from "react";
import RadioTrueFalse from "@/modules/common/components/radio-true-false";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const ModalSize = ({ isOpen, onClose, id }: ModalProps) => {
    const p = useTranslations('Product');
    const [size, setSize] = useState<SizeType>({
        id: 0,
        title: '',
        value: '',
        isActive: false,
        isDelete: false,
        count: 0
    });
    const [selectedValue, setSelectedValue] = useState('true');
    const [count, setCount] = useState(0);
    const [validatevalue, setValidateValue] = useState<boolean>(false);
    const [validateTitle, setValidateTitle] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id != 0) {
                    const response = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_SIZE_URL}/${id}`, 'GET', null);
                    if (response.status === 200) {
                        const data: SizeType = response.data;
                        if (data.isActive) {
                            setSelectedValue('true');
                        } else {
                            setSelectedValue('false');
                        }
                        setSize(data)
                    }
                } else {
                    setSize({
                        id: 0,
                        title: '',
                        value: '',
                        isActive: false,
                        isDelete: false,
                        count: 0
                    });
                }

            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [id]);

    const handleChangeActive = useCallback((value: string) => {
        const data: SizeType = size;
        setSelectedValue(value);
        if (value === 'false') {
            data.isActive = false;
        } else data.isActive = true;
        setSize(data);
        setCount(prevCount => prevCount + 1);
    }, [size]);

    if (!isOpen) return null; // Don't render if the modal is not open
    const onChangeData = (
        (value: string, index: number) => {
            const data: SizeType = size;
            switch (index) {
                case 1:
                    data.title = value;
                    setSize(data);
                    setValidateTitle(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 2:
                    data.value = value;
                    setSize(data);
                    setValidateValue(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                default:
                    console.log(count)
                    setSize(data);
            }
        }
    );

    const checkSubmit = () => {
        if (!size.value || !size.title || validatevalue || validateTitle) {
            if (!size.value) setValidateValue(true);
            if (!size.title) setValidateTitle(true)
            return false;
        }
        return true;
    }

    const handleSubmitSingup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (checkSubmit()) {
            try {
                const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_SIZE_URL}`, id == 0 ? 'POST' : 'PUT', JSON.stringify(size));
                if (response.statusText === 'size exist') {
                    return toast.error(`${p('sizeExist')}`, {
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
                    toast.success(id == 0 ? `${p('createdSizeSuccess')}` : `${p('updateSizeSuccess')}`, {
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
                toast.error(id == 0 ? `${p('createdSizeFail')}` : `${p('updateSizeFail')}`, {
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
    };
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
            <form onSubmit={handleSubmitSingup}>
                <div className="overlay">
                    <div className="modal">
                        <button className="w-[100%] text-end closeButton" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <div className="content">
                            <span className='font-normal pt-3 lg:text-3xl text-sm font-[family-name:var(--font-geist-chilanka)] '>
                                {id == 0 ? p('addNewSize') : p('editNewSize')}
                            </span>
                            <div className="w-[100%] h-[100%] mx-auto pt-3">
                                <input
                                    type='text'
                                    className={validateTitle ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                                    placeholder={p('title')}
                                    value={size?.title}
                                    onChange={(e) => onChangeData(e.target.value, 1)}
                                ></input>
                            </div>

                            <div className="w-[100%] h-[100%] mx-auto pt-3 pb-3 ">
                                <input
                                    type='text'
                                    className={validatevalue ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                                    placeholder={p('value')}
                                    value={size?.value}
                                    onChange={(e) => onChangeData(e.target.value, 2)}
                                ></input>
                            </div>
                            <div className="pt-3 pb-3">
                                <RadioTrueFalse selectValue={selectedValue} changeRadio={handleChangeActive}></RadioTrueFalse>
                            </div>

                            <button className="uppercase rounded-md  w-full h-16
                        border border-[--foreground] bg-[var(--text-o-secondary-color)] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] text-[var(--text-white-color)]">
                                <a className="lg:text-xl text-sm  ">{id == 0 ? `${p('new')}` : `${p('update')}`}</a>
                            </button>
                        </div>
                    </div>
                </div>
            </form></>
    );
};

export default ModalSize;