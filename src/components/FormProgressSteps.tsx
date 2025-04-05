
import React from 'react';

interface FormProgressStepsProps {
  currentStep: number;
  totalSteps: number;
}

const FormProgressSteps: React.FC<FormProgressStepsProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  return (
    <div className="flex justify-between mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep === stepNumber;
        const isPast = currentStep > stepNumber;
        
        return (
          <React.Fragment key={stepNumber}>
            {/* Step circle */}
            <div 
              className={`flex-1 text-center ${
                isActive ? 'text-toy-blue' : 'text-gray-400'
              }`}
            >
              <div 
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-toy-blue text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
              <div className="text-xs">
                {stepNumber === 1 ? 'Details' : 'Photos'}
              </div>
            </div>
            
            {/* Connector line between steps */}
            {stepNumber < totalSteps && (
              <div className="flex-1 flex items-center justify-center">
                <div className={`h-0.5 w-full ${
                  isPast ? 'bg-toy-blue' : 'bg-gray-200'
                }`} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FormProgressSteps;
