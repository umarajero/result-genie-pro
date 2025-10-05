import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';
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

interface SavedWorkContent {
  description?: string;
  school_info: SchoolInfo;
  student_data: StudentRecord[];
  uploaded_file_name?: string;
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
        .from('saved_works')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Transform saved_works to Project format
      const transformedProjects = (data || []).map(work => {
        const content = work.content as unknown as SavedWorkContent;
        return {
          id: work.id,
          name: work.title,
          description: content.description || '',
          school_info: content.school_info || { name: '' },
          student_data: content.student_data || [],
          uploaded_file_name: content.uploaded_file_name,
          created_at: work.created_at,
          updated_at: work.updated_at,
          user_id: work.user_id
        };
      });

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error Loading Projects",
        description: "Failed to load your saved projects. Please try again.",
        variant: "destructive"
      });
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to save projects.",
          variant: "destructive"
        });
        return;
      }

      const content: SavedWorkContent = {
        description,
        school_info: schoolInfo,
        student_data: studentData,
        uploaded_file_name: fileName
      };

      const { error } = await supabase
        .from('saved_works')
        .insert({
          user_id: user.id,
          title: name,
          content: content as unknown as Json
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
        title: "Error Saving Project",
        description: "Failed to save your project. Please try again.",
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
        .from('saved_works')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Project Deleted",
        description: "Your project has been deleted successfully."
      });

      await refreshProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error Deleting Project",
        description: "Failed to delete your project. Please try again.",
        variant: "destructive"
      });
    }
  };

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      // First get the current content
      const { data: currentWork, error: fetchError } = await supabase
        .from('saved_works')
        .select('content')
        .eq('id', projectId)
        .single();

      if (fetchError) throw fetchError;

      const existingContent = currentWork.content as unknown as SavedWorkContent;
      const updatedContent: SavedWorkContent = {
        ...existingContent,
        description: updates.description
      };

      const { error } = await supabase
        .from('saved_works')
        .update({
          title: updates.name,
          content: updatedContent as unknown as Json
        })
        .eq('id', projectId);

      if (error) throw error;

      toast({
        title: "Project Updated",
        description: "Your project has been updated successfully."
      });

      await refreshProjects();
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error Updating Project",
        description: "Failed to update your project. Please try again.",
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