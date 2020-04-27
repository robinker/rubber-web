import React from 'react'
import { Navbar,Nav, Image, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import LoginForm from './LoginForm'
import logo from '../assets/rubberLogo.png'

function Header(props) {

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
                {loggedIn()}
                <Nav.Item>
                    <NavLink to="/management" className='nav-link'>จัดการข้อมูลสมาชิก</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/price" className='nav-link'>ราคาซื้อขายยางกลาง</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/search" className='nav-link'>ตรวจสอบใบอนุญาต</NavLink>
                </Nav.Item>
                {/* <Nav.Item>
                    <NavLink to="/" className='nav-link'>รายงานสรุปเนื้อที่สวนยาง</NavLink>
                </Nav.Item> */}
                <Nav.Item>
                    <NavLink to="/transactions" className='nav-link'>รายงานสรุปการซื้อขาย</NavLink>
                </Nav.Item>
            </>
        )
    }

    const userLoggedIn = () => {
        return (
            <>
                <Nav.Item>
                    <NavLink to="/price" className='nav-link'>ราคาซื้อขายยางกลาง</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/search" className='nav-link'>ตรวจสอบใบอนุญาต</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/transactions" className='nav-link'>รายงานสรุปการซื้อขาย</NavLink>
                </Nav.Item>
                <Nav.Item>
                    <NavLink to="/contact" className='nav-link'>ติดต่อเรา</NavLink>
                </Nav.Item>

            </>
        )
    }

    const gardenerLoggedIn = () => {
        return (
            <>
                {loggedIn()}
                {userLoggedIn()}
            </>
        )
    }
    const middlemanLoggedIn = () => {
        return (
            <>
                <Nav.Item>
                    <NavLink to="/sale" className='nav-link'>ซื้อยาง</NavLink>
                </Nav.Item>
                {loggedIn()}

                {userLoggedIn()}
            </>
        )
    }

    let navItem
    let isLogin = false
    
    if(props.role === 'ผู้ดูแลระบบ'){
        navItem = adminLoggedIn()
        isLogin = true
    }
    else if(props.role === 'เกษตรกร'){
        navItem = gardenerLoggedIn()
        isLogin = true
    }
    else if(props.role  === 'พ่อค้าคนกลาง'){
        navItem = middlemanLoggedIn()
        isLogin = true
    }

    return (
        <div className = "container-fluid" style={{background: "#F5F5F5"}} >
            <Navbar>
                <Navbar.Brand>  
                    <Image src={logo} width="240" height="60"/>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav hidden={isLogin}>
                        <LoginForm></LoginForm>
                    </Nav>
                    <Navbar.Text hidden={!isLogin}>
                        Signed in as: <u style={{color: "black"}}> {props.name} </u> 
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
            <Navbar expand="lg" hidden={!props.isLogged}>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Container>
                        <Nav className="justify-content-center">
                            { navItem }
                            {/* <NavLink to="/" hidden={!this.props.isLogged} className='nav-link'>ออกจากระบบ</NavLink> */}
                            <a href="/" hidden={!props.isLogged} className='nav-link'>ออกจากระบบ</a>
                        </Nav>
                    </Container>
                </Navbar.Collapse>
            </Navbar>
            <hr></hr>
        </div>
    )
}

export default Header