"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps {
    label: string
    url: string
}

export const BackButton = ({ label, url }: BackButtonProps) => {
    return (
        <Button variant="link" className="w-full font-normal" size="sm" asChild>
            <Link href={url}>   
                {label}
            </Link>
        </Button>
    )
}