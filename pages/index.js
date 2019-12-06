// NPM Dependencies
import React, { Component } from 'react';
import QRCode from 'qrcode.react';

// UI Dependencies
import {
    Col,
    Row
} from 'antd';

// Util Dependencies
import { buildLNURL } from '../utils';

export default class extends Component {
    static async getInitialProps({ req }) {
        const serverUrl = req ? req.headers['host'] : 'localhost:3000';

        return {
            serverUrl
        };
    };

    render() {
        const genieLnurl = buildLNURL(`${this.props.serverUrl}/api/lnurl-one`);

        return (
            <Row style={{ marginTop: 100 }}>
                <Col xs={24} sm={{ span: 8, offset: 8 }} style={{ textAlign: 'center' }}>
                    <h1>server URL: {this.props.serverUrl}</h1>
                    <a href={`lightning:${genieLnurl}`}>
                        <QRCode
                            value={genieLnurl}
                            size={128}
                            renderAs="svg"
                        />
                    </a>
                </Col>
            </Row>
        );
    }
};
