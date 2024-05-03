const extractErrorMessage = (
  error,
  defaultErrorMsg = 'Ha ocurrido un error, intente más tarde.',
) => {
  const statusCode = error.response?.data?.statusCode || null;

  switch (statusCode) {
    case 400:
      return error.response?.data?.errors[0];
    case 401:
    case 500:
      return error.response?.data?.message;
    default:
      return defaultErrorMsg;
  }
};

export default extractErrorMessage;
