'use client'

import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiAlertTriangle } from 'react-icons/fi'

import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { delay } from '@/utils/async'
import useConversation from '@/utils/hooks/useConversation'

interface ConfirmModalProps {
    isOpen?: boolean
    onClose: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter()
    const { conversationId } = useConversation()
    const [isLoading, setIsLoading] = useState(false)

    const onDelete = useCallback(async () => {
        setIsLoading(true)
        const res = await fetch(`/api/conversations/${conversationId}`, {
            method: 'DELETE',
        })

        if (!res.ok) {
            setIsLoading(false)
            toast.error('Something went wrong')
            return
        }
        // console.log('deleted')
        onClose()
        toast.success('Conversation deleted')
        await delay(700)
        router.push('/conversations')
        router.refresh()
    }, [conversationId, onClose, router])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <div className="sm:flex sm:items-start">
                    <div
                        className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center
                        rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10`}
                    >
                        <FiAlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Delete conversation
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you sure you want to delete this conversation? This action cannot be undone.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mt-5 flex flex-row-reverse gap-x-2 sm:mt-4 sm:flex">
                    <Button disabled={isLoading} danger onClick={onDelete}>
                        Delete
                    </Button>
                    <Button disabled={isLoading} secondary onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default ConfirmModal
