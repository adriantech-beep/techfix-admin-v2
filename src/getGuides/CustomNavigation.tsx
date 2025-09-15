import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Badge } from "@/components/ui/badge";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import type { GuideForm } from "@/guide/guideSchema";
import Menus from "@/components/Menus";

interface GuideListProps {
  guide: GuideForm;
}

const CustomNavigationMenu = ({ guide }: GuideListProps) => {
  const { id: guideId, deviceType, title, brand, model } = guide;
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-full flex gap-2">
            <span className="font-medium truncate">
              {brand || "Unknown Brand"}
            </span>

            <Badge variant="secondary" className="bg-blue-500 text-white">
              {model || "Unknown Model"}
            </Badge>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-64 p-2 rounded-md  shadow bg-background flex flex-col gap-2">
              <Menus>
                <Menus.Menu>
                  <Menus.Toggle id={guideId ?? ""} />
                  <Menus.List id={guideId ?? ""}>
                    <Menus.Button icon={<CiViewList />}>
                      View Details
                    </Menus.Button>
                    <Menus.Button icon={<CiEdit />}>Edit</Menus.Button>
                    <Menus.Button icon={<MdDeleteOutline />} danger>
                      Delete
                    </Menus.Button>
                  </Menus.List>
                </Menus.Menu>
              </Menus>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {deviceType || "Unknown Device Type"}
              </h3>

              <div className="flex flex-col gap-1">
                <span className="text-base font-medium truncate">
                  {brand || "Unknown Brand"}
                </span>
                <span className="text-sm text-muted-foreground truncate">
                  {model || "Unknown Model"}
                </span>
                <span className="text-sm text-muted-foreground">
                  {title || "Unknown Title"}
                </span>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CustomNavigationMenu;
