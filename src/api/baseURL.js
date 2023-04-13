// const BASE_URL = 'http://13.58.43.33:8080/web-0.0.1-SNAPSHOT/';
// const BASE_URL = 'http://103.125.170.21:10007/web-0.0.1-SNAPSHOT/';

const BASE_URL = "http://192.168.4.28:8080/";

const SIGN_IN = BASE_URL + "signin";
const REFRESH_TOKEN = BASE_URL + "refreshtoken";
const FORGOT_PASS = BASE_URL + "api/users/forgot-pass/";
const CONFIRM_OTP = FORGOT_PASS + "confirm-otp/";
const RESET_PASSWORD = BASE_URL + "api/users/reset-password";

const ORDER = BASE_URL + "orders/";
const ORDER_DETAILS = BASE_URL + "order-details";
const ORDER_TABLE = BASE_URL + "orders/table";
const ORDER_DETAILS_LIST_FOOD = BASE_URL + "order-details/list";
const ORDER_FIND_BY_USER = BASE_URL + "orders/find-by-user";
const ORDER_FIND_BY_CASHIER = BASE_URL + "orders/find-by-cashier";
const ORDER_MERGE_TABLE_NULL = BASE_URL + "orders/merge/table-null";
const ORDER_MERGE_TABLE_NOT_NULL = BASE_URL + "orders/merge/table-notnull";

const FOOD_ITEM = BASE_URL + "api/food-items/";
const FOOD = BASE_URL + "api/food-items";
const FOOD_ITEMS_TYPE = BASE_URL + "api/food-items/type-name/";
const FOOD_ITEMS_NAME = BASE_URL + "api​/food-items​/name/";

const FOOD_TYPE = BASE_URL + "food-types/";

const PAY = BASE_URL + "orders/pay";

const USERS = BASE_URL + "api/users";
const FIND_ALL_USER = BASE_URL + "api/users/users";
const RESET_PASSWORD_USER = BASE_URL + "api/users/reset-password";

const REPORT_DAY = BASE_URL + "api/reports/day";
const REPORT_MONTH = BASE_URL + "api/reports/month";
const REPORT_YEAR = BASE_URL + "api/reports/year";
const REPORT_QUARTER = BASE_URL + "api/reports/quarter";

export {
  BASE_URL,
  SIGN_IN,
  REFRESH_TOKEN,
  ORDER,
  ORDER_DETAILS,
  ORDER_TABLE,
  ORDER_DETAILS_LIST_FOOD,
  ORDER_FIND_BY_USER,
  ORDER_FIND_BY_CASHIER,
  FOOD_ITEM,
  FOOD_ITEMS_TYPE,
  FOOD_ITEMS_NAME,
  FORGOT_PASS,
  CONFIRM_OTP,
  RESET_PASSWORD,
  USERS,
  ORDER_MERGE_TABLE_NOT_NULL,
  ORDER_MERGE_TABLE_NULL,
  PAY,
  FOOD_TYPE,
  FOOD,
  RESET_PASSWORD_USER,
  FIND_ALL_USER,
  REPORT_DAY,
  REPORT_MONTH,
  REPORT_YEAR,
  REPORT_QUARTER,
};
