import React, { useState } from "react";

import "./App.scss";
import { setCurrentAuction } from "../../store/action";

import NavBar from "../../components/NavBar";
import SideMenu from "../../components/SideMenu";
import AuctionInfoDiv from "../../components/AuctionInfoDiv";
import Orders from "../../components/Orders";
import { useSelector, useDispatch } from "react-redux";
import * as utils from "../../utils";
import { Button, InputNumber, message } from "antd";
import * as constants from "../../constants";
import Players from "../../components/Players";
import * as action from "../../store/action";
import queryString from "query-string";

function App(props) {
    const [no, setNo] = React.useState();
    const [myDeduct, setMyDeduct] = React.useState(0);
    const [isClosed, setIsClosed] = useState(false);
    const current_auction_data = useSelector((state) => state.currentAuction);
    const showMenu = useSelector((state) => state.showMenu);
    const isLogin = useSelector((state) => state.isLogin);
    const dispatch = useDispatch();
    React.useEffect(() => {
        QueryParamsDemo();
    }, [props]);

    function QueryParamsDemo() {
        let query = queryString.parse(props.location.search);
        retrieveAuction(query.no);
    }
    const retrieveAuction = async (no) => {
        if (!no) return;
        const a = await utils.getAuction(no);
        if (a) {
            dispatch(setCurrentAuction(a));
        }
    };
    const handleutils = async (type) => {
        const auction = {
            title: "flower",
            auc_type: "E",
            from_std: "50",
            to_dev: "100",
            value_type: "G",
            period: 2,
            reservation_price: 1000,
            init_price: 1000,
            is_auto: true,
            auto_t_fragment: 1,
            auto_p_fragment: 100,
        };
        let res;
        switch (type) {
            case "getMenu":
                res = await utils.getMenu();
                //  console.log(res);
                return;
            case "createAuction":
                res = await utils.createAuction(auction);
                setNo(res.no);
                //  console.log(res);
                return;
            case "createPlayer":
                const name = "Ird77i";
                res = await utils.createPlayer(no, name);
                //  console.log(res); //@TODO 缺 auction infomation
                return;
            case "createOrder":
                const order = {
                    player_id: 1,
                    price: 10.6,
                };
                res = await utils.createOrder(no, order);
                console.log(res);
                return;
            case "close":
                res = await utils.closeAuction(no);
                console.log(res);
                return;
            case "start":
                res = await utils.startAuction(no);
                console.log(res);
                return;
            case "getPlayerAuction":
                res = await utils.getPlayerAuction(no);
                console.log(res);
                return;
            case "getAuction":
                res = await utils.getAuction(no);
                console.log(res);
                return;
        }
    };
    const handleAuction = (cmd, c) => {
        let res;
        switch (cmd) {
            case "start":
                updateWithCountDown();
                res = utils.startAuction(current_auction_data.no);
                break;
            case "close":
                console.log("已經關了");
                setIsClosed(true);
                res = utils.closeAuction(current_auction_data.no);
                break;
            case "updateWithCountDown":
                updateWithCountDown();
                break;
        }

        res.then((data) => {
            if (data) {
                dispatch(action.setCurrentAuction(data));
            }
        });
    };
    function updateWithCountDown() {
        setTimeout(function () {
            const res = utils.getAuction(current_auction_data.no);
            res.then((data) => {
                if (data) {
                    dispatch(action.setCurrentAuction(data));
                    if (!data.close_time) {
                        updateWithCountDown();
                    }
                }
            });
        }, 1000);
    }
    const handleDeductPrice = async () => {
        if (current_auction_data.current_price - myDeduct < 0) {
            message.success(`Current price - deduction is less than 0`);
            return;
        }
        if (myDeduct === 0) {
            return;
        }
        const res = await utils.deductAuction(current_auction_data.no, myDeduct);
        if (res.status >= 400) {
            message.warning(res.message);
            return;
        }
        message.success(`Current price is ${res.current_price}`);
    };
    return (
        <div className="App">
            <NavBar />
            <div className="container">
                {showMenu ? <SideMenu /> : null}
                {!isLogin ? (
                    <div className="remider">Please login</div>
                ) : (
                    <div className="auctionBlock">
                        <div className="start_btn">
                            <Button
                                type="primary"
                                onClick={() => {
                                    handleAuction("start");
                                }}
                            >
                                Start
                            </Button>
                            <Button
                                onClick={() => {
                                    handleAuction("close");
                                }}
                            >
                                Close
                            </Button>
                        </div>
                        <AuctionInfoDiv data={current_auction_data} />
                        {current_auction_data.auc_type === constants.AUC_TYPE.DUTCH && !current_auction_data.is_auto ? (
                            <div className="myOrder">
                                <InputNumber onChange={(v) => setMyDeduct(v)} value={myDeduct} />
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        handleDeductPrice();
                                    }}
                                >
                                    DEDUCT
                                </Button>
                                <Button
                                    onClick={() => {
                                        setMyDeduct(0);
                                    }}
                                >
                                    Reset
                                </Button>
                            </div>
                        ) : null}
                        <Orders
                            data={current_auction_data.orders}
                            hasWinner={current_auction_data.close_time}
                            chooseSecond={current_auction_data.auc_type === constants.AUC_TYPE.SEALED2}
                            reservationPrice={current_auction_data.reservation_price || 0}
                        />
                        <Players data={current_auction_data.players} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
