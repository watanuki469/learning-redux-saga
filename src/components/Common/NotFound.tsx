import * as React from "react"
import { Redirect } from "react-router-dom"

export interface NotFoundProps {

}

export function NotFound(props: NotFoundProps) {
    return (
        <div>
            
            <Redirect to="/login" />
        </div>
    )
}