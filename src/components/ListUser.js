import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default class ListUser extends Component {

    state = {
        user: []
    }

    componentDidMount = () =>{
        axios.get('http://localhost:5000/users/')
            .then(res => {
                let data = []
                res.data.map(obj => {
                    data.push(obj)
                })
                this.setState({user: data})
            })
           
        
            .catch(err => {
                console.log('Error: ', err)
            })
    }
    

    render() {
        
        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อ</th>
                            <th>Infomation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.user.map((user, index) => {
                                return  <tr key={index}> 
                                            <td> {index+1} </td> 
                                            <td> {user.username} </td> 
                                            <td> <Link to='#' className='btn btn-light' key={index}>Clcik me</Link> </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </Table>
            </div>
        )
    }
}
