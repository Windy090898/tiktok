import { useEffect } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'

function useElementOnScreen(options, targetRef) {
    const [visibile, setVisible] = useState()
    const callback = (entries) => {
        const entry = entries[0]
        setVisible(entry.isIntersecting)
    }
    const optionsMemo = useMemo(() => {
        return options
    }, [options])
    
    useEffect(() => {
        let observer = new IntersectionObserver(callback, optionsMemo)
        const currentTarget = targetRef.current.getInternalPlayer();
        if (currentTarget) {
            observer.observe(currentTarget)
        }
        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [targetRef, optionsMemo])
    return visibile
}

export default useElementOnScreen