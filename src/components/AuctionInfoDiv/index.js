import React, { useState } from "react";
import { Descriptions } from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as util from "../../utils";
import "./style.scss";
import ListItem from "../ListItem";
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
            <ul className="block">
                <ListItem label="Title" text={title || blank} />
                <ListItem label="No">
                    <Link to={`/invitation?title=${title}&no=${no}`} target="_blank">
                        {no}
                    </Link>
                </ListItem>
            </ul>
            <ul className="block">
                <ListItem label="Start at" text={formatTime(start_time) || blank} />
                {close_time ? (
                    <ListItem label="Close at" text={formatTime(close_time) || blank} />
                ) : (
                    <ListItem label="Left" text={left_time || blank} />
                )}
            </ul>
            <ul className="block">
                <ListItem label="Type" text={getTypeLabel(auc_type)} />
                <ListItem label="Start Price" text={init_price || "-"} />
                <ListItem label="Time Limitation" text={`${period} mins`} />
            </ul>
            {isPlayer && playerInfo ? (
                <ul className="block">
                    <ListItem label="Name" text={playerInfo.name} />
                    <ListItem label="Initial value" text={playerInfo.init_value} />
                    <ListItem label="Current value" text={props.leftValue || playerInfo.current_value} />
                </ul>
            ) : null}
            {isPlayer ? null : (
                <>
                    <ul className="block">
                        <ListItem label="User value type" text={getValueTypeLabel(value_type)} />
                        <ListItem label={`User value ${formatLabel("from")}`} text={from_std} />
                        <ListItem label={`User value ${formatLabel("to")}`} text={to_dev} />
                    </ul>
                    <ul className="block">
                        <ListItem label={`Reservation price`} text={reservation_price || 0} />
                        {auc_type === constants.AUC_TYPE.SEALED1 || auc_type === constants.AUC_TYPE.SEALED2 ? null : (
                            <ListItem label={`Initial price`} text={init_price} />
                        )}
                        {winner ? (
                            <ListItem label={`Winner`} text={winner} />
                        ) : auc_type !== constants.AUC_TYPE.SEALED1 && auc_type !== constants.AUC_TYPE.SEALED2 ? (
                            <ListItem label={`Current price`} text={current_price} />
                        ) : null}
                    </ul>
                    {is_auto ? (
                        <ul className="block">
                            <ListItem label={`is Auto`} text={is_auto ? "T" : "F"} />
                            <ListItem label={`auto price fragment`} text={auto_p_fragment} />
                            <ListItem label={`auto time fragment`} text={`${auto_t_fragment} mins`} />
                        </ul>
                    ) : null}
                </>
            )}
        </>
    );
};

export default AuctionInfo;
