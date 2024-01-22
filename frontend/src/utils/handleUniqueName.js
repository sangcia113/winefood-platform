const getUniqueName = (data, idField, nameField) => {
    // Sắp xếp mảng theo trường id trước khi tạo Set
    const sortedDataSource = [...data].sort((a, b) => a[idField] - b[idField]);

    // Tạo Set từ mảng đã sắp xếp
    const uniqueValues = Array.from(new Set(sortedDataSource.map(item => item[nameField])));

    // Trả về danh sách giá trị duy nhất
    return uniqueValues.map(value => ({ text: value, value }));
};

export default getUniqueName;
