'use strict';


import _ from 'underscore'

/**
 * 时间过滤器
 */
export const dateFilter = function (time, type) {
  let date = time;

  if (!time) {
    return '';
  }

  if (typeof time === 'number' || typeof time === 'string') {
    date = new Date(time);
  }

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let second = date.getSeconds();
  let result;
  let format = (value) => {
    return value >= 10 ? value : '0' + value
  };

  switch (type) {
    case 0: // 01-05
      result = `${format(month)}-${format(day)}`;
      break;
    case 1: // 11:12
      result = `${format(hours)}-${format(minutes)}`;
      break;
    case 3: // 2015-01-05 11:12
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`;
      break;
    case 4:// 2015-01-05 11:12:06
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`;
      break;
    default: // 2015-01-05
      result = `${year}-${format(month)}-${format(day)}`;
  }
  return result
};
