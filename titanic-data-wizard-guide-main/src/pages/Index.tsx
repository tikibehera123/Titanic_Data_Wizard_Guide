
import { useState } from "react";
import { tutorialSteps } from "@/data/tutorialData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StepNavigation from "@/components/StepNavigation";
import TutorialCard from "@/components/TutorialCard";
import CodeBlock from "@/components/CodeBlock";
import { Ship, Database, FileSearch, FileText, Wrench, Palette, CheckCircle, Package } from "lucide-react";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = tutorialSteps.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Get step icon based on step ID
  const getStepIcon = (stepId: number) => {
    switch(stepId) {
      case 1: return <Ship className="h-6 w-6 text-vintage-gold ship-animation" />;
      case 2: return <Database className="h-6 w-6" />;
      case 3: return <FileSearch className="h-6 w-6" />;
      case 4: return <FileText className="h-6 w-6" />;
      case 5: return <Wrench className="h-6 w-6" />;
      case 6: return <Palette className="h-6 w-6" />;
      case 7: return <Package className="h-6 w-6" />;
      case 8: return <CheckCircle className="h-6 w-6" />;
      default: return null;
    }
  };

  const step = tutorialSteps[currentStep];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-ocean-50 to-blue-100">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8 overflow-x-auto py-2 px-2 bg-white rounded-lg shadow-sm">
            {tutorialSteps.map((step, index) => (
              <div 
                key={step.id} 
                className="flex flex-col items-center mx-2"
                onClick={() => setCurrentStep(index)}
              >
                <div 
                  className={`step-indicator cursor-pointer ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
                >
                  {index + 1}
                </div>
                <span className="text-xs mt-1 text-gray-600 whitespace-nowrap">
                  {step.title.length > 15 ? `${step.title.substring(0, 15)}...` : step.title}
                </span>
              </div>
            ))}
          </div>

          {/* Current step content */}
          <TutorialCard 
            title={step.title} 
            description={step.description}
            icon={getStepIcon(step.id)}
          >
            <div className="prose max-w-none">
              <p className="text-lg mb-4">{step.content.introduction}</p>
              
              <ul className="list-disc pl-5 mb-6">
                {step.content.details.map((detail, index) => (
                  <li key={index} className="mb-2">{detail}</li>
                ))}
              </ul>

              {step.content.code && (
                <CodeBlock code={step.content.code} />
              )}

              {step.content.explanation && (
                <div className="bg-ocean-50 border-l-4 border-ocean-500 p-4 my-4 rounded-r">
                  <h4 className="font-bold mb-1 text-ocean-800">Explanation</h4>
                  <p>{step.content.explanation}</p>
                </div>
              )}
            </div>
          </TutorialCard>

          <StepNavigation 
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
