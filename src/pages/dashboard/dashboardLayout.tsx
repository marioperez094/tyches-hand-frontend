// External Imports
import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router";

// Components
import HoverButtons from "../../components/menuComponents/hoverButtons/hoverButtons";
import MenuHeaders from "../../components/headers/menuHeaders/menuHeaders";
import StandardButton from "../../components/menuComponents/buttons/standardButton";
import LinkButton from "../../components/menuComponents/buttons/linkButton";

interface LinkItem {
  name: string;
  link?: string;
  action?: () => void;
}

interface DashboardLayoutProps {
  links: {
    [key: string]: {
      name: string;
      component: ReactNode;
    };
  };
  logout: () => void;
  children: ReactNode;
}

export default function DashboardLayout({ links, logout, children }: DashboardLayoutProps) {
  const currentLocation: string = useLocation().pathname; // Retrieves current dashboard location

  //Retrieves the name of the current directory for the header
  const title: string = useMemo(() => links[currentLocation]?.name || "Player Dashboard", [currentLocation, links[currentLocation]?.name]);

  //Dynamic buttons based on current location
  const buttons: LinkItem[] = useMemo(() => {
    const filteredButtons = Object.entries(links)
      .filter(([path]) => path !== currentLocation)
      .map(([path, values]) => ({
        name: values.name,
        link: path,
      }));

    return [
      { name: "Play" },
      ...filteredButtons,
      { name: "Log Out", action: logout },
    ];
  }, [currentLocation, links, logout]);

  console.log("render DashboardLayout");

  return (
    <>
      { /* Mobile navigation */ }
      <div className="md:hidden">
        <HoverButtons buttonOptions={ buttons } />
      </div>

      {/* Large screen navigation */}
      <div className="mx-5 mt-5 flex justify-between items-end">
        <MenuHeaders>{title}</MenuHeaders>

        <div className="hidden md:inline header-buttons">
          <LinkButtons buttonOptions={ buttons } />
        </div>
      </div>

      {/* Content */}
      <main className="h-full mx-3 mb-5 overflow-y-scroll overflow-x-hidden border-4">{children}</main>
    </>
  );
}

interface LinkButtonsProps {
  buttonOptions: LinkItem[];
}

function LinkButtons({ buttonOptions }: LinkButtonsProps) {
  return (
    <>
      {buttonOptions.map((button, index) =>
        button.link ? (
          <LinkButton key={ index } link={ button.link }>
            { button.name }
          </LinkButton>
        ) : (
          <StandardButton key={ index } action={ button.action }>
            { button.name }
          </StandardButton>
        )
      )}
    </>
  );
}
