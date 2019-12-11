// NPM Dependencies
import React, { Component } from 'react';
import { Col, Row, Typography, Input, Button } from 'antd';

import { LNnode } from '../utils';

const { Text } = Typography;

export default class extends Component {
    static async getInitialProps({ req, query }) {
        const { r: hash } = query;

        const cleanedHash = hash.replace(/ /g, '+');
        const buffer = Buffer.from(cleanedHash, 'base64');
        const hexOfHash = buffer.toString('hex');

        let invoiceData;
        try {
            const getInvoice = await LNnode.get(`/v1/invoice/${hexOfHash}`);
            invoiceData = getInvoice.status === 200 ? getInvoice.data : 'NOT_FOUND';
        } catch (error) {
            invoiceData = 'NOT_FOUND';
        }

        return {
            hash: cleanedHash,
            invoiceData
        };
    };

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    answerQuestion(e) {
        e.preventDefault();
        const { text } = this.state;

        window.open(`http://letmegooglethat.com/?q=${text}`,'_blank');
    }

    render() {
        const { hash, invoiceData } = this.props;

        if (invoiceData === 'NOT_FOUND') {
            return (
                <Row style={{ marginTop: 100 }}>
                    <Col xs={24} sm={{ span: 8, offset: 8 }} style={{ textAlign: 'center' }}>
                        <img
                            src="/genieNotFound.png"
                            width={150}
                        />
                        <div style={{ marginBottom: 20, marginTop: 30 }}>
                            <Text code style={{ fontSize: 18 }}>
                                Genie thinks you didn't pay
                            </Text>
                        </div>
                        <small>your payment hash is<br/>{hash}</small>
                    </Col>
                </Row>
            );
        }

        return (
            <Row style={{ marginTop: 100 }}>
                <Col xs={24} sm={{ span: 8, offset: 8 }} style={{ textAlign: 'center' }}>
                    <img
                        src="/genieAnswer.png"
                        width={200}
                    />
                    <div style={{ marginBottom: 20, marginTop: 30 }}>
                        <Text code style={{ fontSize: 18 }}>
                            Genie will answer your question...
                        </Text>
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <Input
                            size="large"
                            placeholder="your question..."
                            onChange={
                                ({ target }) =>
                                this.setState({ text: target.value })
                            }
                        />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <Button
                            type="primary"
                            size="large"
                            onClick={(e) => this.answerQuestion(e)}
                        >
                            Receive answer
                        </Button>
                    </div>
                    <small>your payment hash is<br/>{hash}</small>
                </Col>
            </Row>
        );
    }
}
