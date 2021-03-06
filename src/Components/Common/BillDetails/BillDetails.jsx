import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { url } from 'Api/url';
import { urnBillID, urnKhdID } from 'Api/urn';
import { getData, putData } from 'Api/api';
import { urnBillDetailsByIdBill } from 'Api/urn';
import { Col, Row, Table, Descriptions, Progress, Button, message, Popconfirm } from 'antd';
import { columns } from './moduleColumn';
import CurrencyFormat from 'react-currency-format';
import { format } from 'date-fns';
import BtnDeposit from '../Button/BtnDeposit';
import BtnUpdateRooms from '../Button/BtnUpdateRooms';
import BtnPDFBill from '../Button/BtnPDFBill';
import { urnBillCusCancel, urnBookingID } from 'Api/urn';

function BillDetails(props) {
    const [bill, setBill] = useState(null);
    const [dataBillDetails, setDataBillDetails] = useState([]);
    const [dataKHD, setDataKHD] = useState(null);
    const [isRefesh, setIsRefesh] = useState(false);
    const [isRefeshDetail, setIsRefeshDetail] = useState(false);
    const [isCanUpdateRoom, setIsCanUpdateRoom] = useState(false);
    const [isExportPDF, setIsExportPDF] = useState(false);

    useEffect(() => {
        var uri = url + urnBillID(props.idPTT);
        getData(uri).then(res => {
            setBill(res.data);
            uri = url + urnKhdID(res.data.idKHD);
            getData(uri).then(res => setDataKHD(res.data[0]));
        });
    },[isRefesh, props.idPTT]);

    useEffect(() => {
        var uri = url + urnBillDetailsByIdBill(props.idPTT);
        getData(uri).then(res =>{ console.log("load:", res.data); setDataBillDetails(res.data); });
    }, [isRefeshDetail, props.idPTT,]);

    const onRefesh = (rf = false) => {
        // console.log("onRefesh", isRefesh);
        setIsRefesh(rf);
    }

    const onCanUpdateRooms = (can = false) => {
        setIsCanUpdateRoom(can);
    }

    const onRefeshUpdate = (rf = false) => {
        // console.log("new data: ", data);
        if(rf === true){
            // props.propsParent.history.push('/user/bills');
            setIsCanUpdateRoom(false);  
            setIsRefeshDetail(true);
        }
    }

    const onSubmitCancelBill = () => {
        var uri1 = url + urnBillCusCancel(bill.idPTT);
        getData(uri1).then(resCancel => {
            if (resCancel.data) {
                var uri2 = url + urnBookingID(bill.idDDP);
                getData(uri2).then(resGetDDP => {
                    if (resGetDDP.data) {
                        var dataDDP = {
                            ngayDen: format(new Date(resGetDDP.data.ngayDen), "yyyy/MM/dd"),
                            ngayDi: format(new Date(resGetDDP.data.ngayDi), "yyyy/MM/dd"),
                            soDem: resGetDDP.data.soDem,
                            ngayDatPhong: format(new Date(resGetDDP.data.ngayDatPhong), "yyyy/MM/dd"),
                            tongThanhTien: resGetDDP.data.tongThanhTien,
                            trangThaiDat: 1,
                            idKHD: resGetDDP.data.idKHD
                        }
                        var uri3 = url + urnBookingID(bill.idDDP);
                        putData(uri3, dataDDP)
                        .then((resDDP) => {
                            message.success(resCancel.data, 2).then(()=>{
                                setIsRefesh(true);
                                return;
                            });
                        })
                    }
                })
            }
            else {
                message.error("Something went wrong, please try again!");
                return;
            }
        })
    }

    return (
        <>
            {
                isExportPDF ? (
                    <>
                        <BtnPDFBill bill={bill} dataBillDetails={dataBillDetails} />
                    </>
                ) : (
                    <>
                        <Row style={{ fontFamily: 'Georgia' }}>
                            <Col xs={4} md={4} lg={4}></Col>
                            <Col xs={16} md={16} lg={16}>
                                <Row>
                                    <Col xs={18} md={18} lg={18}><h1><b>THE INVOICE</b></h1></Col>
                                    <Col xs={6} md={6} lg={6} style={{textAlign: 'end'}}>
                                        <div>
                                            <Button className="btn-back" onClick={ () => {props.propsParent.history.goBack();} }><b>Back</b></Button>
                                            <Button className="btn-back" onClick={ () => setIsExportPDF(true) }><b>Export PDF</b></Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={4} md={4} lg={4}></Col>
                        </Row>
                        <Row className="mb-15">
                            <Col xs={5} md={5} lg={5}></Col>
                            <Col xs={14} md={14} lg={14}>
                                <Descriptions
                                    bordered
                                    column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
                                >
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder', width: '150px'}} label="ID bill">{ bill && (bill.idPTT || 'Non') }</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Booking">{ bill && (bill.idDDP || 'Non') }</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID off sale">{ bill && (bill.idKM || 'Non') }</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="ID Customer">{ dataKHD && (dataKHD.tenKH || 'Non') }</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Date of issue">{ format(new Date(bill && bill.ngayThanhToan), 'dd/MM/yyyy') }</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Diff dates">{ bill && (bill.soDem || 0)} Night(s)</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Start date">{ format(new Date(bill && bill.ngayDen), 'dd/MM/yyyy') }</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="End date">{ format(new Date(bill && bill.ngayDi), 'dd/MM/yyyy')}</Descriptions.Item>
                                    <Descriptions.Item labelStyle={{fontWeight: 'bolder'}} label="Status">
                                        <Row>
                                            <Col xs={10} md={14} lg={20}>
                                                <Progress
                                                    strokeColor={{
                                                        '0%': '#108ee9',
                                                        '100%': '#87d068',
                                                    }}
                                                    percent={ bill && (bill.tinhTrang === 0 ? 30 : ((bill.tinhTrang === 1 || bill.tinhTrang === 2) ? 60 : (bill.tinhTrang === 3 ? 100 : 0))) }
                                                    status="active"
                                                    showInfo={false}
                                                />
                                            </Col>
                                            <Col xs={14} md={10} lg={4} style={{textAlign:'center'}}>
                                                { bill && (bill.tinhTrang === 0 ? 'Unpaid' : (bill.tinhTrang === 1 || bill.tinhTrang === 2) ? 'Deposited' : bill.tinhTrang === 3 ? 'Paid' : <span style={{color:'#E3143C', fontWeight: 'bolder'}}>Canceled</span>) } 
                                            </Col>
                                        </Row>
                                    
                                    </Descriptions.Item>
                                </Descriptions>
                            </Col>
                            <Col xs={5} md={5} lg={5}></Col>
                        </Row>
                        <Row style={{ fontFamily: 'Georgia' }}>
                            <Col xs={4} md={4} lg={4}></Col>
                            <Col xs={16} md={16} lg={16}><h1><b>DETAIL INVOICE</b></h1></Col>
                            <Col xs={4} md={4} lg={4}></Col>
                        </Row>
                        <Row className="mb-30">
                            <Col xs={5} md={5} lg={5} />
                            <Col xs={14} md={14} lg={14}>
                                <Table 
                                    columns={ columns }
                                    dataSource={ dataBillDetails }
                                    pagination={{ pageSize: 5, position: ['topRight', 'none'] }} 
                                    bordered
                                    scroll={{ x: 350 }}
                                    footer={() => 
                                        <>
                                           <Row>
                                                <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Night(s): </Col>
                                                <Col xs={2} md={2} lg={2} />
                                                <Col xs={4} md={4} lg={4}>
                                                    {bill ? bill.soDem : 0}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total rooms cost: </Col>
                                                <Col xs={2} md={2} lg={2} />
                                                <Col xs={4} md={4} lg={4}>
                                                    <CurrencyFormat value={bill ? bill.tongTienPhong : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Deposit 30%: </Col>
                                                <Col xs={2} md={2} lg={2} />
                                                <Col xs={4} md={4} lg={4}>
                                                    <CurrencyFormat value={bill ? bill.tienCoc : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Extra cost: </Col>
                                                <Col xs={2} md={2} lg={2} />
                                                <Col xs={4} md={4} lg={4}>
                                                    <CurrencyFormat value={bill ? bill.phiPhatSinh : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Off sale: </Col>
                                                <Col xs={2} md={2} lg={2} />
                                                <Col xs={4} md={4} lg={4}>
                                                    {bill ? bill.phanTramGiam : 0}%
                                                </Col>
                                            </Row>
                                            <hr />
                                            <Row>
                                                <Col xs={18} md={18} lg={18} style={{textAlign:'end', fontWeight:'bolder'}}>Total amount remaining: </Col>
                                                <Col xs={2} md={2} lg={2} />
                                                <Col xs={4} md={4} lg={4}>
                                                    <CurrencyFormat value={bill ? bill.tongTienConLai : 0} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </Col>
                                            </Row>
                                        </>
                                    }
                                />

                            </Col>
                            <Col xs={5} md={5} lg={5} />
                        </Row>
                        <Row className="mb-15">
                            <Col xs={6} md={6} lg={9} />
                            {
                                bill && bill.tinhTrang === 1 && (
                                    <>
                                        <Col xs={6} md={6} lg={6} style={{ textAlign:'center' }}>
                                            <b><i>Wait pay at hotel</i></b>
                                        </Col>
                                    </>
                                )
                            }
                            {
                                bill && bill.tinhTrang === 0 && (
                                    <>
                                        {
                                            isCanUpdateRoom ? (
                                                <>
                                                    {/* <Col xs={4} md={4} lg={4} style={{ textAlign:'center' }}>
                                                        <BtnDeposit bill={bill} onRefesh={onRefesh} onCanUpdateRooms={onCanUpdateRooms} />
                                                    </Col> */}
                                                    <Col xs={6} md={6} lg={6} style={{ textAlign:'center' }}>
                                                        <BtnUpdateRooms bill={bill} billDetails={ dataBillDetails } onRefeshUpdate={onRefeshUpdate} />
                                                    </Col>
                                                </>
                                            ) : (
                                                <>
                                                    <Col xs={6} md={6} lg={6} style={{ textAlign:'center' }}>
                                                        <BtnDeposit bill={bill} onRefesh={onRefesh} onCanUpdateRooms={onCanUpdateRooms} />
                                                    </Col>
                                                </>
                                            )
                                        }
                                    </>

                                )
                            }
                            <Col xs={6} md={6} lg={9} />
                        </Row>
                        <Row className="mb-30">
                            <Col xs={6} md={6} lg={9} />
                            {
                                bill && (bill.tinhTrang === 1 || bill.tinhTrang === 2) && (
                                    <>
                                        <Col xs={6} md={6} lg={6} style={{ textAlign:'center' }}>
                                            <Popconfirm
                                                title="Are you sure to cancel bill, if you click yes, your deposit money will not be refunded (except: you are staying at hotel)"
                                                onConfirm={ onSubmitCancelBill }
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button>Cancel bill</Button>
                                            </Popconfirm>
                                        </Col>
                                    </>
                                )
                            }
                            {
                                bill && bill.tinhTrang === 0 && (
                                    <>
                                        <Col xs={6} md={6} lg={6} style={{ textAlign:'center' }}>
                                            <Button onClick={ onSubmitCancelBill }>Cancel bill</Button>
                                        </Col>
                                    </>

                                )
                            }
                            <Col xs={6} md={6} lg={9} />
                        </Row>
                    </>
                )
            }
        </>
    )
}

BillDetails.propTypes = {
    idPTT: PropTypes.string.isRequired
}

export default BillDetails
