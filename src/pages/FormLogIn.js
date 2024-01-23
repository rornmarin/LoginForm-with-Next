"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import MyInput from "@/Components/MyInput";
import { Button } from "@/Components/Button";
import * as yup from "yup";
import { FaEyeSlash, FaEye } from 'react-icons/fa'; 
import { UseSession } from "@/store/UseSession";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import Cookies from "js-cookie";
import axios from "axios";

const SignupSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("please input email"),
  password: yup.string().required("Required").min(5),
});

const FormLogIn = () => {
  const [visible, setVisible] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const { setSession } = UseSession();
  const router = useRouter();

  const onClickToggle = () => {
    setVisible((prev) => !prev);
  };

  const handleLogin = async (values) => {
    // if(
    //   values.email === "marin@gmail.com" &&
    //   values.password === "123456"
    // ){
    //   setSession({email: values.email});
    //   Cookies.set('testing', 
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ0ZXN0MTIzNDU2NzhAZ21haWwuY29tIiwiaWF0IjoxNzA2MDA0MTU1LCJleHAiOjE3MDYxNzY5NTV9.L2WtERUXeRLBwE99fNU_5KwB2EuBYLILwXPaRpfgKKs',
    //    { expires: 30, path: '/' });
    //   // setCookie(null , "testing" , "qwertyuiop")
    //   router.push("/home");
    // }else{
    //   alert ("Invalid")
    // }
    const login = await axios.post('https://courses-web-service-api-v1.onrender.com/api/v1/auth/login',{
      email:values.email,
      password:values.password
    })

    if(login){
      
      setSession({email: values.email});
      const token = login.data.token

      Cookies.set('AuthToken',token)

      router.push("/home");

    }else{

      alert('Fail')
    }
  }

  return (
    <div className="flex justify-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          handleLogin(values);
        }}
      >
        <Form className="p-5 w-96 relative">
          <div>
            <div className="text-xl text-center font-bold p-5">Log In</div>
            <div>
              <Field
                component={MyInput}
                label="Email"
                type="email"
                name="email"
                placeholder="email"
                showError={true}
              />
              <div>
              <Field
                component={MyInput}
                label="Password"
                type={isPassword ? (visible ? "text" : "password") : "text"}
                name="password"
                placeholder="password"
                showError={true}
                className="flex-grow relative" 
              />
              {isPassword && (
                <div
                  className="icon"
                  onClick={onClickToggle}
                  style={{
                    position: "absolute",
                    right: "2rem", 
                    top: "66%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {visible ? <FaEye /> : <FaEyeSlash />}
                </div>
              )}
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <Button label="Log In" type="submit" className="w-full" />
          </div>
        </Form>

      </Formik>
    </div>
  );
};

export default FormLogIn;