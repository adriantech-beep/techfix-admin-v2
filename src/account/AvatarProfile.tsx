import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetActiveUser } from "./useGetActiveUser";

const AvatarProfile = () => {
  const { data } = useGetActiveUser();
  const { avatar, email } = data ?? {};
  return (
    <>
      <Avatar>
        <AvatarImage src={avatar} alt={email || "Avatar image"} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{email}</p>
    </>
  );
};

export default AvatarProfile;
