import React, { useEffect,useState } from 'react';
import { Line } from 'react-chartjs-2';
import {getOrder} from '../Public/Redux/Actions/product';
import { useSelector,useDispatch } from 'react-redux';

const Historyorder=()=>{


    
    const Order=useSelector(state=>state.product.orderHistory)
    let arrcounted_orders = [];
    let arrmonthname_orders=[];
    let datas=Order.data;
   

  

    for(var i=0; i<datas.length; i++) {
        arrcounted_orders.push(datas[i].counted_order);
        arrmonthname_orders.push(datas[i].month_name);
    }

    const data = {
        labels: arrmonthname_orders,
        datasets: [
          {
            label: 'Order History',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(245, 0, 87,0.4)',
            borderColor: 'rgba(245, 0, 87,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(245, 0, 87,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(245, 0, 87,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: arrcounted_orders
          }
        ]
      };

    return(
        <div style={{paddingLeft:50,width:'80%'}}>
            <h2>Order History</h2>
            <Line  data={data} />
        </div>
    )

}

export default Historyorder;