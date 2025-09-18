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
    fontSize: {
      title: string;
      subtitle: string;
      body: string;
      table: string;
      signature: string;
    };
    fontWeights: {
      title: string;
      subtitle: string;
      body: string;
      table: string;
      signature: string;
    };
    spacing: {
      padding: string;
      margins: string;
      sectionGaps: string;
      tableSpacing: string;
    };
  };
  layout: {
    headerLayout: 'centered' | 'left' | 'right' | 'split' | 'vertical' | 'diagonal';
    logoPosition: 'top' | 'left' | 'right' | 'background' | 'corner' | 'floating';
    tableLayout: 'standard' | 'modern' | 'compact' | 'detailed' | 'minimal' | 'wide';
    summaryPosition: 'bottom' | 'side' | 'integrated' | 'top' | 'floating';
    orientation: 'portrait' | 'landscape';
    textOrientation: 'horizontal' | 'vertical' | 'angled';
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
    description: 'Traditional academic statement with formal table layout and small precise fonts',
    preview: '/statement-previews/classic-formal.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'double-border',
      headerStyle: 'formal',
      fontFamily: 'serif',
      accentColor: '#1e40af',
      tableStyle: 'bordered',
      decorativeElements: ['academic-border', 'corner-elements'],
      fontSize: {
        title: '28px',
        subtitle: '14px',
        body: '11px',
        table: '10px',
        signature: '9px'
      },
      fontWeights: {
        title: '700',
        subtitle: '500',
        body: '400',
        table: '400',
        signature: '400'
      },
      spacing: {
        padding: '1.5rem',
        margins: '0.75rem',
        sectionGaps: '1rem',
        tableSpacing: '0.5rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'standard',
      summaryPosition: 'bottom',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'modern-bold',
    name: 'Modern Bold',
    description: 'Contemporary design with large bold fonts and dynamic table layout',
    preview: '/statement-previews/modern-bold.jpg',
    style: {
      backgroundColor: '#f1f5f9',
      borderStyle: 'modern-line',
      headerStyle: 'bold',
      fontFamily: 'sans-serif',
      accentColor: '#059669',
      tableStyle: 'modern',
      decorativeElements: ['geometric-lines', 'modern-shapes'],
      fontSize: {
        title: '44px',
        subtitle: '22px',
        body: '16px',
        table: '14px',
        signature: '13px'
      },
      fontWeights: {
        title: '900',
        subtitle: '700',
        body: '500',
        table: '600',
        signature: '600'
      },
      spacing: {
        padding: '2.5rem',
        margins: '1.5rem',
        sectionGaps: '2.5rem',
        tableSpacing: '1rem'
      }
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'left',
      tableLayout: 'modern',
      summaryPosition: 'side',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'luxury-dark',
    name: 'Luxury Dark',
    description: 'Premium dark theme with gold accents and elegant large typography',
    preview: '/statement-previews/luxury-dark.jpg',
    style: {
      backgroundColor: '#1f2937',
      borderStyle: 'luxury-border',
      headerStyle: 'luxury',
      fontFamily: 'serif',
      accentColor: '#fbbf24',
      tableStyle: 'luxury',
      decorativeElements: ['gold-accents', 'luxury-patterns', 'premium-borders'],
      fontSize: {
        title: '48px',
        subtitle: '24px',
        body: '16px',
        table: '14px',
        signature: '14px'
      },
      fontWeights: {
        title: '800',
        subtitle: '600',
        body: '400',
        table: '500',
        signature: '600'
      },
      spacing: {
        padding: '3rem',
        margins: '2rem',
        sectionGaps: '3rem',
        tableSpacing: '1.5rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      tableLayout: 'detailed',
      summaryPosition: 'integrated',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'compact-efficient',
    name: 'Compact Efficient',
    description: 'Space-efficient design with small fonts and tight spacing for maximum information',
    preview: '/statement-previews/compact-efficient.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'simple-line',
      headerStyle: 'compact',
      fontFamily: 'sans-serif',
      accentColor: '#0369a1',
      tableStyle: 'compact',
      decorativeElements: ['minimal-lines'],
      fontSize: {
        title: '24px',
        subtitle: '12px',
        body: '10px',
        table: '9px',
        signature: '8px'
      },
      fontWeights: {
        title: '600',
        subtitle: '500',
        body: '400',
        table: '400',
        signature: '400'
      },
      spacing: {
        padding: '1rem',
        margins: '0.5rem',
        sectionGaps: '0.75rem',
        tableSpacing: '0.25rem'
      }
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'corner',
      tableLayout: 'compact',
      summaryPosition: 'side',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'elegant-script',
    name: 'Elegant Script',
    description: 'Sophisticated design with script fonts, elegant spacing, and refined elements',
    preview: '/statement-previews/elegant-script.jpg',
    style: {
      backgroundColor: '#fefefe',
      borderStyle: 'elegant-border',
      headerStyle: 'elegant',
      fontFamily: 'script',
      accentColor: '#6366f1',
      tableStyle: 'elegant',
      decorativeElements: ['elegant-flourishes', 'classic-borders', 'script-ornaments'],
      fontSize: {
        title: '40px',
        subtitle: '20px',
        body: '14px',
        table: '12px',
        signature: '16px'
      },
      fontWeights: {
        title: '400',
        subtitle: '400',
        body: '400',
        table: '400',
        signature: '400'
      },
      spacing: {
        padding: '3.5rem',
        margins: '2.5rem',
        sectionGaps: '2.5rem',
        tableSpacing: '1.25rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'floating',
      tableLayout: 'detailed',
      summaryPosition: 'bottom',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'industrial-bold',
    name: 'Industrial Bold',
    description: 'Strong industrial design with extra bold fonts and right-aligned layout',
    preview: '/statement-previews/industrial-bold.jpg',
    style: {
      backgroundColor: '#f3f4f6',
      borderStyle: 'industrial-border',
      headerStyle: 'industrial',
      fontFamily: 'sans-serif',
      accentColor: '#dc2626',
      tableStyle: 'industrial',
      decorativeElements: ['industrial-lines', 'bold-shapes', 'metal-textures'],
      fontSize: {
        title: '50px',
        subtitle: '25px',
        body: '15px',
        table: '13px',
        signature: '12px'
      },
      fontWeights: {
        title: '900',
        subtitle: '800',
        body: '700',
        table: '600',
        signature: '700'
      },
      spacing: {
        padding: '2rem',
        margins: '1rem',
        sectionGaps: '2rem',
        tableSpacing: '0.75rem'
      }
    },
    layout: {
      headerLayout: 'right',
      logoPosition: 'right',
      tableLayout: 'wide',
      summaryPosition: 'top',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'zen-vertical',
    name: 'Zen Vertical',
    description: 'Unique vertical text orientation with zen-like spacing and minimal design',
    preview: '/statement-previews/zen-vertical.jpg',
    style: {
      backgroundColor: '#f8fafc',
      borderStyle: 'zen-border',
      headerStyle: 'zen',
      fontFamily: 'sans-serif',
      accentColor: '#059669',
      tableStyle: 'minimal',
      decorativeElements: ['zen-circles', 'minimal-lines'],
      fontSize: {
        title: '34px',
        subtitle: '17px',
        body: '13px',
        table: '11px',
        signature: '11px'
      },
      fontWeights: {
        title: '300',
        subtitle: '300',
        body: '300',
        table: '400',
        signature: '300'
      },
      spacing: {
        padding: '5rem',
        margins: '4rem',
        sectionGaps: '4rem',
        tableSpacing: '2rem'
      }
    },
    layout: {
      headerLayout: 'vertical',
      logoPosition: 'floating',
      tableLayout: 'minimal',
      summaryPosition: 'floating',
      orientation: 'portrait',
      textOrientation: 'vertical'
    }
  }
];