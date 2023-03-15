const convertNameFoodType = (name) => {
  switch (name) {
    case 'GRILLED':
      return 'Món nướng';
    case 'HOT_POT':
      return 'Món lẩu';
    case 'DRINK':
      return 'Món nước';
    case 'SALAD':
      return 'Món gỏi';
    default:
      return 'Món nướng';
  }
};

export default convertNameFoodType;
