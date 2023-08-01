'use client'

import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Button from '@/components/Button'
import Input from '@/components/inputs/Input'
import Select from '@/components/inputs/Select'
import Modal from '@/components/Modal'
import { delay } from '@/utils/async'

interface GroupChatModalProps {
    users: User[]
    isOpen?: boolean
    onClose: () => void
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({ users, isOpen, onClose }) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [],
        },
    })

    const members = watch('members')

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        const res = await fetch('/api/conversations', {
            method: 'POST',
            body: JSON.stringify({ ...data, isGroup: true }),
        })
        if (!res.ok) {
            setIsLoading(false)
            toast.error('Something went wrong')
            return
        }
        toast.success('Group created')
        await delay(900)
        router.refresh()
        onClose()
        setIsLoading(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Create a group chat</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Create a chat more than 2 people.</p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                register={register}
                                label="Name"
                                id="name"
                                disabled={isLoading}
                                required
                                errors={errors}
                            />
                            <Select
                                disabled={isLoading}
                                label="Members"
                                options={users.map((user) => ({ value: user.id, label: user.name }))}
                                onChange={(value) => setValue('members', value, { shouldValidate: true })}
                                value={members}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <Button type="button" disabled={isLoading} onClick={onClose} secondary>
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                        Create
                    </Button>
                </div>
            </form>
        </Modal>
    )
}

export default GroupChatModal
