interface ChipsProps {
    variant?: 'error' | 'success' | 'warning' | 'info' | 'default'
    label: string | React.ReactNode
}

export const Chip = ({ variant = 'default', label }: ChipsProps) => {

    const styleMap: Record<string, { bgColor: string, textColor: string }> = {
        error: { bgColor: 'bg-red-500/15', textColor: 'text-red-500' },
        success: { bgColor: 'bg-green-500/15', textColor: 'text-green-500' },
        warning: { bgColor: 'bg-yellow-500/15', textColor: 'text-yellow-500' },
        info: { bgColor: 'bg-blue-500/15', textColor: 'text-blue-500' },
        default: { bgColor: 'bg-gray-500/15', textColor: 'text-gray-500' }
    }
    const { bgColor, textColor } = styleMap[variant]
    function formatLabel(value: string): string {
        if (!value) return ''

        return value
            .trim()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
    }

    return (
        <span className={`px-2 py-1 text-nowrap ${bgColor} ${textColor} rounded-xl text-xs font-semibold flex gap-2 items-center`}>
            {typeof label === 'string' ? formatLabel(label) : label}
        </span>
    )

}