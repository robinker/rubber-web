import React, { Component } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import Blocks from '../components/TransactionList'
import Table from '../components/TransactionTable'
import TotalTable from '../components/TotalTable'

class Transaction extends Component {
    state = {
        blocks: [],
        transactions: {
            sale: [],
            buy: []
        },
        saleList: [] ,
        buyList: [] ,
        monthSale: -1,
        monthBuy: -1,
        year: "",
        showBlock: false,
        firstToggle: false,
        secondToggle: false,
        thirdToggle: false,
    }

    componentDidMount = () => {
        if(this.props.role === 'ผู้ดูแลระบบ'){
            axios.get('https://rubber-backend.herokuapp.com/transactions/blocks')
                .then(res => {
                    let data = []
                    res.data.map(obj => {
                        return data.push(obj.chain)
                    })
                    this.setState({blocks: data})
                })
                .catch(err => {
                    console.log('Error: ', err)
                })
        } else if(this.props.role === 'เกษตรกร' || this.props.role === 'พ่อค้าคนกลาง') {
            axios.get('https://rubber-backend.herokuapp.com/transactions/' + this.props.firstname + '/' +  this.props.lastname)
            .then(res => {
                this.setState({
                    transactions: res.data,
                })
            })
            .catch(err => {
                console.log('Error: ', err)
            })
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value 
        },this.filter)
    }

    filter = () => {
        let sell = []
        let buy = []
        if(this.state.monthSale >= 0) {
            sell = this.state.transactions.sale.filter(t => new Date(t.createdAt).getUTCMonth() === Number(this.state.month))
        }else if(this.state.monthBuy >= 0) {
            buy = this.state.transactions.buy.filter(t => new Date(t.createdAt).getUTCMonth() === Number(this.state.month))
        }
        this.setState({sellList: sell, buyList: buy})
    }

    toggleBlock = () => {
        this.setState({showBlock: !this.state.showBlock})
    }

    toggleTable = (event) => {
        let button
        if(event.target.name === 'firstToggle'){
            button = this.state.firstToggle
        }else if(event.target.name === 'secondToggle'){
            button = this.state.secondToggle
        }else if(event.target.name === 'thirdToggle'){
            button = this.state.thirdToggle
        }
        this.setState({
            [event.target.name] : !button
        })
    }

    render() {
        return (
            <div className='container'>
                <h2>รายงานสรุปการซื้อขาย</h2>
                <br></br>
                <Form.Group as={Row} hidden={this.state.firstToggle}>
                    <Form.Label column sm={2}> บัญชีการขายยาง</Form.Label>
                    <Col sm={2}>
                        <Form.Control as='select' name = 'monthSale' onChange={this.handleChange}>
                            <option value = {-1} defaultValue > ทั้งหมด</option>
                            <option value = {0} > มกราคม</option>
                            <option value = {1} > กุมภาพันธ์</option>
                            <option value = {2} > มีนาคม</option>
                            <option value = {3} > เมษายน</option>
                            <option value = {4} > พฤษภาคม</option>
                            <option value = {5} > มิถุนายน</option>
                            <option value = {6} > กรกฎาคม</option>
                            <option value = {7} > สิงหาคม</option>
                            <option value = {8} > กันยายน</option>
                            <option value = {9} > ตุลาคม</option>
                            <option value = {10} > พฤศจิกายน</option>
                            <option value = {11} > ธันวาคม</option>
                        </Form.Control>
                    </Col>
                    {/* <Form.Label column sm={1} > ปี พ.ศ.  {this.state.year} </Form.Label>
                    <Col sm={2}>
                        <Form.Control type='number' name='year' onChange={this.handleChange} /> 
                    </Col> */}
                </Form.Group>
                <Row>
                    <Col>
                        <Button name='firstToggle' onClick={this.toggleTable}>ซ่อนตาราง</Button>
                    </Col>
                </Row>
                <br></br>
                <Table transactions={this.state.monthSale < 1 ? this.state.transactions.sale : this.state.saleList} header="รายการขายยาง" hidden={this.state.firstToggle}></Table>
                <br></br>
                {
                    this.props.role === 'พ่อค้าคนกลาง' ? <>
                    <Form.Group as={Row} hidden={this.state.secondToggle}>
                        <Form.Label column sm={2}> บัญชีการซื้อยาง</Form.Label>
                        <Col sm={2}>
                            <Form.Control as='select' name = 'monthBuy' onChange={this.handleChange}>
                                <option value = {-1} defaultValue > ทั้งหมด</option>
                                <option value = {0} > มกราคม</option>
                                <option value = {1} > กุมภาพันธ์</option>
                                <option value = {2} > มีนาคม</option>
                                <option value = {3} > เมษายน</option>
                                <option value = {4} > พฤษภาคม</option>
                                <option value = {5} > มิถุนายน</option>
                                <option value = {6} > กรกฎาคม</option>
                                <option value = {7} > สิงหาคม</option>
                                <option value = {8} > กันยายน</option>
                                <option value = {9} > ตุลาคม</option>
                                <option value = {10} > พฤศจิกายน</option>
                                <option value = {11} > ธันวาคม</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Button name='secondToggle' onClick={this.toggleTable}>ซ่อนตาราง</Button>
                        </Col>
                    </Row>
                    <br></br>
                    <Table transactions={this.state.monthBuy < 1 ? this.state.transactions.buy : this.state.buyList} header="รายการซื้อยาง" hidden={this.state.secondToggle}></Table> 
                    </> : null
                }
                <br></br>
                {
                    this.props.role === 'ผู้ดูแลระบบ' ? <>
                    <Button onClick={this.toggleBlock}>Show Blocks</Button>
                    <Blocks transactions={this.state.blocks} hidden={!this.state.showBlock}></Blocks> 
                    </> : null
                }
                <br></br>
                {
                    this.props.role !== 'ผู้ดูแลระบบ' ? <>
                    <TotalTable transactions={this.state.transactions.sale}></TotalTable>
                    </> : null
                }
            </div>
        )
    }
}


export default Transaction;