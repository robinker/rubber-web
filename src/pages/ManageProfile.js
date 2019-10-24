import React, { Component } from 'react'
import { Button} from 'reactstrap';

export default class AddUser extends Component {
    addGardener = () => {
        return window.location = '/management/profile/add'
    }
    addMiddleman = () => {
        return window.location = '/'
    }
    addAdmin = () => {
        return window.location = '/'
    }

    render() {
        return (
            <div className='container'>
                <h3>เพิ่มข้อมูลสมาชิก</h3>
                <Button onClick={this.addGardener}>เจ้าของสวนยาง</Button>
                <Button onClick={this.addMiddleman}>พ่อค้าคนกลาง</Button>
                <Button onClick={this.addAdmin}>Admin</Button>
            </div>
        )
    }
}
