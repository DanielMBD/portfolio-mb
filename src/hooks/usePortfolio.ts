import { useQuery } from "@tanstack/react-query";
import apiService from "@/services/api";
import type { PersonalInfo, Project, Skill } from "@/services/api";

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ["personalInfo"],
    queryFn: () => apiService.getPersonalInfo(),
  });
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: () => apiService.getProjects(),
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () => apiService.getSkills(),
  });
};

// Types exportés pour l'utilisation dans les composants
export type { PersonalInfo, Project, Skill };
