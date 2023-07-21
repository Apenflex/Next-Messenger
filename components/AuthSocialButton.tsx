import { IconType } from "react-icons"

interface AuthSocialButtonProps {
    icon: IconType
    onClick: () => void
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({icon: Icon, onClick}) => {
  return <button type="button" onClick={onClick} className="authSocialButton"><Icon /></button>
}

export default AuthSocialButton