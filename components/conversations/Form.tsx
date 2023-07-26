'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2'

import useConversation from '@/utils/hooks/useConversation'

import MessageInput from './MessageInput'

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
            <HiPhoto className="text-green-500" size={30} />
            <form className="flex w-full items-center gap-2 lg:gap-4" onSubmit={handleSubmit(onSubmit)}>
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    className="cursor-pointer rounded-full bg-gradient-to-r from-green-500 to-blue-400 p-2 transition hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500"
                    type="submit"
                >
                    <HiPaperAirplane className="text-white" size={18} />
                </button>
            </form>
        </div>
    )
}

export default Form
