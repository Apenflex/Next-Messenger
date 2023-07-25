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
        <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
            <HiPhoto />
        </div>
    )
}

export default Form
