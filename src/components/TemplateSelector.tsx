import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Palette, 
  Type, 
  Layout, 
  Settings, 
  Eye, 
  Check,
  Sparkles,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { defaultTemplates, CertificateTemplate, TemplateCustomization } from '@/types/certificateTemplates';
import { useToast } from '@/hooks/use-toast';
import { useTemplateCustomization } from '@/hooks/useTemplateCustomization';

interface TemplateSelectorProps {
  selectedTemplate: CertificateTemplate | null;
  onTemplateSelect: (template: CertificateTemplate) => void;
  customization: TemplateCustomization;
  onCustomizationChange: (customization: TemplateCustomization) => void;
}

export const TemplateSelector = ({
  selectedTemplate: propSelectedTemplate,
  onTemplateSelect: propOnTemplateSelect,
  customization: propCustomization,
  onCustomizationChange: propOnCustomizationChange
}: TemplateSelectorProps) => {
  const { 
    selectedTemplate, 
    setSelectedTemplate, 
    customization, 
    setCustomization 
  } = useTemplateCustomization();
  
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const handleTemplateSelect = (template: CertificateTemplate) => {
    setSelectedTemplate(template);
    toast({
      title: "Template Selected",
      description: `${template.name} template has been applied to your certificates.`,
    });
  };

  const handleColorChange = (colorType: keyof TemplateCustomization['colors'], value: string) => {
    setCustomization({
      ...customization,
      colors: {
        ...customization.colors,
        [colorType]: value
      }
    });
  };

  const handleFontChange = (fontType: keyof TemplateCustomization['fonts'], value: string) => {
    setCustomization({
      ...customization,
      fonts: {
        ...customization.fonts,
        [fontType]: value
      }
    });
  };

  const handleDecorationChange = (decorationType: keyof TemplateCustomization['decorations'], value: boolean | string) => {
    setCustomization({
      ...customization,
      decorations: {
        ...customization.decorations,
        [decorationType]: value
      }
    });
  };

  const getTemplateIcon = (templateId: string) => {
    switch (templateId) {
      case 'academic-prestige':
        return <GraduationCap className="w-5 h-5" />;
      case 'professional-corporate':
        return <Briefcase className="w-5 h-5" />;
      case 'luxury-premium':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Certificate Templates
          </CardTitle>
          <CardDescription>
            Choose from our professionally designed certificate templates and customize them to match your institution's branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="customize" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Customize
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </TabsTrigger>
            </TabsList>

            {/* Template Selection */}
            <TabsContent value="templates" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {defaultTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      selectedTemplate?.id === template.id 
                        ? 'ring-2 ring-primary border-primary' 
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getTemplateIcon(template.id)}
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                        </div>
                        {selectedTemplate?.id === template.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Template Preview */}
                        <div 
                          className="h-32 rounded-lg border-2 border-dashed border-border flex items-center justify-center"
                          style={{ backgroundColor: template.style.backgroundColor }}
                        >
                          <div className="text-center p-4">
                            <div className="text-sm font-semibold mb-1" style={{ color: template.style.accentColor }}>
                              CERTIFICATE
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {template.name} Style
                            </div>
                          </div>
                        </div>
                        
                        {/* Template Features */}
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {template.style.fontFamily}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.layout.headerLayout}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.style.decorativeElements.length} decorations
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Customization Panel */}
            <TabsContent value="customize" className="mt-6">
              {selectedTemplate ? (
                <div className="space-y-6">
                  {/* Colors */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Colors
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="primary-color"
                              type="color"
                              value={customization.colors.primary}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              type="text"
                              value={customization.colors.primary}
                              onChange={(e) => handleColorChange('primary', e.target.value)}
                              className="flex-1"
                              placeholder="#1e40af"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondary-color">Secondary Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="secondary-color"
                              type="color"
                              value={customization.colors.secondary}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              type="text"
                              value={customization.colors.secondary}
                              onChange={(e) => handleColorChange('secondary', e.target.value)}
                              className="flex-1"
                              placeholder="#fbbf24"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accent-color">Accent Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="accent-color"
                              type="color"
                              value={customization.colors.accent}
                              onChange={(e) => handleColorChange('accent', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              type="text"
                              value={customization.colors.accent}
                              onChange={(e) => handleColorChange('accent', e.target.value)}
                              className="flex-1"
                              placeholder="#059669"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="background-color">Background Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="background-color"
                              type="color"
                              value={customization.colors.background}
                              onChange={(e) => handleColorChange('background', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              type="text"
                              value={customization.colors.background}
                              onChange={(e) => handleColorChange('background', e.target.value)}
                              className="flex-1"
                              placeholder="#ffffff"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Typography */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Type className="w-4 h-4" />
                        Typography
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Heading Font</Label>
                          <Select
                            value={customization.fonts.heading}
                            onValueChange={(value) => handleFontChange('heading', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="serif">Serif (Times New Roman)</SelectItem>
                              <SelectItem value="sans-serif">Sans Serif (Arial)</SelectItem>
                              <SelectItem value="display">Display (Playfair)</SelectItem>
                              <SelectItem value="mono">Monospace (Courier)</SelectItem>
                              <SelectItem value="rounded">Rounded (Nunito)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Body Font</Label>
                          <Select
                            value={customization.fonts.body}
                            onValueChange={(value) => handleFontChange('body', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="serif">Serif (Times New Roman)</SelectItem>
                              <SelectItem value="sans-serif">Sans Serif (Arial)</SelectItem>
                              <SelectItem value="display">Display (Playfair)</SelectItem>
                              <SelectItem value="mono">Monospace (Courier)</SelectItem>
                              <SelectItem value="rounded">Rounded (Nunito)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Signature Font</Label>
                          <Select
                            value={customization.fonts.signature}
                            onValueChange={(value) => handleFontChange('signature', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="serif">Serif (Times New Roman)</SelectItem>
                              <SelectItem value="sans-serif">Sans Serif (Arial)</SelectItem>
                              <SelectItem value="script">Script (Dancing Script)</SelectItem>
                              <SelectItem value="elegant">Elegant (Cormorant)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Decorations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Decorations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-border">Show Border</Label>
                            <Switch
                              id="show-border"
                              checked={customization.decorations.showBorder}
                              onCheckedChange={(checked) => handleDecorationChange('showBorder', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-watermark">Show Watermark</Label>
                            <Switch
                              id="show-watermark"
                              checked={customization.decorations.showWatermark}
                              onCheckedChange={(checked) => handleDecorationChange('showWatermark', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-decorations">Show Decorative Elements</Label>
                            <Switch
                              id="show-decorations"
                              checked={customization.decorations.showDecorations}
                              onCheckedChange={(checked) => handleDecorationChange('showDecorations', checked)}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Border Width</Label>
                            <Select
                              value={customization.decorations.borderWidth}
                              onValueChange={(value) => handleDecorationChange('borderWidth', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="thin">Thin (1px)</SelectItem>
                                <SelectItem value="medium">Medium (2px)</SelectItem>
                                <SelectItem value="thick">Thick (4px)</SelectItem>
                                <SelectItem value="extra-thick">Extra Thick (6px)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Template First</h3>
                  <p className="text-muted-foreground">
                    Choose a template from the Templates tab to start customizing.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Preview */}
            <TabsContent value="preview" className="mt-6">
              {selectedTemplate ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Template Preview</h3>
                    <Badge variant="outline">{selectedTemplate.name}</Badge>
                  </div>
                  <div className="border rounded-lg p-8 bg-muted/20">
                    <div 
                      className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg"
                      style={{ 
                        backgroundColor: customization.colors.background,
                        fontFamily: customization.fonts.body,
                        border: customization.decorations.showBorder 
                          ? `${customization.decorations.borderWidth === 'thin' ? '1px' : 
                              customization.decorations.borderWidth === 'medium' ? '2px' :
                              customization.decorations.borderWidth === 'thick' ? '4px' : '6px'} solid ${customization.colors.primary}`
                          : 'none'
                      }}
                    >
                      <div className="text-center space-y-4">
                        <h1 
                          className="text-3xl font-bold"
                          style={{ 
                            color: customization.colors.primary,
                            fontFamily: customization.fonts.heading
                          }}
                        >
                          CERTIFICATE OF ACHIEVEMENT
                        </h1>
                        <div 
                          className="text-lg"
                          style={{ color: customization.colors.secondary }}
                        >
                          This is to certify that
                        </div>
                        <div 
                          className="text-2xl font-bold py-4 border-b-2"
                          style={{ 
                            color: customization.colors.accent,
                            borderColor: customization.colors.primary
                          }}
                        >
                          [Student Name]
                        </div>
                        <div className="text-base" style={{ color: customization.colors.text }}>
                          has successfully completed the requirements and is awarded this certificate
                        </div>
                        <div className="pt-8">
                          <div 
                            className="text-sm"
                            style={{ 
                              fontFamily: customization.fonts.signature,
                              color: customization.colors.text
                            }}
                          >
                            ________________________<br />
                            Signature & Date
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Template Selected</h3>
                  <p className="text-muted-foreground">
                    Select a template to see the preview.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};