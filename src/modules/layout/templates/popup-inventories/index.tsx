'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { CSS_INPUT_DEFAULT } from "@/constants/css";
import { useCallback, useState } from "react";
import RadioTrueFalse from "@/modules/common/components/radio-true-false";
import { SelectDataType } from "@/types/SelectData";
import Select, { MultiValue, SingleValue } from "react-select";
import { InventoryPopupType } from "@/types/inventoryPopup";
import { InventoryType } from "@/types/inventory";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedOptionsColor: MultiValue<SelectDataType>;
    selectedOptionsSize: MultiValue<SelectDataType>;
    inventories: InventoryType[];
    addInventory: (data: InventoryPopupType) => void;
}

const ModalInventories = ({ isOpen, onClose, selectedOptionsColor, selectedOptionsSize, inventories, addInventory }: ModalProps) => {
    const p = useTranslations('Product');
    const [inventory, setInventory] = useState<InventoryPopupType>({
        price: 0,
        quantity: 0,
        isActive: true
    });

    const [selectedValue, setSelectedValue] = useState('true');
    const [count, setCount] = useState(0);
    const [selectedColor, setSelectedColor] = useState<SingleValue<SelectDataType>>(null);
    const handleChangeColor = (selected: SingleValue<SelectDataType>) => {
        const data: InventoryPopupType = inventory;
        data.color = Number(selected?.value);
        setInventory(data);
        setSelectedColor(selected);
    };

    const [selectedSize, setSelectedSize] = useState<SingleValue<SelectDataType>>(null);
    const handleChangeSize = (selected: SingleValue<SelectDataType>) => {
        const data: InventoryPopupType = inventory;
        data.size = Number(selected?.value);
        setInventory(data);
        setSelectedSize(selected);
    };

    const handleChangeActive = useCallback((value: string) => {
        const data: InventoryPopupType = inventory;
        setSelectedValue(value);
        if (value === 'false') {
            data.isActive = false;
        } else data.isActive = true;
        setInventory(data);
        setCount(prevCount => prevCount + 1);
    }, [inventory]);

    if (!isOpen) return null; // Don't render if the modal is not open
    const onChangeData = (
        (value: string, index: number) => {
            const data: InventoryPopupType = inventory;
            switch (index) {
                case 1:
                    data.quantity = Number(value);
                    setInventory(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 2:
                    data.price = Number(value);
                    setInventory(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                default:
                    console.log(count)
                    setInventory(data);
            }
        }
    );

    const checkSubmit = () => {
        if (!inventory.color && !inventory.size) {
            toast.error(`${p('addInventoryValidata')}`, {
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
            return false
        }
        const findInventories = inventories.find(data => data.color?.id === inventory.color && data.size?.id === inventory.size);
        if (findInventories) {
            toast.error(`${p('existInventoryValidata')}`, {
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
            return false;
        }
        return true;
    }

    const handleSubmitInventories = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (checkSubmit()) {
            addInventory(inventory);

            setTimeout(() => {
                toast.dismiss();
                onClose();
            }, 3000);
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
            <form onSubmit={handleSubmitInventories}>
                <div className="overlay">
                    <div className="modal">
                        <button className="w-[100%] text-end closeButton" onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <div className="content">
                            <span className='font-normal pt-3 lg:text-3xl text-sm font-[family-name:var(--font-geist-chilanka)] '>
                                {p('inventory')}
                            </span>

                            <div className="flex w-[100%] h-[100%] mx-auto pt-3 pb-3 items-center justify-center ">
                                <span className='text-left w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                    {p('color')}
                                </span>
                                <div key={`inventory_color_select`} className="w-[80%] h-[100%] mx-auto pt-3 pb-3">
                                    <Select
                                        isClearable={true}
                                        value={selectedColor}
                                        onChange={handleChangeColor}
                                        options={selectedOptionsColor}
                                        getOptionLabel={(e) => e.label}
                                    />
                                </div>
                            </div>

                            <div className="flex w-[100%] h-[100%] mx-auto pt-3 pb-3 items-center justify-center ">
                                <span className='text-left w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                    {p('size')}
                                </span>
                                <div key={`inventory_color_select`} className="w-[80%] h-[100%] mx-auto pt-3 pb-3">
                                    <Select
                                        value={selectedSize}
                                        isClearable={true}
                                        onChange={handleChangeSize}
                                        options={selectedOptionsSize}
                                        getOptionLabel={(e) => e.label}
                                    />
                                </div>
                            </div>

                            <div className="flex  w-[100%] h-[100%] mx-auto pt-3 items-center justify-center">
                                <span className='text-left w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                    {p('quantity')}
                                </span>
                                <div className="w-[80%] h-[100%] mx-auto pt-3 pb-3">
                                    <input
                                        type='number'
                                        className={`input_custom ${CSS_INPUT_DEFAULT}`}
                                        placeholder={p('quantity')}
                                        value={inventory?.quantity}
                                        onChange={(e) => onChangeData(e.target.value, 1)}
                                    ></input>
                                </div>
                            </div>
                            <div className="flex w-[100%] h-[100%] mx-auto pt-3 items-center justify-center">
                                <span className='text-left w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                                    {p('price')}
                                </span>
                                <div className="w-[80%] h-[100%] mx-auto pt-3 pb-3 items-center justify-center">
                                    <input
                                        type='number'
                                        className={`input_custom ${CSS_INPUT_DEFAULT}`}
                                        placeholder={p('price')}
                                        value={inventory?.price}
                                        onChange={(e) => onChangeData(e.target.value, 2)}
                                    ></input>
                                </div>
                            </div>

                            <div className="pt-3 pb-3">
                                <RadioTrueFalse selectValue={selectedValue} changeRadio={handleChangeActive}></RadioTrueFalse>
                            </div>

                            <button className="uppercase rounded-md  w-full h-16
                        border border-[--foreground] bg-[var(--text-o-secondary-color)] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] text-[var(--text-white-color)]">
                                <a className="lg:text-xl text-sm  ">{`${p('new')}`}</a>
                            </button>
                        </div>
                    </div>
                </div>
            </form></>
    );
};

export default ModalInventories;