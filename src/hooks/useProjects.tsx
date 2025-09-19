import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { StudentRecord, SchoolInfo } from '@/hooks/useStudentData';

export interface Project {
  id: string;
  name: string;
  description?: string;
  school_info: SchoolInfo;
  student_data: StudentRecord[];
  uploaded_file_name?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  saveProject: (name: string, description: string, schoolInfo: SchoolInfo, studentData: StudentRecord[], fileName?: string) => Promise<void>;
  loadProject: (project: Project) => void;
  deleteProject: (projectId: string) => Promise<void>;
  updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const refreshProjects = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Temporarily disable projects fetching until database is properly set up
      console.log('Projects feature temporarily disabled - database not configured');
      setProjects([]);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Silently handle error for now
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const saveProject = async (
    name: string, 
    description: string, 
    schoolInfo: SchoolInfo, 
    studentData: StudentRecord[], 
    fileName?: string
  ) => {
    try {
      // Temporarily disable project saving until database is properly set up
      console.log('Project saving temporarily disabled - database not configured');
      toast({
        title: "Feature Temporarily Disabled",
        description: "Project saving will be available once database is configured.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Feature Temporarily Disabled",
        description: "Project saving will be available once database is configured.",
        variant: "destructive"
      });
    }
  };

  const loadProject = (project: Project) => {
    // This will be handled by the component that uses this hook
    toast({
      title: "Project Loaded",
      description: `"${project.name}" has been loaded successfully.`
    });
  };

  const deleteProject = async (projectId: string) => {
    try {
      // Temporarily disable project deletion until database is properly set up
      console.log('Project deletion temporarily disabled - database not configured');
      toast({
        title: "Feature Temporarily Disabled",
        description: "Project management will be available once database is configured.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Feature Temporarily Disabled",
        description: "Project management will be available once database is configured.",
        variant: "destructive"
      });
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      // Temporarily disable project updates until database is properly set up
      console.log('Project updates temporarily disabled - database not configured');
      toast({
        title: "Feature Temporarily Disabled",
        description: "Project management will be available once database is configured.",
        variant: "destructive"
      });
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Feature Temporarily Disabled",
        description: "Project management will be available once database is configured.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    refreshProjects();
  }, []);

  return (
    <ProjectsContext.Provider value={{
      projects,
      loading,
      saveProject,
      loadProject,
      deleteProject,
      updateProject,
      refreshProjects
    }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};