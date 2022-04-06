import { useEffect } from "preact/hooks";

export const useStopPropagation = (element: HTMLElement) => {
    const stopPropagation = (event: MouseEvent) => {
        event.stopPropagation();
    };
    
    useEffect(() => {
        element.addEventListener('click', stopPropagation);
        return () => {
            element.removeEventListener('click', stopPropagation);
        }
    }, [element]);
}