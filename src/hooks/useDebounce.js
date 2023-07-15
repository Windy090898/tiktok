import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    // Khi người dùng nhập liên tục, setTimeout chưa kịp chạy thì value đã thay đổi
    // => hàm clean up chạy để clear setTimeout cũ đi và tạo hàm setTimeout mới => lúc này debouncedValue vẫn là chuỗi rỗng chưa thay đổi
    // Nếu dưng lại k nhập nữa thì hàm setTimeout bắt đầu chạy và set giá trị mới cho debouncedValue
    // Clean up function chạy và trả về giá trị debounced mới
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])

    return debouncedValue
}

export default useDebounce