import { useEffect } from "preact/hooks";

export const useOutsideClick = (element: HTMLElement, callback: (e: MouseEvent) => void) => {
    const handleOutsideClick = (event: MouseEvent) => {
        event.stopPropagation();
        const target = event.target as HTMLElement;
        console.log(target);
        if (element && !element.contains(target)) {
            callback(event);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    })
}