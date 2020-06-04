import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async (key) => {
  try {
    return await AsyncStorage.getItem(key)
  } catch(e) {
    console.log("getItem() failed", e)
    throw e
  }
}

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch(e) {
    console.log("setItem() failed", e)
    throw e
  }
}

export const rmItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    console.log("rmItem() failed", e)
    throw e
  }
}
