import React, { useState } from "react";
import { Descriptions } from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as util from "../../utils";
import * as constants from "../../constants";
import { Link } from "react-router-dom";
const AuctionInfo = (props) => {
    const { visible, close, data, isPlayer, playerInfo } = props;
    const {
        no,
        title,
        start_time,
        left_time,
        auto_t_fragment,
        auto_p_fragment,
        from_std,
        init_price,
        is_auto,
        period,
        reservation_price,
        to_dev,
        value_type,
        winner,
        auc_type,
        close_time,
        current_price,
    } = data;
    const getTypeLabel = (ty) => {
        let label = "";
        Object.keys(constants.AUC_TYPE).forEach((ele) => {
            if (ty == constants.AUC_TYPE[ele]) {
                label = ele;
            }
        });
        return label;
    };
    const getValueTypeLabel = (ty) => {
        let label = "";
        Object.keys(constants.INIT_VALUE_TYPE).forEach((ele) => {
            if (ty == constants.INIT_VALUE_TYPE[ele]) {
                label = ele;
            }
        });
        return label;
    };
    const formatTime = (str) => {
        return str?.split(".")[0]?.replace("T", " ");
    };

    const formatLabel = (ty) => {
        switch (ty) {
            case "from":
                return value_type === constants.INIT_VALUE_TYPE.GAUSSIAN ? "std" : ty;
            case "to":
                return value_type === constants.INIT_VALUE_TYPE.GAUSSIAN ? "dev" : ty;
        }
    };
    const blank = "- -";

    return (
        <>
            <Descriptions title={"Title: " + title} column={5} vertical>
                <Descriptions.Item label="No" span={3}>
                    <Link to={`/invitation?title=${title}&no=${no}`} target="_blank">
                        {no}
                    </Link>
                </Descriptions.Item>
                <Descriptions.Item label="Start at">{formatTime(start_time) || blank}</Descriptions.Item>
                {close_time ? (
                    <Descriptions.Item label="Close at">{formatTime(close_time) || blank}</Descriptions.Item>
                ) : (
                    <Descriptions.Item label="Left">{left_time || blank}</Descriptions.Item>
                )}
            </Descriptions>
            <Descriptions size="small" column={3} bordered>
                <Descriptions.Item label="Type">{getTypeLabel(auc_type)}</Descriptions.Item>
                <Descriptions.Item label="Start Price">{init_price || "-"}</Descriptions.Item>
                <Descriptions.Item label="Time Limitation">{period} mins</Descriptions.Item>
                {isPlayer && playerInfo ? (
                    <>
                        <Descriptions.Item label="Name">{playerInfo.name}</Descriptions.Item>
                        <Descriptions.Item label="init_value">{playerInfo.init_value}</Descriptions.Item>
                        <Descriptions.Item label="current_value">{props.leftValue||playerInfo.current_value}</Descriptions.Item>
                    </>
                ) : null}
                {isPlayer ? null : (
                    <>
                        <Descriptions.Item label="User value type">{getValueTypeLabel(value_type)}</Descriptions.Item>
                        <Descriptions.Item label={`User value ${formatLabel("from")}`}>{from_std}</Descriptions.Item>
                        <Descriptions.Item label={`User value ${formatLabel("to")}`}>{to_dev}</Descriptions.Item>
                        <Descriptions.Item label="reservation_price">{reservation_price || 0}</Descriptions.Item>
                        {auc_type === constants.AUC_TYPE.SEALED1 || auc_type === constants.AUC_TYPE.SEALED2 ? null : (
                            <>
                                <Descriptions.Item label="init_price">{init_price}</Descriptions.Item>
                            </>
                        )}
                        {winner ? (
                            <Descriptions.Item label="winner">{winner}</Descriptions.Item>
                        ) : auc_type !== constants.AUC_TYPE.SEALED1 && auc_type !== constants.AUC_TYPE.SEALED2 ? (
                            <Descriptions.Item label="current price">{current_price}</Descriptions.Item>
                        ) : null}
                        {is_auto ? (
                            <>
                                <Descriptions.Item label="is_auto">{is_auto ? "T" : "F"}</Descriptions.Item>
                                <Descriptions.Item label="auto_p_fragment">{auto_p_fragment}</Descriptions.Item>
                                <Descriptions.Item label="auto_t_fragment">{auto_t_fragment}</Descriptions.Item>
                            </>
                        ) : null}
                    </>
                )}
            </Descriptions>
        </>
    );
};

export default AuctionInfo;
