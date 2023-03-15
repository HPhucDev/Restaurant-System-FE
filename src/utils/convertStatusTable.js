const convertStatusTable = (status) => {
  switch (status) {
    case 'NEW':
      return 'Đã order';
    case 'WAIT_KICHEN':
      return 'Đang chờ bếp';
    case 'UPFOOD':
      return 'Đã có món';
    case 'ENOIGHFOOD':
      return 'Đã có món đủ';
    case 'PAID':
      return 'Đã thanh toán';
    case 'CANCEL':
      return 'Đã hủy';
    case 'MERGE':
      return 'Ghép bàn';
    default:
      return 'Còn trống';
  }
};

export default convertStatusTable;