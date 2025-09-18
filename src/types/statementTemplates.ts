export interface StatementTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  style: {
    backgroundColor: string;
    borderStyle: string;
    headerStyle: string;
    fontFamily: string;
    accentColor: string;
    tableStyle: string;
    decorativeElements: string[];
  };
  layout: {
    headerLayout: 'centered' | 'left' | 'right' | 'split';
    logoPosition: 'top' | 'left' | 'right' | 'background';
    tableLayout: 'standard' | 'modern' | 'compact' | 'detailed';
    summaryPosition: 'bottom' | 'side' | 'integrated';
  };
}

export interface StatementCustomization {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    tableHeader: string;
    tableBorder: string;
  };
  fonts: {
    heading: string;
    body: string;
    table: string;
  };
  spacing: {
    padding: string;
    margins: string;
    lineHeight: string;
  };
  table: {
    showBorders: boolean;
    alternateRows: boolean;
    headerStyle: 'bold' | 'colored' | 'minimal';
    borderWidth: 'thin' | 'medium' | 'thick';
  };
  decorations: {
    showBorder: boolean;
    showWatermark: boolean;
    showDecorations: boolean;
    borderWidth: string;
  };
}

export const defaultStatementTemplates: StatementTemplate[] = [
  {
    id: 'classic-formal',
    name: 'Classic Formal',
    description: 'Traditional academic statement with formal table layout',
    preview: '/statement-previews/classic-formal.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'double-border',
      headerStyle: 'formal',
      fontFamily: 'serif',
      accentColor: '#1e40af',
      tableStyle: 'bordered',
      decorativeElements: ['academic-border', 'corner-elements']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'standard',
      summaryPosition: 'bottom'
    }
  },
  {
    id: 'modern-clean',
    name: 'Modern Clean',
    description: 'Contemporary design with clean lines and minimal styling',
    preview: '/statement-previews/modern-clean.jpg',
    style: {
      backgroundColor: '#fafafa',
      borderStyle: 'simple-line',
      headerStyle: 'clean',
      fontFamily: 'sans-serif',
      accentColor: '#059669',
      tableStyle: 'minimal',
      decorativeElements: ['subtle-lines']
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'left',
      tableLayout: 'modern',
      summaryPosition: 'side'
    }
  },
  {
    id: 'academic-prestige',
    name: 'Academic Prestige',
    description: 'University-style statement with prestigious academic styling',
    preview: '/statement-previews/academic-prestige.jpg',
    style: {
      backgroundColor: '#f8fafc',
      borderStyle: 'ornate-border',
      headerStyle: 'academic',
      fontFamily: 'serif',
      accentColor: '#7c2d12',
      tableStyle: 'detailed',
      decorativeElements: ['academic-seal', 'ornate-corners']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'detailed',
      summaryPosition: 'integrated'
    }
  },
  {
    id: 'colorful-modern',
    name: 'Colorful Modern',
    description: 'Vibrant and engaging design perfect for creative institutions',
    preview: '/statement-previews/colorful-modern.jpg',
    style: {
      backgroundColor: '#fef3c7',
      borderStyle: 'gradient-border',
      headerStyle: 'creative',
      fontFamily: 'sans-serif',
      accentColor: '#dc2626',
      tableStyle: 'colorful',
      decorativeElements: ['color-blocks', 'modern-shapes']
    },
    layout: {
      headerLayout: 'split',
      logoPosition: 'right',
      tableLayout: 'modern',
      summaryPosition: 'side'
    }
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    description: 'Business-oriented design suitable for professional institutions',
    preview: '/statement-previews/professional-corporate.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'corporate-border',
      headerStyle: 'professional',
      fontFamily: 'sans-serif',
      accentColor: '#1f2937',
      tableStyle: 'corporate',
      decorativeElements: ['corporate-lines']
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'left',
      tableLayout: 'compact',
      summaryPosition: 'bottom'
    }
  },
  {
    id: 'elegant-traditional',
    name: 'Elegant Traditional',
    description: 'Timeless design with elegant typography and classic elements',
    preview: '/statement-previews/elegant-traditional.jpg',
    style: {
      backgroundColor: '#fefefe',
      borderStyle: 'elegant-border',
      headerStyle: 'elegant',
      fontFamily: 'serif',
      accentColor: '#6366f1',
      tableStyle: 'elegant',
      decorativeElements: ['elegant-flourishes', 'classic-borders']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'standard',
      summaryPosition: 'bottom'
    }
  },
  {
    id: 'minimalist-modern',
    name: 'Minimalist Modern',
    description: 'Ultra-clean design focusing on content with minimal distractions',
    preview: '/statement-previews/minimalist-modern.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'no-border',
      headerStyle: 'minimal',
      fontFamily: 'sans-serif',
      accentColor: '#0ea5e9',
      tableStyle: 'minimal',
      decorativeElements: []
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'left',
      tableLayout: 'compact',
      summaryPosition: 'side'
    }
  },
  {
    id: 'vintage-classic',
    name: 'Vintage Classic',
    description: 'Retro-inspired design with vintage decorative elements',
    preview: '/statement-previews/vintage-classic.jpg',
    style: {
      backgroundColor: '#fef7ed',
      borderStyle: 'vintage-border',
      headerStyle: 'vintage',
      fontFamily: 'serif',
      accentColor: '#92400e',
      tableStyle: 'vintage',
      decorativeElements: ['vintage-ornaments', 'classic-scrollwork']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'standard',
      summaryPosition: 'bottom'
    }
  },
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    description: 'Futuristic design perfect for technology and STEM institutions',
    preview: '/statement-previews/tech-modern.jpg',
    style: {
      backgroundColor: '#f1f5f9',
      borderStyle: 'tech-border',
      headerStyle: 'futuristic',
      fontFamily: 'mono',
      accentColor: '#7c3aed',
      tableStyle: 'tech',
      decorativeElements: ['tech-grid', 'digital-elements']
    },
    layout: {
      headerLayout: 'split',
      logoPosition: 'right',
      tableLayout: 'modern',
      summaryPosition: 'integrated'
    }
  },
  {
    id: 'luxury-premium',
    name: 'Luxury Premium',
    description: 'High-end luxury design with premium styling and gold accents',
    preview: '/statement-previews/luxury-premium.jpg',
    style: {
      backgroundColor: '#1f2937',
      borderStyle: 'luxury-border',
      headerStyle: 'luxury',
      fontFamily: 'serif',
      accentColor: '#fbbf24',
      tableStyle: 'luxury',
      decorativeElements: ['gold-accents', 'luxury-patterns']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'detailed',
      summaryPosition: 'integrated'
    }
  }
];