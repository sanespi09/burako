import { FC } from 'preact/compat';
import { h } from 'preact';

interface DropdownProps {
    label?: string;
    className?: string;
    placeholder?: string;
    options: { label: string, value: number | string }[]
    onBlur?: (e: Event) => void;
    onInput?: (e: Event) => void;
    name: string;
    value: string | number;
}

const Dropdown: FC<DropdownProps> = ({ label, className, options, placeholder, name, onBlur, onInput, value }) => {
    return (
        <div className={className}>
            {label ? <label className='text-blue-200 text-base'>{label + ':'}</label> : null}
            <div className='relative mt-2'>
                <select className='w-full px-2 h-10 bg-white rounded-lg border border-blue-900 appearance-none' placeholder={placeholder} value={value} onBlur={onBlur} onChange={onInput} name={name}>
                    {options.map(option => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
                <div className='absolute h-full top-0 right-4 text-sm flex justify-center items-center pointer-events-none'>
                    <span>▼</span>
                </div>
            </div>
        </div>
    );
}

export default Dropdown;