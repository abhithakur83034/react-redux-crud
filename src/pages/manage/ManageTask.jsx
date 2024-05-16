import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAuth, getAuth, updateAuth } from '../../store/slices/user';


const ManageTask = () => {
  const { register, handleSubmit, formState: { errors },setValue } = useForm();
  const [present, setPresent] = useState([]);
  const [user,setUser] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(getAuth);
  const location = useLocation();
  const userIndex = location?.state?.userIndex;
  console.log(userIndex);

  useEffect(() => {
    console.log(auth);
    setUser(auth[userIndex])
    setPresent(auth)
  }, [auth]);
 
  useEffect(() => {
    if(user){
      setValue('name', user?.name);
      setValue('phone', user?.phone);
      setValue('email', user?.email);
    }
  }, [user]);

console.log(present);
  const onSubmit = (data) => {
    console.log(data);
    if(user){
        data.index= userIndex;
        dispatch(updateAuth(data))
        navigate('/');
    }else{
      let findUser = present.filter((item)=>item.email === data.email);
      console.log(findUser);
      if(findUser.length > 0){
    alert("Already Registered!")
      }else{
        dispatch(createAuth(data));
        navigate('/');
      }
    }
  };

  return (
    <div>
    <h1 className='text-center'>{user?"Update":"Create"} Your Todo</h1>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <form onSubmit={handleSubmit(onSubmit)}>
              <p>
                <input
                  type="text"
                  placeholder="Name"
                  className='form-control'
                  {...register('name', { required: true })}
                />
                {errors.name && <span className='err'>Name is required</span>}
              </p>
              <p>
                <input
                  type="number"
                  placeholder="Phone"
                  className='form-control'
                  {...register('phone', { required: true })}
                />
                {errors.phone && <span className='err'>Phone is required</span>}
              </p>
              <p>
                <input
                  type="email"
                  placeholder="Email"
                  className='form-control'
                  {...register('email', { required: true })}
                />
                {errors.email && <span className='err'>Email is required</span>}
              </p>
              {
                user ?
                "" :
                (
                    <p>
                <input
                  type="password"
                  placeholder="Password"
                  className='form-control'
                  {...register('password', { required: true })}
                />
                {errors.password && <span className='err' >Password is required</span>}
              </p>
                )
              }
              <p>
                <input type="submit" className='form-control' value={user?"Update":"Create"} />
              </p>
            </form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ManageTask;
