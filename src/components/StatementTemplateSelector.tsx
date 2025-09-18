import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Palette, 
  Type, 
  Layout, 
  Settings, 
  Eye, 
  Check,
  FileText,
  Award,
  Briefcase,
  GraduationCap,
  Table
} from 'lucide-react';
import { defaultStatementTemplates, StatementTemplate, StatementCustomization } from '@/types/statementTemplates';
import { useToast } from '@/hooks/use-toast';
import { useStatementCustomization } from '@/hooks/useStatementCustomization';

export const StatementTemplateSelector = () => {
  const { 
    selectedTemplate, 
    setSelectedTemplate, 
    customization, 
    setCustomization 
  } = useStatementCustomization();
  
  const { toast } = useToast();

  const handleTemplateSelect = (template: StatementTemplate) => {
    setSelectedTemplate(template);
    toast({
      title: "Template Selected",
      description: `${template.name} template has been applied to your statements.`,
    });
  };

  const handleColorChange = (colorType: keyof StatementCustomization['colors'], value: string) => {
    setCustomization({
      ...customization,
      colors: {
        ...customization.colors,
        [colorType]: value
      }
    });
  };

  const handleFontChange = (fontType: keyof StatementCustomization['fonts'], value: string) => {
    setCustomization({
      ...customization,
      fonts: {
        ...customization.fonts,
        [fontType]: value
      }
    });
  };

  const handleTableChange = (tableType: keyof StatementCustomization['table'], value: boolean | string) => {
    setCustomization({
      ...customization,
      table: {
        ...customization.table,
        [tableType]: value
      }
    });
  };

  const handleDecorationChange = (decorationType: keyof StatementCustomization['decorations'], value: boolean | string) => {
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
        return <Award className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="w-5 h-5 text-primary" />
            Statement Templates
          </CardTitle>
          <CardDescription>
            Choose from our professionally designed statement templates and customize them to match your institution's branding.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Sample Templates
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
                {defaultStatementTemplates.map((template) => (
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
                              STATEMENT OF RESULT
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {template.name} Style
                            </div>
                            <div className="mt-2 space-y-1">
                              <div className="h-1 bg-current opacity-20 rounded"></div>
                              <div className="h-1 bg-current opacity-20 rounded"></div>
                              <div className="h-1 bg-current opacity-20 rounded w-3/4"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Template Features */}
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {template.style.fontFamily}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.layout.tableLayout}
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
                          <Label htmlFor="table-header-color">Table Header Color</Label>
                          <div className="flex gap-2">
                            <Input
                              id="table-header-color"
                              type="color"
                              value={customization.colors.tableHeader}
                              onChange={(e) => handleColorChange('tableHeader', e.target.value)}
                              className="w-16 h-10 p-1 border rounded"
                            />
                            <Input
                              type="text"
                              value={customization.colors.tableHeader}
                              onChange={(e) => handleColorChange('tableHeader', e.target.value)}
                              className="flex-1"
                              placeholder="#f3f4f6"
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
                          <Label>Table Font</Label>
                          <Select
                            value={customization.fonts.table}
                            onValueChange={(value) => handleFontChange('table', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="serif">Serif (Times New Roman)</SelectItem>
                              <SelectItem value="sans-serif">Sans Serif (Arial)</SelectItem>
                              <SelectItem value="mono">Monospace (Courier)</SelectItem>
                              <SelectItem value="rounded">Rounded (Nunito)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Table Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Table className="w-4 h-4" />
                        Table Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-borders">Show Table Borders</Label>
                            <Switch
                              id="show-borders"
                              checked={customization.table.showBorders}
                              onCheckedChange={(checked) => handleTableChange('showBorders', checked)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="alternate-rows">Alternate Row Colors</Label>
                            <Switch
                              id="alternate-rows"
                              checked={customization.table.alternateRows}
                              onCheckedChange={(checked) => handleTableChange('alternateRows', checked)}
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Header Style</Label>
                            <Select
                              value={customization.table.headerStyle}
                              onValueChange={(value) => handleTableChange('headerStyle', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bold">Bold Text</SelectItem>
                                <SelectItem value="colored">Colored Background</SelectItem>
                                <SelectItem value="minimal">Minimal Style</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Border Width</Label>
                            <Select
                              value={customization.table.borderWidth}
                              onValueChange={(value) => handleTableChange('borderWidth', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="thin">Thin (1px)</SelectItem>
                                <SelectItem value="medium">Medium (2px)</SelectItem>
                                <SelectItem value="thick">Thick (3px)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Decorations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Decorations
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="show-border">Show Document Border</Label>
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
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Template First</h3>
                  <p className="text-muted-foreground">
                    Choose a template from the Sample Templates tab to start customizing.
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
                      className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg"
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
                          STATEMENT OF RESULT
                        </h1>
                        <div 
                          className="text-lg"
                          style={{ color: customization.colors.secondary }}
                        >
                          Academic Performance Report
                        </div>
                        
                        {/* Sample Table */}
                        <div className="mt-8">
                          <table 
                            className="w-full"
                            style={{ 
                              fontFamily: customization.fonts.table,
                              border: customization.table.showBorders ? `${customization.table.borderWidth === 'thin' ? '1px' : customization.table.borderWidth === 'medium' ? '2px' : '3px'} solid ${customization.colors.tableBorder}` : 'none'
                            }}
                          >
                            <thead>
                              <tr 
                                style={{ 
                                  backgroundColor: customization.table.headerStyle === 'colored' ? customization.colors.tableHeader : 'transparent',
                                  fontWeight: customization.table.headerStyle === 'bold' ? 'bold' : 'normal'
                                }}
                              >
                                <th className="p-3 text-left" style={{ color: customization.colors.text }}>Subject</th>
                                <th className="p-3 text-center" style={{ color: customization.colors.text }}>Score</th>
                                <th className="p-3 text-center" style={{ color: customization.colors.text }}>Grade</th>
                              </tr>
                            </thead>
                            <tbody>
                              {['Mathematics', 'English', 'Science'].map((subject, index) => (
                                <tr 
                                  key={subject}
                                  style={{ 
                                    backgroundColor: customization.table.alternateRows && index % 2 === 1 
                                      ? `${customization.colors.tableHeader}50` 
                                      : 'transparent'
                                  }}
                                >
                                  <td className="p-3" style={{ color: customization.colors.text }}>{subject}</td>
                                  <td className="p-3 text-center" style={{ color: customization.colors.text }}>85%</td>
                                  <td className="p-3 text-center" style={{ color: customization.colors.accent }}>A</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
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