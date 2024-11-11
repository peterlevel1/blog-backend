import * as dayjs from 'dayjs';

export const timeUtil = {
  timestamp,
};

/**
 * timestamp: get current timestamp
 */
function timestamp(): string {
  // return dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  return dayjs().format('YYYY-MM-DDTHH:mm:ss.SSS');
}
