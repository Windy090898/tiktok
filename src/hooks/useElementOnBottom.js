import { useEffect, useMemo, useState } from 'react'

function useElementOnBottom(targetRef, options) {
    const [isBottom, setIsBottom] = useState(false);

    const callback = (entries) => {
        const entry = entries[0]
        setIsBottom(entry.isIntersecting);
    }

    const optionsMemo = useMemo(() => {
        return options
    }, [options])
  
    
    useEffect(() => {
        let observer = new IntersectionObserver(callback, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        }
    }, [targetRef, optionsMemo])
    return isBottom
}

export default useElementOnBottom