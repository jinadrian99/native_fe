import { Button, Col, message, Popconfirm, Row, Table, Tooltip } from 'antd';
import { deleteData } from 'Api/api';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import { urnRoomType, urnDailyRate, urnDailyRateID } from 'Api/urn';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function PageDailyRate(props) {
    const [dataDailyRates, setdataDailyRates] = useState([]);
    const [dataRoomtypes, setdataRoomtypes] = useState([]);
    
    useEffect(() => {
        var uri = url + urnDailyRate;

        getData(uri)
        .then(response => setdataDailyRates(response.data))
        .catch(error => console.log(error));
    },[]);

    useEffect(() => {
        try {
            var uri = url + urnRoomType;

            getData(uri)
            .then(res => setdataRoomtypes(res.data))
            .catch(err => console.error(err));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const columns = [
        {
            title: '#',
            dataIndex: 'idGTN',
            sorter: {
                compare: (a, b) => a.idGTN - b.idGTN
            }
        },
        {
            title: 'Start day',
            dataIndex: 'ngayBatDau',
            render: ngayBatDau => (
                <>{ format(new Date(ngayBatDau), 'dd/MM/yyyy') }</>
            )

        },
        {
            title: 'Rate',
            dataIndex: 'giaMoiTuan',
            sorter: {
                compare: (a, b) => a.giaMoiTuan - b.giaMoiTuan
            },
            render: giaMoiTuan => (
                <>{giaMoiTuan} $</>
            )
        },
        {
            title: 'ID room type',
            dataIndex: 'idLP',
            sorter: {
                compare: (a, b) => a.idLP - b.idLP
            },
        },
        {
            title: 'Title room type',
            dataIndex: 'idLP',
            render: idLP => (
                dataRoomtypes.map((item) => 
                    item.idLP === idLP && item.tenLP
                )
            )
        },
        {
            title: 'Actions',
            render: (record) => (
                <>
                    <Link to={ '/admin/daily-rate-upd/' + record.idGTN }><Button className="btn-edit">Edit</Button></Link>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={ () => onDelete(record.idLP) }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="btn-delete">Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    function onDelete(id) {
        var uri = url + urnDailyRateID(id);
        deleteData(uri)
        .then((res) => {
            if(typeof res.data !== 'undefined'){
                console.log(res.data);
                message.success("Delete successfully !");

                uri = url + urnDailyRate;
                getData(uri)
                .then(res => setdataDailyRates(res.data))
                .catch(err => console.error(err));
            } else if (typeof res.response !== 'undefined'){
                console.log(res.response.data);
                message.error("Delete fail. " + res.response.data);
            }
        })
    }

    return (
        <>
            <NavbarTop props={props} />
            <Row>
                <Col span={5}>
                    <Sidebar />
                </Col>
                <Col span={19}>
                    <div style={{ height: '3vh' }} />
                    <Row>
                        <Col xs={2} md={2} lg={2} />
                        <Col xs={20} md={20} lg={20}>
                        <Row>
                            <Col xs={2} md={2} lg={2}>
                                <Tooltip placement="right" title="Create new one">
                                    <Link to="/admin/daily-rate-add">
                                        <Button className="btn-add" id="btnAdd">
                                            <GrAdd className="icon-top" />
                                        </Button>
                                    </Link>
                                </Tooltip>
                            </Col>
                            <Col xs={20} md={20} lg={20}>
                                <h1 className="text-center"><b>LIST OF DAILY RATES FOR ROOMS</b></h1>
                            </Col>
                            <Col xs={2} md={2} lg={2} />
                        </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataDailyRates } 
                                pagination={{ pageSize: 7, position: ['topRight', 'none'] }} 
                                scroll={{ x: 1080 }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}
