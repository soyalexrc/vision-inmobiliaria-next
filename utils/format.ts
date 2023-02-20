export const formatPrice = (num: number | string) => {
  if (!num) return 'No Data...'
  if (typeof num !== "string") {
    const formattedNumber = num.toString().replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return '$' + formattedNumber;
  } else {
    const formattedNumber = num.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return '$' + formattedNumber;
  }
}


