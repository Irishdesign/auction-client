import React, { useState } from "react";
import "./App.scss";
import * as url from "../../Endpoint";
import AuctionInfoDiv from "../../components/AuctionInfoDiv";
import * as constants from "../../constants";

import { Form, Input, Button, message, InputNumber } from "antd";
import * as utils from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import InvitationHeader from "../../components/InvitationHeader";
import queryString from "query-string";
import { setPlayerData } from "../../store/action";
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
        sm: { offset: 0 },
        md: { offset: 8 },
        span: 16,
    },
};

function App(props) {
    const [form] = Form.useForm();
    const [myPrice, setMyPrice] = React.useState(0);
    const playerData = useSelector((state) => state.playerData);
    const showPlayerPage = useSelector((state) => state.showPlayerPage);
    //  const showPlayerPage = true;
    const [leftValue, setLeftValue] = React.useState();
    const [playerAuctionData, setPlayerAuctionData] = React.useState({});
    const dispatch = useDispatch();
    React.useEffect(() => {
        QueryParamsDemo();
        updateWithCountDown();
    }, [props]);
    const onFinish = async (values) => {
        const { auctionNo, name } = values;
        const res = await utils.createPlayer(auctionNo, name);
        if (res.status >= 400) {
            message.warning(res.message);
            return;
        }
        dispatch(setPlayerData(res));
        //   setPlayerAuctionData(res.auction);
        setMyPrice("");
        //   updateWithCountDown();
    };
    function QueryParamsDemo() {
        let query = queryString.parse(props.location.search);
        form.setFieldsValue({
            auctionNo: query.no,
        });
        return query.no;
    }
    const onFill = () => {
        form.setFieldsValue({
            auctionNo: "",
            name: "",
        });
    };
    //  const handleTimerUpdate = async ()=>{
    //    const res = await utils.createOrder(playerAuctionData.no, sendData);
    //  }
    const handleCreateOrder = async (isDutch) => {
        //   console.log(price);
        const sendData = {
            player_id: playerData.id,
            price: isDutch ? playerAuctionData.current_price : myPrice,
        };
        if (sendData.price > playerData.current_value) {
            message.error(`The price is less than you're current value`);
            return;
        }
        const res = await utils.createOrder(playerAuctionData.no, sendData);

        if (res.status >= 400) {
            message.warning(res.message);
            return;
        }

        setLeftValue(res.left_value);
        message.success(`Your order(price at${sendData.price}) had been sent`);
    };
    function updateWithCountDown() {
        setTimeout(function () {
            const res = utils.getPlayerAuction(QueryParamsDemo());
            res.then((data) => {
                if (data) {
                    setPlayerAuctionData(data);
                    //   console.log(77777,data)
                    if (data.auc_type === constants.AUC_TYPE.DUTCH) {
                        setMyPrice(data.current_price);
                    }
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
                        <AuctionInfoDiv
                            data={playerAuctionData}
                            isPlayer={true}
                            playerInfo={playerData}
                            leftValue={leftValue}
                        />
                        <div className="currentPrice">current price: {playerAuctionData?.current_price || "-"}</div>
                        {playerAuctionData?.type === constants.AUC_TYPE.DUTCH ? (
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
                            <InputNumber onChange={(v) => setMyPrice(v)} value={myPrice} />
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
                                <Input disabled />
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
