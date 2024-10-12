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
import LocationInput from "./LocationInput";
import { Switch } from "../ui/switch";
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

  const [urls, setUrls] = useState<Record<string, string>>(
    formValues.socialMedia || {} // Ensure socialMedia is an object
  );

  const handleFormChange = (values: any) => {
    onFormChange({ ...values, urls });
    console.log("values", values);
  };

  const [selectedInputs, setSelectedInputs] = useState<string[]>(selected);
  const [countryCodes, setCountryCodes] = useState<
    { code: string; dialCode: string; flag: string; name: string }[]
  >([]);

  const primaryCountryCodes = ["US", "CA", "GB"];

  // Fetch country codes from an API
  useEffect(() => {
    const fetchCountryCodes = async () => {
      const response = await fetch(
        "https://gist.githubusercontent.com/DmytroLisitsyn/1c31186e5b66f1d6c52da6b5c70b12ad/raw/2bc71083a77106afec2ec37cf49d05ee54be1a22/country_dial_info.json"
      );
      const data = await response.json();
      const codes = data.map(
        (country: {
          code: string;
          dial_code: string;
          flag: string;
          name: string;
        }) => ({
          code: country.code,
          dialCode: country.dial_code,
          flag: country.flag,
          name: country.name,
        })
      );

      // Sort country codes to prioritize primary ones
      const sortedCodes = codes.sort(
        (a: { code: string }, b: { code: string }) => {
          const aIsPrimary = primaryCountryCodes.includes(a.code);
          const bIsPrimary = primaryCountryCodes.includes(b.code);
          return aIsPrimary === bIsPrimary ? 0 : aIsPrimary ? -1 : 1;
        }
      );

      setCountryCodes(sortedCodes);
    };
    fetchCountryCodes();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedInputs((prev) => {
      const newSelectedInputs = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      onSelectChange(newSelectedInputs);
      return newSelectedInputs;
    });
  };

  const removeInput = (social: string) => {
    setSelectedInputs((prev) => prev.filter((input) => input !== social));
    setUrls((prev) => {
      const newUrls = { ...prev };
      delete newUrls[social];
      return newUrls;
    });
  };
  useEffect(() => {
    setSelectedInputs(selected);
    setUrls(formValues.urls);
  }, [selected, formValues.urls]);

  return (
    <div className="flex flex-col h-max   text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50">
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
                      <div className="flex justify-center items-center gap-2">
                        <Input
                          {...field}
                          placeholder="Software Developer"
                          disabled={!field.value}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "Software Developer" : "");
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company:</FormLabel>
                    <FormControl>
                      <div className="flex justify-center items-center gap-2">
                        <Input
                          {...field}
                          placeholder="Company"
                          disabled={!field.value}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange("Company Name"); // Set to "Company Name" if enabled
                            } else {
                              field.onChange(""); // Set to blank if disabled
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
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
                      <div className="flex justify-center items-center gap-2">
                        <Input
                          {...field}
                          placeholder="email@example.com"
                          disabled={!field.value}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "email@example.com" : "");
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Country Code:</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Select
                          value={field.value ? field.value.split(" ")[0] : ""} // Set the value to the dial code
                          onValueChange={(value) => {
                            const dialCode = value; // Get the selected dial code
                            const phoneNumber = field.value
                              ? field.value.split(" ").slice(1).join(" ")
                              : ""; // Get the existing phone number
                            field.onChange(`${dialCode} ${phoneNumber}`); // Update the phone field with dial code and phone number
                          }}
                          disabled={!field.value}
                          required
                        >
                          <SelectTrigger className="w-min">
                            <SelectValue>
                              {field.value
                                ? countryCodes.find(
                                    (country) =>
                                      country.dialCode ===
                                      field.value?.split(" ")[0]
                                  )?.flag +
                                  " " +
                                  countryCodes.find(
                                    (country) =>
                                      country.dialCode ===
                                      field.value?.split(" ")[0]
                                  )?.dialCode
                                : "Select a country code"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem
                                key={country.code}
                                value={country.dialCode}
                              >
                                {country.flag} {country.name} (
                                {country.dialCode})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          {...field}
                          placeholder="Phone"
                          value={
                            field.value
                              ? field.value.split(" ").slice(1).join(" ")
                              : ""
                          } // Set the input value to the phone number part
                          onChange={(e) => {
                            const dialCode = field.value
                              ? field.value.split(" ")[0]
                              : ""; // Get the current dial code
                            field.onChange(`${dialCode} ${e.target.value}`); // Update the phone field with dial code and new phone number
                          }}
                          disabled={!field.value}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "1234567890" : "");
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} placeholder="New York, NY" />
                    </FormControl>
                    <FormMessage />
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
                      <Input {...field} placeholder="www.example.com" />
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
                        value={field.value} // Ensure the current value is set
                        onValueChange={field.onChange} // Update the form state on change
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="defaultLight">Default Light</SelectItem>
                          <SelectItem value="defaultDark">Default Dark</SelectItem>
                          <SelectItem value="glassLight">Glass Light</SelectItem>
                          <SelectItem value="glassDark">Glass Dark</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="showName"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className="flex justify-start items-center gap-2 text-sm">
                        Show Username:
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "email@example.com" : "");
                          }}
                        />
                      </div>
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
                removeInput={removeInput}
              />
              {children}
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default EditorForm;
