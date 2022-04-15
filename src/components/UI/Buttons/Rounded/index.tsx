import {FC} from 'preact/compat';
import cx from 'classnames';
import {JSX, h} from 'preact';
 
interface RoundedButtonProps {
    as: 'button' | 'a';
    icon?: () => JSX.Element;
    size?: 'sm' | 'md' | 'lg';
    text: string;
    href?: string;
    className?: string;
    onClick?: () => void;
}

const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-32 h-32'
}
 
const RoundedButton: FC<RoundedButtonProps> = ({as, icon, text, size, href, className, onClick}) => {
    const Tag = as;
    const Icon = icon;
    const sizeClass = size && sizes[size];

    return ( 
        <Tag href={href} onClick={onClick} className={cx('rounded-full bg-blue-400 active:bg-blue-600 flex flex-col justify-center items-center', sizeClass, className)}>
            { Icon ? <Icon /> : null }
            <h3 className='text-white text-md'>{text}</h3>
        </Tag>
     );
}
 
export default RoundedButton;