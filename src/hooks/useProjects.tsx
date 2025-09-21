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

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error Loading Projects",
        description: "Failed to load your saved projects.",
        variant: "destructive"
      });
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('projects')
        .insert({
          user_id: user.id,
          name,
          description,
          school_info: schoolInfo,
          student_data: studentData,
          uploaded_file_name: fileName
        });

      if (error) throw error;

      toast({
        title: "Project Saved",
        description: `"${name}" has been saved successfully.`
      });

      await refreshProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save the project. Please try again.",
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
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Project Deleted",
        description: "Project has been deleted successfully."
      });

      await refreshProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Delete Failed",
        description: "Failed to delete the project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Project Updated",
        description: "Project has been updated successfully."
      });

      await refreshProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update the project. Please try again.",
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