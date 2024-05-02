import { TextareaHTMLAttributes } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"

type TInputProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    error?: string
    rows?: number
    register: UseFormRegister<T>
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextArea = <T extends FieldValues>(props: TInputProps<T>) => {
    const { name, label, error, rows, register, ...others } = props

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
                className={`focus-within:border-primary flex flex-row gap-x-2 overflow-hidden rounded-[6px] border border-[#D0D5DD] bg-transparent duration-200 ease-in ${
                    error ? "!border-[#EF233C]" : ""
                }`}
            >
                <textarea
                    disabled={others.disabled}
                    rows={rows ?? 10}
                    id={name}
                    className={` w-full flex-1 p-4 text-sm font-normal text-[#101010] outline-none placeholder:text-sm placeholder:text-[#676767] disabled:cursor-not-allowed disabled:bg-[#F9F9F9] `}
                    {...register(name)}
                    {...others}
                />
            </div>

            {error && <span className={` mt-1 text-xs text-[#EF233C]`}>{error}</span>}
        </label>
    )
}
