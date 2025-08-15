
import { useQuery } from '@tanstack/react-query';
import { StaticDataService } from '@/services/staticData';
import type { PersonalInfo, Project, Skill } from '@/services/staticData';

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ['personalInfo'],
    queryFn: StaticDataService.getPersonalInfo,
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: StaticDataService.getProjects,
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: StaticDataService.getSkills,
  });
};

// Types exportés pour l'utilisation dans les composants
export type { PersonalInfo, Project, Skill };
