import { cn } from '@/lib/utils'

interface LoaderProps {
    // Size options for the loader
    size?: 'sm' | 'md' | 'lg' | 'xl'
    // Custom class names
    className?: string
    // Border width of the spinner
    thickness?: 'thin' | 'normal' | 'thick'
    // Center the loader in its container
    centered?: boolean
    // Optional custom colors (defaults to primary)
    variant?: 'default' | 'primary' | 'secondary' | 'destructive'
}

const Loader = ({
    size = 'md',
    className,
    thickness = 'normal',
    centered = false,
    variant = 'primary'
}: LoaderProps) => {
    // Size mappings
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-20 w-20'
    }

    // Thickness mappings
    const thicknessClasses = {
        thin: 'border',
        normal: 'border-2',
        thick: 'border-4'
    }

    // Variant mappings
    const variantClasses = {
        default: 'border-muted-foreground/20 border-t-muted-foreground',
        primary: 'border-primary/20 border-t-primary',
        secondary: 'border-secondary/20 border-t-secondary',
        destructive: 'border-destructive/20 border-t-destructive'
    }

    return (
        <div className={cn(
            'flex',
            centered && 'items-center justify-center',
            className
        )}>
            <div className={cn(
                'animate-spin rounded-full',
                sizeClasses[size],
                thicknessClasses[thickness],
                variantClasses[variant]
            )} />
        </div>
    )
}

export default Loader