import React, { useState } from "react";
import { Descriptions, Table } from "antd";
import { useSelector, useDispatch } from "react-redux";

const Orders = (props) => {
    const { visible, close, data } = props;
    const formatData = (d) =>
        d &&
        d.map((ele) => {
            return {
                price: ele.price,
                name: ele.player.name,
                init_value: ele.player.init_value,
                time: ele.createdAt.split(".")[0].split("T").join(" "),
            };
        });
    const columns = [
        {
            title: "Price",
            dataIndex: "price",
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.price - b.price,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Init value",
            dataIndex: "init_value",
            onFilter: (value, record) => record.address.indexOf(value) === 0,
            sorter: (a, b) => a.init_value - b.init_value,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Time",
            dataIndex: "time",
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
    //          price: 32,
    //          Time: "New York No. 1 Lake Park",
    //      });
    //  }

    return (
        <>
            <Descriptions title="Orders"></Descriptions>Total: {data?.length || 0}
            <Table columns={columns} dataSource={formatData(data)} pagination={false} scroll={{ y: 200 }} />
        </>
    );
};

export default Orders;
