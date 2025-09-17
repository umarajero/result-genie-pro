import { createContext, useContext, useState, ReactNode } from 'react';
import { CertificateTemplate, TemplateCustomization, defaultTemplates } from '@/types/certificateTemplates';

interface TemplateContextType {
  selectedTemplate: CertificateTemplate | null;
  setSelectedTemplate: (template: CertificateTemplate | null) => void;
  customization: TemplateCustomization;
  setCustomization: (customization: TemplateCustomization) => void;
  resetToDefaults: () => void;
}

const defaultCustomization: TemplateCustomization = {
  colors: {
    primary: '#1e40af',
    secondary: '#fbbf24',
    accent: '#059669',
    text: '#1f2937',
    background: '#ffffff'
  },
  fonts: {
    heading: 'serif',
    body: 'sans-serif',
    signature: 'script'
  },
  spacing: {
    padding: '2rem',
    margins: '1rem',
    lineHeight: '1.6'
  },
  decorations: {
    showBorder: true,
    showWatermark: false,
    showDecorations: true,
    borderWidth: 'medium'
  }
};

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<CertificateTemplate | null>(
    defaultTemplates[0] // Default to first template
  );
  const [customization, setCustomization] = useState<TemplateCustomization>(defaultCustomization);

  const resetToDefaults = () => {
    setCustomization(defaultCustomization);
  };

  return (
    <TemplateContext.Provider value={{
      selectedTemplate,
      setSelectedTemplate,
      customization,
      setCustomization,
      resetToDefaults
    }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateCustomization = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplateCustomization must be used within a TemplateProvider');
  }
  return context;
};