import m, { FactoryComponent, Attributes, Vnode } from 'mithril';
import { uniqueId } from './utils';

export interface WizardStep {
  /** Unique identifier for the step */
  id?: string;
  /** Title of the step */
  title: string;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Icon for the step (material icons) */
  icon?: string;
  /** Whether this step is optional */
  optional?: boolean;
  /** Whether this step is disabled */
  disabled?: boolean;
  /** Custom validation function */
  validate?: () => boolean | Promise<boolean>;
  /** Content to render for this step - function that returns vnode(s) */
  vnode: () => Vnode<any, any> | Vnode<any, any>[];
}

export interface WizardAttrs extends Attributes {
  /** Array of wizard steps */
  steps: WizardStep[];
  /** Current active step index */
  currentStep?: number;
  /** Callback when step changes */
  onStepChange?: (stepIndex: number, stepId: string) => void;
  /** Callback when wizard is completed */
  onComplete?: () => void;
  /** Whether to show step numbers */
  showStepNumbers?: boolean;
  /** Whether navigation is linear (cannot skip steps) */
  linear?: boolean;
  /** Custom class for the wizard container */
  className?: string;
  /** Whether to show navigation buttons */
  showNavigation?: boolean;
  /** Custom labels for navigation buttons */
  labels?: {
    next?: string;
    previous?: string;
    complete?: string;
    skip?: string;
    optional?: string;
  };
  /** Orientation of the stepper */
  orientation?: 'horizontal' | 'vertical';
  /** Whether to allow clicking on step headers to navigate */
  allowHeaderNavigation?: boolean;
}

interface WizardState {
  id: string;
  currentStep: number;
  isValidating: boolean;
  completedSteps: Set<number>;
  errorSteps: Set<number>;
}

/**
 * Wizard/Stepper Component
 * A multi-step interface for guiding users through a process
 */
export const Wizard: FactoryComponent<WizardAttrs> = () => {
  let state: WizardState;

  const validateStep = async (stepIndex: number, steps: WizardStep[]): Promise<boolean> => {
    const step = steps[stepIndex];
    if (!step || !step.validate) return true;
    
    state.isValidating = true;
    try {
      const isValid = await step.validate();
      if (isValid) {
        state.completedSteps.add(stepIndex);
        state.errorSteps.delete(stepIndex);
      } else {
        state.errorSteps.add(stepIndex);
        state.completedSteps.delete(stepIndex);
      }
      return isValid;
    } catch (error) {
      state.errorSteps.add(stepIndex);
      state.completedSteps.delete(stepIndex);
      return false;
    } finally {
      state.isValidating = false;
      m.redraw();
    }
  };
  
  const goToStep = async (stepIndex: number, attrs: WizardAttrs): Promise<boolean> => {
    const { linear = true, onStepChange, steps } = attrs;
    
    if (stepIndex < 0 || stepIndex >= steps.length) return false;
    
    // Check if step is disabled
    if (steps[stepIndex].disabled) return false;
    
    // In linear mode, validate all previous steps
    if (linear && stepIndex > state.currentStep) {
      for (let i = state.currentStep; i < stepIndex; i++) {
        const isValid = await validateStep(i, steps);
        if (!isValid && !steps[i].optional) {
          return false;
        }
      }
    }
    
    // Validate current step before moving forward
    if (stepIndex > state.currentStep) {
      const isValid = await validateStep(state.currentStep, steps);
      if (!isValid && !steps[state.currentStep].optional) {
        return false;
      }
    }
    
    const oldStep = state.currentStep;
    state.currentStep = stepIndex;
    
    // Always call onStepChange when step changes
    if (onStepChange && oldStep !== stepIndex) {
      onStepChange(stepIndex, steps[stepIndex].id || `step-${stepIndex}`);
    }
    
    // Force redraw to update UI
    m.redraw();
    
    return true;
  };
  
  const nextStep = async (attrs: WizardAttrs): Promise<void> => {
    const { steps } = attrs;
    // Check if we're on the last step
    if (state.currentStep === steps.length - 1) {
      // This is the complete action
      if (attrs.onComplete) {
        attrs.onComplete();
      }
      return;
    }
    
    // Try to move to next step
    await goToStep(state.currentStep + 1, attrs);
  };
  
  const previousStep = (attrs: WizardAttrs): void => {
    goToStep(state.currentStep - 1, attrs);
  };
  
  const skipStep = (attrs: WizardAttrs): void => {
    const { steps } = attrs;
    const currentStepData = steps[state.currentStep];
    if (currentStepData && currentStepData.optional) {
      goToStep(state.currentStep + 1, attrs);
    }
  };
  
  return {
    oninit: ({ attrs }) => {
      state = {
        id: uniqueId(),
        currentStep: attrs.currentStep || 0,
        isValidating: false,
        completedSteps: new Set(),
        errorSteps: new Set()
      };
    },
    
    onbeforeupdate: ({ attrs }) => {
      // Sync external currentStep changes
      if (typeof attrs.currentStep === 'number' && attrs.currentStep !== state.currentStep) {
        state.currentStep = Math.max(0, attrs.currentStep);
      }
    },
    
    view: ({ attrs }) => {
      const {
        steps,
        showStepNumbers = true,
        className = '',
        showNavigation = true,
        labels = {},
        orientation = 'horizontal',
        allowHeaderNavigation = false
      } = attrs;
      
      // Ensure currentStep is within bounds
      if (state.currentStep >= steps.length) {
        state.currentStep = Math.max(0, steps.length - 1);
      }
      
      const currentStepData = steps[state.currentStep];
      const isFirstStep = state.currentStep === 0;
      const isLastStep = state.currentStep === steps.length - 1;
      const activeContent = currentStepData?.vnode ? currentStepData.vnode() : null;
      
      return m('.wizard', { class: `${orientation} ${className}` }, [
        // Step indicator
        m('.wizard-header', [
          m('.wizard-steps', 
            steps.map((step, index) => {
              const isActive = index === state.currentStep;
              const isCompleted = state.completedSteps.has(index);
              const hasError = state.errorSteps.has(index);
              
              return m('.wizard-step', {
                class: [
                  isActive ? 'active' : '',
                  isCompleted ? 'completed' : '',
                  hasError ? 'error' : '',
                  step.disabled ? 'disabled' : '',
                  step.optional ? 'optional' : ''
                ].filter(Boolean).join(' ') || undefined,
                onclick: allowHeaderNavigation && !step.disabled ? 
                  () => goToStep(index, attrs) : undefined
              }, [
                // Step number/icon
                m('.wizard-step-indicator', [
                  isCompleted ? 
                    m('i.material-icons', 'check') :
                    hasError ?
                      m('i.material-icons', 'error') :
                      step.icon ? 
                        m('i.material-icons', step.icon) :
                        showStepNumbers ? 
                          m('span.wizard-step-number', index + 1) :
                          null
                ]),
                
                // Step content
                m('.wizard-step-content', [
                  m('.wizard-step-title', step.title),
                  step.subtitle && m('.wizard-step-subtitle', step.subtitle),
                  step.optional && m('.wizard-step-optional', labels.optional || 'Optional')
                ]),
                
                // Connector line (except for last step in horizontal mode)
                orientation === 'horizontal' && index < steps.length - 1 && 
                  m('.wizard-step-connector')
              ]);
            })
          )
        ]),
        
        // Step content
        m('.wizard-body', [
          activeContent && m('.wizard-step-panel', {
            key: currentStepData?.id || `step-${state.currentStep}`
          }, activeContent)
        ]),
        
        // Navigation
        showNavigation && m('.wizard-footer', [
          m('.wizard-navigation', [
            // Previous button
            !isFirstStep && m('button.btn-flat.wizard-btn-previous', {
              onclick: () => previousStep(attrs),
              disabled: state.isValidating
            }, labels.previous || 'Previous'),
            
            // Skip button (for optional steps)
            currentStepData && currentStepData.optional && !isLastStep && 
              m('button.btn-flat.wizard-btn-skip', {
                onclick: () => skipStep(attrs),
                disabled: state.isValidating
              }, labels.skip || 'Skip'),
            
            // Next/Complete button
            m('button.btn.wizard-btn-next', {
              onclick: () => nextStep(attrs),
              disabled: state.isValidating,
              class: isLastStep ? 'wizard-btn-complete' : ''
            }, [
              state.isValidating && m('i.material-icons.left', 'hourglass_empty'),
              isLastStep ? (labels.complete || 'Complete') : (labels.next || 'Next')
            ])
          ])
        ])
      ]);
    }
  };
};

/**
 * Simple linear stepper for forms
 */
export const Stepper: FactoryComponent<Pick<WizardAttrs, 'steps' | 'currentStep' | 'onStepChange' | 'className'>> = () => {
  return {
    view: ({ attrs }) => {
      return m(Wizard, {
        ...attrs,
        linear: true,
        showNavigation: false,
        allowHeaderNavigation: false,
        orientation: 'horizontal'
      });
    }
  };
};