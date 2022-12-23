import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKeyToken = 'sofCloneUserKey';

const saveUser = (user) => AsyncStorage.setItem(storageKeyToken, JSON.stringify(user));

const loadUser = () => AsyncStorage.getItem(storageKeyToken);

const removeUser = () => AsyncStorage.removeItem(storageKeyToken);

export default {
    saveUser,
    loadUser,
    removeUser,
};
