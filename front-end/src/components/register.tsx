import React from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux';
import { handleInputChange, handleSubmit , registerUser} from '../features/register';

const Register = () => {

    const [ userRegistered, setRegistered] = React.useState(false);

    const userInput = useSelector((state: any) => state?.register);

    const { user, formstate , loading} = userInput
    const { isError, errMessage } = formstate;
    const {  firstName, lastName, password, confirmPassword, email, dob } = user;
    
    const dispatch:any = useDispatch();

    const handleFormSubmit = () => {
        dispatch(handleSubmit());
        const formDetails = {
            firstName: firstName ?? "",
            lastName: lastName ?? "",
            email: email ?? "",
            password: password ?? "",
            dob: dob ?? "",
          };
          

        dispatch(registerUser(formDetails)).then((response:any) => {
            if (registerUser.fulfilled.match(response)) {
                console.log("Registration Successful:", response.payload);
                setRegistered(true)
              } else if (registerUser.rejected.match(response)) {
                console.error("Registration Failed:", response.error.message);
              }
        })
    }
    
    return (

        <Form noValidate>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Control required type="text" placeholder='First Name' value={firstName} onChange={(e:any) => dispatch(handleInputChange({ 
                    key: "firstName",
                    value: e.target.value ?? ""
                }))}
               />
            </Form.Group>

            <Form.Group className="mb-3" controlId='formLastName'>
                <Form.Control required type="text" placeholder='Last Name' value={lastName} onChange={(e:any) => dispatch(handleInputChange({
                    key: "lastName", 
                    value: e.target.value ?? "",
                }))}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
                <Form.Control required type="email" placeholder='Email' value={email} onChange={(e:any) => dispatch(handleInputChange({
                    key: "email",
                    value: e.target.value ?? "",
                }))}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId='formPassword'>
                <Form.Control required type="password" placeholder='Password' value={password} onChange={(e:any) => dispatch(handleInputChange({
                    key: "password",
                    value: e.target.value ?? "",
                }))}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId='formConfirmPassword'>
                <Form.Control required type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e:any) => dispatch(handleInputChange({
                    key: "confirmPassword",
                    value: e.target.value ?? "",
                }))}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formDateOfBirth">
                <Form.Control required type="date" placeholder='DOB' value={dob} onChange={(e:any) => dispatch(handleInputChange({
                    key: "dob",
                    value: e.target.value ?? "",
                }))}/>
            </Form.Group>

            <div className={`d-flex justify-content-center pb-2 fs-6 ${isError ? 'text-danger': ''}`}>
                { isError ? errMessage: null}
            </div>
        
            <Button variant='success'  onClick={() => {
                 handleFormSubmit();
            }}>
                Submit
            </Button>
            
        </Form>
    )
}

export default Register;