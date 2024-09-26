import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { EditorSchema } from "@/schemas";
import SocialInputs from "../ui/SocialInputs";
import SocialSelect from "../ui/SocialSelect";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select";
interface EditorForm {
  isOpen?: boolean;
  onClose?: () => void;
  formValues: any;
  onFormChange: (newValues: any) => void;
  selected: string[];
  onSelectChange: (selectedInputs: string[]) => void;
  children: React.ReactElement;
}

const EditorForm: React.FC<EditorForm> = ({
  isOpen = true,
  onClose,
  formValues,
  onFormChange,
  selected,
  children,
  onSelectChange = () => {},
}) => {
  if (!isOpen) return null;

  const form = useForm<z.infer<typeof EditorSchema>>({
    resolver: zodResolver(EditorSchema),
    defaultValues: formValues,
  });

  useEffect(() => {
    form.reset(formValues);
  }, [formValues]);

  const [urls, setUrls] = useState<Record<string, string>>(formValues.socialMedia?.urls || {});

  const handleFormChange = (values: any) => {
    onFormChange({ ...values, urls });
    console.log("t", values);
  };

  const [selectedInputs, setSelectedInputs] = useState<string[]>(selected);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedInputs((prev) => {
      const newSelectedInputs = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      onSelectChange(newSelectedInputs); // Call onSelectChange here
      return newSelectedInputs; // Return the new state
    });
  };

  useEffect(() => {
    setSelectedInputs(selected);
    setUrls(formValues.urls);
  }, [selected, formValues.urls]);

  return (
    <div className="">
      <div className="flex flex-col h-max border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
        <div className="flex flex-col gap-2 p-4">
          <section title="form">
            <Form {...form}>
              <form
                className="space-y-4"
                onChange={() => handleFormChange(form.getValues())}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Name:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Jane Doe" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Tagline:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Software Developer" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Company:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Company" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Email:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Phone:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Phone" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Location:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Location" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Website:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Website" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Image:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Image" />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
                <FormField
                control={form.control}
                name="cardStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Style</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="secondary">Secondary</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="danger">Danger</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <SocialSelect
                  selectedInputs={selectedInputs}
                  handleSelectChange={handleSelectChange}
                />
                <SocialInputs
                  selectedInputs={selectedInputs}
                  urls={urls}
                  setUrls={setUrls}
                  setSelectedInputs={setSelectedInputs}
                />
                {children}
              </form>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditorForm;
