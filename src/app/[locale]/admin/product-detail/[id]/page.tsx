"use client"
import CustomErrorPage from "@/app/[locale]/error";
import Loading from "@/app/[locale]/loading";
import { CSS_INPUT_DEFAULT } from "@/constants/css";
import { ProductType } from "@/types/product";
import { ResponseCustom } from "@/types/response";
import { fetchAPI } from "@/utils/fetch";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import Select, { MultiValue, SingleValue } from 'react-select';
import { SelectDataType } from "@/types/SelectData";
import { ColorType } from "@/types/color";
import { SizeType } from "@/types/size";
import { InventoryType } from "@/types/inventory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CategoryType } from "@/types/category";
import ModalInventories from "@/modules/layout/templates/popup-inventories";
import ModalCOnfirmDelete from "@/modules/common/components/popup-confirm-delete";
import BTAddNew from "@/modules/common/components/button-add-new";
import { InventoryPopupType } from "@/types/inventoryPopup";
import { useRouter } from "next/navigation";

export default function AdminProductDetail({ params }: { params: { id: string } }) {
    const page = useTranslations('Page');
    const p = useTranslations('Product');
    const u = useTranslations('Admin_User');
    const router = useRouter()
    const [error, setEror] = useState(false);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    const [inventories, setInventories] = useState<InventoryType[]>([]);
    const [product, setProduct] = useState<ProductType>({
        id: 0,
        image: '',
        title: '',
        type: '',
        description: '',
        defaultPrice: 0,
        inventories: [],
        colors: [],
        sizes: [],
        isActive: false,
        isDelete: false
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [indexInventory, setIndexInventory] = useState<number>(-1);
    const [title, setTitle] = useState<string>("");

    const openModal = () => setIsModalOpen(true);
    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setIndexInventory(-1);
    }
    const closeDeleteModal = () => { setIsModalDeleteOpen(false); setIndexInventory(-1); setTitle("") }

    const [category, setCategory] = useState<CategoryType[]>([]);
    const [colors, setColors] = useState<ColorType[]>([]);
    const [sizes, setSizes] = useState<SizeType[]>([]);

    const [validateTitle, setValidateTitle] = useState<boolean>(false);
    const [validateType, setValidateType] = useState<boolean>(false);
    const [validateDescription, setValidateDescription] = useState<boolean>(false);

    const [optionsColor, setOptionsColor] = useState<SelectDataType[]>([]);
    const [selectedOptionsColor, setSelectedOptionsColor] = useState<MultiValue<SelectDataType>>([]);
    const handleChangeColor = (selected: MultiValue<SelectDataType>) => {
        setSelectedOptionsColor(selected);
        const colorSelect: ColorType[] = selected.map(select => {
            return colors.filter(data => data.id === Number(select.value))[0];

        });
        const data: ProductType = product;
        data.colors = colorSelect;
        setProduct(data);
        setCount(prevCount => prevCount + 1);
    };

    const addInventory = useCallback((dataInventory: InventoryPopupType) => {
        const color = colors.find(data => data.id === Number(dataInventory.color));
        const size = sizes.find(data => data.id === Number(dataInventory.size));
        const newInventory: InventoryType = {
            color: color,
            size: size,
            price: dataInventory.price,
            quantity: dataInventory.quantity,
            isActive: dataInventory.isActive,
            isDelete: false
        };
        const inventoryState: InventoryType[] = inventories;
        inventoryState.push(newInventory);
        setCount(prevCount => prevCount + 1);
        setInventories(inventoryState);
        const data: ProductType = product;
        data.inventories = inventoryState;
        setProduct(data);
        toast.success(`${p('createdInventorySuccess')}`, {
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
    }, [colors, inventories, p, product, sizes]);

    const [optionsSize, setOptionsSize] = useState<SelectDataType[]>([]);
    const [selectedOptionsSize, setSelectedOptionsSize] = useState<MultiValue<SelectDataType>>([]);
    const handleChangeSize = (selected: MultiValue<SelectDataType>) => {
        setSelectedOptionsSize(selected);
        const sizesSelect: SizeType[] = selected.map(select => {
            return sizes.filter(data => data.id === Number(select.value))[0];

        });
        const data: ProductType = product;
        data.sizes = sizesSelect;
        setProduct(data);
        setCount(prevCount => prevCount + 1);
    };
    const initCategory = [{
        value: '0',
        label: '0'
    }];
    const [optionsCategory, setOptionsCategory] = useState(initCategory);
    const [selectedOptionsCategory, setSelectedOptionsCategory] = useState<SingleValue<SelectDataType>>(null);
    const handleChangeCategory = (selected: SingleValue<SelectDataType>) => {
        setSelectedOptionsCategory(selected);
        const selectCategory = category.find(data => data.id === Number(selected?.value));
        const data: ProductType = product;
        data.category = selectCategory;
        setProduct(data);
        setCount(prevCount => prevCount + 1);
    };

    const onDelete = () => {
        const data: ProductType = product;
        const inventoryState: InventoryType[] = inventories;
        inventoryState.splice(indexInventory, 1);
        data.inventories = inventoryState;
        setProduct(data);
        setInventories(inventoryState);
        setCount(prevCount => prevCount + 1);
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
        closeDeleteModal();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch Color
                const responseColors = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_COLOR_URL}`, 'GET', null);
                const colorsResponse: ColorType[] = responseColors.data;
                if (colorsResponse) {
                    const selectColorsData = colorsResponse.map((item: ColorType) => ({
                        value: String(item.id),
                        label: item.title
                    }));
                    setColors(colorsResponse);
                    setOptionsColor(selectColorsData);
                }

                // fetch Size
                const responseSizes = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_SIZE_URL}`, 'GET', null);
                const sizesResponse: SizeType[] = responseSizes.data;
                if (sizesResponse) {
                    const selectColorsData = sizesResponse.map((item: SizeType) => ({
                        value: String(item.id),
                        label: item.title
                    }));
                    setSizes(sizesResponse);
                    setOptionsSize(selectColorsData);
                }

                // fetch Category
                const responseCategories = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_CATEGORY_URL}`, 'GET', null);
                const categoryResponse: CategoryType[] = responseCategories.data;
                if (categoryResponse) {
                    const selectCategoryData = categoryResponse.map((item: CategoryType) => ({
                        value: String(item.id),
                        label: item.title
                    }));
                    setCategory(categoryResponse);
                    setOptionsCategory(selectCategoryData);
                }
                if (Number(params.id) != 0) {
                    const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}/${params.id}`, 'GET', null);
                    if (response) {
                        const data: ProductType = response.data;
                        const selectedColors = data.colors?.map((item: ColorType) => ({
                            value: String(item.id),
                            label: item.title
                        }));
                        const selectedSizes = data.sizes?.map((item: SizeType) => ({
                            value: String(item.id),
                            label: item.title
                        }));
                        const selectedCategory = {
                            value: String(data.category?.id),
                            label: String(data.category?.title)
                        }
                        if (data.inventories) setInventories(data.inventories);
                        if (selectedColors) setSelectedOptionsColor(selectedColors);
                        if (selectedSizes) setSelectedOptionsSize(selectedSizes);
                        if (selectedCategory.label && selectedCategory.value) setSelectedOptionsCategory(selectedCategory);
                        setProduct(data);
                        setLoading(false);
                    }
                }
                setLoading(false);
            } catch (err) {
                console.log(err)
                setEror(true)
                setLoading(false);
            }
        };
        fetchData();
    }, [params.id]);

    function handleClickDelete(indexInventory: number) {
        setTitle(title);
        setIndexInventory(indexInventory);
        openDeleteModal();
    }

    const onChangeData = (
        (value: string, index: number) => {
            const data: ProductType = product;
            switch (index) {
                case 1:
                    data.title = value;
                    setProduct(data);
                    setValidateTitle(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 2:
                    data.type = value;
                    setProduct(data);
                    setValidateType(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 3:
                    data.description = value;
                    setProduct(data);
                    setValidateDescription(false);
                    setCount(prevCount => prevCount + 1);
                    break;
                default:
                    console.log(count)
                    setProduct(data);
            }
        }
    );
    const onChangeInventory = (
        (value: string, index: number, type: number) => {
            const data: ProductType = product;
            switch (type) {
                case 1:
                    if (data.inventories) {
                        data.inventories[index].quantity = Number(value);
                        setProduct(data);
                        setValidateTitle(false);
                        setCount(prevCount => prevCount + 1);
                    }
                    break;
                case 2:
                    if (data.inventories) {
                        data.inventories[index].price = Number(value);
                        setProduct(data);
                        setValidateTitle(false);
                        setCount(prevCount => prevCount + 1);
                    }
                    break;
                default:
                    setProduct(data);
            }
        }
    );
    const handleSubmitProduct = async () => {

        const response: ResponseCustom = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_PRODUCT_URL}`, product.id != 0 ? 'PUT' : 'POST', JSON.stringify(product));
        if (response.status === 200) {
            setProduct(response.data);
            if (product.id != 0) {
                toast.success(`${p('updateProductSuccess')}`, {
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

            } else {
                toast.success(`${p('createdProductSuccess')}`, {
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
            }
            setTimeout(() => {
                router.replace('/admin/product')
            }, 1000);
        } else {
            if (product.id != 0) {
                toast.error(`${p('updateProductError')}`, {
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
            } else {
                toast.error(`${p('createdProductError')}`, {
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
            }

        }

    };
    if (loading) return <Loading></Loading>
    if (error) return <CustomErrorPage message={page('notFound')}></CustomErrorPage>
    if (product) {
        return <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            ></ToastContainer>
            <ModalCOnfirmDelete isOpen={isModalDeleteOpen} onClose={closeDeleteModal} onDelete={onDelete} message={'deleteInventory'} name={title} />
            <main>
                <div className="flex w-[100%] h-[100%] mx-auto pt-3 items-center justify-center ">
                    <span className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl font-[family-name:var(--font-geist-chilanka)] '>
                        {p('title')}
                    </span>
                    <input
                        type='text'
                        className={validateTitle ? `input_custom_error w-[80%] ${CSS_INPUT_DEFAULT}` : `input_custom w-[80%] ${CSS_INPUT_DEFAULT}`}
                        placeholder={p('title')}
                        value={product?.title}
                        onChange={(e) => onChangeData(e.target.value, 1)}
                    ></input>
                </div>
                <div className="flex w-[100%] h-[100%] mx-auto pt-3 items-center justify-center">
                    <span className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        {p('type')}
                    </span>
                    <input
                        type='text'
                        className={validateType ? `input_custom_error w-[80%] ${CSS_INPUT_DEFAULT}` : `input_custom w-[80%] ${CSS_INPUT_DEFAULT}`}
                        placeholder={p('type')}
                        value={product?.type}
                        onChange={(e) => onChangeData(e.target.value, 2)}
                    ></input>
                </div>

                <div className="flex w-[100%] h-[100%] mx-auto pt-3 items-center justify-center">
                    <span className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        {p('category')}
                    </span>
                    <div className="w-[80%] h-[100%] mx-auto pt-3 pb-3">
                        <Select
                            value={selectedOptionsCategory}
                            onChange={handleChangeCategory}
                            options={optionsCategory}
                            getOptionLabel={(e) => e.label}
                        />
                    </div>
                </div>
                <div className="flex w-[100%] h-[100%] mx-auto pt-3 items-center justify-center">
                    <span className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        {p('color')}
                    </span>
                    <div className="w-[80%] h-[100%] mx-auto pt-3 pb-3">
                        <Select
                            isMulti
                            name="colors"
                            options={optionsColor}
                            value={selectedOptionsColor}
                            onChange={handleChangeColor}
                            placeholder={p('color')} />
                    </div>
                </div>
                <div className="flex w-[100%] h-[100%] mx-auto pt-3 items-center justify-center">
                    <span className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        {p('size')}
                    </span>
                    <div className="w-[80%] h-[100%] mx-auto pt-3 pb-3">
                        <Select
                            isMulti
                            name="sizes"
                            options={optionsSize}
                            value={selectedOptionsSize}
                            onChange={handleChangeSize}
                            placeholder={p('size')} />
                    </div>
                </div>

                <div className="flex w-[100%] mx-auto pt-3">
                    <span className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        {p('description')}
                    </span>
                    <textarea
                        className={validateDescription ? `input_custom_error w-[80%] h-[300px] ${CSS_INPUT_DEFAULT}` : `input_custom  h-[300px]  w-[80%] ${CSS_INPUT_DEFAULT}`}
                        placeholder={p('description')}
                        value={product?.description}
                        onChange={(e) => onChangeData(e.target.value, 3)}
                    ></textarea>
                </div>
                <div className="flex w-[100%] mx-auto pt-3">
                    <div className="flex flex-end w-[100%] items-center  lg:pt-1 pt-3 pb-3 justify-end">
                        <div className="h-[80%] text-end w-[20%] flex" onClick={openModal}>
                            <BTAddNew />
                        </div>
                    </div>
                </div>

                <div className="flex w-[100%] mx-auto pt-3">
                    <span id="product_detail_price" className=' w-[20%] lg:pr-3 pr-1 text-[var(--text-orange-color)] font-normal lg:text-2xl text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                        {p('saleDetail')}
                    </span>
                    <div className="table-container w-[80%]">
                        <ModalInventories isOpen={isModalOpen} onClose={closeModal}
                            selectedOptionsColor={selectedOptionsColor} selectedOptionsSize={selectedOptionsSize}
                            inventories={inventories}
                            addInventory={addInventory}>
                        </ModalInventories>
                        <table className='font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] '>
                            <thead>
                                <tr >
                                    <th>{p('color')}</th>
                                    <th>{p('size')}</th>
                                    <th>{p('quantity')}</th>
                                    <th className='max-w-20'>{p('price')}</th>
                                    <th>{u('delete')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventories?.map((item: InventoryType, index: number) => (
                                    <tr key={item.id || 0 + new Date().getTime()}>
                                        <td>{item.color?.title}</td>
                                        <td>{item.size?.title}</td>
                                        <td className="max-w-36">
                                            <input onChange={(e) => onChangeInventory(e.target.value, index, 1)} className="input_custom w-full" type="text" name="name" value={item.quantity} placeholder="Nhập tên" />
                                        </td>
                                        <td className="max-w-36">
                                            <input onChange={(e) => onChangeInventory(e.target.value, index, 2)} className="input_custom w-full" type="text" name="name" value={item.price} placeholder="Nhập tên" />
                                        </td>
                                        <td className="text-center">
                                            <FontAwesomeIcon onClick={() => handleClickDelete(index)} icon={faTrash} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex w-[100%] mx-auto pt-3">
                    <span className=' w-[20%] '>
                    </span>
                    <div className="table-container w-[80%]">
                        <button onClick={() => handleSubmitProduct()} className="uppercase rounded-md  w-full h-16
                        border border-[--foreground] bg-[var(--text-o-secondary-color)] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] text-[var(--text-white-color)]">
                            <a className="lg:text-xl text-sm  ">{product?.id ? p('update') : p('created')}</a>
                        </button>
                    </div>
                </div>
            </main>
        </>
    }
}