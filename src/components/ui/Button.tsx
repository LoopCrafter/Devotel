import { cn } from '@/utils/cn';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export const Button: React.FC<Props> = ({ children, className, variant = 'primary', ...rest }) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded text-sm font-medium transition-colors cursor-pointer',
        variant === 'primary'
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-gray-200 text-black hover:bg-gray-300',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
