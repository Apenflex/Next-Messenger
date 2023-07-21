'use client'

import axios from 'axios'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { BsGithub, BsGoogle } from 'react-icons/bs'

import AuthSocialButton from '@/components/AuthSocialButton'
import Button from '@/components/Button'
import Input from '@/components/inputs/Input'

type Variant = 'Login' | 'Register'

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('Login')
    const [isloading, setIsLoading] = useState(false)

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
        setIsLoading(true)
        
        if (variant === 'Register') {
            axios.post('/api/register', data)
                .then(() => toast.success('Account created successfully'))
                .catch(() => toast.error('Something went wrong'))
                .finally(() => setIsLoading(false))
        }
        if (variant === 'Login') {
            // NextAuth SignIn
        }
        // setIsLoading(false)
    }

    const socialAction = (action: string) => {
        setIsLoading(true)
        // NextAuth Social SignIn
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
                        <div className="relative flex justify-center text-sm">
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
