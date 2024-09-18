"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button } from "../ui/button"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"


export const Social = () => {
    return (
        <div className="flex flex-col w-full">
            <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
                <FontAwesomeIcon icon={faGoogle} />
            </Button>
        </div>
    )
}