export function setStorageItem(identifier: string, value: string) {
  localStorage.setItem(identifier, JSON.stringify(value));
}

export const getStorageItem = (identifier: string) => {
  const item = localStorage.getItem(identifier);
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export function removeStorageItem(identifier: string) {
  localStorage.removeItem(identifier);
}
