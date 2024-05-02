import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import { InputHTMLAttributes, useEffect } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import { FaCalendarAlt } from "react-icons/fa"

type TDateInputProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    error?: string
    register: UseFormRegister<T>
} & InputHTMLAttributes<HTMLInputElement>

export const DateInput = <T extends FieldValues>(props: TDateInputProps<T>) => {
    const { name, label, error, register, ...others } = props

    useEffect(() => {
        flatpickr(".form-datepicker", {
            mode: "single",
            static: true,
            monthSelectorType: "static",
            dateFormat: "M j, Y",
            prevArrow:
                '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
            nextArrow:
                '<svg class="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
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
                className={`focus-within:border-primary flex justify-between flex-row gap-x-2 rounded-[6px] border border-[#D0D5DD] bg-transparent duration-200 ease-in ${
                    error ? "!border-[#EF233C]" : ""
                }`}
            >
                <input
                    disabled={others.disabled}
                    id={name}
                    className={` form-datepicker  w-full flex-1 p-4 text-sm font-normal text-[#101010] outline-none placeholder:text-sm placeholder:text-[#676767] disabled:cursor-not-allowed disabled:bg-[#F9F9F9] `}
                    {...register(name)}
                    {...others}
                    placeholder="mm/dd/yyyy"
                    data-class="flatpickr-right"
                />

                <div className="my-auto cursor-pointer pe-4">
                    <FaCalendarAlt />
                </div>
            </div>

            {error && <span className={` mt-1 text-xs text-[#EF233C]`}>{error}</span>}
        </label>
    )
}
