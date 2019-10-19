import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container } from 'reactstrap';
import HeaderPage from './HeaderPage'
import LoginForm from './LonginForm'
export default class AppNavbar extends Component {
    state = {
        isOpen: false,
        role: 'admin',
        isLogin: true
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }


    render() {
        const notLoggedIn = () => {
            return (
                <>
                    <LoginForm></LoginForm>
                </>
            )
        }

        const loggedIn = () => {
            return (
                <>
                    <NavItem>
                        <NavLink href="">หน้าหลัก</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">ข้อมูลส่วนตัว</NavLink>
                    </NavItem>
                </>
            )
        }

        const adminLoggedIn = () => {
            return (
                <>
                    <NavItem>
                        <NavLink href="">จัดการข้อมูลสมาชิก</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">ราคาซื้อขายยางกลาง</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">ตรวจสอบใบอนุญาต</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">รายงานสรุปเนื้อที่สวนยาง</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">รายงานสรุปการซื้อขาย</NavLink>
                    </NavItem>
                </>
            )
        }

        const userLoggedIn = () => {
            return (
                <>
                    <NavItem>
                        <NavLink href="">ราคาซื้อขายยางกลาง</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">ตรวจสอบใบอนุญาต</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">รายงานสรุปการซื้อขาย</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">ติดต่อเรา</NavLink>
                    </NavItem>
                </>
            )
        }

        const gardenerLoggedIn = () => {
            return (
                <>
                    <NavItem>
                        <NavLink href="">แจ้งเนื้อที่สวนยาง</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">แจ้งขายราคายาง</NavLink>
                    </NavItem>
                    {userLoggedIn()}
                </>
            )
        }
        const middlemanLoggedIn = () => {
            return (
                <>
                    <NavItem>
                        <NavLink href="">แจ้งซื้อราคายาง</NavLink>
                    </NavItem>
                    {userLoggedIn()}
                </>
            )
        }

        let navItem
        
        if(this.state.role === 'admin'){
            navItem = adminLoggedIn()
        }
        else if(this.state.role === 'gardener'){
            navItem = gardenerLoggedIn()
        }
        else if(this.state.role === 'middleman'){
            navItem = middlemanLoggedIn()
        }

        return (
            <div className = "container-fluid" style={{background: "green"}} >
                {/* <HeaderPage></HeaderPage> */}
                <Navbar dark expand="md" >
                    <NavbarBrand disabled style={{fontSize: '2em'}}> Rubber Info </NavbarBrand>
                    <Container>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                { !this.state.isLogin ? notLoggedIn() : loggedIn()}
                                { navItem }
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
                <hr></hr>
            </div>
            
        )
    }
}
        
        