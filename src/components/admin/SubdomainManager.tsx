import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";

export default function SubdomainManager() {
  const [subdomain, setSubdomain] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const loadSubdomainInfo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<{
        subdomain?: string;
        customDomain?: string;
      }>("/admin/subdomain");
      setSubdomain(response.subdomain || "");
      setCustomDomain(response.customDomain || "");
    } catch (error: unknown) {
      console.error("Erreur chargement sous-domaine:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de charger les informations";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadSubdomainInfo();
  }, [loadSubdomainInfo]);

  const handleSave = async () => {
    if (subdomain && !/^[a-z0-9-]+$/.test(subdomain)) {
      toast({
        title: "Erreur",
        description:
          "Le sous-domaine ne peut contenir que des lettres minuscules, chiffres et tirets",
        variant: "destructive",
      });
      return;
    }

    if (subdomain && (subdomain.length < 3 || subdomain.length > 30)) {
      toast({
        title: "Erreur",
        description: "Le sous-domaine doit contenir entre 3 et 30 caractères",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      await api.put("/admin/subdomain", {
        subdomain: subdomain || undefined,
        customDomain: customDomain || undefined,
      });

      toast({
        title: "Succès",
        description: "Sous-domaine mis à jour avec succès",
      });
    } catch (error: unknown) {
      console.error("Erreur sauvegarde sous-domaine:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Impossible de sauvegarder";
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getSubdomainUrl = () => {
    if (!subdomain) return "";
    const mainDomain = import.meta.env.VITE_MAIN_DOMAIN || "example.com";
    return `https://${subdomain}.${mainDomain}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sous-domaine</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chargement...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sous-domaine</CardTitle>
        <CardDescription>
          Configurez votre sous-domaine personnalisé pour accéder à votre
          portfolio
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subdomain">Sous-domaine</Label>
          <div className="flex gap-2">
            <Input
              id="subdomain"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
              placeholder="mon-portfolio"
              className="flex-1"
            />
            <span className="flex items-center text-sm text-muted-foreground">
              .{import.meta.env.VITE_MAIN_DOMAIN || "example.com"}
            </span>
          </div>
          {subdomain && (
            <p className="text-sm text-muted-foreground">
              Votre portfolio sera accessible sur:{" "}
              <a
                href={getSubdomainUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {getSubdomainUrl()}
              </a>
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Lettres minuscules, chiffres et tirets uniquement (3-30 caractères)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customDomain">Domaine personnalisé (optionnel)</Label>
          <Input
            id="customDomain"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value.toLowerCase())}
            placeholder="portfolio.monsite.com"
          />
          <p className="text-xs text-muted-foreground">
            Vous devez configurer les DNS de votre domaine pour pointer vers
            notre serveur
          </p>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Sauvegarde..." : "Sauvegarder"}
        </Button>
      </CardContent>
    </Card>
  );
}
