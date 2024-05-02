import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import { InputHTMLAttributes, useEffect } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { FaRegClock } from "react-icons/fa6"

type TTimeInputProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    error?: string
    register: UseFormRegister<T>
} & InputHTMLAttributes<HTMLInputElement>

export const TimeInput = <T extends FieldValues>(props: TTimeInputProps<T>) => {
    const { name, label, error, register, ...others } = props

    useEffect(() => {
        flatpickr(".form-timepicker", {
            mode: "single",
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            defaultDate: "13:45",
            static: true,
           
        })
    }, [])

    return (
        <label htmlFor={name} className="flex w-full flex-col">
            <span
                aria-disabled={others.disabled}
                className={`mb-1 text-xs font-semibold  text-[#101928] disabled:text-[#B7B7B7]`}
            >
                {label}

                {others.required ? <span className={`text-sm leading-none `}>*</span> : null}
            </span>

            <div
                className={`focus-within:border-primary flex flex-row justify-between gap-x-2 rounded-[6px] border border-[#D0D5DD] bg-transparent duration-200 ease-in ${
                    error ? "!border-[#EF233C]" : ""
                }`}
            >
                <input
                    disabled={others.disabled}
                    id={name}
                    className={` form-timepicker  w-full flex-1 p-4 text-sm font-normal text-[#101010] outline-none placeholder:text-sm placeholder:text-[#676767] disabled:cursor-not-allowed disabled:bg-[#F9F9F9] `}
                    {...register(name)}
                    {...others}
                    placeholder="mm/dd/yyyy"
                    data-class="flatpickr-right"
                />

                <div className="my-auto cursor-pointer pe-4">
                    <FaRegClock />
                </div>
            </div>

            {error && <span className={` mt-1 text-xs text-[#EF233C]`}>{error}</span>}
        </label>
    )
}
