"use client";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import MyInput from "@/Components/MyInput";
import { Button } from "@/Components/Button";
import * as yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("please input name"),
  gender: yup.string().required("please select gender"),
  password: yup.string().min(5).required("Required"),
  email: yup.string().email("Invalid email").required("please input email"),
  phone: yup.string().min(9).required("please input phone number"),
  comfirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Require"),
});

export const Register = () => {

  const [visible,setVisible] = useState(false)
  const [visibleCom,setVisibleCom] = useState(false)

  const [isPassword, setIsPassword] = useState(true)
  const [isPasswordCom, setIsPasswordCom] = useState(true)

  const onClickToggle = () =>{
    setVisible ((prev) => !prev);
  } 

  const onClickToggleCom = () =>{
    setVisibleCom ((prev) => !prev);
  } 

  const router = useRouter() ;

  const handleRegister = (values) => {
    router.push("/home")

  }

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          gender: "",
          password: "",
          email: "",
          phone: "",
          comfirmPassword: "",
        }}

        validationSchema={SignupSchema}
        onSubmit={(values ,{resetForm}) => {

          handleRegister(values);
          // alert(
          //   `Name: ${values.name}\nGender: ${values.gender}\nPassword: ${values.password}\nEmail :${values.email}\nPhone:${values.phone} \nComfirmationPassword: ${values.comfirmPassword}`,
          // );

          resetForm();

        }}
      >
        <Form className="p-5">
          <div>
            <div className="text-xl text-center font-bold p-5">Register</div>
            <div className="grid grid-cols-3 gap-4">
              <Field
                component={MyInput}
                label="Name"
                type="name"
                name="name"
                placeholder="name"
                showError={true}
              />

              <div className="w-full ">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender
                </label>
                <div>
                  <Field
                    as="select"
                    name="gender"
                    className="text-black w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm "
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    render={(msg) => <div className="text-red-500">{msg}</div>}
                  />
                </div>
              </div>
              <div>
                <Field
                  component={MyInput}
                  label="Password"
                  type={isPasswordCom ? (visible ? "text" : "password") : "text"}
                  name="password"
                  placeholder="password"
                  showError={true}
                  className="flex-grow pb-1"
                />
                  {
                    isPasswordCom && (
                      <div className="icon" onClick={onClickToggle}
                      style={{
                        position: "absolute",
                        right: "2rem", // Use a responsive value
                        top: "21.5%", // Center vertically
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}>
                        {visible ? <FaEye /> : <FaEyeSlash />}</div>
                    )
                  }
              </div>
              <Field
                component={MyInput}
                label="Email"
                type="email"
                name="email"
                placeholder="email"
                showError={true}
              />
              <Field
                component={MyInput}
                label="Phone"
                type="phone"
                name="phone"
                placeholder="phone"
                showError={true}
              />
              <div>
                <Field
                  component={MyInput}
                  label="Comfirm Password"
                  type={isPasswordCom ? (visibleCom ? "text" : "password") : "text"}
                  name="comfirmPassword"
                  placeholder="comfirmPassword"
                  showError={true}
                  className="flex-grow pb-1"
                />
                {
                    isPassword && (
                      <div className="icon" onClick={onClickToggleCom}
                      style={{
                        position: "absolute",
                        right: "2rem", 
                        top: "31.5%", 
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      >
                        {visibleCom ? <FaEye /> : <FaEyeSlash />}</div>
                    )
                  }
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button label="Register" type="submit" />
          </div>
        </Form>
      </Formik>
    </div>
  );
};
