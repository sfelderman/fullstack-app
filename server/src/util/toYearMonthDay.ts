const toYearMonthDay = (dateString: string) => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();
  const datePlusOffset = new Date(date.getTime() + offset * 60 * 1000);
  return datePlusOffset.toISOString().split('T')[0];
};
export default toYearMonthDay;
