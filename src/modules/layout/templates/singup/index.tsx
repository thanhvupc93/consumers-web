import { UserType } from "@/types/user";
import { CSS_INPUT_DEFAULT } from "@/constants/css";
import { checkValidateEmail, checkValidatePassword, checkValidatePhone } from "@/utils/validate";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useTranslations } from "next-intl";
import { MultiValue } from 'react-select';
import Select from 'react-select';
import { fetchAPI } from "@/utils/fetch";
import { RoleType } from "@/types/role";
import Loading from "@/app/[locale]/loading";
import { checkIsAdmin } from "@/utils/validate";
import { useUser } from "@/hook/context/userContext";
import { USER_ROLE_USER } from "@/constants/data";
import { SelectDataType } from "@/types/SelectData";
import RadioTrueFalse from "@/modules/common/components/radio-true-false";

interface SignUpCommonProps {
    id: number;
    onSubmit: (data: UserType) => void
}

export default function SignUpCommon({ onSubmit, id }: SignUpCommonProps) {
    const u = useTranslations('User');
    const au = useTranslations('Admin_User');
    const { state } = useUser();
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [validateEmail, setValidateEmail] = useState<boolean>(false);
    const [validatePhone, setValidatePhone] = useState<boolean>(false);
    const [validatePassword, setValidatePassword] = useState<boolean>(false);
    const [validateConfirmPassword, setValidateConfirmPassword] = useState<boolean>(false);
    const [signUpData, setSignUpData] = useState<UserType>({
        id: 0,
        isActive: false,
        userName: '',
        password: ''
    });
    const [options, setOptions] = useState<SelectDataType[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<SelectDataType>>([]);
    const handleChange = (selected: MultiValue<SelectDataType>) => {
        setSelectedOptions(selected);
    };
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                // fetch Roles
                const response = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_ROLE_URL}/`, 'GET', null);
                if (response.data) {
                    const formattedData = response.data.map((item: RoleType) => ({
                        value: item.id,
                        label: item.name 
                    }));
                    setOptions(formattedData);
                    setLoading(false);
                }
                // fetch account
                if (id != 0) {
                    const response = await fetchAPI(`/${process.env.NEXT_PUBLIC_ALL_USER_URL}/${id}`, 'GET', null);
                    if (response.status === 200) {
                        const data: UserType = response.data;
                        data.rePassword = data.password;
                        // set select role
                        if (data.roles) {
                            const formattedData: SelectDataType[] = data.roles?.map((item: RoleType) => {
                                const data: SelectDataType = {
                                    value: String(item.id),
                                    label: item.name
                                }
                                return data
                            }
                            );
                            if (data.isActive) {
                                setSelectedValue('true');
                            } else {
                                setSelectedValue('false');
                            }
                            setSelectedOptions(formattedData);
                        }
                        setSignUpData(data)
                    }
                }

            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [id]);

    const handleChangeActive = useCallback((value: string) => {
        const data: UserType = signUpData;
        setSelectedValue(value);
        if (value === 'false') {
            data.isActive = false;
        } else data.isActive = true;
        setSignUpData(data);
        setCount(prevCount => prevCount + 1);
    }, [signUpData]);


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
                    setCount(prevCount => prevCount + 1);
                    break;
                case 2:
                    data.email = value;
                    if (checkValidateEmail(value)) {
                        setValidateEmail(false);
                    } else {
                        setValidateEmail(true)
                    }
                    setSignUpData(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 3:
                    data.phone = value;
                    if (checkValidatePhone(value)) {

                        setValidatePhone(false);

                    } else {
                        setValidatePhone(true);
                    }
                    setSignUpData(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 4:
                    data.userName = value;
                    setSignUpData(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 5:
                    data.password = value;
                    if (checkValidatePassword(value)) {
                        setValidatePassword(false);
                    } else {
                        setValidatePassword(true);
                    }
                    setSignUpData(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                case 6:
                    data.rePassword = value;
                    if (checkValidatePassword(value)) {
                        setValidateConfirmPassword(false);
                    } else {
                        setValidateConfirmPassword(true);
                    }
                    setSignUpData(data);
                    setCount(prevCount => prevCount + 1);
                    break;
                default:
                    console.log(count)
                    setSignUpData(data);
            }
        }
    );
    const setDefaultRole = () => {
        const rolseUser = options?.find(role => role.label === USER_ROLE_USER);
        if (rolseUser)
            signUpData.roleIds = [Number(rolseUser.value)]
    }

    const handleSubmitSingup = (e: { preventDefault: () => void; }) => {
        if (checkIsAdmin(state.roles)) {
            setDefaultRole();
        } else {
            if (selectedOptions.length === 0) {
                setDefaultRole();
            } else {
                const arrRoles = selectedOptions.map(item => Number(item.value));
                signUpData.roleIds = arrRoles;
            }

        }
        e.preventDefault();
        if (checkSubmit()) {
            onSubmit(signUpData);
        }
    };
    if (loading) return <Loading></Loading>
    if (!loading) {
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

            <form onSubmit={handleSubmitSingup}>
                <div className="lg:w-[60%] w-[90%] mx-auto pt-1">
                    <div className="w-[100%] h-[100%] mx-auto pt-3">
                        <input
                            type='text'
                            className='input_custom w-[100%] text-left pl-5 pt-3 pb-3'
                            placeholder={u('fullName')}
                            value={signUpData.fullName}
                            onChange={(e) => onChangeData(e.target.value, 1)}
                        ></input>
                    </div>

                    <div className="w-[100%] h-[100%] mx-auto pt-3">
                        <input
                            type='text'
                            className={validateEmail ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                            placeholder={u('email')}
                            value={signUpData.email}
                            onChange={(e) => onChangeData(e.target.value, 2)}
                        ></input>
                    </div>

                    <div className="w-[100%] h-[100%] mx-auto pt-3">
                        <input
                            type='text'
                            className={validatePhone ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                            placeholder={u('phone')}
                            value={signUpData.phone}
                            onChange={(e) => onChangeData(e.target.value, 3)}
                        ></input>
                    </div>

                    <div className="w-[100%] h-[100%] mx-auto pt-3">
                        <input
                            type='text'
                            className='input_custom w-[100%] text-left pl-5 pt-3 pb-3'
                            placeholder={u('userName')}
                            value={signUpData.userName}
                            onChange={(e) => onChangeData(e.target.value, 4)}
                        ></input>
                    </div>

                    <div className="w-[100%] h-[100%] mx-auto pt-3">
                        <input
                            type='password'
                            className={validatePassword ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                            placeholder={u('password')}
                            value={signUpData.password}
                            onChange={(e) => onChangeData(e.target.value, 5)}
                        ></input>
                    </div>

                    <div className="w-[100%] h-[100%] mx-auto pt-3">
                        <input
                            type='password'
                            className={validateConfirmPassword ? `input_custom_error ${CSS_INPUT_DEFAULT}` : `input_custom ${CSS_INPUT_DEFAULT}`}
                            placeholder={u('rePassword')}
                            value={signUpData.rePassword}
                            onChange={(e) => onChangeData(e.target.value, 6)}
                        ></input>
                    </div>
                    {!checkIsAdmin(state.roles)
                        ?
                        <>
                            <div className=" pt-3 ">
                                <RadioTrueFalse selectValue={selectedValue} changeRadio={handleChangeActive}></RadioTrueFalse>
                            </div>
                            <div className="w-[100%] h-[100%] mx-auto pt-3 pb-3">
                                <Select
                                    isMulti
                                    name="roless"
                                    options={options}
                                    value={selectedOptions}
                                    onChange={handleChange}
                                    placeholder={au('choseRoles')} />
                            </div></>
                        : <div className="w-[100%] h-[100%] mx-auto pt-3 pb-3"></div>
                    }
                    <button className="uppercase rounded-md  w-full h-16
                        border border-[--foreground] bg-[var(--text-o-secondary-color)] border-slate-300 cursor-pointer hover:bg-[var(--foreground)] text-[var(--text-white-color)]">
                        <a className="lg:text-xl text-sm  ">{"sing up"}</a>
                    </button>
                </div>
            </form>
        </>
    }

}
