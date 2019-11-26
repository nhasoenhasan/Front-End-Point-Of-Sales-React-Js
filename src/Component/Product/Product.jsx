import React, { useState} from 'react';
import {
  Row, Col,Spinner
} from 'reactstrap';
import {useSelector,useDispatch} from 'react-redux';
import { addToCart } from '../Public/Redux/Actions/cartActions';
//----------------------------------------------------------
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';


const useStyles = makeStyles({
  card: {
    maxWidth: 200,
    minWidth:200,
    maxHeight:265,
    minHeight:265,
    marginTop:20
  },
});


  const Productlist= (props) => {
  const classes = useStyles();
  const initialFormState = { sort: "",
                              order:"" };
  const [input, setInput] = useState(initialFormState);
  const [imgaeopacity,setimageOpacity]=useState(1)
  const dispatch=useDispatch();
  const products=useSelector(state=>state.product.productList)
  
  const handleClick = (id) =>{
    dispatch(addToCart(id))
  }

  console.log(products.length)

  return (
    <div >
        <div className="form-group row " > 
          <select className="form-control col-sm-2 ml-3" onChange={props.handleChange("sort")} value={input.sort} id="exampleFormControlSelect1">
            <option value={'name'}>Name</option>
            <option value={'Categories'}>Categories</option>
            <option value={'date_added'}>Date Aded</option>
            <option value={'date_updated'}>Date Updated</option>
          </select>
          <select className="form-control col-sm-2 ml-3" onChange={props.handleChange("order")} value={input.order} id="exampleFormControlSelect1">
            <option >Order By ...</option>
            <option value={'ASC'}>ASC</option>
            <option value={'DESC'}>DESC</option>
          </select>
        </div>
        <Row >
              { products.length===0?
              //When Data Loading
              <div >
                <Spinner style={{ width: '4rem', height: '4rem',marginTop:'10rem',marginLeft:'34rem' }} />
              </div>
              :
              //When Data Availabel
              products.map(item=>{
                return(
                <Col key={item.id_product} >
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="190"
                          image={item.image}
                          title="Contemplative Reptile"
                          style={{opacity:imgaeopacity}}
                          onClick={()=>{handleClick(item.id_product)}}
                        />

                        <DoneIcon style={{position:'absolute',color:'#015e29',left:'5rem',bottom:'10rem',fontSize: 50}}/>

                        <CardContent>
                          <Typography gutterBottom className="font-weight-bold" >
                            {item.name}
                          </Typography>
                          <Typography gutterBottom >
                            Rp.{item.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button size="small" color="primary">
                          Share
                        </Button>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                </Col>
                )
              })
              }
        </Row>
      {/* <div style={{marginLeft:"6%"}}>
        <div className="form-group row " style={{marginTop:"9%"}}> */}
          {/* <Input className="col-sm-2 ml-3" type="select" onChange={props.handleChange("sort")} value={input.sort}>
            <option >Sort By ...</option>
            <option value={'name'}>Name</option>
            <option value={'Categories'}>Categories</option>
            <option value={'date_added'}>Date Aded</option>
            <option value={'date_updated'}>Date Updated</option>
          </Input> */}
          {/* -------------- */}
          {/* <select className="form-control col-sm-2 ml-3" onChange={props.handleChange("sort")} value={input.sort} id="exampleFormControlSelect1">
            <option >Sort By ...</option>
            <option value={'name'}>Name</option>
            <option value={'Categories'}>Categories</option>
            <option value={'date_added'}>Date Aded</option>
            <option value={'date_updated'}>Date Updated</option>
          </select>
          <select className="form-control col-sm-2 ml-3" onChange={props.handleChange("order")} value={input.order} id="exampleFormControlSelect1">
            <option >Order By ...</option>
            <option value={'ASC'}>ASC</option>
            <option value={'DESC'}>DESC</option>
          </select>
        </div>
        <Row >
              { props.products.length==''?
              //When Data Loading
              <div >
                <Spinner style={{ width: '4rem', height: '4rem',marginTop:'10rem',marginLeft:'34rem' }} />
              </div>
              :
              //When Data Availabel
              props.products.map(item=>{
                return(
                <Col md="3" className="mb-5" >
                    <div className="card" style={{maxHeight: "60%",minHeight: "60%"}}>
                      <img className="card-img-top" style={{maxHeight: "15rem",minHeight: "15rem"}} src={item.image} alt="Card image cap"/>
                      <div className="card-body text-white" style={{border:" 1px solid black",backgroundColor:"black"}}>
                        <p className="card-text font-weight-bold">{item.name}</p>
                        <p className="card-text font-weight-bold">Rp.{item.price}</p>
                        <p className="card-text text-truncate" >{item.description}</p> 
                        <Button color="warning"  className="" onClick={()=>{handleClick(item.id_product)}}><FaPlus/></Button>
                      </div>
                    </div>
              </Col>
                )
              })
              }
        </Row>
        </div> */}
    </div>
  );
};


export default  Productlist;
