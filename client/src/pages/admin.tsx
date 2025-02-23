import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getBusinessData } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
  const [isDeploying, setIsDeploying] = useState(false);
  const { data: business } = useQuery({
    queryKey: ['business'],
    queryFn: getBusinessData,
    retry: false
  });

  const form = useForm({
    defaultValues: {
      businessName: business?.basic_info.name || "",
      phone: business?.basic_info.phone || "",
      city: business?.basic_info.city || "",
      heroSlides: [
        { url: "", title: "", description: "" },
        { url: "", title: "", description: "" },
        { url: "", title: "", description: "" }
      ],
      aboutImage: "",
      residentialImages: [
        { url: "", service_name: "Panel Upgrades" },
        { url: "", service_name: "Safety Inspections" },
        { url: "", service_name: "Wiring & Rewiring" }
      ],
      commercialImages: [
        { url: "", service_name: "Commercial Installation" },
        { url: "", service_name: "Energy Management" },
        { url: "", service_name: "Electrical Maintenance" }
      ],
      industrialImages: [
        { url: "", service_name: "Industrial Power Systems" },
        { url: "", service_name: "Equipment Installation" },
        { url: "", service_name: "Safety Compliance" }
      ],
      socialMedia: {
        facebook: business?.social_media?.facebook || "",
        instagram: business?.social_media?.instagram || "",
        reviews_link: business?.social_media?.reviews_link || ""
      }
    }
  });

  async function onSubmit(data: any) {
    setIsDeploying(true);
    try {
      const response = await fetch('/api/deploy-site', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to deploy site');
      }

      const result = await response.json();
      alert(`Site deployed successfully! URL: ${result.url}`);
    } catch (error) {
      console.error('Deployment error:', error);
      alert('Failed to deploy site. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Site Customization</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList>
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="hero">Hero Images</TabsTrigger>
                  <TabsTrigger value="services">Service Images</TabsTrigger>
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                <TabsContent value="hero" className="space-y-4">
                  {form.watch('heroSlides').map((_, index) => (
                    <div key={index} className="space-y-4">
                      <h3>Hero Slide {index + 1}</h3>
                      <FormField
                        control={form.control}
                        name={`heroSlides.${index}.url`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="services" className="space-y-4">
                  <h3>Residential Service Images</h3>
                  {form.watch('residentialImages').map((_, index) => (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`residentialImages.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{form.watch(`residentialImages.${index}.service_name`)}</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="social" className="space-y-4">
                  <FormField
                    control={form.control}
                    name="socialMedia.facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="socialMedia.instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>

              <Button type="submit" disabled={isDeploying}>
                {isDeploying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isDeploying ? 'Deploying...' : 'Deploy Site'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
