import {UserType} from "../model/user";

let currentUser: UserType;
const setCurrentUserState = (user: UserType) => {
    currentUser = user;
}
const getCurrentUserState = (): UserType => {
    return currentUser;
}

export {
    setCurrentUserState,
    getCurrentUserState
}