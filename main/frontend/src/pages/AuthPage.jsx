import React, { useState, useEffect, useRef } from 'react';
//import { Button, Select, Input, Option } from "@material-tailwind/react";
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
//import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
//import { FaChevronLeft,FaChevronRight } from "react-icons/fa6";
import { HiChevronLeft ,HiChevronRight } from "react-icons/hi";
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import axios from 'axios';
import { useMetaMaskContext } from '../context/MetaMaskContext';
import {
    Box,
    Button,
    Flex,
    Icon,
    IconButton,
    Select,
    Stack,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useColorModeValue,
    useSteps,
} from '@chakra-ui/react'
import Card from '../components/card/Card';
import IconBox from '../components/icons/IconBox';
import InputField from '../components/fields/InputField';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";
import { MdError } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import playToastSound from '../mainComponents/ToastSound';
const AuthPage = () => {

    const { type } = useParams();
    const { account } = useMetaMaskContext();
    const navigate = useNavigate();
    const { control, setValue, register, handleSubmit, formState: { errors }, watch } = useForm();
    const selectedRole = watch('role');

    const [isLogin, setLogin] = useState(false);

    const { login } = useUserContext();

    const cardbg = useColorModeValue('#ffffff', 'navy.800');
    const brandColor = useColorModeValue("brand", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

    const disabledColor = useColorModeValue('secondaryGray.400', 'navy.900');

   

    const onSubmit = async (data) => {

        const userData = isLogin
            ? { role: data.role, email: data.email, password: data.password, address: data.address }
            : { role: data.role, name: data.name, email: data.email, password: data.password, roleid: data.roleid, address: data.address };

        const apiEndpoint = isLogin ? 'login' : 'signup';
        console.log(isLogin ? 'login:' : 'signup:', data.role, userData);

        try {
            const response = await axios.post(`http://localhost:5000/auth/${apiEndpoint}`, userData);

            if (response.status === 200) {
                if (isLogin) {
                    await login(data.role, { email: data.email,password: data.password, address: data.address });
                    localStorage.setItem(data.role, JSON.stringify({ email: data.email,password: data.password, address: data.address }));
                }
                
                toast.success(` ${isLogin ? 'Login' : 'Account Created'} Successfully`, {
                    icon:IoMdLogIn,
                    onOpen: () => {
                        playToastSound(); // Play the sound when the toast opens
                      },
                  });
                navigate(!isLogin ? '/AuthPage/login' : data.role === 'student' ? '/StudentPage' : data.role === 'university' ? '/UniversityPage' : '/CompanyPage');
            }
            console.log(response.data.message);
            
        } catch (error) {
            console.error(`Error ${isLogin ? 'Login' : 'Creating Account'}`, error.response.data.message);
          //  alert(error.response.data.message);

          toast.error(`Error ${isLogin ? 'Login' : 'Creating Account'}`, {
            icon:IoMdCloseCircle,
            onOpen: () => {
                playToastSound(); // Play the sound when the toast opens
              },
          });
        }


    };

    useEffect(() => {
        setValue('address', account);
    }, [account])

    useEffect(() => {
        if (type === "login") {
            setLogin(true);
        } else if (type === "signup") {
            setLogin(false);
        } else {
            navigate("/");
        }


    }, [type, navigate])


    const stepVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1 } },
        exit: { opacity: 0, transition: { duration: 0 } },
    };

    const inputFields = [
        { name: 'name', label: 'Username', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'roleid', label: selectedRole === 'student' ? 'Student Id' : selectedRole === 'company' ? 'Company CIN' : 'University URN', type: 'text', required: true, },
        { name: 'address', label: 'Wallet Address', type: 'text', required: false },

    ];


    const updatedFilteredFields =
        isLogin
            ? inputFields.filter(field => field.name === 'email' || field.name === 'password' || field.name === 'address')
            : inputFields;
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: 2,
    })
    const [isLastStep, setIsLastStep] = React.useState(false);
    const [isFirstStep, setIsFirstStep] = React.useState(true);

    const handlePrev = () => (!isFirstStep && setActiveStep((cur) => cur - 1), setIsFirstStep(true), setIsLastStep(false));
    const handleNext = () => (!isLastStep && selectedRole && setActiveStep((cur) => cur + 1), setIsFirstStep(false), setIsLastStep(true));


    return (

        <Box mt="0" h="auto" display="flex" justifyContent="center">


            <Box borderRadius="20px"
                p='7'
                bg={cardbg}
                backgroundClip="border-box"
                display='flex' w="auto" justifyContent="space-evenly">



                <Box display={{ base: 'none', md: 'block' }} alignSelf="center">
                    <IconButton mr='7' fontSize='0px' icon={<HiChevronLeft className='h-7 w-7' />} color={brandColor} bg={boxBg} onClick={handlePrev} isDisabled={isFirstStep} isRound='true' />


                </Box>


                <Box w="96" display="flex" flexDirection="column" >
                    <Box mt='0' mb='10'>



                        <Stepper size='lg' colorScheme='brandScheme' index={activeStep}>

                            <Step onClick={() => (setActiveStep(0), setIsFirstStep(true), setIsLastStep(false))}>

                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>
                                <StepSeparator />
                            </Step>
                            <Step onClick={() => (selectedRole && setActiveStep(1), setIsFirstStep(false), setIsLastStep(true))}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>
                                <StepSeparator />
                            </Step>

                        </Stepper>


                    </Box>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">

                            {activeStep === 0 && (
                                <motion.div
                                    key={1}
                                    variants={stepVariants}
                                    initial="visible"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <Box>

                                        <Select variant='auth' label="Select Role"
                                            {...register("role", { required: true })}
                                        >
                                            <option value="student">Student</option>
                                            <option value="university">University</option>
                                            <option value="company">Company</option>
                                        </Select>

                                    </Box>

                                </motion.div>
                            )}

                            {activeStep === 1 && selectedRole && (
                                <motion.div
                                    key={2}
                                    variants={stepVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <Stack spacing="5">
                                        {updatedFilteredFields.map((field, index) => (
                                            <InputField
                                                name={field.name} // Assign a unique name to the input field
                                                mb='0'
                                                register={register}
                                                placeholder={field.label}
                                                variant='auth'
                                                id={index}
                                                key={index}
                                                label={field.label}
                                                type={field.type}
                                                //     {...register(field.name, { required: field.required })}
                                                isRequired={field.required}
                                                bg={field.name === 'address' ? disabledColor : "transparent"}
                                                isReadOnly={field.name === 'address' ? true : false}
                                            />
                                        ))}

                                        <Button variant='brand' type="submit" >
                                            {isLogin ? 'Login' : 'Signup'}
                                        </Button>
                                    </Stack>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </form>

                </Box>


                <Box display={{ base: 'none', md: 'block' }} alignSelf="center">

                    <IconButton ml='7' fontSize='0px' icon={<HiChevronRight className='h-7 w-7' />} color={brandColor} bg={boxBg} onClick={handleNext} isDisabled={isLastStep || !selectedRole} isRound='true' />

                </Box>

            </Box>

        </Box>


    );
};

export default AuthPage;