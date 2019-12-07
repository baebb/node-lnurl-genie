// NPM Dependencies
import React, { Component } from 'react';
import { Col, Row } from "antd";

export default class extends Component {
    static async getInitialProps({ req }) {
        const hash = req.query['r'];

        return {
            hash
        };
    };

    render() {
        const { hash } = this.props;

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
