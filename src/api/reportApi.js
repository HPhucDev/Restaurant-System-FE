import axiosClient from './axiosClient';
import {REPORT_DAY, REPORT_MONTH, REPORT_QUARTER, REPORT_YEAR} from './baseURL';

const reportDay = async (params) => {
  return (await axiosClient())({
    method: 'POST',
    url: REPORT_DAY,
    data: {
      date: params.date,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const reportMonth = async (params) => {
  return (await axiosClient())({
    method: 'GET',
    url: REPORT_MONTH,
    params: {
      month: params.month,
      year: params.year,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const reportYear = async (params) => {
  return (await axiosClient())({
    method: 'GET',
    url: REPORT_YEAR,
    params: {
      year: params.year,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const reportQuarter = async (params) => {
  return (await axiosClient())({
    method: 'GET',
    url: REPORT_QUARTER,
    params: {
      quarter: params.quarter,
      year: params.year,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export {reportDay, reportMonth, reportYear, reportQuarter};
