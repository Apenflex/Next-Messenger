'use client'

import { CldUploadButton } from 'next-cloudinary'
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

    const handleUpload = async (file: any) => {
        const message = await fetch('/api/messages', {
            method: 'POST',
            body: JSON.stringify({
                conversationId,
                image: file?.info?.secure_url,
            }),
        })
    }

    return (
        <div className="flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4">
            <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="wdpgyoha">
                <HiPhoto className="text-green-500" size={30} />
            </CldUploadButton>
            <form className="flex w-full items-center gap-2 lg:gap-4" onSubmit={handleSubmit(onSubmit)}>
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button className="ConversationFormButton" type="submit">
                    <HiPaperAirplane className="text-white" size={18} />
                </button>
            </form>
        </div>
    )
}

export default Form
