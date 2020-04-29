import React, { useState, useEffect } from 'react'
import { Form, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap'
import axios from 'axios'
import Blocks from '../components/TransactionList'
import Table from '../components/TransactionTable'
import TotalTable from '../components/TotalTable'

function Transaction(props) {
    const [state, setState] = useState({
        saleList: [],
        buyList: [],
        monthSale: -1,
        monthBuy: -1,
        year: "",
    })
    const [showTable, setShowTable] = useState({
        block: false,
        sell: true,
        buy: false,
        total: false,
    })
    const [blocks, setBlocks] = useState([])
    const [transactions, setTransaction] = useState({
        sale: [],
        buy: []
    })

    useEffect(() => {
        const CancelToken = axios.CancelToken
        const source = CancelToken.source()
        function fetchData() {
            if (props.role === 'ผู้ดูแลระบบ') {
                axios.get('https://rubber-backend.herokuapp.com/transactions/blocks', { cancelToken: source.token })
                    .then(res => {
                        let data = []
                        res.data.map(obj => {
                            return data.push(obj.chain)
                        })
                        setBlocks(data)
                    })
                    .catch(err => {
                        console.log('Error: ', err)
                    })
                axios.get('https://rubber-backend.herokuapp.com/transactions/', { cancelToken: source.token })
                    .then(res => {
                        setTransaction(transactions => ({
                            ...transactions,
                            sale: res.data
                        }))
                    })
                    .catch(err => {
                        console.log('Error: ', err)
                    })
            } else if (props.role === 'เกษตรกร' || props.role === 'พ่อค้าคนกลาง') {
                axios.get('https://rubber-backend.herokuapp.com/transactions/' + props.firstname + '/' + props.lastname, { cancelToken: source.token })
                    .then(res => {
                        setTransaction(res.data)
                    })
                    .catch(err => {
                        console.log('Error: ', err)
                    })
            }
        }
        fetchData()
        return () => {
            source.cancel()
        }
    }, [props])

    useEffect(() => {
        function filter() {
            let sell = []
            let buy = []
            if (state.monthSale >= 0) {
                sell = transactions.sale.filter(t => new Date(t.createdAt).getUTCMonth() === Number(state.monthSale))
            }
            if (state.monthBuy >= 0) {
                buy = transactions.buy.filter(t => new Date(t.createdAt).getUTCMonth() === Number(state.monthBuy))
            }
            return setState(state => ({
                ...state,
                saleList: sell,
                buyList: buy
            }))
        }
        filter()
    }, [state.monthBuy, state.monthSale, transactions])

    function handleChange(event) {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    return (
        <div className='container'>
            <Row>
                <h2>รายงานสรุปการซื้อขาย</h2>
                <Col>
                    <DropdownButton id="dropdown-basic-button" title="รูปแบบการแสดง">
                        <Dropdown.Item name='sell' onClick={() => setShowTable({ sell: true, block: false, buy: false })}>บัญชีการขายยาง</Dropdown.Item>
                        {
                            props.role === 'ผู้ดูแลระบบ' ? <Dropdown.Item onClick={() => setShowTable({ block: true, sell: false, buy: false })}>Blockchain</Dropdown.Item>
                                : props.role === 'พ่อค้าคนกลาง' ? <Dropdown.Item onClick={() => setShowTable({ buy: true, block: false, sell: false })}>บัญชีการซื้อยาง</Dropdown.Item>
                                    : <Dropdown.Item onClick={() => setShowTable({ total: true, sell: false })}>บัญชีปริมาณยางคงเหลือ</Dropdown.Item>
                        }

                    </DropdownButton>
                </Col>
            </Row>
            <br></br>
            <Form.Group as={Row} hidden={!showTable.sell}>
                <Form.Label column sm={2}> บัญชีการขายยาง</Form.Label>
                <Col sm={2}>
                    <Form.Control as='select' name='monthSale' onChange={handleChange}>
                        <option value={-1} defaultValue > ทั้งหมด</option>
                        <option value={0} > มกราคม</option>
                        <option value={1} > กุมภาพันธ์</option>
                        <option value={2} > มีนาคม</option>
                        <option value={3} > เมษายน</option>
                        <option value={4} > พฤษภาคม</option>
                        <option value={5} > มิถุนายน</option>
                        <option value={6} > กรกฎาคม</option>
                        <option value={7} > สิงหาคม</option>
                        <option value={8} > กันยายน</option>
                        <option value={9} > ตุลาคม</option>
                        <option value={10} > พฤศจิกายน</option>
                        <option value={11} > ธันวาคม</option>
                    </Form.Control>
                </Col>
            </Form.Group>
            <Table transactions={state.monthSale < 0 ? transactions.sale : state.saleList} header="รายการขายยาง" hidden={!showTable.sell}></Table>
            {
                props.role === 'พ่อค้าคนกลาง' ? <>
                    <Form.Group as={Row} hidden={!showTable.buy}>
                        <Form.Label column sm={2}> บัญชีการซื้อยาง</Form.Label>
                        <Col sm={2}>
                            <Form.Control as='select' name='monthBuy' onChange={handleChange}>
                                <option value={-1} defaultValue > ทั้งหมด</option>
                                <option value={0} > มกราคม</option>
                                <option value={1} > กุมภาพันธ์</option>
                                <option value={2} > มีนาคม</option>
                                <option value={3} > เมษายน</option>
                                <option value={4} > พฤษภาคม</option>
                                <option value={5} > มิถุนายน</option>
                                <option value={6} > กรกฎาคม</option>
                                <option value={7} > สิงหาคม</option>
                                <option value={8} > กันยายน</option>
                                <option value={9} > ตุลาคม</option>
                                <option value={10} > พฤศจิกายน</option>
                                <option value={11} > ธันวาคม</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Table transactions={state.monthBuy < 0 ? transactions.buy : state.buyList} header="รายการซื้อยาง" hidden={!showTable.buy}></Table>
                </> : null
            }
            {
                props.role === 'ผู้ดูแลระบบ' ? <>
                    <Blocks transactions={blocks} hidden={!showTable.block}></Blocks>
                </> : null
            }
            <br></br>
            {
                props.role !== 'ผู้ดูแลระบบ' && props.role !== 'พ่อค้าคนกลาง' ? <div hidden={!showTable.total}>
                    <TotalTable transactions={transactions.sale}></TotalTable>
                </div> : null
            }
        </div>
    )
}

export default Transaction