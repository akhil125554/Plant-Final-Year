import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { LoginUser } from "../../Apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/LoadersSlice";

const rules = [
  {
    required: true,
    message: "required",
  },
];
const Login = () => {
  const navigate= useNavigate()
  const dispatch= useDispatch();
  const onFinished = async (values) => {
    // console.log(values);
    try {
      dispatch(SetLoader(true))
      const response = await LoginUser(values);
      if (response.success) {
      dispatch(SetLoader(false))
        message.success(response.message);
        localStorage.setItem('token', response.data);
        window.location.href='/';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false))
      message.error(error.message);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/")
    }
  },[]);

  
  return (
    <div className="h-screen bg-primary flex justify-center items-center mobile:p-4">
      <div className="bg-white p-3 rounded w-[450px] shadow-2xl">
        <h1 className="text-primary text-2xl uppercase">
          Harithavanam--<span className="text-gray-500 text-2xl">Login</span>
        </h1>
        <Divider />
        <Form layout="vertical" onFinish={onFinished}>
          <FormItem label="Email" name="email" rules={rules}>
            <Input placeholder="Enter your email here.." />
          </FormItem>

          <FormItem label="Password" name="password" rules={rules}>
            <Input placeholder="Enter your password here.." />
          </FormItem>

          <Button type="primary" htmlType="submit" block className="mt-2" style={{backgroundColor:'#203A43'}}>
            Login
          </Button>
          <div className="mt-3 text-center ">
            <span className="text-gray-500">
              Don't have an account ?{" "}
              <Link to="/register" className="text-red-600">
                Register
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
