import { BUTTON_BS_COLOR_CSS_DEFAULT } from "@/utils/constants_css";


interface InputQuanlityProps {
    changeQuantity: (data: number) => void;
    value: number
}

export default function InputQuanlity({ changeQuantity, value }: InputQuanlityProps) {

    function onChangeQuantity(data: string) {
        changeQuantity(Number(data));
    }

    function onPlusQuantity() {
        changeQuantity(value + 1);
    }

    function onSubstraction() {
        if (value !== 0) {
            changeQuantity(value - 1);
        }
    }
    return <>
        <div className="flex pt-1">
            <div className="button_silver_hover">
                <button onClick={() => onSubstraction()} id={`_size`} className={' button_mini' + BUTTON_BS_COLOR_CSS_DEFAULT} >
                    <a className="">{"-"}</a>
                </button>
            </div>
            <div className="">
                <input className={' input_custom p-2  max-h-4 max-w-20 mx-1 button_mini'} value={value} type="number" defaultValue={1}
                    onChange={(e) => onChangeQuantity(e.target.value)}></input>
            </div>

            <div className="button_silver_hover">
                <button onClick={() => onPlusQuantity()} id={`_size`} className={' button_mini' + BUTTON_BS_COLOR_CSS_DEFAULT} >
                    <a className="">{"+"}</a>
                </button>
            </div>
        </div>
    </>
}