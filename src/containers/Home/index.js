import React, { useState } from "react";

import "./App.scss";
import { setCurrentAuction } from "../../store/action";

import NavBar from "../../components/NavBar";
import SideMenu from "../../components/SideMenu";
import AuctionInfo from "../../components/AuctionInfo";
import Orders from "../../components/Orders";
import { useSelector, useDispatch } from "react-redux";
// import StatisticPanel from "../../components/StatisticPanel";
// import { setCurrentCountry } from "../../store/action";
import * as utils from "../../utils";
import { Button, InputNumber } from "antd";
import * as constants from "../../constants";
import Players from "../../components/Players";
import * as action from "../../store/action";
import queryString from "query-string";

function App(props) {
    const [no, setNo] = React.useState();
    const [myPrice, setMyPrice] = React.useState(0);
    const [isClosed, setIsClosed] = useState(false);
    //  const [drawerData, setDrawerData] = useState({});
    const current_auction_data = useSelector((state) => state.currentAuction);
    const showMenu = useSelector((state) => state.showMenu);
    const dispatch = useDispatch();
    React.useEffect(() => {
        QueryParamsDemo();
        console.log(current_auction_data, 8888777);
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
                console.log(res);
                return;
            case "createAuction":
                res = await utils.createAuction(auction);
                setNo(res.no);
                console.log(res);
                return;
            case "createPlayer":
                const name = "Ird77i";
                res = await utils.createPlayer(no, name);
                console.log(res); //@TODO 缺 auction infomation
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
    const handleDeductPrice = async (isDutch) => {
        //   console.log(price);
        //   const sendData = {
        //       player_id: playerData.id,
        //       price: isDutch ? current_auction_data.current_price : myPrice,
        //   };
        //   const res = await utils.createOrder(current_auction_data.no, sendData);
        //   if (res.status >= 400) {
        //       message.warning(res.message);
        //       return;
        //   }
        //   message.success(`Your order(price at${sendData.price}) had been sent`);
    };
    return (
        <div className="App">
            <NavBar />
            <div className="container">
                {showMenu ? <SideMenu /> : null}
                {!current_auction_data.no ? (
                    <h1>hellow world</h1>
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
                        <AuctionInfo data={current_auction_data} />
                        {current_auction_data.auc_type === constants.AUC_TYPE.DUTCH ? (
                            <div className="myOrder">
                                <InputNumber onChange={(v) => setMyPrice(v)} />
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
                                        setMyPrice("");
                                    }}
                                >
                                    Reset
                                </Button>
                            </div>
                        ) : null}
                        <Orders data={current_auction_data.orders} />
                        <Players data={current_auction_data.players} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
