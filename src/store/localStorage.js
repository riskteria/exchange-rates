/**
 * check if browser has local storage
 */

const hasLocalStorage = (): boolean => {
  if (!localStorage) {
    return false;
  }

  try {
    localStorage.setItem('0', '');
    localStorage.removeItem('0');
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * clean local storage
 */

export const clear = () => {
  if (hasLocalStorage()) {
    localStorage.clear();
  }
};

/**
 * Set item to local storage
 */

export const setItem = (key: string, value: any) => {
  if (hasLocalStorage()) {
    localStorage.setItem(key, value);
  }
};

/**
 * Get item from local storage
 */

export const getItem = (key: string): mixed => {
  if (hasLocalStorage()) {
    const item = localStorage.getItem(key);
    return item;
  }

  return null;
};

/**
 * Remove item from local storage
 */
export const removeItem = (key: string) => {
  if (hasLocalStorage()) {
    localStorage.removeItem(key);
  }
};

export default {
  clear,
  setItem,
  getItem,
  removeItem,
};
