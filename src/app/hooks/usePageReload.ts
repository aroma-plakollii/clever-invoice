import { useEffect, useState } from 'react';

const usePageReload = () => {
    const [isReload, setIsReload] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.setItem('isReload', 'true');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const isReloaded = sessionStorage.getItem('isReload') === 'true';
        if (isReloaded) {
            setIsReload(true);
            sessionStorage.removeItem('isReload');
        }
    }, []);

    return isReload;
};

export default usePageReload;