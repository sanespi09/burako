import { h, Fragment, JSX } from 'preact';
import { FC } from 'preact/compat';
import Header from './Header';

interface LayoutProps {
    children: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <div id="modal-container"/>
            <Header />
            <main className="w-full bg-blue-800">
                {children}
            </main>
        </>
    );
}

export default Layout;