
export const parseCookie = (param: string, cookie: string) => {
  const valueToRead = cookie.split(';').filter((value: any) => value.includes(param))[0];
  if (valueToRead) {
    const cookieValue = valueToRead.split('=')[1];
    return JSON.parse(cookieValue);
  }
  return false;
}
