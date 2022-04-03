import { h, FunctionalComponent, Fragment } from 'preact';
import { createPortal } from 'preact/compat';
import { useEffect } from 'preact/hooks';
import cx from 'classnames';

interface ModalProps {
    open: boolean;
    closeModal: () => void;
}

interface ModalContainerProps {
    closeModal: () => void;
    open: boolean;
}

const ModalContainer: FunctionalComponent<ModalContainerProps> = ({ children, closeModal, open }) => {
    const handleKey = (e: KeyboardEvent) => {
        if(e.key === "Escape"){
            closeModal();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
        }
    })

    return (
        <div className={cx('flex justify-center items-center fixed top-0 left-0 h-screen w-screen transition-all', {
            'visible opacity-100' : open,
            'invisible opacity-0' : !open
        })}>
            <div className={cx("h-screen w-screen blur-sm fixed top-0 left-0 z-25 bg-blue-300 opacity-50",{
            })} onClick={closeModal}/>
            <div className={cx('bg-blue-800 w-60 rounded-xl fixed border-blue-400 border-2 p-4 transition')}>    
                {children}
            </div>
        </div>
    )
}

const Modal: FunctionalComponent<ModalProps> = ({ children, open, closeModal }) => {
    const modalContainer = document.getElementById('modal-container');
    if (!modalContainer) {
        return null;
    }
    return (
        <>
            {createPortal(
                <ModalContainer children={children} closeModal={closeModal} open={open}/>
                , modalContainer as Element)}
        </>
    );
}

export default Modal;