import React, { Component } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Blocks from '../components/TransactionList'
import Table from '../components/TransactionTable'

class Transaction extends Component {
    state = {
        blocks: [],
        transactions: {
            sale: [],
            buy: []
        },
        month: -1,
        year: '',
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
        })
    }

    filter = () => {
        if(this.state.month >= 0) {
            let result = this.state.transactions.sale.filter(t => new Date(t.createdAt).getUTCMonth() === this.state.month)
            console.log(result)
            // this.setState({ temp: result })
        }
    }

    render() {
        return (
            <div className='container'>
                <h2>รายงานสรุปการซื้อขาย</h2>
                <br></br>
                {/* <Form.Group as={Row}>
                    <Form.Label column sm={2}> บัญชีการซื้อยาง {this.state.month}</Form.Label>
                    <Col sm={2}>
                        <Form.Control as='select' name = 'month' onChange={this.handleChange}>
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
                    <Form.Label column sm={1} > ปี พ.ศ.  {this.state.year} </Form.Label>
                    <Col sm={2}>
                        <Form.Control type='number' name='year' onChange={this.handleChange} /> 
                    </Col>
                </Form.Group> */}
                {
                    this.props.role === 'ผู้ดูแลระบบ' ? <Blocks transactions={this.state.blocks}></Blocks> : null
                }
                <Table transactions={this.state.transactions.sale} header="รายการขายยาง"></Table>
                <br></br>
                {
                    this.props.role === 'พ่อค้าคนกลาง' ? <Table transactions={this.state.transactions.buy} header="รายการซื้อยาง"></Table> : null
                }
            </div>
        )
    }
}


export default Transaction;