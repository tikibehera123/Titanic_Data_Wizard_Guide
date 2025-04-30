
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

const StepNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
}: StepNavigationProps) => {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentStep
                ? "bg-primary"
                : index < currentStep
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <Button
        onClick={onNext}
        disabled={currentStep === totalSteps - 1}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default StepNavigation;
