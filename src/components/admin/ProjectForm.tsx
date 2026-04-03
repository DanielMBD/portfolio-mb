import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import ApiService, { Project } from "@/services/api";

const projectSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  description: z.string().min(1, "Description requise"),
  technologies: z.array(z.string()).min(1, "Au moins une technologie requise"),
  image_url: z.string().optional(),
  github_url: z.string().url().optional().or(z.literal("")),
  demo_url: z.string().url().optional().or(z.literal("")),
  statut: z.enum(["actif", "inactif"]),
});

type ProjectForm = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project | null;
  onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      titre: "",
      description: "",
      technologies: [],
      image_url: "",
      github_url: "",
      demo_url: "",
      statut: "actif",
    },
  });

  const technologiesInput = watch("technologies");
  const statut = watch("statut");
  const imageUrl = watch("image_url");

  useEffect(() => {
    if (project) {
      reset({
        titre: project.titre,
        description: project.description,
        technologies: project.technologies,
        image_url: project.image_url || "",
        github_url: project.github_url || "",
        demo_url: project.demo_url || "",
        statut: project.statut,
      });
      if (project.image_url) {
        setImagePreview(project.image_url);
      }
    }
  }, [project, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "L'image ne doit pas dépasser 5MB",
          variant: "destructive",
        });
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setValue("image_url", "");
  };

  const uploadImage = async (): Promise<string | undefined> => {
    if (!imageFile) return imageUrl || undefined;

    setIsUploading(true);
    try {
      const result = await ApiService.uploadImage(imageFile);
      return result.imageUrl;
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de l'image",
        variant: "destructive",
      });
      return undefined;
    } finally {
      setIsUploading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: ProjectForm) => {
      const uploadedImageUrl = await uploadImage();
      const projectData: Omit<Project, "id"> = {
        titre: data.titre,
        description: data.description,
        technologies: data.technologies,
        image_url: uploadedImageUrl || data.image_url || undefined,
        github_url: data.github_url || undefined,
        demo_url: data.demo_url || undefined,
        statut: data.statut,
      };
      return ApiService.createProject(projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({
        title: "Succès",
        description: "Projet créé avec succès",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la création",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: ProjectForm) => {
      const uploadedImageUrl = await uploadImage();
      const projectData: Partial<Project> = {
        titre: data.titre,
        description: data.description,
        technologies: data.technologies,
        image_url: uploadedImageUrl || data.image_url || undefined,
        github_url: data.github_url || undefined,
        demo_url: data.demo_url || undefined,
        statut: data.statut,
      };
      return ApiService.updateProject(project!._id!, projectData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      toast({
        title: "Succès",
        description: "Projet mis à jour avec succès",
      });
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProjectForm) => {
    if (project) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleTechnologiesChange = (value: string) => {
    const technologies = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);
    setValue("technologies", technologies);
  };

  const isLoading =
    createMutation.isPending || updateMutation.isPending || isUploading;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {project && (
        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">ID du projet:</span> {project._id}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="titre">Titre du projet *</Label>
        <Input
          id="titre"
          {...register("titre")}
          placeholder="Mon super projet"
          error={errors.titre?.message}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Description détaillée du projet..."
          rows={4}
          className={errors.description ? "border-destructive" : ""}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="technologies">
          Technologies (séparées par des virgules) *
        </Label>
        <Input
          id="technologies"
          placeholder="React, Node.js, MySQL, TailwindCSS"
          defaultValue={technologiesInput?.join(", ") || ""}
          onChange={(e) => handleTechnologiesChange(e.target.value)}
        />
        {errors.technologies && (
          <p className="text-sm text-destructive">
            {errors.technologies.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Image du projet</Label>
        <div className="space-y-4">
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Upload Button */}
          {!imagePreview && (
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Cliquez pour uploader une image</p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, WEBP (max 5MB)
                  </p>
                </div>
              </label>
            </div>
          )}

          {/* Or URL Input */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou entrez une URL
              </span>
            </div>
          </div>

          <Input
            id="image_url"
            {...register("image_url")}
            placeholder="https://..."
            error={errors.image_url?.message}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            {...register("github_url")}
            placeholder="https://github.com/..."
            error={errors.github_url?.message}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demo_url">Demo URL</Label>
          <Input
            id="demo_url"
            {...register("demo_url")}
            placeholder="https://..."
            error={errors.demo_url?.message}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Statut</Label>
        <Select
          value={statut}
          onValueChange={(value: "actif" | "inactif") =>
            setValue("statut", value)
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="actif">Actif</SelectItem>
            <SelectItem value="inactif">Inactif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading
          ? isUploading
            ? "Upload en cours..."
            : "Sauvegarde..."
          : project
            ? "Mettre à jour"
            : "Créer le projet"}
      </Button>
    </form>
  );
};

export default ProjectForm;
