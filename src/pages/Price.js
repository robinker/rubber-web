import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Table } from 'react-bootstrap'
import EditPrice from '../components/EditPrice'
import axios from 'axios'

function Price() {

    const date = new Date()
    const month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 
                'เมษายน', 'พฤษภาคม', 'มิถุนายน', 
                'กรกฎาคม', 'สิงหาคม', 'กันยายน', 
                'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']

    const [data, setData] = useState([])
    // refresh from child
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const source = axios.CancelToken.source()

        function fetchData() {
            axios.get('http://localhost:5000/price/')
            .then(res => {
                setData(res.data)
            })
            .catch(err => {
                alert('เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง')
            })
        }

        fetchData()

        return () => { source.cancel() }
    }, [refresh])
    
    const user = useSelector(state => state.user)
    
    return (
        <Container>
            <h3>ราคาซื้อยางกลาง</h3>
            <h2 style={{margin: "2em 0 2em 0"  , textAlign: "center"}}>ประจำวันที่ {date.getUTCDate()} {month[date.getUTCMonth()]} {date.getUTCFullYear()+543}</h2>
            <Table striped bordered hover responsive style={{textAlign: "center"}}>
                <thead>
                    <tr>
                        <th>ชนิดยาง</th>
                        <th>ราคากลาง</th>
                        {user.role === 'ผู้ดูแลระบบ' ? <th></th> : null}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((price, index) => {
                            return <tr key={index}>
                                <td>{price.name}</td>
                                <td>{price.price.toFixed(2)} บาท/กิโลกรัม</td>
                                {user.role === 'ผู้ดูแลระบบ' ? <th><EditPrice title={price.name} id={price._id} token={user.token} setRefresh={setRefresh} price={price.price.toFixed(2)}/></th> : null}
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default Price
