import { useEffect, useState } from "preact/hooks";

export const useTransitionDebounce = (time: number, shouldRender: boolean) => {
    const [showElement, setShowElement] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (!shouldRender) {
            timeout = setTimeout(() => {
                setShowElement(false);
            }, time);
        } else setShowElement(true);

        return () => {
            clearTimeout(timeout);
        }
    }, [shouldRender]);

    return showElement;
}
