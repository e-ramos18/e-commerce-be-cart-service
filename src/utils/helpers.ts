import {CustomResponse} from '../types';

export const tryCatch = async (
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  fn: () => Promise<any>,
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  dataIfError: any,
  message: string,
): Promise<CustomResponse<{}>> => {
  try {
    const res = await fn();
    return {
      success: true,
      data: res,
      message,
    };
  } catch (error) {
    return {
      success: false,
      data: dataIfError,
      message: error ? error.message : 'Something went wrong.',
    };
  }
};
