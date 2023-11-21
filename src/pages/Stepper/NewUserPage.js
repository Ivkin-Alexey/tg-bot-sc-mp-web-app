import React from 'react';
import Stepper from '@mui/material/Stepper';
import {Stack, Step, StepContent, StepLabel} from "@mui/material";
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import constants from "../../assets/constants/constants";
const {safetyInstructionUrl, safetyTestUrl} = constants;

const NewUserPage = () => {

    const {tg} = useTelegram();

    const navigate = useNavigate();
    const redirect = () => navigate('/');
    const {accountData} = useSelector(state => state.users);
    const {chatID, otherInfo} = accountData;

    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        if(otherInfo.isUserDataSent) setActiveStep(1);
    }, [])

    useEffect(() => {
        tg.MainButton.isVisible = false;
        tg.onEvent('backButtonClicked', redirect)
        return () => {
            tg.offEvent('backButtonClicked', redirect)
        }
    }, []);

    const steps = [
        {
            label: 'Заполните свои данные',
            description: `Это стандартная процедура для всех новых пользователей.`,
            nextButtonText: 'Заполнить',
            callBack: () => navigate(`/${chatID}/editProfile`)
        },
        {
            label: 'Изучите инструкцию по технике безопасности и правилам работы в лаборатории',
            description:
                'Её обязан знать и соблюдать каждый, кто работает в лаборатории.',
            nextButtonText: 'Изучить',
            callBack: () => tg.openLink(safetyInstructionUrl),
        },
        // {
        //     label: 'Изучите презентацию о лаборатории НЦ "Переработки ресурсов"',
        //     description:
        //         'В презентации содержится полезная информация о работе в лаборатории НЦ "Переработки ресурсов".',
        //     nextButtonText: 'Изучить',
        // },
        {
            label: 'Пройдите тест',
            description: `Этот тест основан на инструкции по технике безопасности и правилам работы в лаборатории, а также презентации.`,
            nextButtonText: 'Пройти тест',
            callBack: () => tg.openLink(safetyTestUrl),
        },
    ];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        steps[activeStep].callBack();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Stack
            direction="column"
            spacing={2}
            width={"350px"}
        >
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                        <StepContent>
                            <Typography sx={{maxHeight: 'none'}}>{step.description}</Typography>
                            <Box sx={{mb: 2}}>
                                <div>
                                    <Button
                                        variant="contained"
                                        disableElevation
                                        onClick={handleNext}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        {step.nextButtonText}
                                    </Button>
                                    <Button
                                        disableElevation
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{mt: 1, mr: 1}}
                                    >
                                        Назад
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};

export default NewUserPage;