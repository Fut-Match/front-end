import type React from 'react'

interface CustomButtonProps {
  children: React.ReactNode
  onClick: (e: React.FormEvent) => void
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  disabled?: boolean
  className?: string
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses =
    'relative overflow-hidden transition-all duration-300 font-semibold text-center border-none outline-none rounded-lg transform hover:scale-105 active:scale-95'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#F2442E] to-[#d63a2a] text-white shadow-lg hover:shadow-xl',
    secondary:
      'bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg hover:shadow-xl',
    outline:
      'bg-transparent text-[#F2442E] border-2 border-[#F2442E] hover:bg-gradient-to-r hover:from-[#F2442E] hover:to-[#d63a2a] hover:text-white hover:border-transparent',
    gradient:
      'bg-gradient-to-r from-[#F2442E] via-orange-500 to-yellow-500 text-white shadow-lg hover:shadow-xl',
  }

  const widthClass = fullWidth ? 'w-full' : ''
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed transform-none hover:scale-100'
    : 'cursor-pointer'

  // Create the angled/beveled shape with improved styling
  const shapeClasses = 'clip-path-angled'

  return (
    <>
      <style>{`
        .clip-path-angled {
          clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 100%, 15px 100%);
          position: relative;
        }
        .clip-path-angled::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
          clip-path: inherit;
          pointer-events: none;
          z-index: 1;
        }
        .clip-path-angled:hover::before {
          background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%);
        }
      `}</style>

      <button
        onClick={disabled ? undefined : onClick}
        className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses[variant]}
          ${widthClass}
          ${disabledClasses}
          ${shapeClasses}
          ${className}
        `}
        disabled={disabled}
      >
        <div className="relative z-10 flex items-center justify-center">
          {children}
        </div>
      </button>
    </>
  )
}

export default CustomButton
