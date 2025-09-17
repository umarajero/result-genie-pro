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
  };
  layout: {
    headerLayout: 'centered' | 'left' | 'right' | 'split';
    logoPosition: 'top' | 'left' | 'right' | 'background';
    contentAlignment: 'center' | 'left' | 'justify';
    signatureLayout: 'single' | 'double' | 'triple';
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
      decorativeElements: ['corner-flourishes', 'border-pattern']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'single'
    }
  },
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, contemporary design with minimal decorative elements',
    preview: '/certificate-previews/modern-minimal.jpg',
    style: {
      backgroundColor: '#fafafa',
      borderStyle: 'simple-line',
      headerStyle: 'clean',
      fontFamily: 'sans-serif',
      accentColor: '#059669',
      decorativeElements: ['geometric-shapes']
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'left',
      contentAlignment: 'left',
      signatureLayout: 'double'
    }
  },
  {
    id: 'academic-prestige',
    name: 'Academic Prestige',
    description: 'University-style certificate with academic colors and formal layout',
    preview: '/certificate-previews/academic-prestige.jpg',
    style: {
      backgroundColor: '#f8fafc',
      borderStyle: 'ornate-border',
      headerStyle: 'academic',
      fontFamily: 'serif',
      accentColor: '#7c2d12',
      decorativeElements: ['academic-seal', 'laurel-wreaths', 'ribbon-banner']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'triple'
    }
  },
  {
    id: 'creative-colorful',
    name: 'Creative Colorful',
    description: 'Vibrant and creative design perfect for arts and creative subjects',
    preview: '/certificate-previews/creative-colorful.jpg',
    style: {
      backgroundColor: '#fef3c7',
      borderStyle: 'artistic-border',
      headerStyle: 'creative',
      fontFamily: 'display',
      accentColor: '#dc2626',
      decorativeElements: ['paint-splashes', 'artistic-frames', 'color-gradients']
    },
    layout: {
      headerLayout: 'split',
      logoPosition: 'right',
      contentAlignment: 'center',
      signatureLayout: 'double'
    }
  },
  {
    id: 'professional-corporate',
    name: 'Professional Corporate',
    description: 'Business-oriented design suitable for professional certifications',
    preview: '/certificate-previews/professional-corporate.jpg',
    style: {
      backgroundColor: '#ffffff',
      borderStyle: 'corporate-border',
      headerStyle: 'professional',
      fontFamily: 'sans-serif',
      accentColor: '#1f2937',
      decorativeElements: ['corporate-lines', 'professional-badge']
    },
    layout: {
      headerLayout: 'left',
      logoPosition: 'left',
      contentAlignment: 'left',
      signatureLayout: 'double'
    }
  },
  {
    id: 'vintage-classic',
    name: 'Vintage Classic',
    description: 'Retro-inspired design with vintage decorative elements',
    preview: '/certificate-previews/vintage-classic.jpg',
    style: {
      backgroundColor: '#fef7ed',
      borderStyle: 'vintage-border',
      headerStyle: 'vintage',
      fontFamily: 'serif',
      accentColor: '#92400e',
      decorativeElements: ['vintage-ornaments', 'classic-scrollwork', 'antique-frame']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'single'
    }
  },
  {
    id: 'sports-achievement',
    name: 'Sports Achievement',
    description: 'Dynamic design perfect for sports and athletic achievements',
    preview: '/certificate-previews/sports-achievement.jpg',
    style: {
      backgroundColor: '#f0f9ff',
      borderStyle: 'dynamic-border',
      headerStyle: 'sporty',
      fontFamily: 'sans-serif',
      accentColor: '#0369a1',
      decorativeElements: ['trophy-icons', 'medal-graphics', 'victory-laurels']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'background',
      contentAlignment: 'center',
      signatureLayout: 'double'
    }
  },
  {
    id: 'science-tech',
    name: 'Science & Technology',
    description: 'Modern tech-inspired design for STEM subjects',
    preview: '/certificate-previews/science-tech.jpg',
    style: {
      backgroundColor: '#f1f5f9',
      borderStyle: 'tech-border',
      headerStyle: 'futuristic',
      fontFamily: 'mono',
      accentColor: '#7c3aed',
      decorativeElements: ['circuit-patterns', 'tech-grid', 'digital-elements']
    },
    layout: {
      headerLayout: 'split',
      logoPosition: 'right',
      contentAlignment: 'left',
      signatureLayout: 'double'
    }
  },
  {
    id: 'kids-friendly',
    name: 'Kids Friendly',
    description: 'Playful and colorful design perfect for young students',
    preview: '/certificate-previews/kids-friendly.jpg',
    style: {
      backgroundColor: '#fef3c7',
      borderStyle: 'playful-border',
      headerStyle: 'fun',
      fontFamily: 'rounded',
      accentColor: '#f59e0b',
      decorativeElements: ['stars', 'balloons', 'rainbow-elements', 'cartoon-characters']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'single'
    }
  },
  {
    id: 'luxury-premium',
    name: 'Luxury Premium',
    description: 'High-end luxury design with gold accents and premium styling',
    preview: '/certificate-previews/luxury-premium.jpg',
    style: {
      backgroundColor: '#1f2937',
      borderStyle: 'luxury-border',
      headerStyle: 'luxury',
      fontFamily: 'serif',
      accentColor: '#fbbf24',
      decorativeElements: ['gold-foil-effect', 'luxury-patterns', 'premium-seal']
    },
    layout: {
      headerLayout: 'centered',
      logoPosition: 'top',
      contentAlignment: 'center',
      signatureLayout: 'triple'
    }
  }
];