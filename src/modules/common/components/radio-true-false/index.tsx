import { useTranslations } from "next-intl";
import { SetStateAction } from "react";

interface RadioTrueFalseProps {
    selectValue: string;
    changeRadio: (id: string) => void; // Định nghĩa kiểu cho hàm
}


export default function RadioTrueFalse({ selectValue, changeRadio }: RadioTrueFalseProps) {
    const au = useTranslations('Admin_User');
    const handleChangeActive = (event: { target: { value: SetStateAction<string>; }; }) => {
        const value: string = String(event.target.value);
        changeRadio(value);
    };
    return <>
        <div className="flex w-[100%] items-center">
            <div className="flex w-[50%]">{au('isActive')}: </div>
            <div className="flex w-[50%]">
                <label className="flex w-[50%] items-center space-x-10">
                    <input
                        type="radio"
                        name="yesno"
                        value="true"
                        checked={selectValue === 'true'}
                        onChange={handleChangeActive}
                    />
                    {au('yes')}
                </label>
                <label className="flex w-[50%] items-center space-x-10">
                    <input
                        type="radio"
                        name="yesno"
                        value="false"
                        checked={selectValue === 'false'}
                        onChange={handleChangeActive}
                    />
                    {au('no')}
                </label>
            </div>
        </div>
    </>
}