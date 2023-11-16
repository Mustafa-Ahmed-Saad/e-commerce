export const saveInLocalStorage = (key, value) => {
  // convert value to string to store this value in local storage
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  // convert string that came from local storage to its type
  return value ? JSON.parse(value) : null;
};
