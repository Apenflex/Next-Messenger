'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CldUploadButton } from 'next-cloudinary'
import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import Button from '@/components/Button'
import Input from '@/components/inputs/Input'
import Modal from '@/components/Modal'
import { delay } from '@/utils/async'

interface SettingsModalProps {
    currentUser: User
    isOpen?: boolean
    onClose: () => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ currentUser, isOpen, onClose }) => {
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
            name: currentUser?.name,
            image: currentUser?.image,
        },
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate: true })
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data)
        setIsLoading(true)
        const res = await fetch('/api/settings', { method: 'POST', body: JSON.stringify(data) })
        if (!res.ok) {
            setIsLoading(false)
            toast.error('Something went wrong')
            return
        }
        toast.success('Settings saved')
        await delay(900)
        router.refresh()
        onClose()
        setIsLoading(false)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">Edit your public information.</p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label="Name"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div>
                                <label className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        className="aspect-[3/3] rounded-full object-cover"
                                        src={image || currentUser?.image || '/assets/images/placeholder.jpg'}
                                        alt="User avatar"
                                        width={48}
                                        height={48}
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="wdpgyoha"
                                    >
                                        <Button type="button" secondary disabled={isLoading}>
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button secondary disabled={isLoading} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type='submit' disabled={isLoading}>
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
export default SettingsModal
