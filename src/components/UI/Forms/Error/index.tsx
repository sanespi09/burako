import {FunctionalComponent, h} from 'preact';
 
interface ErrorProps {
    text: string | null;
    className?: string;
}
 
const Error: FunctionalComponent<ErrorProps> = ({text, className}) => {
    if (!text){
        return null;
    }
    return ( 
        <div className={className}>
            <p className="text-red-300 text-sm font-bold">{text}</p>
        </div>
     );
}
 
export default Error;