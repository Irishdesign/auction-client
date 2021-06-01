import React, { useState } from "react";
import { Form, Input, Button, Modal, InputNumber, Select, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import * as utils from "../../utils";
import { AUC_TYPE, INIT_VALUE_TYPE } from "../../constants";
const { Option } = Select;

const tailLayout = {
    wrapperCol: {
        //   sm: { offset: 0 },
        md: { offset: 11 },
        //   span: 16,
    },
};

const CreateModal = (props) => {
    const [form] = Form.useForm();
    const [isAuto, setIsAuto] = React.useState(false);
    const [isSealed, setIsSealed] = React.useState(false);
    const [isDutch, setIsDutch] = React.useState(false);
    const [isGaussian, setIsGaussian] = React.useState(false);
    //  const [type, setType] = React.useState();
    const { visible, close } = props;
    //  const dispatch = useDispatch();
    const onFinish = async (values) => {
        //   console.log("onFinish", values);
        values.is_auto = isAuto;
        const response = await utils.createAuction(values);
        close();
        window.open(`/?no=${response.no}`, "_self");
    };

    return (
        <>
            <Modal
                visible={visible}
                title="New Auction"
                onCancel={() => {
                    close();
                }}
                width={1000}
                footer={[]}
            >
                <Form
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    layout="horizontal"
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="auc_type"
                        label="type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            initialValue={AUC_TYPE.ENGLISH}
                            style={{
                                width: "100%",
                            }}
                            onChange={(v) => {
                                setIsDutch(v === AUC_TYPE.DUTCH);
                                setIsSealed(v === AUC_TYPE.SEALED1 || v === AUC_TYPE.SEALED2);
                            }}
                        >
                            <Option value={AUC_TYPE.ENGLISH}>ENGLISH</Option>
                            <Option value={AUC_TYPE.DUTCH}>DUTCH</Option>
                            <Option value={AUC_TYPE.SEALED1}>SEALED1</Option>
                            <Option value={AUC_TYPE.SEALED2}>SEALED2</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="title"
                        label="title"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="period"
                        label="Time limitaion"
                        style={{
                            width: "100%",
                        }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                    {!isSealed ? (
                        <Form.Item
                            name="init_price"
                            label="init_price"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <InputNumber
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Form.Item>
                    ) : null}
                    <Form.Item
                        name="reservation_price"
                        label="Resevation price"
                        style={{
                            width: "100%",
                        }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="value_type"
                        label="user value type "
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            initialValue={INIT_VALUE_TYPE.UNIFORM}
                            style={{
                                width: "100%",
                            }}
                            onChange={(v) => {
                                setIsGaussian(v === INIT_VALUE_TYPE.GAUSSIAN);
                            }}
                        >
                            <Option value={INIT_VALUE_TYPE.UNIFORM}>UNIFORM</Option>
                            <Option value={INIT_VALUE_TYPE.GAUSSIAN}>GAUSSIAN</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="from_std"
                        label={isGaussian ? "std" : "from"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="to_dev"
                        label={isGaussian ? "dev" : "to"}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                        />
                    </Form.Item>
                    {isDutch ? (
                        <Form.Item name="is_auto" label="is auto">
                            <Checkbox
                                onChange={(e) => {
                                    // console.log("isAuto", e.target.checked);
                                    setIsAuto(e.target.checked);
                                }}
                                checked={isAuto}
                            />
                        </Form.Item>
                    ) : null}
                    {isAuto ? (
                        <>
                            <Form.Item
                                name="auto_p_fragment"
                                label="auto_p_fragment"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                            <Form.Item
                                name="auto_t_fragment"
                                label="auto_t_fragment"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <InputNumber
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Form.Item>
                        </>
                    ) : null}
                    <Form.Item {...tailLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                marginRight: 20,
                            }}
                        >
                            Submit
                        </Button>
                        <Button>cancel</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default CreateModal;
