import React, { useState } from "react";
import { Descriptions, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

const Players = (props) => {
    const { visible, close, data } = props;
    const formatData = (data) =>
        data &&
        data.map((ele) => {
            console.log({
                name: ele.name,
                hasSent: ele.init_value > ele.current_value,
            });
            return {
                name: ele.name,
                hasSent: ele.init_value > ele.current_value ? "T" : "F",
            };
        });
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            // specify the condition of filtering result
            // here is that finding the name started with `value`

            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Sent order",
            dataIndex: "hasSent",
            filters: [
                {
                    text: "T",
                    value: "T",
                },
                {
                    text: "F",
                    value: "F",
                },
            ],
            onFilter: (value, record) => record.hasSent === value,
            sorter: (a, b) => a.price - b.price,
            sortDirections: ["descend", "ascend"],
        },
    ];
    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }
    //  const data = [];
    //  for (let i = 0; i < 100; i++) {
    //      data.push({
    //          key: i,
    //          name: "John Brown",
    //          hasSent: i % 2 == 0 ? "T" : "F",
    //      });
    //  }

    return (
        <>
            <Descriptions title="Players"></Descriptions>Total: {data?.length || 0}
            <Table columns={columns} dataSource={formatData(data)} pagination={false} scroll={{ y: 200 }} />
        </>
    );
};

export default Players;
