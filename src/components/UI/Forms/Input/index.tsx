import {FC} from 'preact/compat';
import {h} from 'preact';
 
interface InputProps {
    label?: string;
    className?: string;
    placeholder?: string;
    onBlur?: (e: Event) => void;
    onInput?: (e: Event) => void;
    name: string;
    value: string | number;
    type?: 'number' | 'text';
}
 
const Input: FC<InputProps> = ({label, className, placeholder, name, onBlur, onInput, value, type}) => {
    return (  
        <div className={className}>
            {label ? <label className='text-blue-200 text-base'>{label + ':'}</label> : null }
            <input className='w-full px-2 h-10 bg-white rounded-lg border border-blue-900 mt-2' type={type} placeholder={placeholder} value={value} onBlur={onBlur} onInput={onInput} name={name}/>
        </div>
    );
}
 
export default Input;