export const openWhatsApp = (n:string) => {
  const formattedNumber = n.replace('+', '').replaceAll(' ', '');
  return window.open(`https://wa.me/${formattedNumber}`, '_blank')
}
