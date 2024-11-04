import { CSS_INPUT_DEFAULT } from "@/utils/constants_css";
import { checkValidateEmail, checkValidateFullName, checkValidatePhone } from "@/utils/validate";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useUser } from "@/hook/context/userContext";
import { OrderType } from "@/types/order";

interface CheckOutUserInfoProps {
    changeUserInfo: (data: OrderType) => void;
}

export default function CheckOutUserInfo({ changeUserInfo }: CheckOutUserInfoProps) {
    const { state } = useUser();
    const u = useTranslations('User');
    const [validateFullName, setValidateFullName] = useState<boolean>(false);
    const [validateEmail, setValidateEmail] = useState<boolean>(false);
    const [validatePhone, setValidatePhone] = useState<boolean>(false);

    const [orderUserInfo, setOrderUserInfo] = useState<OrderType>({
        fullName: state?.fullName || "",
        email: state?.email || "",
        phone: state?.phone || "",
        userName: state?.userName || "",
        address: "",
        orderItems: []
    });
    changeUserInfo(orderUserInfo);

    const onChangeDataUserInfo = (
        (value: string, index: number) => {
            const data: OrderType = orderUserInfo;
            switch (index) {
                case 1: {
                    data.fullName = value;
                    if (!checkValidateFullName(value)) {
                        setValidateFullName(false);
                    } else {
                        setValidateFullName(true)
                    }
                    setOrderUserInfo(data);
                    changeUserInfo(data)
                    break;
                }
                case 2: {
                    data.email = value;
                    if (checkValidateEmail(value)) {
                        setValidateEmail(false);
                    } else {
                        setValidateEmail(true)
                    }
                    setOrderUserInfo(data);
                    changeUserInfo(data)
                    break;
                }
                case 3: {
                    data.phone = value;
                    if (checkValidatePhone(value)) {
                        setValidatePhone(false);
                    } else {
                        setValidatePhone(true);
                    }
                    setOrderUserInfo(data);
                    changeUserInfo(data)
                    break;
                }
                default:
                    break;
            }
        }
    );

    return <>
        <div className="w-[100%] mx-auto pt-5">
            <input
                type='text'
                className={validateFullName ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                placeholder={u('fullName')}
                defaultValue={state?.fullName || ""}
                onChange={(e) => onChangeDataUserInfo(e.target.value, 1)}
            ></input>
        </div>

        <div className="w-[100%]  mx-auto pt-5">
            <input
                type='text'
                className={validateEmail ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                placeholder={u('email')}
                defaultValue={state?.email || ""}
                onChange={(e) => onChangeDataUserInfo(e.target.value, 2)}
            ></input>
        </div>

        <div className="w-[100%] mx-auto pt-5">
            <input
                type='text'
                className={validatePhone ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                placeholder={u('phone')}
                defaultValue={state?.phone || ""}
                onChange={(e) => onChangeDataUserInfo(e.target.value, 3)}
            ></input>
        </div>
    </>
}