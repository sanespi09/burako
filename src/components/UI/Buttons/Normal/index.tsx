import {FC} from 'preact/compat';
import {JSX, h} from 'preact';
import cx from 'classnames';
 
interface NormalButtonProps {
    as: 'button' | 'a';
    icon?: () => JSX.Element;
    size?: 'sm' | 'md' | 'lg';
    text: string;
    href?: string;
    className?: string;
}

const sizes = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-40'
}
 
const NormalButton: FC<NormalButtonProps> = ({as, icon, text, size, href, className}) => {
    const Tag = as;
    const Icon = icon;
    const sizeClass = size && sizes[size];

    return ( 
        <Tag href={href} className={cx('rounded-lg bg-blue-400 active:bg-blue-600 flex justify-center py-3', sizeClass, className)}>
            { Icon ? <Icon /> : null }
            <h3 className='text-md text-white'>{text}</h3>
        </Tag>
     );
}
 
export default NormalButton;