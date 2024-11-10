'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { fetchAPI } from "@/utils/fetch";
import { ResponseCustom } from "@/types/response";
import { CSS_INPUT_DEFAULT } from "@/constants/css";
import { useCallback, useEffect, useState } from "react";
import RadioTrueFalse from "../../../common/components/radio-true-false";
import { ColorType } from "@/types/color";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: number;
}

const ModalColor = ({ isOpen, onClose, id }: ModalProps) => {
    const p = useTranslations('Product');
    const [color, setColor] = useState<ColorType>({
        id: 0,
        title: '',
        value: '',
        isActive: false,
        isDelete: false,
        countData: 0
    });
    const [selectedValue, setSelectedValue] = useState('true');
    const [count, setCount] = useState(0);
    const [validatevalue, setValidateValue] = useState<boolean>(false);
    const [validateTitle, setValidateTitle] = useState<boolean>(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id != 0) {
                    const response = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_COLOR_URL}/${id}`, 'GET', null);
                    if (response.status === 200) {
                        const data: ColorType = response.data;
                        if (data.isActive) {
                            setSelectedValue('true');
                        } else {
                            setSelectedValue('false');
                        }
                        setColor(data)
                    }
                } else {
                    setColor({
                        id: 0,
                        title: '',
                        value: '',
                        isActive: false,
                        isDelete: false,
                        countData: 0
                    });
                }

            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [id]);

    const handleChangeActive = useCallback((value: string) => {
        const data: ColorType = color;
        setSelectedValue(value);
        if (value === 'false') {
            data.isActive = false;
        } else data.isActive = true;
        setColor(data);
        setCount(prevCount => prevCount + 1);
    }, [color]);

    if (!isOpen) return null; // Don't render if the modal is not open
    const onChangeData = (
        (value: string, index: number) => {
            const data: ColorType = color;
            switch (index) {
                case 1:
                    data.title = value;
                    setColor(data);
                    setValidateTitle(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 2:
                    data.value = value;
                    setColor(data);
                    setValidateValue(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                default:
                    console.log(count)
                    setColor(data);
            }
        }
    );

    const checkSubmit = () => {
        if (!color.value || !color.title || validatevalue || validateTitle) {
            if (!color.value) setValidateValue(true);
            if (!color.title) setValidateTitle(true)
            return false;
        }
        return true;
    }

    const handleSubmitSingup = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (checkSubmit()) {
            try {
                const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_COLOR_URL}`, id == 0 ? 'POST' : 'PUT', JSON.stringify(color));
                if (response.statusText === 'color exist') {
                    return toast.error(`${p('colorExist')}`, {
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
                    toast.success(id == 0 ? `${p('createdColorSuccess')}` : `${p('updateColorSuccess')}`, {
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
                toast.error(id == 0 ? `${p('createdColorFail')}` : `${p('updateColorFail')}`, {
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
                                    value={color?.title}
                                    onChange={(e) => onChangeData(e.target.value, 1)}
                                ></input>
                            </div>

                            <div className="w-[100%] h-[100%] mx-auto pt-3 pb-3 ">
                                <input
                                    type='text'
                                    className={validatevalue ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                                    placeholder={p('value')}
                                    value={color?.value}
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

export default ModalColor;