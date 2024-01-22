"use client";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import MyInput from "@/Components/MyInput";
import { Button } from "@/Components/Button";
import * as yup from "yup";
import { FaEyeSlash, FaEye } from 'react-icons/fa'; 
import { UseSession } from "@/store/UseSession";
import { useRouter } from "next/navigation";

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

  const handleLogin = (values) => {
    if(
      values.email === "marin@gmail.com" &&
      values.password === "123456"
    ){
      setSession({email: values.email});
      router.push("/home");
    }else{
      alert ("Invalid")
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
                className="flex-grow relative" // Set relative positioning for the parent container
              />
              {isPassword && (
                <div
                  className="icon"
                  onClick={onClickToggle}
                  style={{
                    position: "absolute",
                    right: "2rem", // Use a responsive value
                    top: "66%", // Center vertically
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