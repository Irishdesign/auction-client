import React, { useState } from "react";
import "./App.scss";
import * as url from "../../Endpoint";
import AuctionInfo from "../../components/AuctionInfo";
import * as constants from "../../constants";

import { Form, Input, Button, message, InputNumber } from "antd";
import * as utils from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import InvitationHeader from "../../components/InvitationHeader";
import queryString from "query-string";
import { setPlayerData, setCurrentAuction } from "../../store/action";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function App(props) {
    const [form] = Form.useForm();
    const [myPrice, setMyPrice] = React.useState(0);
    const playerData = useSelector((state) => state.playerData);
    const showPlayerPage = useSelector((state) => state.showPlayerPage);
    const current_auction_data = useSelector((state) => state.currentAuction);

    const dispatch = useDispatch();
    React.useEffect(() => {
        QueryParamsDemo();
    }, [props]);
    const onFinish = async (values) => {
        const { auctionNo, name } = values;
        const res = await utils.createPlayer(auctionNo, name);
        if (res.status >= 400) {
            message.warning(res.message);
            return;
        }
        dispatch(setPlayerData(res));
        dispatch(setCurrentAuction(res.auction));
        setMyPrice("");
        updateWithCountDown();
    };
    function QueryParamsDemo() {
        let query = queryString.parse(props.location.search);
        form.setFieldsValue({
            auctionNo: query.no,
        });
    }
    const onFill = () => {
        form.setFieldsValue({
            auctionNo: "",
            name: "",
        });
    };
    const handleCreateOrder = async (isDutch) => {
        //   console.log(price);
        const sendData = {
            player_id: playerData.id,
            price: isDutch ? current_auction_data.current_price : myPrice,
        };
        const res = await utils.createOrder(current_auction_data.no, sendData);

        if (res.status >= 400) {
            message.warning(res.message);
            return;
        }
        message.success(`Your order(price at${sendData.price}) had been sent`);
    };
    function updateWithCountDown() {
        setTimeout(function () {
            const res = utils.getAuction(current_auction_data.no);
            res.then((data) => {
                if (data) {
                    dispatch(setCurrentAuction(data));
                    if (!data.close_time) {
                        updateWithCountDown();
                    }
                }
            });
        }, 1000);
    }
    return (
        <div className="App">
            <InvitationHeader />
            <div className="container">
                {showPlayerPage ? (
                    <div className="auctionBlock">
                        <AuctionInfo data={current_auction_data} isPlayer={true} playerInfo={playerData} />
                        <div className="currentPrice">current price: {current_auction_data.current_price || "-"}</div>
                        {current_auction_data.type === constants.AUC_TYPE.DUTCH ? (
                            <Button
                                type="primary"
                                onClick={() => {
                                    handleCreateOrder(true);
                                }}
                            >
                                Accept Now
                            </Button>
                        ) : null}
                        <div className="myOrder">
                            <InputNumber onChange={(v) => setMyPrice(v)} />
                            <Button
                                type="primary"
                                onClick={() => {
                                    handleCreateOrder();
                                }}
                            >
                                BID
                            </Button>
                            <Button
                                onClick={() => {
                                    setMyPrice("");
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="bid">
                        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                            <Form.Item
                                name="auctionNo"
                                label="Auction No"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input a auction no!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input an user name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                {/* <Button htmlType="button" onClick={onReset}> */}
                                <Button htmlType="button" onClick={onFill}>
                                    Reset
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
