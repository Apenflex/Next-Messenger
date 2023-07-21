'use client'
import clsx from 'clsx'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface InputProps {
    label: string
    id: string
    type?: string
    required?: boolean
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
    disabled?: boolean
}

const Input: React.FC<InputProps> = ({ label, id, type, required, register, errors, disabled }) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(
                        `form_input`,
                        errors[id] && 'focus:ring-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
}

export default Input
