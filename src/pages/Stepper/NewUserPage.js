import React from 'react';
import Stepper from '@mui/material/Stepper';
import {Button, Stack, Step, StepContent, StepLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useTelegram} from "../../hooks/useTelegram";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const NewUserPage = () => {

    const {tg} = useTelegram();

    const navigate = useNavigate();
    const redirect = () => navigate('/');

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
        },
        {
            label: 'Изучите инструкцию по технике безопасности и правилам работы в лаборатории',
            description:
                'Её обязан знать и соблюдать каждый, кто работает в лаборатории.',
            nextButtonText: 'Изучить',
        },
        {
            label: 'Изучите презентацию о лаборатории НЦ "Переработки ресурсов"',
            description:
                'В презентации содержится полезная информация о работе в лаборатории НЦ "Переработки ресурсов".',
            nextButtonText: 'Изучить',
        },
        {
            label: 'Пройдите тест',
            description: `Этот тест основан на инструкции по технике безопасности и правилам работы в лаборатории, а также презентации.`,
            nextButtonText: 'Пройти тест',
        },
    ];

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                                        color={tg.themeParams.button_color}
                                    >
                                        {step.nextButtonText}
                                    </Button>
                                    <Button
                                        disableElevation
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{mt: 1, mr: 1}}
                                        color={tg.themeParams.button_color}
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