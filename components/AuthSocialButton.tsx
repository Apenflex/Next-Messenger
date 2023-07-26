import { IconType } from 'react-icons'

interface AuthSocialButtonProps {
    icon: IconType
    onClick: () => void
}

export default function AuthSocialButton({ icon: Icon, onClick }: AuthSocialButtonProps) {
    return (
        <button type="button" onClick={onClick} className="authSocialButton">
            <Icon />
        </button>
    )
}
