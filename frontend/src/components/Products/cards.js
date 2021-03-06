
import React,{useState,useEffect} from 'react';
import {Card,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as FaIcons from 'react-icons/fa';



const Cards = (props)=>{
    let today = Date.now().valueOf();
    let date = new Date(props.product.date).valueOf();
    const [diff] = useState(today-date)
    const [vis1,setVis1] = useState("none");
    const [vis,setVis] = useState("block");
    const [p,setP] = useState(0);
    useEffect(() => {
        if(diff<1296000000){
            setVis1("block");
            setVis("none");
            setP(parseFloat(props.product.price))
            props.edit(props.product.name);
        }     
    }, [])
    
    return(
        <Card className = "card text-center border-primary mb-3" style={{ maxWidth: '20rem',minWidth:'20rem',margin:'30px'}}>
            <Card.Img variant="top" src={props.product.image} height="300px" width="300px"/>
            <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <Card.Text>
            Category : {props.product.category}<br/>
            Dosage: {props.product.dosage}<br/>
            Stock: {props.product.stock}<br/>
           <a style={{display:vis}}>Price: {props.product.price}<br/></a>
           <a style={{display:vis1}}>Price: <strike>{p}</strike> {props.product.price} </a>
           <br/> 
            </Card.Text>
            <Button variant="primary" onClick={() =>props.handleClick(props.product.name,props.product.price)}>Add to Cart &nbsp; <FaIcons.FaShoppingCart/></Button>
            </Card.Body>
        </Card>
    );
    
}

export default Cards;