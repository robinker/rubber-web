import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Pagination from './Pagination'
import { currentData, getIndex, dataPerPage } from '../pageconfigure'

function ListUser(props) {

    const users = props.users
    const loaded = props.loaded

    const [currentPage, setCurrentPage] = useState(1)
    
    const currentUsers = currentData(users, currentPage)

    const idx = getIndex(currentPage)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    if(!loaded) return <h1>loading...</h1>
    return ( <>
        <Table responsive hover>
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
                    currentUsers.map((user, index) => {
                        return  <tr key={index}> 
                                    <td> {idx[index]+1} </td> 
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
        <Pagination dataPerPage={dataPerPage} totalData={users.length} paginate={paginate}/>
        </>
    )
}

export default ListUser
