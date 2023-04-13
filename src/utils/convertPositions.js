const convertPosition = (roles) => {
  let role = "";
  switch (roles) {
    case "DESK_STAFF":
      role = "Nhân viên phục vụ bàn";
      break;
    case "KITCHEN_STAFF":
      role = "Nhân viên bếp";
      break;
    case "CASHIER_STAFF":
      role = "Nhân viên thu ngân";
      break;
    case "MANAGER":
      role = "Quản lý";
      break;
    default:
      role = "Nhân viên phục vụ bàn";
      break;
  }
  return role;
};

export default convertPosition;
