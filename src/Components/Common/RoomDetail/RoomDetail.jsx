import React from 'react'
import { useEffect, useState } from 'react';
import { Row, Col, Rate, Image, Select, Collapse, Tooltip } from 'antd';
import DatePickerHotel from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { HiOutlineUserGroup } from "react-icons/hi";
import { IoIosBed } from "react-icons/io";
import { FaBath, FaHotel, FaRegHandshake } from "react-icons/fa";
import { AiOutlineCheck, AiFillQuestionCircle, AiOutlineWifi } from "react-icons/ai";
import { SiClockify } from "react-icons/si";
import { BsBucket } from "react-icons/bs";
import { GrObjectUngroup } from "react-icons/gr";
import { GiPerfumeBottle } from "react-icons/gi";
import { CgSmartHomeWashMachine } from "react-icons/cg";

import './RoomDetail.css'
import SliderItem from 'Components/Common/SliderItem/SliderItem';
import { url } from '../../../Api/url';
import axios from 'axios';

export default function RoomDetail(props) {
    const { Option } = Select;
    const { Panel } = Collapse;
    const [roomType, setRoomType]  = useState([]);
    const [image, setImage] = useState("");

    useEffect(() => {
        try {
            const getRoomType = async () => {
                var uri = url + '/api/roomtype/' + props.idLP;
                const result = await axios.get(uri)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                console.log('useEff 1: ', result);
                setRoomType(result);
            }
            getRoomType();
        } catch (error) {
            console.log(error);
        }
    },[props.idLP])

    useEffect(() => {
        try {
            const getImage = async () => {
                var uri = url + '/api/imageroomtype/get_by_idlp/' + props.idLP;
                const result = await axios.get(uri)
                .then((res) => res.data)
                .catch((err) => console.log(err));
                // console.log('useEff 2: ',result[0].hinhAnh);
                setImage(typeof result[0] !== 'undefined'? result[0].hinhAnh : "");
            }
            getImage();
        } catch (error) {
            console.log(error);
        }
    },[props.idLP])

    return (
        <>
            <div>
                <Row style={{padding:'3%'}}>
                    <Col xs={2} md={3} lg={6}></Col>
                    <Col xs={20} md={18} lg={12}>
                        <p style={{fontFamily:'Cambria', fontSize:'18px', textAlign:'center'}}>
                            {roomType.moTaGT}
                        </p>
                    </Col>
                    <Col xs={2} md={3} lg={6}></Col>
                </Row>
                <Row>
                    <Col xs={2} md={2} lg={3} />
                    <Col xs={20} md={20} lg={18}>
                        <Row style={{paddingBottom:'2%'}}>
                            <Col xs={12} md={12} lg={8}>
                                <span style={{fontFamily:'Cambria', fontSize:'30px', fontWeight:'revert'}}>{roomType.tenLP}</span>
                            </Col>
                            <Col xs={12} md={12} lg={16}>
                                <Rate allowHalf style={{fontSize:'25px'}} disabled value={roomType.hangPhong} />
                            </Col>
                        </Row>
                        <Row style={{paddingBottom:'3%'}}>
                            {/* <Col xs={24} md={24} lg={0}>
                                

                            </Col> */}

                            <Col xs={0} md={0} lg={8}>
                                <Image
                                    style={{width: "23vw"}}
                                    src={image}
                                />
                            </Col>
                            <Col xs={0} md={11} lg={0}>
                                <Image
                                    style={{width: "37vw"}}
                                    src={image}
                                />
                            </Col>
                            <Col xs={24} md={0} lg={0}>
                                <Image
                                    style={{width: "83vw"}}
                                    src={image}
                                />
                            </Col>
                            <Col xs={24} md={1} lg={0} style={{height: '15px'}} />
                            <Col xs={24} md={12} lg={9}>
                                <Row>
                                    <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                        <HiOutlineUserGroup style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.soNguoi}</span>
                                    </Col>
                                    <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                        <IoIosBed style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.giuong}</span>
                                    </Col>
                                    <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                        <FaBath style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.phongTam}</span>
                                    </Col>
                                    <Col span={6} style={{paddingLeft:'2%'}}>
                                        <Select defaultValue="1 room" name="slPhong" style={{height:'4vh', width: 'auto' }}>
                                            <Option value="1">1 room</Option>
                                            <Option value="2">2 rooms</Option>
                                            <Option value="3">3 rooms</Option>
                                            <Option value="4">4 rooms</Option>
                                            <Option value="5">5 rooms</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <hr />
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                                            <Panel style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}} header="MORE DETAILS" key="1">
                                                <p style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal', textAlign:'justify'}}>
                                                    {roomType.moTaCT}
                                                </p>
                                                <Row style={{paddingTop:'3%', paddingBottom:'3%'}} >
                                                    <Col>
                                                        <span style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}}>WHAT INCLUDES?</span>
                                                    </Col>
                                                </Row>
                                                <Row  style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Weekly cleaning</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Toiletries</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Washer/Dryer</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Oven</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Fridge</Col>
                                                        </Row>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Dishwasher</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Iron & ironing board</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Crockery & Cutlery</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Fresh bed & towels</Col>
                                                        </Row>
                                                        <Row>
                                                            <Col><AiOutlineCheck/> Hairdryer</Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Panel>
                                        </Collapse>
                                        <Row style={{padding:'3% 0 3% 0'}}>
                                            <Col span={24}>
                                                <span style={{fontFamily:'Cambria'}}>Minimum stay from 1 nights. Price per night</span>
                                                <Tooltip placement="right"  title="Minimum night stay and average price per night vary depending on dates selected.">
                                                    <span style={{paddingLeft:'2%'}} id="question"><AiFillQuestionCircle style={{width:'1vw', height:'auto'}}/></span>
                                                </Tooltip>
                                            </Col>
                                        </Row>
                                        <Row style={{ backgroundColor:'#F3F1EF', padding:'3%' }}>
                                            <Col>
                                                <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Price: 5000 USD</span>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={24} md={24} lg={0} style={{height: '25px'}} />
                            <Col xs={24} md={24} lg={7}>
                                <Row>
                                    <Col xs={1} md={0} lg={3}></Col>
                                    <Col xs={22} md={24} lg={20} style={{border:'1px solid #B27440', height: '230px', width: '100%'}}>
                                        <Row style={{ marginTop: '25px'}}>
                                            <Col xs={2} md={2} lg={3}></Col>
                                            <Col xs={20} md={20} lg={18} style={{textAlign:'center'}}>
                                                <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Stay Native</span>
                                            </Col>
                                            <Col xs={2} md={2} lg={3}></Col>
                                        </Row>
                                        <Row style={{ marginTop: '5px'}}>
                                            <Col xs={1} md={2} lg={3}></Col>
                                            <Col xs={22} md={20} lg={18} style={{textAlign:'center'}}>
                                                <div className='date-start-picker'>
                                                    <DatePickerHotel
                                                        dateFormat='dd/MM/yyyy'
                                                        placeholderText="Arrive"
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={1} md={2} lg={3}></Col>
                                        </Row>
                                        <Row>
                                            <Col xs={1} md={2} lg={3}></Col>
                                            <Col xs={22} md={20} lg={18} style={{textAlign:'center'}}>
                                                <div className='date-end-picker'>
                                                    <DatePickerHotel
                                                        dateFormat='dd/MM/yyyy'
                                                        placeholderText="Depart"
                                                    />
                                                </div>
                                            </Col>
                                            <Col xs={1} md={2} lg={3}></Col>
                                        </Row>
                                        <Row style={{ marginTop: '10px'}}>
                                            <Col xs={1} md={2} lg={3}></Col>
                                            <Col xs={22} md={20} lg={18} style={{textAlign:'center'}}>
                                                <button style={{backgroundColor:'#B27440', border:'none', width:'auto', height:'25px'}}>
                                                    <b style={{color:'white'}}>Add to cart</b>
                                                </button>
                                            </Col>
                                            <Col xs={1} md={2} lg={3}></Col>
                                        </Row>
                                    </Col>
                                    <Col xs={1} md={0} lg={3}></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={2} md={2} lg={3} />
                </Row>
                {/* <Row>
                    <Col xs={1} md={2} lg={3}></Col>
                    <Col xs={11} md={8} lg={6}>
                        <span style={{fontFamily:'Cambria', fontSize:'30px', fontWeight:'revert'}}>{roomType.tenLP}</span>
                    </Col>
                    <Col xs={11} md={8} lg={6}>
                        <Rate allowHalf style={{fontSize:'25px'}} disabled value={roomType.hangPhong} />
                    </Col>
                    <Col xs={1} md={6} lg={9}></Col>
                </Row>
                <Row style={{padding:'2% 0 2% 0'}} gutter={20}>
                    <Col xs={1} md={2} lg={3}></Col>
                    <Col xs={0} md={0} lg={6}>
                        <Image
                            width={350}
                            src={image}
                        />
                    </Col>
                    <Col xs={22} md={20} lg={0}>
                        <Image
                            width={400}
                            src={image}
                        />
                    </Col>
                    <Col xs={0} md={0} lg={7}>
                        <Row>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <HiOutlineUserGroup style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.soNguoi}</span>
                            </Col>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <IoIosBed style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.giuong}</span>
                            </Col>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <FaBath style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.phongTam}</span>
                            </Col>
                            <Col span={6} style={{paddingLeft:'2%'}}>
                                <Select defaultValue="1 room" name="slPhong" style={{height:'4vh', width: 100 }}>
                                    <Option value="1">1 room</Option>
                                    <Option value="2">2 rooms</Option>
                                    <Option value="3">3 rooms</Option>
                                    <Option value="4">4 rooms</Option>
                                    <Option value="5">5 rooms</Option>
                                </Select>
                            </Col>
                        </Row>
                        <hr style={{color:'#D9D9D9'}}/>
                        <Row>
                            <Col span={24}>
                                <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                                    <Panel style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}} header="MORE DETAILS" key="1">
                                        <p style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>
                                            {roomType.moTaCT}
                                        </p>
                                        <Row style={{paddingTop:'3%', paddingBottom:'3%'}} >
                                            <Col>
                                                <span style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}}>WHAT INCLUDES?</span>
                                            </Col>
                                        </Row>
                                        <Row  style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>
                                            <Col span={12}>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Weekly cleaning</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Toiletries</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Washer/Dryer</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Oven</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Fridge</Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Dishwasher</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Iron & ironing board</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Crockery & Cutlery</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Fresh bed & towels</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Hairdryer</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                                <Row style={{padding:'3% 0 3% 0'}}>
                                    <Col span={24}>
                                        <span style={{fontFamily:'Cambria'}}>Minimum stay from 1 nights. Price per night</span>
                                        <Tooltip placement="right"  title="Minimum night stay and average price per night vary depending on dates selected.">
                                            <span style={{paddingLeft:'2%'}} id="question"><AiFillQuestionCircle style={{width:'1vw', height:'auto'}}/></span>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor:'#F3F1EF', padding:'3%' }}>
                                    <Col>
                                        <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Price: 5000 USD</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={22} md={20} lg={0}>
                        <Row>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <HiOutlineUserGroup style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.soNguoi}</span>
                            </Col>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <IoIosBed style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.giuong}</span>
                            </Col>
                            <Col span={6} style={{borderRight:'1px solid #CECECE'}}>
                                <FaBath style={{width:'4vw', height:'4vh'}}/><span style={{fontSize:'20px'}}>{roomType.phongTam}</span>
                            </Col>
                            <Col span={6} style={{paddingLeft:'2%'}}>
                                <Select defaultValue="1 room" name="slPhong" style={{height:'4vh', width: 100 }}>
                                    <Option value="1">1 room</Option>
                                    <Option value="2">2 rooms</Option>
                                    <Option value="3">3 rooms</Option>
                                    <Option value="4">4 rooms</Option>
                                    <Option value="5">5 rooms</Option>
                                </Select>
                            </Col>
                        </Row>
                        <hr style={{color:'#D9D9D9'}}/>
                        <Row>
                            <Col span={24}>
                                <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
                                    <Panel style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}} header="MORE DETAILS" key="1">
                                        <p style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>
                                            {roomType.moTaCT}
                                        </p>
                                        <Row style={{paddingTop:'3%', paddingBottom:'3%'}} >
                                            <Col>
                                                <span style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'bold'}}>WHAT INCLUDES?</span>
                                            </Col>
                                        </Row>
                                        <Row  style={{fontFamily:'Cambria', fontSize:'15px', fontWeight:'normal'}}>
                                            <Col span={12}>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Weekly cleaning</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Toiletries</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Washer/Dryer</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Oven</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Fridge</Col>
                                                </Row>
                                            </Col>
                                            <Col span={12}>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Dishwasher</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Iron & ironing board</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Crockery & Cutlery</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Fresh bed & towels</Col>
                                                </Row>
                                                <Row>
                                                    <Col><AiOutlineCheck/> Hairdryer</Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Panel>
                                </Collapse>
                                <Row style={{padding:'3% 0 3% 0'}}>
                                    <Col span={24}>
                                        <span style={{fontFamily:'Cambria'}}>Minimum stay from 1 nights. Price per night</span>
                                        <Tooltip placement="right"  title="Minimum night stay and average price per night vary depending on dates selected.">
                                            <span style={{paddingLeft:'2%'}} id="question"><AiFillQuestionCircle style={{width:'1vw', height:'auto'}}/></span>
                                        </Tooltip>
                                    </Col>
                                </Row>
                                <Row style={{ backgroundColor:'#F3F1EF', padding:'3%' }}>
                                    <Col>
                                        <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Price: 5000 USD</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={0} md={0} lg={5}>
                        <Row>
                            <Col style={{border:'1px solid #B27440', height: 'vh', width: '17.5vw'}} span={24}>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Stay Native</span>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <div className='date-start-picker'>
                                            <DatePickerHotel
                                                dateFormat='dd/MM/yyyy'
                                                placeholderText="Arrive"
                                            />
                                        </div>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <div className='date-end-picker'>
                                            <DatePickerHotel
                                                dateFormat='dd/MM/yyyy'
                                                placeholderText="Depart"
                                            />
                                        </div>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <button style={{backgroundColor:'#B27440', border:'none', width:'10vw', height:'auto'}}>
                                            <b style={{color:'white'}}>Add to cart</b>
                                        </button>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={22} md={20} lg={0}>
                        <Row>
                            <Col style={{border:'1px solid #B27440', height: 'vh', width: '17.5vw'}} span={24}>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <span style={{fontFamily:'Cambria', fontSize:'20px', fontWeight:'bold'}}>Stay Native</span>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <div className='date-start-picker'>
                                            <DatePickerHotel
                                                dateFormat='dd/MM/yyyy'
                                                placeholderText="Arrive"
                                            />
                                        </div>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <div className='date-end-picker'>
                                            <DatePickerHotel
                                                dateFormat='dd/MM/yyyy'
                                                placeholderText="Depart"
                                            />
                                        </div>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                                <Row style={{padding:'5%'}}>
                                    <Col span={3}></Col>
                                    <Col style={{textAlign:'center'}} span={18}>
                                        <button style={{backgroundColor:'#B27440', border:'none', width:'10vw', height:'auto'}}>
                                            <b style={{color:'white'}}>Add to cart</b>
                                        </button>
                                    </Col>
                                    <Col span={3}></Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={1} md={2} lg={3}></Col>
                </Row> */}
                <hr style={{color:'#D9D9D9'}}/>
                <Row style={{paddingTop:'3%', paddingBottom:'3%'}}>
                    <Col span={24} style={{textAlign:'center'}}>
                        <span style={{fontFamily:'Cambria', fontSize:'30px', fontWeight:'revert'}}>What you get when you stay with us.</span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={0} md={4} lg={4}></Col>
                    <Col xs={6} md={4} lg={4} style={{borderRight:'1px solid #CECECE'}}>
                        <div>
                            <div style={{textAlign:'center'}}><FaHotel style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>CHECK IN 15:00 / CHECK OUT 11:00</p></div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={4} style={{borderRight:'1px solid #CECECE'}}>
                        <div>
                            <div style={{textAlign:'center'}}><SiClockify style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>24/7 SUPPORT</p></div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={4} style={{borderRight:'1px solid #CECECE'}}>
                        <div>
                            <div style={{textAlign:'center'}}><BsBucket style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>WEEKLY HOUSEKEEPING</p></div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={4}>
                        <div>
                            <div style={{textAlign:'center'}}><AiOutlineWifi style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>FREE WIFI</p></div>
                        </div>
                    </Col>
                    <Col xs={0} md={4} lg={4}></Col>
                </Row>
                <Row style={{paddingBottom:'5%'}}>
                    <Col xs={0} md={4} lg={4}></Col>
                    <Col xs={6} md={4} lg={4} style={{borderRight:'1px solid #CECECE'}}>
                        <div>
                            <div style={{textAlign:'center'}}><GrObjectUngroup style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>SOCIAL SPACES</p></div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={4} style={{borderRight:'1px solid #CECECE'}}>
                        <div>
                            <div style={{textAlign:'center'}}><GiPerfumeBottle style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>LUXURY TOILETRIES</p></div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={4} style={{borderRight:'1px solid #CECECE'}}>
                        <div>
                            <div style={{textAlign:'center'}}><CgSmartHomeWashMachine style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>WASHER DRYER</p></div>
                        </div>
                    </Col>
                    <Col xs={6} md={4} lg={4} >
                        <div>
                            <div style={{textAlign:'center'}}><FaRegHandshake style={{width:'4vw', height:'4vh'}}/></div>
                            <div style={{padding:'5%'}}><p style={{textAlign:'center', fontWeight:'revert'}}>24/7 RECEPTION</p></div>
                        </div>
                    </Col>
                    <Col xs={0} md={4} lg={4}></Col>
                </Row>
                <Row style={{ marginTop: "8vh", height: "92vh" }}>
                    <Col xs={1} md={3} lg={3}></Col>
                    <Col xs={20} md={18} lg={18}>
                        <SliderItem />
                    </Col>
                    <Col xs={1} md={3} lg={3}></Col>
                </Row>
            </div>
        </>
    )
}

