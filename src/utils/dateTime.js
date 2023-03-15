const toDate = (dateStr) => {
    // format string dd-mm-yyyy to date
    var parts = dateStr.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };
  
  const getFormattedDate = (date) => {
    // format date to string dd-mm-yyyy
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
  
    return day + '-' + month + '-' + year;
  };
export {toDate, getFormattedDate};  