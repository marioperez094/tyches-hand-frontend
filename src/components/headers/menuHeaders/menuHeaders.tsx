//External Imports
import { ReactNode } from "react"

//Stylesheets
import "./menuHeaders.scss"

export default function MenuHeaders({ children } : { children: ReactNode }) {

  console.log("render MenuHeaders")

  return(
    <header className="text-md md:text-3xl flex items-center header-container border-l-4 border-t-4 textured-gray-border">
      <h1 className="ml-3 mr-16 py-5">{ children }</h1>
    </header>
  )
};