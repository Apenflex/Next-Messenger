'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPhoto } from 'react-icons/hi2'

import useConversation from '@/utils/hooks/useConversation'

const Form = () => {
    const { conversationId } = useConversation()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            message: '',
        },
    })
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setValue('message', '', { shouldValidate: true })

        const message = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                conversationId,
            }),
        })
    }
    return (
        <div className="flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
            <HiPhoto className="text-sky-500" size={30} />
        </div>
    )
}

export default Form
