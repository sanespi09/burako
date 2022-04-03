import {h} from 'preact'
import { FC } from 'preact/compat';
import { Link } from 'wouter-preact';
 
interface HeaderProps {
    
}
 
const Header: FC<HeaderProps> = () => {
    return ( 
         <header className='border-b border-blue-800 h-12 bg-blue-500 flex items-center px-4'>
             <div>
                 <Link href="/" className='text-white'>
                     BURAKO
                 </Link>
             </div>
         </header>
    );
}
 
export default Header;