import { Button, Col,  Row, Table, Tooltip } from 'antd';
import { getData } from 'Api/api';
import { url } from 'Api/url';
import NavbarTop from 'Components/Admin/Common/Navigation/NavbarTop';
import Sidebar from 'Components/Admin/Common/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { urnRRC } from 'Api/urn';
import { Link } from 'react-router-dom';
import { GrAdd } from 'react-icons/gr';
import { urnCustomerStayID } from 'Api/urn';

function ShowCus(props) {
    const [KHO, setKHO] = useState(null);
    useEffect(() => {
        var uri = url + urnCustomerStayID(props.idKHO);
        getData(uri).then(res => { setKHO(res.data) })
    }, [props.idKHO])
    return (
        <>
            {KHO && (KHO.tenKH || '')}
        </>
    )
}

function PageRRC(props) {
    const [dataRRC, setDataRRC] = useState([]);

    useEffect(() => {
       var uri = url + urnRRC;
       getData(uri)
       .then(res => setDataRRC(res.data));
    }, []);
    
    const columns = [
        {
            title: '#',
            dataIndex: 'idPTP',
            sorter: {
                compare: (a, b) => a.idPTP - b.idPTP
            },
            align: 'center',
            width: 150
        },
        {
            title: 'id booking',
            dataIndex: 'idDDP',
            sorter: {
                compare: (a, b) => a.idDDP - b.idDDP
            },
            align: 'center',
            width: 150
        },
        {
            title: 'id room',
            dataIndex: 'maPhong',
            align: 'center',
            width: 150
        },
        {
            title: 'id cus stay',
            dataIndex: 'idKHO',
            sorter: {
                compare: (a, b) => a.idKHO - b.idKHO
            },
            align: 'center',
            render: (idKHO) => (
                <ShowCus idKHO={idKHO} />
            ),
            width: 250
        },
        {
            title: 'Status',
            dataIndex: 'trangThai',
            sorter: {
                compare: (a, b) => a.trangThai - b.trangThai
            },
            render: trangThai => (
                <>{ trangThai === 1 ? 'Payment completed' : trangThai === 2 ? 'Deposit completed' : trangThai === 3 ? 'Went' : 'Undefined' }</>
            ),
            align: 'center',
            width: 250
        },
        {
            title: 'Start date',
            dataIndex: 'ngayDen',
            render: ngayDen => (
                <>{ format(new Date(ngayDen), 'dd/MM/yyyy') }</>
            ),
            align: 'center',
            width: 200
        },
        {
            title: 'End date',
            dataIndex: 'ngayDi',
            render: ngayDi => (
                <>{ format(new Date(ngayDi), 'dd/MM/yyyy') }</>
            ),
            align: 'center',
            width: 200
        }, 
        {
            title: 'Action',
            width: 200,
            align: 'center',
            render: (record) => (
                <>
                    <Button className="btn-edit">Change Status</Button>
                </>
            )
        },
    ];

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
                                        <Link to="/admin/rrc-add">
                                            <Button className="btn-add" id="btnAdd">
                                                <GrAdd className="icon-top" />
                                            </Button>
                                        </Link>
                                    </Tooltip>
                                </Col>
                                <Col xs={20} md={20} lg={20}>
                                    <h1 className="text-center"><b>LIST OF ROOM RENTAL CONTRACT</b></h1>
                                </Col>
                                <Col xs={2} md={2} lg={2} />
                            </Row>
                            <Table
                                columns={ columns } 
                                dataSource={ dataRRC } 
                                pagination={{ pageSize: 7, position: ['topRight', 'none'] }} 
                                scroll={{ x: 1300 }}
                            />
                        </Col>
                        <Col xs={2} md={2} lg={2} />
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default PageRRC
