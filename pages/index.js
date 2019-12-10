// NPM Dependencies
import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import { Col, Row, Typography, Button, Icon } from 'antd';

// Util Dependencies
import { buildLNURL } from '../utils';

const { Text } = Typography;

export default class extends Component {
    static async getInitialProps({ req }) {
        const serverUrl = req ? req.headers['host'] : 'localhost:3000';

        return {
            serverUrl
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            showLnurlHelp: false,
        };
    }

    render() {
        const { showLnurlHelp } = this.state;
        const genieLnurl = buildLNURL(`https://${this.props.serverUrl}/api/lnurl-one`);

        return (
            <Row style={{ marginTop: 100 }}>
                <Col xs={24} sm={{ span: 8, offset: 8 }} style={{ textAlign: 'center' }}>
                    <div style={{ marginBottom: 20 }}>
                        <img
                            src="/genie.jpeg"
                            width={200}
                        />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <a href={`lightning:${genieLnurl}`}>
                            <QRCode
                                value={genieLnurl}
                                size={128}
                                renderAs="svg"
                            />
                        </a>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <Text code>Scan LNURL to ask genie a question</Text>
                    </div>
                    {/*<p>{this.props.serverUrl}</p>*/}
                    <div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => this.setState({ showLnurlHelp: !showLnurlHelp })}
                            style={{ marginBottom: 6 }}
                        >
                            <small>
                                Which wallets are LNURL-compatible?&nbsp;
                                {showLnurlHelp ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
                            </small>
                        </Button>
                        {showLnurlHelp && (
                            <div style={{ marginBottom: 14 }}>
                                <small>
                                    <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://lightning-wallet.com/">Bitcoin Lightning Wallet</a> (Android)</div>
                                    <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://t.me/lntxbot">lntxbot</a> (iOS, Android & Web)</div>
                                </small>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        );
    }
};
