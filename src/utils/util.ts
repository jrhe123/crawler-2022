interface Result<T> {
  errMsg?: string;
  success: boolean;
  data: T;
}

export const getResponseData = <T>(data: T, errMsg?: string): Result<T> => {
  if (errMsg) {
    return {
      errMsg,
      success: false,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
