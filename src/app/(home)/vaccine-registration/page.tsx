"use client";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { ReactNode, useState } from "react";
import vaccineRegistrationSteps from "@/data/vaccineRegistrationSteps.json";
import FirstStepForm, {
  defaultValues,
} from "@/components/vaccine-registration/FirstStepForm";
import SecondStepForm from "@/components/vaccine-registration/SecondStepForm";
import { CreateVaccineRegistrationDto } from "@/schemas";
import FinalStepForm from "@/components/vaccine-registration/FinalStepForm";

enum Steps {
  One = 1,
  Two = 2,
  Three = 3,
}

const VaccineRegistration = () => {
  const [activeStep, setActiveStep] = useState<Steps>(Steps.One);
  const [formData, setFormData] =
    useState<CreateVaccineRegistrationDto>(defaultValues);
  const handleNextStep: () => void = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) as Steps);
  };
  const handleBackStep: () => void = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1) as Steps);
  };
  const getContentFromVaccineRegistrationStep = (step: Steps): ReactNode => {
    switch (step) {
      case Steps.One:
        return (
          <FirstStepForm
            handleNextStep={handleNextStep}
            setFormData={setFormData}
          />
        );
      case Steps.Two:
        return (
          <SecondStepForm
            handelBackStep={handleBackStep}
            handelNextStep={handleNextStep}
            formData={formData}
          />
        );
      case Steps.Three:
        return <FinalStepForm />;
      default:
        return;
    }
  };

  return (
    <div className="h-auto my-6">
      <Typography variant="h5" className="bg-gray-100 px-9 py-4">
        Tra cứu đăng ký tiêm
      </Typography>

      <Stepper
        activeStep={activeStep - 1}
        alternativeLabel
        className="my-12 mx-48"
      >
        {vaccineRegistrationSteps.map((step) => {
          return (
            <Step key={step.key}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {getContentFromVaccineRegistrationStep(activeStep)}
    </div>
  );
};

export default VaccineRegistration;
