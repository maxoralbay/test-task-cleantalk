import React, {useEffect, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {setFormData, setCalcTriangulate,} from "../dataSlice";

export default function SendForm() {
    const FLOAT_REGEX = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
    const dispatch = useDispatch();
    // const apiStatus = useSelector(state => state.data.status);
    // const apiError = useSelector(state => state.data.error);
    const {register, handleSubmit, formState: {errors}} = useForm();
    const onSubmit = (data) => {
        // data item convert to float with 6 decimal with map
        console.log('Data before parsing', data);


        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (key.includes('latitude') || key.includes('longitude')) {
                    data[key] = parseFloat(data[key]);
                }
            }
        }
        console.log("DATA:::", data);
        dispatch(setCalcTriangulate(data));
        // input data for map
        dispatch(setFormData(data));
    };
    const onError = (error) => {
        console.log("ERROR:::", error);
    };


    return (
        <>
            <h2>Форма для ввода координатных опорных точек:</h2>
            <Form onSubmit={handleSubmit(onSubmit, onError)}>
                {/* Pivot 1*/}
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="basePivotLatitude1">
                            <Form.Label>Latitude 1</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude 1"
                                {...register(
                                    "latitude1",
                                    {
                                        required: "This field is required",
                                        pattern: {
                                            value: FLOAT_REGEX,
                                            message: "Invalid latitude"
                                        }
                                    }
                                )}
                            />
                            {errors.latitude1 && (
                                <Form.Text className="text-danger">
                                    {errors.latitude1.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="basePivotLongitude1">
                            <Form.Label>Longitude 1</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude 1"
                                {...register(
                                    "longitude1",
                                    {
                                        required: "This field is required",
                                        pattern: {
                                            value: FLOAT_REGEX,
                                            message: "Invalid longitude"
                                        }
                                    }
                                )}
                            />
                            {errors.longitude1 && (
                                <Form.Text className="text-danger">
                                    {errors.longitude1.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                {/* Pivot 2*/}
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="basePivotLatitude2">
                            <Form.Label>Latitude 2</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude 2"
                                {...register(
                                    "latitude2",
                                    {
                                        required: "This field is required",
                                        pattern: {
                                            value: FLOAT_REGEX,
                                            message: "Invalid latitude"
                                        }
                                    }
                                )}
                            />
                            {errors.latitude2 && (
                                <Form.Text className="text-danger">
                                    {errors.latitude2.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="basePivotLongitude2">
                            <Form.Label>Longitude 2</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude 2"
                                {...register(
                                    "longitude2",
                                    {
                                        required: "This field is required",
                                        pattern: {
                                            value: FLOAT_REGEX,
                                            message: "Invalid longitude"
                                        }
                                    }
                                )}
                            />
                            {errors.longitude2 && (
                                <Form.Text className="text-danger">
                                    {errors.longitude2.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
                {/* Pivot 3*/}
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="basePivotLatitude3">
                            <Form.Label>Latitude 3</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter latitude 3"
                                {...register(
                                    "latitude3",
                                    {
                                        required: "This field is required",
                                        pattern: {
                                            value: FLOAT_REGEX,
                                            message: "Invalid latitude"
                                        }
                                    }
                                )}
                            />
                            {errors.latitude3 && (
                                <Form.Text className="text-danger">
                                    {errors.latitude3.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="basePivotLongitude3">
                            <Form.Label>Longitude 3</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter longitude 3"
                                {...register(
                                    "longitude3",
                                    {
                                        required: "This field is required",
                                        pattern: {
                                            value: FLOAT_REGEX,
                                            message: "Invalid longitude"
                                        }
                                    }
                                )}
                            />
                            {errors.longitude3 && (
                                <Form.Text className="text-danger">
                                    {errors.longitude3.message}
                                </Form.Text>
                            )}
                        </Form.Group>
                    </Col>

                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>

    );
}