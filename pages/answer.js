// NPM Dependencies
import React, { Component } from 'react';
import { Col, Row } from 'antd';
import fetch from 'isomorphic-unfetch';

import { LNnode } from '../utils';

export default class extends Component {
    static async getInitialProps({ req, query }) {
        const { r: hash } = query;

        const buffer = Buffer.from(hash, 'base64');
        const hexOfHash = buffer.toString('hex');

        let invoiceData;
        try {
            const getInvoice = await LNnode.get(`/v1/invoice/${hexOfHash}`);
            invoiceData = getInvoice.status === 200 ? getInvoice.data : 'NOT_FOUND';
        } catch (error) {
            invoiceData = 'NOT_FOUND';
        }

        return {
            hash,
            invoiceData
        };
    };

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
                        <h1>Genie thinks you didn't pay your invoice</h1>
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
                    <h1>Genie is too tired to answer your question</h1>
                    <small>but your payment hash is {hash}</small>
                </Col>
            </Row>
        );
    }
}
