import { useCallback, useEffect, useSyncExternalStore } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 3 - create a snapshot function that reads local storage item value
  // close over the key, to only retrive its value and none others
  const getSnapshot = () => getLocalStorageItem(key);
  // 1 - utilize useSyncExternalStore to subscribe to local storage changes
  const itemSnapshot = useSyncExternalStore(subscribe, getSnapshot);
  // 4 - set function sets item in local storage
  // return a memoized version so minimize re-renders if it gets used in a useEffect
  // set functino accepts one optional arg
  // if argument is missing, remove local storage item
  // otherwise, update local storage item with argument value
  const setItem = useCallback(
    (nextValue: T) => {
      if (nextValue) {
        setLocalStorageItem(key, nextValue);
      } else {
        removeLocalStorageItem(key);
      }
    },
    [key]
  );

  // 6 - on mount and on prop changes, if item does not exist in storage, set it
  useEffect(() => {
    if (getLocalStorageItem(key) === null) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);

  // 5 - return value and set function
  // on mount, itemSnapshot may be null, in that case, return initial value
  // note: useEffect above will sync up the app state and store after commit phase
  // thus, initialValue must be returned when item not yet stored
  return [itemSnapshot ? JSON.parse(itemSnapshot) : initialValue, setItem];
}

// 2 - create subscribe function, listen for change events
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

// 3.5 - define underlying storage item getter
function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

// 4.5 - define underlying storage item setters
function setLocalStorageItem<T>(key: string, value: T) {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
}

function removeLocalStorageItem(key: string) {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
}

function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}
