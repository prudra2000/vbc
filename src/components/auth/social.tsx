"use client"
import { signIn } from "next-auth/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../ui/button"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import {
    DEFAUL_LOGIN_REDIRECT,
  } from "@/routes";

export const Social = () => {
    const onClick = ( provider: "google" ) => {
        signIn(provider, {
            callbackUrl: DEFAUL_LOGIN_REDIRECT,
        })
        
    }
    return (
        <div className="flex flex-col w-full">
            <Button size="lg" className="w-full" variant="outline" onClick={() => {onClick("google")}}>
                <FontAwesomeIcon icon={faGoogle} />
            </Button>
        </div>
    )
}