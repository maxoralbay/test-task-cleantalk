import React from 'react';
import {Container} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function Footer() {
    return (
        <Container className="pt-4 border-top">
            <Row>
                <Col>
                    <p>Author M.Oralbayev Date 2023</p>
                </Col>
            </Row>
        </Container>
    );
}