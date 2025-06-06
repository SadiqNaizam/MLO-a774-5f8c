import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle } from 'lucide-react'; // Icons for step status

interface Step {
  id: string;
  title: string;
  content: ReactNode; // Content for this step (e.g., a form component)
}

interface JointAccountStepperProps {
  steps: Step[];
  onComplete: () => void; // Callback when the final step is completed
  initialStep?: number; // 0-indexed
  // Color for active/completed steps, e.g., Tailwind class for text-sky-600
  activeColor?: string; 
}

const JointAccountStepper: React.FC<JointAccountStepperProps> = ({
  steps,
  onComplete,
  initialStep = 0,
  activeColor = 'text-sky-600', // Example: using sky-600 for primary accent
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  console.log("Rendering JointAccountStepper, current step:", currentStep);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step completed
      console.log("All steps completed.");
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepCompleted = (stepIndex: number) => stepIndex < currentStep;
  const isStepActive = (stepIndex: number) => stepIndex === currentStep;

  return (
    <div className="w-full p-4 md:p-6">
      {/* Stepper Navigation */}
      <div className="flex items-center justify-between mb-8 border-b pb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
                            ${isStepActive(index) ? `border-sky-600 ${activeColor}` : ''} 
                            ${isStepCompleted(index) ? 'border-sky-600 bg-sky-600 text-white' : 'border-gray-300'}
                            ${!isStepActive(index) && !isStepCompleted(index) ? 'text-gray-400' : ''}`}
              >
                {isStepCompleted(index) ? <CheckCircle size={18} /> : (isStepActive(index) ? index + 1 : index + 1)}
              </div>
              <p className={`mt-2 text-xs sm:text-sm font-medium 
                           ${isStepActive(index) ? activeColor : ''} 
                           ${isStepCompleted(index) ? activeColor : 'text-gray-500'}`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-auto border-t-2 transition-all duration-500 ease-in-out mx-2
                              ${isStepCompleted(index) || isStepActive(index) ? 'border-sky-500' : 'border-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[200px]">
        {steps[currentStep]?.content}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
          Back
        </Button>
        <Button onClick={handleNext} className="bg-sky-600 hover:bg-sky-700 text-white">
          {currentStep === steps.length - 1 ? 'Agree & Create Account' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default JointAccountStepper;