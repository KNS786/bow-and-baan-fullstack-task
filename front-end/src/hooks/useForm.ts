import React from 'react';

type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    dob: string;
}


const checkLength= (word: string, min=4, max=50) => word.length > min && word.length < max;

function calculateAge(birthday: any) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export const useForm = () => {
    const initialValue = {
        firstName: '',
        lastName:'',
        email: '',
        password: '',
        confirmPassword: '',
        dob: '',
    }

    const [input, setInput] = React.useState<User>(initialValue);
    const [error, setError] = React.useState<{ isError: boolean, errMessage: string}>({ isError: false, errMessage: ''});

    const [submit, setIsSubmitted] = React.useState(false);

    const handleInputChange = (key: string, value: string) => {
        console.log("key ::::", {
            key,
            value,
            input
        })
        setInput({
            ...input,
            [key]: value
        })
    }

    const handleValidateForm = () => {

        const isEmptyIsExists = Object.values(input).find((el: string) => (el.trim() == ""));
        console.log("handleValidateForm ::::", isEmptyIsExists)

        if(!isEmptyIsExists){
            console.log("sdjskdj")
            console.log("err:::")
            return setError({ isError: true, errMessage: "please enter all inputs"});
        
        }

        if(!input.firstName || input.firstName.trim() !==""){
            return setError({ isError: true, errMessage: 'please enter valid firstName'})
            
        }

        if(!input.lastName || input.lastName.trim()!==""){
            return setError({ isError: true, errMessage: 'please enter valid lastName'});
          
        }


        if(!input.email || input.email.trim() !==""){
            return setError({ isError: true, errMessage: 'please enter valid email'});
            
        }

        if(input && !(/^[^@]+@[^@]+\.[^@]+$/.test(input.email))){
            return setError({ isError: true, errMessage: "email should be valid (ex: abc@gmail.com)"});
            
        }

        if(input.password || input.password.trim()!=""){
            return setError({ isError: true,errMessage: "please enter valid password"});
        
        }

        if(input.confirmPassword || input.confirmPassword.trim() !=""){
            return setError({ isError: true,errMessage: "please enter valid confirm password"});
        }

        if(input.password !== input.confirmPassword){
            return setError({ isError: true,errMessage: "missmatch confirm password"});
        }

        if(input.firstName && !checkLength(input.firstName)){
            return setError({ isError: true, errMessage: "first name should be min 5 and max 50"});
        }

        if(input.lastName && !checkLength(input.lastName)){
            return setError({ isError: true, errMessage: "lastName name should be min 5 and max 50"})
           
        }

        if(input.password && !checkLength(input.password, 8)){
            return setError({ isError: true, errMessage: "password should minimunm 8 "});
        }

        if(!input.dob ){
            return setError({ isError: true, errMessage: "Please enter date of birth"});
            
        }

        if(input.dob && calculateAge(input.dob) < 18){
            return setError({ isError: true, errMessage: "18 years olders are allowed"})
        } 

    }

    React.useEffect(() => {
        if(submit){
            console.log("isSubmitted");
            alert("hello")
            handleValidateForm();    
        }
    }, [submit, setError, error, handleValidateForm]);

   
    return { handleInputChange, input, error, setIsSubmitted}

}
