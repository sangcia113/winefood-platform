import axios from 'axios';

const getDataSource = async (setLoading, table, setDataSource, setModalError) => {
    try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3001/api/leave/${table}`);

        setDataSource(response.data);
    } catch (error) {
        setModalError({
            onOk: () => setModalError({ open: false }),
            open: true,
            title: 'THẤT BẠI',
            message: `Mã Lỗi: ${error.response.data.error}`,
        });
    } finally {
        setLoading(false);
    }
};

const getDataSourceZaloAPI = async (setLoading, table, setDataSource, setModalError) => {
    try {
        setLoading(true);

        const response = await axios.get(`http://localhost:3001/api/zalo/${table}`);

        setDataSource(response.data);
    } catch (error) {
        setModalError({
            onOk: () => setModalError({ open: false }),
            open: true,
            title: 'THẤT BẠI',
            message: `Mã Lỗi: ${error.response.data.error}`,
        });
    } finally {
        setLoading(false);
    }
};

export { getDataSource, getDataSourceZaloAPI };
