'use client'

interface SelectProps {
    label: string
    value?: Record<string, any>
    onChange: (value: Record<string, any>) => void
    options: Record<string, any>[]
    disabled?: boolean
}

const Select: React.FC<SelectProps> = ({ label, value, onChange, options, disabled }) => {
    return <div>Select</div>
}

export default Select
