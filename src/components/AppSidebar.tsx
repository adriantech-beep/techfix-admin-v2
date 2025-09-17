import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sidebar, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import GetGuides from "@/getGuides/GetGuides";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AppSidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  return (
    <Sidebar className="mt-4 px-2">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search"
          className="pl-8 pr-16 rounded-full focus:bg-gray-100 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none font-sans text-muted-foreground"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        className="rounded-xl mt-2"
        onClick={() => navigate("/homepage")}
      >
        <CirclePlus /> <span>Add new guide</span>
      </Button>

      <SidebarGroupLabel>Guides</SidebarGroupLabel>

      <GetGuides search={search} />
    </Sidebar>
  );
};

export default AppSidebar;
