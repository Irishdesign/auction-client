import * as types from "./types";

const mockPlayer = {
    id: 30,
    name: "iris",
    auction_id: 59,
    init_value: 87.2754,
    current_value: 87.2754,
    updatedAt: "2021-05-22T16:04:00.963Z",
    createdAt: "2021-05-22T16:04:00.963Z",
    auction: {
        id: 59,
        no: "AUC21052240334",
        title: "sealed",
        auc_type: "S1",
        from_std: 10,
        to_dev: 300,
        value_type: "U",
        winner: null,
        period: 10,
        left_period: null,
        left_time: null,
        start_time: null,
        close_time: null,
        init_price: null,
        current_price: null,
        reservation_price: 100,
        is_auto: null,
        auto_t_fragment: null,
        auto_p_fragment: null,
        create_by: null,
        update_by: null,
        createdAt: "2021-05-22T16:03:34.695Z",
        updatedAt: "2021-05-22T16:03:34.695Z",
    },
};

const mockAuction = {
    id: 59,
    no: "AUC21052240334",
    title: "sealed",
    auc_type: "S1",
    from_std: 10,
    to_dev: 300,
    value_type: "U",
    winner: null,
    period: 10,
    left_period: null,
    left_time: null,
    start_time: null,
    close_time: null,
    init_price: null,
    current_price: null,
    reservation_price: 100,
    is_auto: null,
    auto_t_fragment: null,
    auto_p_fragment: null,
    create_by: null,
    update_by: null,
    createdAt: "2021-05-22T16:03:34.695Z",
    updatedAt: "2021-05-22T16:03:34.695Z",
};

const initialState = {
    user: {},
    isLogin: false,
    currentCountry: "globle",
    showMenu: false,
    showCreatePanel: false,
    showPlayerPage: false,
    currentAuction: mockAuction,
    //  currentAuction: {},
    playerData: mockPlayer,
    //  playerData: {},
    playerAuctionData: {},
};
export function dataReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_USER:
            console.log("reducser", action);
            return {
                ...state,
                user: action.data,
                showMenu: true,
                isLogin: true,
            };
        case types.SET_CURRENT_AUCTION:
            console.log("SET_CURRENT_AUCTION", action.data);
            return {
                ...state,
                currentAuction: action.data,
            };
        case types.SET_SHOW_MENU:
            console.log("SET_SHOW_MENU", action);
            return {
                ...state,
                showMenu: action.data,
            };
        case types.LOG_OUT:
            return {
                ...state,
                isLogin: false,
                user: {},
            };
        case types.SET_SHOW_CREATE:
            return {
                ...state,
                showCreatePanel: action.data,
            };
        case types.SET_PLAYER_DATA:
            return {
                ...state,
                playerData: action.data,
                showPlayerPage: true,
            };
        default:
            return state;
    }
}
