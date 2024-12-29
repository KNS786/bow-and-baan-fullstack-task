import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux';
import { handleInputChange, handleSubmit, registerUser, onReset } from '../features/register';
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";

const Register = () => {

    const [apiResp, setApiResp] = React.useState<{ isError: boolean, message: string } | null>(null);

    const userInput = useSelector((state: any) => state?.register);

    const { user, formstate, loading } = userInput
    const { isError, errMessage } = formstate;
    const { firstName, lastName, password, confirmPassword, email, dob } = user;

    const dispatch: any = useDispatch();

    //show alert registation is successfull
    React.useEffect(() => {
        if (apiResp) {
            if (apiResp.isError) {
                toast.error(apiResp.message);
            }
            else {
                toast.success(apiResp.message);
            }
            setApiResp(null);
        }

    }, [apiResp, setApiResp]);

    const handleDateChange = (date: any) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate()

        dispatch(handleInputChange({
            key: "dob",
            value: `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`,
        }))
    };

    const handleFormSubmit = () => {
        dispatch(handleSubmit());

        const formDetails = {
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            email: email ?? "",
            password: password ?? "",
            dob: dob ?? "",
        };


        if (!isError && errMessage === "") {
            dispatch(registerUser(formDetails)).then((response: any) => {
                if (registerUser.fulfilled.match(response)) {
                    console.log("Registration Successful:", response);
                    setApiResp({
                        isError: false,
                        message: response.payload,
                    });

                } else if (registerUser.rejected.match(response)) {
                    console.error("Registration Failed:", response);
                    setApiResp({
                        isError: true,
                        message: response.error.message ?? "",
                    });
                }
            })
            //reset form
            dispatch(onReset);
            return;
        }

    }


    return (

        <>

            <Form noValidate>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Control required type="text" placeholder='First Name' value={firstName} onChange={(e: any) => dispatch(handleInputChange({
                        key: "firstName",
                        value: e.target.value ?? ""
                    }))}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId='formLastName'>
                    <Form.Control required type="text" placeholder='Last Name' value={lastName} onChange={(e: any) => dispatch(handleInputChange({
                        key: "lastName",
                        value: e.target.value ?? "",
                    }))} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control required type="email" placeholder='Email' value={email} onChange={(e: any) => dispatch(handleInputChange({
                        key: "email",
                        value: e.target.value ?? "",
                    }))} />
                </Form.Group>

                <Form.Group className="mb-3" controlId='formPassword'>
                    <Form.Control required type="password" placeholder='Password' value={password} onChange={(e: any) => dispatch(handleInputChange({
                        key: "password",
                        value: e.target.value ?? "",
                    }))} />
                </Form.Group>

                <Form.Group className="mb-3" controlId='formConfirmPassword'>
                    <Form.Control required type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e: any) => dispatch(handleInputChange({
                        key: "confirmPassword",
                        value: e.target.value ?? "",
                    }))} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDateOfBirth">
                    {/* <Form.Control required type="date" placeholder='DOB' value={dob} onChange={(e:any) => dispatch(handleInputChange({
                    key: "dob",
                    value: e.target.value ?? "",
                }))}/> */}
                    <DatePicker
                        id="dob"
                        name="DOB"
                        selected={dob}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Date of birth"
                        className="form-control"
                    />
                </Form.Group>

                <div className={`d-flex justify-content-center pb-2 fs-6 ${isError ? 'text-danger' : ''}`}>
                    {isError ? errMessage : null}
                </div>

                {loading && <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}

                <Button variant='success' disabled={loading} onClick={() => {
                    handleFormSubmit();
                }}>
                    Submit
                </Button>


            </Form>
            <ToastContainer />

        </>

    )
}

export default Register;