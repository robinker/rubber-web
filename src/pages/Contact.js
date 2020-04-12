import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Contact() {

    return (
        <Container>
            <Row>
                <Col>
                    <h1>ติดต่อเรา (Contact us)</h1>
                    <p>การยางแห่งประเทศไทย (Rubber Authority of Thailand)</p> 
                    <p><ion-icon name="location-sharp" /> เลขที่ 67/25 ถนนบางขุนนนท์ เขตบางกอกน้อย กทม. 10700</p>
                    <p><ion-icon name="call" /> โทร 02-433-2222 ต่อ 511</p>
                    <p><ion-icon name="mail" /> email: orf2008@rubber.mail.go.th</p>
                </Col>
                <Col> 
                    <iframe title='google_map' 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1937.5606152231155!2d100.4674628!3d13.771562!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2999200197bb5%3A0x3f271f271645d547!2sRubber%20Authority%20of%20Thailand!5e0!3m2!1sen!2sth!4v1586676167834!5m2!1sen!2sth" 
                    style={{ border: 0, frameborder: 0, width: 650, height: 300}} aria-hidden='false' tabIndex='0'></iframe>
                </Col>
            </Row>
        </Container>
    )
}

export default Contact
