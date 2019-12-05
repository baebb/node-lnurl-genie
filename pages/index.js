// NPM Dependencies
import React from 'react';
import Link from 'next/link';

// UI Dependencies
import {
    Form,
    Select,
    InputNumber,
    DatePicker,
    Switch,
    Slider,
    Button,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

export default () => (
    <>
        <h1>This is sick</h1>
        <ul>
            <li>
                <Link href="/b" as="/a">
                    <a>a</a>
                </Link>
            </li>
            <li>
                <Link href="/a" as="/b">
                    <a>b</a>
                </Link>
            </li>
            <li>
                <Link href={{ pathname: '/posts', query: { id: '2' } }} as="/posts/2">
                    <a>post #2</a>
                </Link>
            </li>
        </ul>
        <div style={{ marginTop: 100 }}>
            <Form layout="horizontal">
                <FormItem
                    label="Input Number"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <InputNumber
                        size="large"
                        min={1}
                        max={10}
                        style={{ width: 100 }}
                        defaultValue={3}
                        name="inputNumber"
                    />
                    <a href="#">Link</a>
                </FormItem>

                <FormItem label="Switch" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                    <Switch defaultChecked name="switch" />
                </FormItem>

                <FormItem label="Slider" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                    <Slider defaultValue={70} />
                </FormItem>

                <FormItem label="Select" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
                    <Select
                        size="large"
                        defaultValue="lucy"
                        style={{ width: 192 }}
                        name="select"
                    >
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled" disabled>
                            disabled
                        </Option>
                        <Option value="yiminghe">yiminghe</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="DatePicker"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 8 }}
                >
                    <DatePicker name="startDate" />
                </FormItem>
                <FormItem style={{ marginTop: 48 }} wrapperCol={{ span: 8, offset: 8 }}>
                    <Button size="large" type="primary" htmlType="submit">
                        OK
                    </Button>
                    <Button size="large" style={{ marginLeft: 8 }}>
                        Cancel
                    </Button>
                </FormItem>
            </Form>
        </div>
    </>
);
