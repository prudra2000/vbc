"use client";
import { useState } from "react";
import Card from "../../../components/card";
import { ModeToggle } from "@/components/ui/themeToggle";
import { Input } from "@/components/ui/input";
import SocialSelect from "@/components/ui/SocialSelect";
import SocialInputs from "@/components/ui/SocialInputs";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

const EditorPage = () =>   {
  const { data: session } = useSession();
  const [name, setName] = useState("Name");
  const [email, setEmail] = useState("Email");
  const [location, setLocation] = useState("Toronto");
  const [selectedInputs, setSelectedInputs] = useState<string[]>([]);
  const [showUsername, setShowUsername] = useState<boolean>(true);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedInputs((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const [urls, setUrls] = useState<Record<string, string>>({
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    twitch: "",
    discord: "",
    snapchat: "",
    whatsapp: "",
    telegram: "",
    reddit: "",
    pinterest: "",
  });

  const handleSaveData = async () => {
    const cardData = {
      userId: session?.user?.id,
      name,
      email,
      location,
      urls,
      showUsername,
      selectedInputs,
    };
  console.log(JSON.stringify(cardData))
    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to save data');
      }
  
      const result = await response.json();
      console.log('Card saved:', result); // Handle success (e.g., show a message)
    } catch (error) {
      console.error('Error saving card:', error); // Handle error
    }
  };

  return (
    <main className="flex flex-col bg-white dark:bg-black gap-3 text-black dark:text-white">
      <ModeToggle />

      <div className="flex flex-col sm:flex-row gap-2 w-screen px-10 py-10">
        <div className="flex flex-col gap-2 w-full">
          <Card
            name={name}
            email={email}
            location={location}
            urls={urls}
            showUsername={showUsername}
            selectedInputs={selectedInputs}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          

          <h1 className="text-xl font-bold">Personal Info:</h1>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="flex flex-row items-center gap-2">
            <h1 className="text-xl font-bold whitespace-nowrap">Social Links:</h1>
            <SocialSelect
              selectedInputs={selectedInputs}
              handleSelectChange={handleSelectChange}
            />
            
          </div>
          {selectedInputs.length > 0 ? (
            <div className="flex flex-row justify-center items-center gap-2">
              <p>Show Username:</p>
              <Switch
                checked={showUsername}
                onCheckedChange={setShowUsername}
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-2 px-2">
            <SocialInputs
            selectedInputs={selectedInputs}
            urls={urls}
            setUrls={setUrls}
            setSelectedInputs={setSelectedInputs}
            />
          </div>
          <button onClick={handleSaveData} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Save Data
          </button>
        </div>
      </div>
    </main>
  );
}

export default EditorPage;