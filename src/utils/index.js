import * as url from "../Endpoint";
import * as constants from "../constants";
import axios from "axios";

export const login = (values, callback) => {
    return axios.post(url.LOGIN_API, values).then(
        (response) => {
            // console.log(response);
            localStorage.setItem(constants.SESSION_KEY, response.data.accessToken);
            callback && callback();
            return response;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const signup = (values) => {
    return axios.post(url.SIGNUP_API, values).then(
        (response) => {
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

// old design: everyone can register
// export const signup = (values, callback) => {
//    return axios.post(url.SIGNUP_API, values).then(
//        (response) => {
//            // console.log(response);
//            login(values);
//            callback && callback();
//            return response;
//        },
//        (error) => {
//            console.log(error);
//        }
//    );
// };

const TOKEN = localStorage.getItem(constants.SESSION_KEY);
export const getUserInfo = () => {
    const TOKEN = localStorage.getItem(constants.SESSION_KEY);
    if (!TOKEN) return null;
    return axios({
        method: url.POST, //you can set what request you want to be
        url: url.USER_API,
        data: { token: TOKEN },
    }).then(
        (response) => {
            // console.log(999999, response.data);
            localStorage.setItem(constants.SESSION_KEY, response.data.accessToken);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const getMenu = () => {
    const TOKEN = localStorage.getItem(constants.SESSION_KEY);
    //  console.log("getMenu token", TOKEN);

    return axios({
        method: url.GET, //you can set what request you want to be
        url: url.MENU_API,
        headers: {
            "x-access-token": TOKEN,
        },
    }).then(
        (response) => {
            // console.log("getMenu", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const createAuction = (data) => {
    const TOKEN = localStorage.getItem(constants.SESSION_KEY);
    //  console.log("createAuction token", TOKEN);
    return axios({
        method: url.POST, //you can set what request you want to be
        url: url.create_AUCTION_API,
        data: data,
        headers: {
            "x-access-token": TOKEN,
        },
    }).then(
        (response) => {
            // console.log("createAuction", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const createOrder = (no, data) => {
    const TOKEN = localStorage.getItem(constants.SESSION_KEY);
    //  console.log("createOrder token", TOKEN);
    return axios({
        method: url.POST,
        url: url.create_ORDER_API(no),
        data: data,
        headers: {
            "x-access-token": TOKEN,
        },
    }).then(
        (response) => {
            // console.log("createOrder", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const createPlayer = (no, name) => {
    return axios({
        method: url.POST,
        url: url.create_PLAYER_API(no),
        data: { name },
    })
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getPlayerAuction = (no) => {
    //  console.log("getPlayerAuction token", no);
    return axios({
        method: url.GET,
        url: url.get_PLAYER_AUCTION_API(no),
    }).then(
        (response) => {
            // console.log("getPlayerAuction", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const getAuction = (no) => {
    const TOKEN = localStorage.getItem(constants.SESSION_KEY);
    return axios({
        method: url.GET,
        url: url.get_AUCTION_API(no),
        headers: {
            "x-access-token": TOKEN,
        },
    }).then(
        (response) => {
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const startAuction = (no, data) => {
    //  console.log("startAuction token", TOKEN);
    return axios({
        method: url.GET,
        url: url.start_AUCTION_API(no),
        headers: {
            "x-access-token": TOKEN,
        },
    }).then(
        (response) => {
            // console.log("startAuction", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const closeAuction = (no, data) => {
    //  console.log("closeAuction token", TOKEN);
    return axios({
        method: url.GET,
        url: url.close_AUCTION_API(no),
        headers: {
            "x-access-token": TOKEN,
        },
    }).then(
        (response) => {
            // console.log("closeAuction", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};

export const deductAuction = (no, v) => {
    return axios({
        method: url.POST,
        url: url.deduct_AUCTION_API(no),
        headers: {
            "x-access-token": TOKEN,
        },
        data: { deductValue: v },
    }).then(
        (response) => {
            console.log("deductAuction", response);
            return response.data;
        },
        (error) => {
            console.log(error);
        }
    );
};
