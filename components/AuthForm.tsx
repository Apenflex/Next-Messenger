'use client'

import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import AuthSocialButton from '@/components/AuthSocialButton'
import Button from '@/components/Button'
import Input from '@/components/inputs/Input'
import { delay } from '@/utils/async'

type Variant = 'Login' | 'Register'

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState<Variant>('Login')
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        setVariant((prev) => (prev === 'Login' ? 'Register' : 'Login'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            setIsLoading(true)
            if (variant === 'Register') {
                await fetch('/api/register', {
                    method: 'POST',
                    body: JSON.stringify(data),
                })
                toast.success('Account created successfully')
                await delay(700)
                await signIn('credentials', data)
            }

            if (variant === 'Login') {
                const callback = await signIn('credentials', {
                    ...data,
                    redirect: false,
                })

                if (callback?.error) {
                    toast.error('Invalid credentials')
                } else {
                    toast.success('Logged in successfully')
                    await delay(1000)
                    router.push('/users')
                }
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
        setIsLoading(false)
    }

    const socialAction = async (action: string) => {
        try {
            setIsLoading(true)
            const callback = await signIn(action, { redirect: false })

            if (callback?.error) {
                toast.error('Something went wrong')
            } else {
                toast.success('Logged in successfully')
                await delay(1000)
                router.push('/users')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === 'Register' && (
                        <Input label="Name" id="name" register={register} errors={errors} disabled={isloading} />
                    )}
                    <Input
                        label="Email address"
                        id="email"
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isloading}
                    />
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isloading}
                    />
                    <div className="">
                        <Button type="submit" disabled={isloading} fullWidth>
                            {variant === 'Login' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="flex relative justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>
                </div>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>{variant === 'Login' ? "Don't have an account?" : 'Already have an account?'}</div>
                    <div className="underline cursor-pointer" onClick={toggleVariant}>
                        {variant === 'Login' ? 'Create an account' : 'Login'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthForm
