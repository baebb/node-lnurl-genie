// NPM Dependencies
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

// UI Dependencies
import {
    Col,
    Row
} from 'antd';

export default class extends Component {
    static async getInitialProps({ req }) {
        const serverUrl = req ? req.headers['host'] : 'localhost:3000';

        return {
            serverUrl
        };
    };

    render() {
        return (
            <Row style={{ marginTop: 100 }}>
                <Col xs={24} sm={{ span: 8, offset: 8 }}>
                    <h1 style={{ textAlign: 'center' }}>server URL: {this.props.serverUrl}</h1>
                </Col>
            </Row>
        );
    }
};
