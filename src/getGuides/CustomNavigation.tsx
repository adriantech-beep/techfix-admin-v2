import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

import { Badge } from "@/components/ui/badge";
import { CiEdit, CiViewList } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import type { GuideForm } from "@/guide/guideSchema";
import Menus from "@/components/Menus";
import { useDeleteGuide } from "./useDeleteGuide";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface GuideListProps {
  guide: GuideForm;
}

const CustomNavigationMenu = ({ guide }: GuideListProps) => {
  const { mutate: deleteGuide } = useDeleteGuide();
  const { id: guideId, deviceType, title, brand, model } = guide;
  const navigate = useNavigate();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="font-medium truncate">
              {brand || "Unknown Brand"}
            </span>

            <Badge variant="secondary" className="bg-blue-500 text-white">
              {model || "Unknown Model"}
            </Badge>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-64 p-2 rounded-md shadow bg-background flex flex-col gap-2">
              <Menus>
                <Menus.Menu>
                  <Menus.Toggle id={guideId ?? ""} />
                  <Menus.List id={guideId ?? ""}>
                    <Menus.Button
                      icon={<CiViewList />}
                      onClick={() =>
                        navigate("/view-guide", { state: { guide } })
                      }
                    >
                      View Details
                    </Menus.Button>
                    <Menus.Button icon={<CiEdit />}>Edit</Menus.Button>

                    {/* Wrap Delete in AlertDialog */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Menus.Button icon={<MdDeleteOutline />} danger>
                          Delete
                        </Menus.Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete{" "}
                            <span className="font-semibold">{title}</span> from
                            your guides.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteGuide(guideId ?? "")}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
