import React from 'react'
import { Image, Col } from 'react-bootstrap'
import block from '../assets/block.png'
import chainOfBlock from '../assets/chain.png'

function Block(props) {
    return (
        <Col>
            <Image
                src = {block}
                style={{marginLeft: "5%"}}
                width="50"
                height="50"
                
            />
             <Image
                src = {chainOfBlock}
                style={{marginLeft: "40%"}}
                width="40"
                height="15"
                hidden = {props.isHidden}
            />
            <div style={{fontSize: "12px"}}>
                <br></br>
                <div style={{fontSize: "15px", fontWeight: "bold"}}> {props.obj.source.name} </div> 
                <label> 
                    ประเภทยาง:  {props.obj.rubberType} <br/>
                    ปริมาณยาง:  {props.obj.volume} <br/>
                    ราคา:  {props.obj.price} <br/>
                    { props.date.getUTCDate() + "/" + (props.date.getUTCMonth()+1) + "/" + (props.date.getUTCFullYear()+543) } <br/>
                    { props.date.getHours() + ":" + props.date.getMinutes() + " น."}
                </label>
            </div> 
        </Col>    
    )
}

export default Block
