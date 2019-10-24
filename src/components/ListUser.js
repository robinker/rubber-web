import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
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
                console.log(this.state.user)
            })
           
        
            .catch(err => {
                console.log('Error: ', err)
            })
    }
    

    render() {
        
        return (
            <div>
                <ListGroup>
                    {
                        this.state.user.map((user, index) => {
                            return <ListGroupItem tag="a" href="" key={index} action>{user.username}</ListGroupItem>
                        })
                    }
                </ListGroup>
            </div>
        )
    }
}
