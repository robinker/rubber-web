import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ListUser(props) {

    const users = props.users
    const loaded = props.loaded

    if(!loaded) return <h1>loading...</h1>
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>ชื่อ</th>
                    <th>สถานะ</th>
                    <th>รายละเอียด</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index) => {
                        return  <tr key={index}> 
                                    <td> {index+1} </td> 
                                    <td> {user.firstname + ' ' + user.lastname} </td> 
                                    <td> {user.role} </td>
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
