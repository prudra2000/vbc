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
import { DigimedCardSchema } from "@/schemas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faSpotify,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select";
import { Switch } from "../ui/switch";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import { CardData, CardConfig } from "@/types/cardTypes";
import Avatar from "../avatar";
interface EditorForm {
  isOpen?: boolean;
  onClose?: () => void;
  formValues: {
    cardStyle: string;
    cardData: CardData;
    cardConfig: CardConfig;
  };
  onFormChange: (newValues: {
    cardStyle: string;
    cardData: CardData;
    cardConfig: CardConfig;
  }) => void;
  selected: string[];
  onSelectChange: (selectedInputs: string[]) => void;
  children: React.ReactElement;
}

type DigimedCardValues = z.infer<typeof DigimedCardSchema>;

const EditorForm: React.FC<EditorForm> = ({
  isOpen = true,
  formValues,
  onFormChange,
  selected,
  children,
}) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof DigimedCardSchema>>({
    resolver: zodResolver(DigimedCardSchema),
    defaultValues: formValues,
  });

  useEffect(() => {
    form.reset(formValues);
  }, [formValues]);

  const defaultSocialMedia: CardData["socialMedia"] = {
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    twitch: "",
    discord: "",
    spotify: "",
  };

  const [urls, setUrls] = useState<Record<string, string>>({
    ...defaultSocialMedia,
    ...formValues.cardData.socialMedia,
  });

  const handleFormChange = (values: DigimedCardValues) => {
    onFormChange({
      cardStyle: values.cardStyle || "",
      cardData: {
        name: values.cardData.name || "",
        image: values.cardData.image || "",
        tagline: values.cardData.tagline || "",
        company: values.cardData.company || "",
        email: values.cardData.email || "",
        phone: values.cardData.phone || "",
        location: values.cardData.location || "",
        website: values.cardData.website || "",
        socialMedia: {
          github: values.cardData.socialMedia?.github || "",
          linkedin: values.cardData.socialMedia?.linkedin || "",
          twitter: values.cardData.socialMedia?.twitter || "",
          instagram: values.cardData.socialMedia?.instagram || "",
          facebook: values.cardData.socialMedia?.facebook || "",
          tiktok: values.cardData.socialMedia?.tiktok || "",
          youtube: values.cardData.socialMedia?.youtube || "",
          twitch: values.cardData.socialMedia?.twitch || "",
          discord: values.cardData.socialMedia?.discord || "",
          spotify: values.cardData.socialMedia?.spotify || "",
        },
      },
      cardConfig: formValues.cardConfig,
    });
  };

  //const [selectedInputs, setSelectedInputs] = useState<string[]>(selected);
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

  useEffect(() => {
    //setSelectedInputs(selected);
    setUrls(formValues.cardData.socialMedia || {});
  }, [selected, formValues.cardData.socialMedia]);

  const isEmpty =
    session?.user?.authenticatedSocials?.linkedin?.linkedinId === undefined &&
    session?.user?.authenticatedSocials?.github?.githubId === undefined &&
    session?.user?.authenticatedSocials?.twitter?.twitterId === undefined;
  if (!isOpen) return null;
  return (
    <div className="flex flex-col h-max   text-neutral-950 dark:border-neutral-800  dark:text-neutral-50">
      <div className="flex flex-col gap-2 p-4">
        <section title="form">
          <Form {...form}>
            <form
              className="space-y-4"
              onChange={() => handleFormChange(form.getValues())}
            >
              <FormField
                control={form.control}
                name="cardData.name"
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
                name="cardData.tagline"
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
                name="cardData.company"
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
                name="cardData.email"
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
                name="cardData.phone"
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
                                key={`${country.code}-${country.dialCode}`}
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
                          value={
                            field.value
                              ? field.value.split(" ").slice(1).join(" ")
                              : ""
                          }
                          onChange={(e) => {
                            const dialCode = field.value
                              ? field.value.split(" ")[0]
                              : ""; // Get the current dial code
                            field.onChange(`${dialCode} ${e.target.value}`);
                          }}
                          placeholder="555-555-5555"
                          disabled={!field.value}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "555-555-5555" : "");
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
                name="cardData.location"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Location:</FormLabel>
                    <FormControl>
                      <div className="flex justify-center items-center gap-2">
                        <Input
                          {...field}
                          placeholder="New York, NY"
                          disabled={!field.value}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "New York, NY" : "");
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
                name="cardData.website"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Website:</FormLabel>
                    <FormControl>
                      <div className="flex justify-center items-center gap-2">
                        <Input
                          {...field}
                          placeholder="www.example.com"
                          disabled={!field.value}
                        />
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "www.example.com" : "");
                          }}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="cardData.image"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Image:</FormLabel>
                    <FormControl>
                      <div className="flex justify-center items-center gap-2">
                        <div className="flex w-full justify-center items-center gap-2 border border-neutral-200 rounded-md p-2">
                          <Avatar
                            src={session?.user?.image || ""}
                            alt={formValues.cardData.name}
                            variant="secondary"
                            size="xxxxl"
                            className="rounded-full border-2 border-neutral-300 shadow-md "
                          />
                        </div>
                        <Switch
                          checked={!!field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(
                              checked ? session?.user?.image || "" : ""
                            );
                          }}
                        />
                      </div>
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
                          <SelectItem value="defaultLight">
                            Default Light
                          </SelectItem>
                          <SelectItem value="defaultDark">
                            Default Dark
                          </SelectItem>
                          <SelectItem value="glassLight">
                            Glass Light
                          </SelectItem>
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
                name="cardData.socialMedia"
                /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>
                      <div className="flex items-center justify-between">
                        <p>Social Media:</p>
                        <Link href="/settings">
                          <Button variant="outline" className="gap-2">
                            Link Accounts
                            <CirclePlus className="w-5 h-5" />
                          </Button>
                        </Link>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        {isEmpty && (
                          <div className="flex flex-col w-full gap-1">
                            <div className="flex items-center justify-center gap-10 p-5">
                              <FontAwesomeIcon
                                icon={faLinkedin}
                                className="w-6 h-6 text-neutral-500"
                              />
                              <FontAwesomeIcon
                                icon={faGithub}
                                className="w-6 h-6 text-neutral-500"
                              />
                              <FontAwesomeIcon
                                icon={faTwitter}
                                className="w-6 h-6 text-neutral-500"
                              />
                            </div>
                            <p>No Accounts Linked</p>
                            <Button variant="outline" className="gap-2 w-full">
                              Link Accounts
                              <CirclePlus className="w-5 h-5" />
                            </Button>
                          </div>
                        )}
                        {session?.user?.authenticatedSocials?.github
                          ?.githubId !== undefined && (
                          <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`https://github.com/${
                                  session?.user?.authenticatedSocials?.github
                                    ?.githubUsername || ""
                                }`}
                                target="_blank"
                              >
                                <Button variant="link" className="p-0 gap-2">
                                  <FontAwesomeIcon
                                    icon={faGithub}
                                    className="w-6 h-6"
                                  />
                                  <p>
                                    {
                                      session?.user?.authenticatedSocials
                                        ?.github?.githubUsername
                                    }
                                  </p>
                                </Button>
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <FormField
                                control={form.control}
                                name="cardData.socialMedia.github"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Switch
                                        checked={!!field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(
                                            checked
                                              ? session?.user
                                                  ?.authenticatedSocials?.github
                                                  ?.githubUsername
                                              : ""
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              ></FormField>
                            </div>
                          </div>
                        )}
                        {session?.user?.authenticatedSocials?.linkedin
                          ?.linkedinId !== undefined && (
                          <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`https://linkedin.com/in/${
                                  session?.user?.authenticatedSocials?.linkedin
                                    ?.linkedinUsername || ""
                                }`}
                                target="_blank"
                              >
                                <Button variant="link" className="p-0 gap-2">
                                  <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className="w-6 h-6"
                                  />
                                  <div className="flex items-center gap-2">
                                    {
                                      session?.user?.authenticatedSocials
                                        ?.linkedin?.linkedinUsername
                                    }
                                  </div>
                                </Button>
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <FormField
                                control={form.control}
                                name="cardData.socialMedia.linkedin"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Switch
                                        checked={!!field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(
                                            checked
                                              ? session?.user
                                                  ?.authenticatedSocials
                                                  ?.linkedin?.linkedinUsername
                                              : ""
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              ></FormField>
                            </div>
                          </div>
                        )}
                        {session?.user?.authenticatedSocials?.twitter
                          ?.twitterId !== undefined && (
                          <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`https://twitter.com/${
                                  session?.user?.authenticatedSocials?.twitter
                                    ?.twitterUsername || ""
                                }`}
                                target="_blank"
                              >
                                <Button variant="link" className="p-0 gap-2">
                                  <FontAwesomeIcon
                                    icon={faTwitter}
                                    className="w-6 h-6"
                                  />
                                  {
                                    session?.user?.authenticatedSocials?.twitter
                                      ?.twitterUsername
                                  }
                                </Button>
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <FormField
                                control={form.control}
                                name="cardData.socialMedia.twitter"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Switch
                                        checked={!!field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(
                                            checked
                                              ? session?.user
                                                  ?.authenticatedSocials
                                                  ?.twitter?.twitterUsername
                                              : ""
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              ></FormField>
                            </div>
                          </div>
                        )}
                        {session?.user?.authenticatedSocials?.spotify
                          ?.spotifyId !== undefined && (
                          <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`https://twitter.com/${
                                  session?.user?.authenticatedSocials?.spotify
                                    ?.spotifyUsername || ""
                                }`}
                                target="_blank"
                              >
                                <Button variant="link" className="p-0 gap-2">
                                  <FontAwesomeIcon
                                    icon={faSpotify}
                                    className="w-6 h-6"
                                  />
                                  {
                                    session?.user?.authenticatedSocials?.spotify
                                      ?.spotifyUsername
                                  }
                                </Button>
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <FormField
                                control={form.control}
                                name="cardData.socialMedia.spotify"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Switch
                                        checked={!!field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(
                                            checked
                                              ? session?.user
                                                  ?.authenticatedSocials
                                                  ?.spotify?.spotifyUsername
                                              : ""
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              ></FormField>
                            </div>
                          </div>
                        )}
                        {session?.user?.authenticatedSocials?.twitch
                          ?.twitchId !== undefined && (
                          <div className="flex flex-row items-center justify-between gap-2 border border-neutral-300 rounded-md p-2">
                            <div className="flex items-center justify-center gap-2">
                              <Link
                                href={`https://twitter.com/${
                                  session?.user?.authenticatedSocials?.twitch
                                    ?.twitchUsername || ""
                                }`}
                                target="_blank"
                              >
                                <Button variant="link" className="p-0 gap-2">
                                  <FontAwesomeIcon
                                    icon={faTwitch}
                                    className="w-6 h-6"
                                  />
                                  {
                                    session?.user?.authenticatedSocials?.twitch
                                      ?.twitchUsername
                                  }
                                </Button>
                              </Link>
                            </div>
                            <div className="flex items-center">
                              <FormField
                                control={form.control}
                                name="cardData.socialMedia.twitch"
                                render={({ field }) => (
                                  <FormItem className="">
                                    <FormControl>
                                      <Switch
                                        checked={!!field.value}
                                        onCheckedChange={(checked) => {
                                          field.onChange(
                                            checked
                                              ? session?.user
                                                  ?.authenticatedSocials?.twitch
                                                  ?.twitchUsername
                                              : ""
                                          );
                                        }}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              ></FormField>
                            </div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="cardConfig.showSocialUsername"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              {children}
            </form>
          </Form>
        </section>
      </div>
    </div>
  );
};

export default EditorForm;
