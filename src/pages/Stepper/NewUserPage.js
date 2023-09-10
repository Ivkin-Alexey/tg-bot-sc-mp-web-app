import React from 'react';
import Stepper from '@mui/material/Stepper';
import {Button, Step, StepContent, StepLabel} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NewUserPage = () => {

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
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel
                        // optional={
                        //     index === 2 ? (
                        //         <Typography variant="caption">Last step</Typography>
                        //     ) : null
                        // }
                    >
                        {step.label}
                    </StepLabel>
                    <StepContent>
                        <Typography sx={{maxHeight: 'none'}}>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    {step.nextButtonText}
                                </Button>
                                <Button
                                    disabled={index === 0}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Назад
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    );
};

export default NewUserPage;