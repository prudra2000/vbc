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

interface EditorForm {
  isOpen?: boolean;
  onClose?: () => void;
  formValues: any;
  onFormChange: (newValues: any) => void;
  selected: string[];
  onSelectChange: (selectedInputs: string[]) => void;
}

const EditorForm: React.FC<EditorForm> = ({
  isOpen = true,
  onClose,
  formValues,
  onFormChange,
  selected,
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

  const [urls, setUrls] = useState<Record<string, string>>(formValues.urls);

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
      <div className="rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
        <div className="flex flex-col gap-2 p-4">
          <section title="header">
            <h1 className="text-lg font-bold">Header</h1>
          </section>
          <section title="form">
            <Form {...form}>
              <form
                className="space-y-4"
                onChange={() => handleFormChange(form.getValues())}
              >
                <FormField
                  control={form.control}
                  name="title"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Description:</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Software Developer" />
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
                        <Input
                          {...field}
                          placeholder="Software Developer"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>
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
              </form>
            </Form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditorForm;