import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ListUser() {
    const [users, setUsers] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const CancleToken = axios.CancelToken
        const source = CancleToken.source()
        axios.get('https://rubber-backend.herokuapp.com/users/', {cancelToken: source.token})
        .then(res => {
            setUsers(res.data)
            setLoaded(true)
        })
        .catch(err => {
            console.log('Error: ', err)
        })
        return (() => {
            source.cancel()
        })
    },[])

    if(!loaded) return <h1>loading...</h1>
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ชื่อ</th>
                    <th>รายละเอียด</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        return  <tr key={index}> 
                                    <td> {index+1} </td> 
                                    <td> {user.username} </td> 
                                    <td> <Link to={{
                                        pathname: '/view/profile/' + user.username,
                                        state: {
                                            userId: user._id
                                        }
                                    }} className='btn btn-light' key={index}>คลิก</Link> </td>
                                </tr>
                    })
                }
            </tbody>
        </Table>
    )
}

export default ListUser
