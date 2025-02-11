import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../Apicalls/users";
import { SetLoader } from "../../redux/LoadersSlice";
import { useDispatch } from "react-redux";

const rules = [
  {
    required: true,
    message: "required",
  },
];

const Register = () => {
  const navigate= useNavigate()
  const dispatch = useDispatch();

  const onFinished = async(values) => {
    try {
      dispatch(SetLoader(true))
      const response = await RegisterUser(values);
      dispatch(SetLoader(false))
      if(response.success){
        navigate('/login')
        message.success(response.message);
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message);
    }
  };
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[]);
  
  return (
    <div className="h-screen bg-primary flex justify-center items-center ">
      <div className="bg-white p-3 rounded w-[450px] shadow-2xl ">
        <h1 className="text-primary text-2xl">
          SMP--<span className="text-gray-500 text-2xl uppercase">Register</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinished}>
          <FormItem label="Name" name="name" rules={rules}>
            <Input placeholder="Enter your name here.." />
          </FormItem>

          <FormItem label="Email" name="email" rules={rules}>
            <Input placeholder="Enter your email here.." />
          </FormItem>

          <FormItem label="Password" name="password" rules={rules}>
            <Input placeholder="Enter your password here.." />
          </FormItem>

          <Button type="primary" htmlType="submit" block className="mt-2" style={{backgroundColor:'#203A43'}}>
            Register
          </Button>
          <div className="mt-3 text-center ">
            <span className="text-gray-500">
              Already have an account ?{" "}
              <Link to="/login" className="text-red-600">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
