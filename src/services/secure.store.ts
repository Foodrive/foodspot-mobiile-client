import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

export enum SecureStoreEnum {
  TOKEN = "token",
}

const isJsonString = (value: any): boolean => {
  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

// Class that abstracts away secure storage library
class SecureStore {
  private static cache: Record<string, string> = {}; // For faster lookup

  async setItem(key: string, value: any): Promise<boolean> {
    const storeValue =
      typeof value === "string" ? value : JSON.stringify(value);
    try {
      await setItemAsync(key, storeValue);
      SecureStore.cache[key] = storeValue;
      return true;
    } catch (e) {
      return false; // cannot be stored
    }
  }

  async getItem(key: string): Promise<string | null> {
    if (SecureStore.cache[key]) {
      return SecureStore.cache[key];
    }
    try {
      const storeData = await getItemAsync(key);
      const value =
        storeData && isJsonString(storeData)
          ? JSON.parse(storeData)
          : storeData;
      SecureStore.cache[key] = value;
      return value;
    } catch (e) {
      return null;
    }
  }

  async deleteItem(key: string): Promise<boolean> {
    try {
      await deleteItemAsync(key);
      delete SecureStore.cache[key];
      return true;
    } catch (e) {
      return false;
    }
  }
}

export default new SecureStore();
