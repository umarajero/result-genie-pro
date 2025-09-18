import { createContext, useContext, useState, ReactNode } from 'react';
import { StatementTemplate, StatementCustomization, defaultStatementTemplates } from '@/types/statementTemplates';

interface StatementContextType {
  selectedTemplate: StatementTemplate | null;
  setSelectedTemplate: (template: StatementTemplate | null) => void;
  customization: StatementCustomization;
  setCustomization: (customization: StatementCustomization) => void;
  resetToDefaults: () => void;
}

const defaultCustomization: StatementCustomization = {
  colors: {
    primary: '#1e40af',
    secondary: '#fbbf24',
    accent: '#059669',
    text: '#1f2937',
    background: '#ffffff',
    tableHeader: '#f3f4f6',
    tableBorder: '#d1d5db'
  },
  fonts: {
    heading: 'serif',
    body: 'sans-serif',
    table: 'sans-serif'
  },
  spacing: {
    padding: '2rem',
    margins: '1rem',
    lineHeight: '1.6'
  },
  table: {
    showBorders: true,
    alternateRows: true,
    headerStyle: 'colored',
    borderWidth: 'medium'
  },
  decorations: {
    showBorder: true,
    showWatermark: false,
    showDecorations: true,
    borderWidth: 'medium'
  }
};

const StatementContext = createContext<StatementContextType | undefined>(undefined);

export const StatementProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<StatementTemplate | null>(
    defaultStatementTemplates[0] // Default to first template
  );
  const [customization, setCustomization] = useState<StatementCustomization>(defaultCustomization);

  const resetToDefaults = () => {
    setCustomization(defaultCustomization);
  };

  return (
    <StatementContext.Provider value={{
      selectedTemplate,
      setSelectedTemplate,
      customization,
      setCustomization,
      resetToDefaults
    }}>
      {children}
    </StatementContext.Provider>
  );
};

export const useStatementCustomization = () => {
  const context = useContext(StatementContext);
  if (context === undefined) {
    throw new Error('useStatementCustomization must be used within a StatementProvider');
  }
  return context;
};