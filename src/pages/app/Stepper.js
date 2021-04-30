import React from "react"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"

export default function VerticalLinearStepper({ active, step }) {
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = step

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div>
      <p>
        {active}/{steps.length} are completed
      </p>
      <Stepper
        style={{
          padding: "40px",
          marginTop: "0px",
          width: "300px",
        }}
        activeStep={active}
        orientation="vertical"
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
