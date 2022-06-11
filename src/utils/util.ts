interface Result {
  errMsg?: string;
  success: boolean;
  data: any;
}

export const getResponseData = (data: any, errMsg?: string): Result => {
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
