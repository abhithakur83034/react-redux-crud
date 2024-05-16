import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, removeAuth } from '../../store/slices/user';
import { addToCart, decrement, getCartData, getpro, increment, removeFromCart, removeProduct } from '../../store/slices/product';

const ListTask = () => {
  const Auth = useSelector(getAuth);
  const Product = useSelector(getpro);
  const cartProduct = useSelector(getCartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log(Auth);
console.log(Product);
console.log(cartProduct);
  const handleUpdate = (index,type) => {
    console.log(index);
    if(type === 'auth'){
      navigate('/manage',{ state: {userIndex:index } }); 
    }else{
      navigate('/addproduct',{state:{proIndex:index}})
    }
  };

  let handleDel=(index,type)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (confirmDelete) {
      try {
        {
          type === "auth" ?  dispatch(removeAuth(index)) :dispatch(removeProduct(index));
        }
        
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }
  let handleRem=(index,type)=>{
    const confirmDelete = window.confirm("Are you sure you want to remove this from cart?");
    if (confirmDelete) {
      try {
       dispatch(removeFromCart(index))
        
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  }


  let handleCart=(item,index)=>{
    dispatch(addToCart(item,index))
  }
  let handleInc=(index)=>{
    dispatch(increment(index))

  }

  let handleDec=(index)=>{
    dispatch(decrement(index))
  }

  return (
    <div>
   <h1 className='text-center'>User Table</h1>
      {
        Auth?.length > 0 ?
          (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  Auth?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <Button onClick={() => handleUpdate(index,'auth')}>Update</Button> &nbsp;
                        <Button onClick={() => handleDel(index,'auth')}>Delete</Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          ) :
          <h1>No Data found!</h1>
      }

      <h1 className='text-center'>Product Table</h1>
      {
        Product?.length > 0 ?
         (
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pro_Name</th>
              <th>Pro_Price</th>
              <th>Pro_Des</th>
              <th>Pro_Qut</th>
              <th>Cart</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Product?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.proName}</td>
                  <td>{item.proPrice}</td>
                  <td>{item.proDescription}</td>
                  <td>{item.quantity}</td>
                  <td>
                  <td><Button onClick={() => handleCart(item,index)}>Add</Button></td>
                  </td>
                  <td>
                    <Button onClick={() => handleUpdate(index,'pro')}>Update</Button> &nbsp;
                    <Button onClick={() => handleDel(index,'pro')}>Delete</Button>
                    </td>
                    
                </tr>
              ))
            }
          </tbody>
        </Table>
         )
        :
        <h1>No Data found!</h1>
      }
      <h1 className='text-center'>Cart Table</h1>
      {
        cartProduct?.length > 0 ?
         (
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pro_Name</th>
              <th>Pro_Price</th>
              <th>Pro_Des</th>
              <th>Pro_Qut</th>
              <th>Inc/Dec</th>
              <th>Remove</th>

            </tr>
          </thead>
          <tbody>
            {
              cartProduct?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.proName}</td>
                  <td>{item.proPrice}</td>
                  <td>{item.proDescription}</td>
                  <td>{item.quantity}</td>
                  <td>
                  <Button onClick={() => handleInc(index)}>+</Button> &nbsp;
                  <Button onClick={() => handleDec(index)}>-</Button>
                  </td>
                  <td>
                    <Button onClick={() => handleRem(index,'pro')}>Delete</Button>
                 </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
         )
        :
        <h1>No Data found!</h1>
      }
    </div>
  )
}

export default ListTask
