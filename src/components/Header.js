import React, { Component } from 'react'
import { Navbar,Nav, Image, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import LoginForm from './LonginForm'
import logo from '../assets/rubberLogo.png'
export default class AppNavbar extends Component {
    state = {
        isOpen: false,
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
                    <Nav.Item>
                        <NavLink exact to="/" className='nav-link'> หน้าหลัก </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/profile" className='nav-link'>ข้อมูลส่วนตัว</NavLink>
                    </Nav.Item>
                </>
            )   
        }

        const adminLoggedIn = () => {
            return (
                <>
                <Nav.Item>
                    <NavLink to="/management" className='nav-link'>จัดการข้อมูลสมาชิก</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/" className='nav-link'>ราคาซื้อขายยางกลาง</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/" className='nav-link'>ตรวจสอบใบอนุญาต</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/" className='nav-link'>รายงานสรุปเนื้อที่สวนยาง</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/" className='nav-link'>รายงานสรุปการซื้อขาย</NavLink>
                </Nav.Item>


                </>
            )
        }

        const userLoggedIn = () => {
            return (
                <>
                    <Nav.Item>
                        <NavLink to="/" className='nav-link'>ราคาซื้อขายยางกลาง</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/" className='nav-link'>ตรวจสอบใบอนุญาต</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/transactions" className='nav-link'>รายงานสรุปการซื้อขาย</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/" className='nav-link'>ติดต่อเรา</NavLink>
                    </Nav.Item>

                </>
            )
        }

        const gardenerLoggedIn = () => {
            return (
                <>
                    <Nav.Item>
                        <NavLink to="/" className='nav-link'>แจ้งเนื้อที่สวนยาง</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink to="/sale" className='nav-link'>แจ้งขายราคายาง</NavLink>    
                    </Nav.Item>

                    {userLoggedIn()}
                </>
            )
        }
        const middlemanLoggedIn = () => {
            return (
                <>
                    <Nav.Item>
                        <NavLink to="/" className='nav-link'>แจ้งซื้อราคายาง</NavLink>
                    </Nav.Item>

                    {userLoggedIn()}
                </>
            )
        }

        let navItem
        
        if(this.props.role === 'Administrator'){
            navItem = adminLoggedIn()
            this.isLogin = true
        }
        else if(this.props.role === 'Gardener'){
            navItem = gardenerLoggedIn()
            this.isLogin = true
        }
        else if(this.props.role  === 'Middleman'){
            navItem = middlemanLoggedIn()
            this.isLogin = true
        }

        return (
            <div className = "container-fluid" style={{background: "#F5F5F5"}} >
                <Navbar>
                    <Image
                        src={logo}
                        width="240"
                        height="60"
                    />
                    <Navbar.Brand style={{fontSize: '2em'}}> Rubber Info </Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            { !this.isLogin ? notLoggedIn() : null}
                        </Nav>
                        <Navbar.Text hidden={!this.isLogin}>
                            Signed in as: <a> {this.props.name} </a> 
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
                <Navbar expand="lg" hidden={!this.props.isLogged}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Container>
                            <Nav className="justify-content-end">
                            { !this.isLogin ? null : loggedIn()}
                                { navItem }
                                {/* <NavLink to="/" hidden={!this.props.isLogged} className='nav-link'>ออกจากระบบ</NavLink> */}
                                <a href="/" hidden={!this.props.isLogged} className='nav-link'>ออกจากระบบ</a>
                            </Nav>
                        </Container>
                    </Navbar.Collapse>
                </Navbar>
                <hr></hr>
            </div>
            
        )
    }
}
        
        