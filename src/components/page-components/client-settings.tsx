"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import Avatar from "../avatar";
import { GridLoader } from "react-spinners";
import UploadProfilePicModal from "../settings/uploadProfilePicModal";

const ClientSettings = () => {
  const { data: session, status } = useSession();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  if (status === "loading") {
    return (
      <div className="flex flex-col justify-center items-center h-max pt-[30vh] gap-4">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading....</h1>
      </div>
    );
  }

  if (!session) {
    return <div>You need to be authenticated to view this page.</div>;
  }

  return (
    
    <div className=" h-max pt-8 bg-gray-100">
      <div className="flex flex-col gap-4 bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-black">Your Account:</h1>
        <hr />
        <div className=" flex flex-col gap-4 text-black">
          <div className="flex flex-col justify-between items-center gap-2">
            <Avatar
              alt={session?.user?.name ?? ""}
              src={session?.user?.image ?? ""}
              size="large"
              className="w-24 h-24"
            />
            <Button variant="outline" onClick={() => setIsUploadModalOpen(true)}>Upload Image</Button>
            <UploadProfilePicModal 
                isOpen={isUploadModalOpen} 
                onClose={() => setIsUploadModalOpen(false)} 
                onSubmit={async () => { 
                    // Your submit logic here
                    return; // Ensure it returns a Promise
                }} 
                cardID={""} 
            />
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <p>
              <strong>Name:</strong> {session?.user?.name}
            </p>
            <Button variant="outline">Edit</Button>
          </div>
          <hr />
          <div className="flex flex-row justify-between items-center">
            <p>
              <strong>Email:</strong> {session?.user?.email}
            </p>
            <Button variant="outline">Edit</Button>
          </div>
          <hr />
          <h1 className="text-xl font-bold">Socials:</h1>
          <div className="flex flex-row justify-between items-center">
            <p>
              <strong>LinkedIn:</strong>
            </p>
            <Button variant="outline">Link</Button>
          </div>
          

          {/* <div className="flex flex-row justify-between items-center">
            <Button variant="outline">Change Password</Button>
          </div>
          <div className="flex flex-row gap-2 border border-1 border-gray-300 rounded-lg p-2 items-center">
            <div className="w-14 h-14 rounded-full flex justify-center items-center">
              <FontAwesomeIcon icon={faGoogle} className="w-8 h-8" />
            </div>
            <div className="flex flex-col text-sm">
              <p>Google</p>
              <p className="text-gray-700">Connected</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;
