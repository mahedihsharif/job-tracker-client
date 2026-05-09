import { baseApi } from "@/redux/baseApi";
import {
  useGetMeQuery,
  useLogoutMutation,
} from "@/redux/features/auth/auth.api";
import { logout_user } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import type { IUser } from "@/types/auth.types";
import Avatar from "boring-avatars";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  if (isLoading) {
    return null;
  }
  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      dispatch(baseApi.util.resetApiState()); // cache clear
      dispatch(logout_user());
      navigate("/login", { replace: true });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          size={30}
          name="Mahedi"
          variant="beam"
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          {(data?.data as IUser)?.name?.trim().split(" ")?.[0] || "Profile"}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
