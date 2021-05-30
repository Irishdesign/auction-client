import * as types from "./types";

export function setUser(user) {
    return {
        type: types.SET_USER,
        data: user,
    };
}

export function logout() {
    return {
        type: types.LOG_OUT,
        data: false,
    };
}

export const setCurrentAuction = (data) => {
    return {
        type: types.SET_CURRENT_AUCTION,
        data,
    };
};

export const setShowMenu = (v) => {
   //  console.log("setShowMenu", v);
    return {
        type: types.SET_SHOW_MENU,
        data: v,
    };
};
export const setShowCreatePanel = (v) => {
   //  console.log("setShowCreatePanel", v);
    return {
        type: types.SET_SHOW_CREATE,
        data: v,
    };
};

export const setPlayerData = (data) => {
    return {
        type: types.SET_PLAYER_DATA,
        data,
    };
};

export const setPlayerAuctionData = (data) => {
   return {
       type: types.SET_PLAYER_AUCTION_DATA,
       data,
   };
};


// export function setDetailData(data, events) {
//     return {
//         type: types.UPDATE_DETAIL,
//         payload: { data, events },
//     };
// }
