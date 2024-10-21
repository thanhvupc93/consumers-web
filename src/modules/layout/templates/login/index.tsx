import { UserType } from "@/types/user";
import { CSS_INPUT_DEFAULT } from "@/utils/constants_css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface LoginCommonProps {
    onSubmit: (data: UserType) => void
}
export default function LoginCommon({ onSubmit }: LoginCommonProps) {

    const [validateUserName, setValidateUserName] = useState<boolean>(false);
    const [validatePassword, setValidatePassword] = useState<boolean>(false);

    const [loginData, setLoginData] = useState<UserType>({
        userName: '',
        password: ''
    });

    const onChangeData = (
        (value: string, index: number) => {
            const data: UserType = loginData;
            if (index == 1) {
                data.userName = value;
                setValidateUserName(false);
                setLoginData(data);
            } else {
                data.password = value;
                setLoginData(data);
                setValidatePassword(false);
            }

        }
    );

    const checkSubmit = () => {
        if (!loginData.password || !loginData.userName || validateUserName || validatePassword) {
            if (!loginData.userName) setValidateUserName(true);
            if (!loginData.password) setValidatePassword(true)
            return false;
        }
        return true;
    }

    const handleSubmitLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (checkSubmit()) {
            onSubmit(loginData);
        }
    };

    return <>
        <ToastContainer />
        <form onSubmit={handleSubmitLogin}>
            <div className="w-[60%] mx-auto  pt-5">
                <div className="w-[100%] h-[100%] mx-auto pt-5">
                    <input
                        type='text'
                        className={validateUserName ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                        placeholder='Enter Email Address'
                        onChange={(e) => onChangeData(e.target.value, 1)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto pt-3">
                    <input
                        type='password'
                        className={validatePassword ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                        placeholder='Enter Password'
                        onChange={(e) => onChangeData(e.target.value, 2)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto py-7 text-right  ">
                    <span className="text-[var(--text-orange-color)] font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] "> {" Forgot Password?"} </span>
                </div>
                <button className="uppercase rounded-md  w-full h-16
                        border border-[--foreground] bg-[var(--text-o-secondary-color)] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] text-[var(--text-white-color)]">
                    <a className="lg:text-xl text-sm  ">{"login"}</a>
                </button>
            </div>
        </form>
    </>
}