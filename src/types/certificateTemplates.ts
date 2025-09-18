export interface CertificateTemplate {
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
    decorativeElements: string[];
    fontSize: {
      title: string;
      subtitle: string;
      body: string;
      signature: string;
    };
    fontWeights: {
      title: string;
      subtitle: string;
      body: string;
      signature: string;
    };
    spacing: {
      padding: string;
      margins: string;
      sectionGaps: string;
    };
  };
  layout: {
    headerLayout: 'centered' | 'left' | 'right' | 'split' | 'vertical' | 'diagonal';
    logoPosition: 'top' | 'left' | 'right' | 'background' | 'corner' | 'floating';
    contentAlignment: 'center' | 'left' | 'right' | 'justify' | 'scattered';
    signatureLayout: 'single' | 'double' | 'triple' | 'corners' | 'bottom-spread';
    orientation: 'portrait' | 'landscape';
    textOrientation: 'horizontal' | 'vertical' | 'angled';
  };
}

export interface TemplateCustomization {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  fonts: {
    heading: string;
    body: string;
    signature: string;
  };
  spacing: {
    padding: string;
    margins: string;
    lineHeight: string;
  };
  decorations: {
    showBorder: boolean;
    showWatermark: boolean;
    showDecorations: boolean;
    borderWidth: string;
  };
}

export const defaultTemplates: CertificateTemplate[] = [
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Traditional formal certificate with elegant borders and classic typography',
    preview: '/certificate-previews/classic-elegant.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'double-border',
      headerStyle: 'formal',
      fontFamily: 'serif',
      accentColor: '#1e40af',
      decorativeElements: ['corner-flourishes', 'border-pattern'],
      fontSize: {
        title: '36px',
        subtitle: '18px',
        body: '14px',
        signature: '12px'
      },
      fontWeights: {
        title: '700',
        subtitle: '600',
        body: '400',
        signature: '400'
      },
      spacing: {
        padding: '3rem',
        margins: '2rem',
        sectionGaps: '2rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'single',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'modern-asymmetric',
    name: 'Modern Asymmetric',
    description: 'Bold asymmetric design with large typography and dynamic positioning',
    preview: '/certificate-previews/modern-asymmetric.jpg',
    style: {
      backgroundColor: '#f8fafc',
      borderStyle: 'geometric-border',
      headerStyle: 'modern',
      fontFamily: 'sans-serif',
      accentColor: '#059669',
      decorativeElements: ['geometric-shapes', 'color-blocks'],
      fontSize: {
        title: '48px',
        subtitle: '24px',
        body: '16px',
        signature: '14px'
      },
      fontWeights: {
        title: '900',
        subtitle: '700',
        body: '500',
        signature: '600'
      },
      spacing: {
        padding: '1.5rem',
        margins: '1rem',
        sectionGaps: '3rem'
      }
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'corner',
      contentAlignment: 'left',
      signatureLayout: 'corners',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'minimalist-zen',
    name: 'Minimalist Zen',
    description: 'Ultra-clean design with lots of white space and minimal elements',
    preview: '/certificate-previews/minimalist-zen.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'no-border',
      headerStyle: 'minimal',
      fontFamily: 'sans-serif',
      accentColor: '#6366f1',
      decorativeElements: [],
      fontSize: {
        title: '28px',
        subtitle: '14px',
        body: '12px',
        signature: '10px'
      },
      fontWeights: {
        title: '300',
        subtitle: '400',
        body: '300',
        signature: '300'
      },
      spacing: {
        padding: '4rem',
        margins: '3rem',
        sectionGaps: '4rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'floating',
      contentAlignment: 'center',
      signatureLayout: 'single',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'vintage-ornate',
    name: 'Vintage Ornate',
    description: 'Richly decorated vintage design with ornate borders and classic elements',
    preview: '/certificate-previews/vintage-ornate.jpg',
    style: {
      backgroundColor: '#fef7ed',
      borderStyle: 'ornate-vintage',
      headerStyle: 'ornate',
      fontFamily: 'serif',
      accentColor: '#92400e',
      decorativeElements: ['vintage-ornaments', 'classic-scrollwork', 'decorative-corners', 'flourishes'],
      fontSize: {
        title: '42px',
        subtitle: '20px',
        body: '15px',
        signature: '13px'
      },
      fontWeights: {
        title: '800',
        subtitle: '600',
        body: '400',
        signature: '500'
      },
      spacing: {
        padding: '2.5rem',
        margins: '1.5rem',
        sectionGaps: '1.5rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'double',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'corporate-landscape',
    name: 'Corporate Landscape',
    description: 'Wide landscape format with corporate styling and left-aligned content',
    preview: '/certificate-previews/corporate-landscape.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'corporate-line',
      headerStyle: 'corporate',
      fontFamily: 'sans-serif',
      accentColor: '#1f2937',
      decorativeElements: ['corporate-lines', 'professional-badge'],
      fontSize: {
        title: '32px',
        subtitle: '16px',
        body: '13px',
        signature: '11px'
      },
      fontWeights: {
        title: '600',
        subtitle: '500',
        body: '400',
        signature: '400'
      },
      spacing: {
        padding: '2rem 4rem',
        margins: '1rem 2rem',
        sectionGaps: '2.5rem'
      }
    },
    layout: {
      headerLayout: 'split',
      logoPosition: 'left',
      contentAlignment: 'left',
      signatureLayout: 'bottom-spread',
      orientation: 'landscape',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'artistic-creative',
    name: 'Artistic Creative',
    description: 'Creative design with angled text, vibrant colors, and artistic elements',
    preview: '/certificate-previews/artistic-creative.jpg',
    style: {
      backgroundColor: '#fef3c7',
      borderStyle: 'artistic-border',
      headerStyle: 'creative',
      fontFamily: 'display',
      accentColor: '#dc2626',
      decorativeElements: ['paint-splashes', 'artistic-frames', 'color-gradients', 'creative-shapes'],
      fontSize: {
        title: '44px',
        subtitle: '22px',
        body: '16px',
        signature: '14px'
      },
      fontWeights: {
        title: '800',
        subtitle: '700',
        body: '500',
        signature: '600'
      },
      spacing: {
        padding: '2rem',
        margins: '1rem',
        sectionGaps: '2rem'
      }
    },
    layout: {
      headerLayout: 'diagonal',
      logoPosition: 'right',
      contentAlignment: 'scattered',
      signatureLayout: 'corners',
      orientation: 'portrait',
      textOrientation: 'angled'
    }
  },
  {
    id: 'tech-futuristic',
    name: 'Tech Futuristic',
    description: 'Futuristic design with tech elements, monospace fonts, and digital styling',
    preview: '/certificate-previews/tech-futuristic.jpg',
    style: {
      backgroundColor: '#0f172a',
      borderStyle: 'tech-border',
      headerStyle: 'futuristic',
      fontFamily: 'mono',
      accentColor: '#00d4ff',
      decorativeElements: ['circuit-patterns', 'tech-grid', 'digital-elements', 'neon-glow'],
      fontSize: {
        title: '38px',
        subtitle: '19px',
        body: '14px',
        signature: '12px'
      },
      fontWeights: {
        title: '700',
        subtitle: '600',
        body: '400',
        signature: '500'
      },
      spacing: {
        padding: '2.5rem',
        margins: '1.5rem',
        sectionGaps: '2.5rem'
      }
    },
    layout: {
      headerLayout: 'split',
      logoPosition: 'background',
      contentAlignment: 'left',
      signatureLayout: 'double',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Premium luxury design with gold accents, large fonts, and elegant spacing',
    preview: '/certificate-previews/luxury-gold.jpg',
    style: {
      backgroundColor: '#1a1a1a',
      borderStyle: 'luxury-gold',
      headerStyle: 'luxury',
      fontFamily: 'serif',
      accentColor: '#ffd700',
      decorativeElements: ['gold-foil-effect', 'luxury-patterns', 'premium-seal', 'royal-crown'],
      fontSize: {
        title: '52px',
        subtitle: '26px',
        body: '18px',
        signature: '16px'
      },
      fontWeights: {
        title: '800',
        subtitle: '700',
        body: '500',
        signature: '600'
      },
      spacing: {
        padding: '4rem',
        margins: '3rem',
        sectionGaps: '3.5rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'triple',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'playful-kids',
    name: 'Playful Kids',
    description: 'Fun and colorful design with large friendly fonts and playful elements',
    preview: '/certificate-previews/playful-kids.jpg',
    style: {
      backgroundColor: '#fef3c7',
      borderStyle: 'playful-border',
      headerStyle: 'fun',
      fontFamily: 'rounded',
      accentColor: '#f59e0b',
      decorativeElements: ['stars', 'balloons', 'rainbow-elements', 'cartoon-characters', 'confetti'],
      fontSize: {
        title: '46px',
        subtitle: '23px',
        body: '17px',
        signature: '15px'
      },
      fontWeights: {
        title: '800',
        subtitle: '700',
        body: '600',
        signature: '500'
      },
      spacing: {
        padding: '2rem',
        margins: '1rem',
        sectionGaps: '1.5rem'
      }
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'corner',
      contentAlignment: 'center',
      signatureLayout: 'single',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  },
  {
    id: 'academic-formal',
    name: 'Academic Formal',
    description: 'Traditional academic layout with small precise fonts and formal structure',
    preview: '/certificate-previews/academic-formal.jpg',
    style: {
      backgroundColor: '#f9fafb',
      borderStyle: 'academic-border',
      headerStyle: 'academic',
      fontFamily: 'serif',
      accentColor: '#7c2d12',
      decorativeElements: ['academic-seal', 'laurel-wreaths', 'ribbon-banner', 'coat-of-arms'],
      fontSize: {
        title: '30px',
        subtitle: '15px',
        body: '11px',
        signature: '10px'
      },
      fontWeights: {
        title: '700',
        subtitle: '500',
        body: '400',
        signature: '400'
      },
      spacing: {
        padding: '1.5rem',
        margins: '0.75rem',
        sectionGaps: '1rem'
      }
    },
    layout: {
      headerLayout: 'vertical',
      logoPosition: 'left',
      contentAlignment: 'justify',
      signatureLayout: 'triple',
      orientation: 'portrait',
      textOrientation: 'horizontal'
    }
  }
];