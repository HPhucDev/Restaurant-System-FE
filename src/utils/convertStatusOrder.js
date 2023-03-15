const convertStatusOrder = (status) =>{
    switch (status) {
        case 'NEW':
            return 'Chờ bếp xác nhận';
        case 'ACCEPT':
            return 'Đang nấu';
        case 'REFUSE':
            return 'Bếp từ chối';
        case 'FINISH':
            return 'Món đã sẵn sàng';
        default:
            return '';
    }
};



export default convertStatusOrder;