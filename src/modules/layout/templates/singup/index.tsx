import { UserType } from "@/types/user";
import { CSS_INPUT_DEFAULT } from "@/utils/constants_css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface SignUpCommonProps {
    onSubmit: (data: UserType) => void
}
export default function SignUpCommon({ onSubmit }: SignUpCommonProps) {
    const [validateEmail, setValidateEmail] = useState<boolean>(false);
    const [validatePhone, setValidatePhone] = useState<boolean>(false);
    const [validatePassword, setValidatePassword] = useState<boolean>(false);
    const [validateConfirmPassword, setValidateConfirmPassword] = useState<boolean>(false);
    const [signUpData, setSignUpData] = useState<UserType>({
        userName: '',
        password: ''
    });
    const checkValidateEmail = (email: string) => {
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(email);
    };
    const checkValidatePhone = (phone: string) => {
        const expression: RegExp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
        if (phone.match(/^\d{10}$/g)) {
            return expression.test(phone)

        } else return false;
    };

    const checkValidatePassword = (password: string): boolean => {
        const minLength = 8;
        const hasLowercase = /[a-z]/.test(password);
        const hasUppercase = /[A-Z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        return (
            password.length >= minLength &&
            hasLowercase &&
            hasUppercase &&
            hasDigit &&
            hasSpecialChar
        );
    }

    const checkSubmit = () => {
        if (signUpData.password != signUpData.rePassword || validateEmail || validatePhone) {
            if (!signUpData.email) setValidateEmail(true);
            if (!signUpData.phone) setValidatePhone(true)
            if (!signUpData.password) setValidatePassword(true)
            if (!signUpData.rePassword) setValidateConfirmPassword(true)
            return false;
        }
        return true;
    }

    const onChangeData = (
        (value: string, index: number) => {
            const data: UserType = signUpData;
            switch (index) {
                case 1:
                    data.fullName = value;
                    setSignUpData(data);
                    break;
                case 2:
                    data.email = value;
                    if (checkValidateEmail(value)) {
                        setValidateEmail(false);
                        setSignUpData(data);
                    } else {
                        setValidateEmail(true)
                    }
                    break;
                case 3:
                    data.phone = value;
                    if (checkValidatePhone(value)) {
                        setSignUpData(data);
                        setValidatePhone(false);
                    } else {
                        setValidatePhone(true);
                    }
                    break;
                case 4:
                    data.userName = value;
                    setSignUpData(data);
                    break;
                case 5:
                    data.password = value;
                    if (checkValidatePassword(value)) {
                        setSignUpData(data);
                        setValidatePassword(false);
                    } else {
                        setValidatePassword(true);
                    }
                case 6:
                    data.rePassword = value;
                    if (checkValidatePassword(value)) {
                        setSignUpData(data);
                        setValidateConfirmPassword(false);
                    } else {
                        setValidateConfirmPassword(true);
                    }
                    break;
                default:
                    setSignUpData(data);
            }
        }
    );

    const handleSubmitSingup = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (checkSubmit()) {
            onSubmit(signUpData);
        }
    };

    return <>
        <ToastContainer />
        <form onSubmit={handleSubmitSingup}>
            <div className="w-[60%] mx-auto  pt-5">
                <div className="w-[100%] h-[100%] mx-auto pt-5">
                    <input
                        type='text'
                        className='input_custom w-[100%] text-left pl-5 pt-5 pb-5'
                        placeholder='Enter Full Name'
                        onChange={(e) => onChangeData(e.target.value, 1)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto pt-5">
                    <input
                        type='text'
                        className={validateEmail ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                        placeholder='Enter Email Address'
                        onChange={(e) => onChangeData(e.target.value, 2)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto pt-5">
                    <input
                        type='text'
                        className={validatePhone ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                        placeholder='Enter Phone'
                        onChange={(e) => onChangeData(e.target.value, 3)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto pt-5">
                    <input
                        type='text'
                        className='input_custom w-[100%] text-left pl-5 pt-5 pb-5'
                        placeholder='Enter User Name'
                        onChange={(e) => onChangeData(e.target.value, 4)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto pt-3">
                    <input
                        type='password'
                        className={validatePassword ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                        placeholder='Enter Password'
                        onChange={(e) => onChangeData(e.target.value, 5)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto pt-3">
                    <input
                        type='password'
                        className={validateConfirmPassword ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                        placeholder='Enter Confirm Password'
                        onChange={(e) => onChangeData(e.target.value, 6)}
                    ></input>
                </div>

                <div className="w-[100%] h-[100%] mx-auto py-7 text-right  ">
                    <span className="text-[var(--text-orange-color)] font-normal text-xl  font-[family-name:var(--font-geist-chilanka)] "> {" Forgot Password?"} </span>
                </div>
                <button className="uppercase rounded-md  w-full h-16
                        border border-[--foreground] bg-[var(--text-o-secondary-color)] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] text-[var(--text-white-color)]">
                    <a className="lg:text-xl text-sm  ">{"sing up"}</a>
                </button>
            </div>
        </form>
    </>
}