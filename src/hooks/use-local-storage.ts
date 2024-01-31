import { useCallback, useEffect, useSyncExternalStore } from "react";

type SetItemCallback<T> = (v?: T | ((prev: T) => T)) => void;

/**
 * caveat: if item is removed from store (either externally of via app)
 * app state will default to initial value; thus creating a mismatch in app and store state
 * once item is added back to the store, either externally or within app, app will resync with store state
 */

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetItemCallback<T>] {
  const getSnapshot = () => getLocalStorageItem(key);
  const itemSnapshot = useSyncExternalStore(subscribe, getSnapshot);
  // memoized funtion to minimize re-renders if it gets used in a useEffect
  const setItem = useCallback<SetItemCallback<T>>(
    (v) => {
      const nextValue =
        typeof v === "function"
          ? // @ts-expect-error JSON.parse(null) is valid JS (returns null)
            v(JSON.parse(itemSnapshot) ?? initialValue)
          : v;
      if (nextValue) {
        setLocalStorageItem(key, nextValue);
      } else {
        removeLocalStorageItem(key);
      }
    },
    [key, itemSnapshot, initialValue]
  );

  useEffect(() => {
    if (getLocalStorageItem(key) === null) {
      setLocalStorageItem(key, initialValue);
    }
  }, [key, initialValue]);
  // on mount, if item not yet stored, useEffect above will sync up the app state and store after commit phase
  return [itemSnapshot ? JSON.parse(itemSnapshot) : initialValue, setItem];
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

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
