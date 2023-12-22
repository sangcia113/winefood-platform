const getUniqueName = data => {
    // Sắp xếp mảng theo userId trước khi tạo Set
    const sortedDataSource = [...data].sort((a, b) => a.id - b.id);

    // Tạo Set từ mảng đã sắp xếp
    const uniqueNames = Array.from(new Set(sortedDataSource.map(item => item.name)));

    // Trả về danh sách giá trị duy nhất
    return uniqueNames.map(name => ({ text: name, value: name }));
};

export { getUniqueName };
