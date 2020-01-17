import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class ListUser extends Component {

    state = {
        user: []
    }

    componentDidMount = () => {
        axios.get('https://rubber-backend.herokuapp.com/users/')
            .then(res => {
                let data = []
                res.data.map(obj => {
                    return data.push(obj)
                })
                this.setState({user: data})
            })
           
        
            .catch(err => {
                console.log('Error: ', err)
            })
    }
    
    onClickUser = (index) => {
        console.log(this.state.user[index].username)
        console.log(this.state.user[index]._id)
    }

    render() {
        
        return (
            <div>
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
                            this.state.user.map((user, index) => {
                                return  <tr key={index}> 
                                            <td> {index+1} </td> 
                                            <td> {user.username} </td> 
                                            <td> <Link to='#' className='btn btn-light' key={index} onClick={() => this.onClickUser(index)}>คลิก</Link> </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
