import React from "react";
import {
  ProfileCardContainer,
  Avatar,
  Name,
  Email,
  SpecialtyText,
} from "./styles";
import RoleBadge from "../RoleBadge";
import { getRoleText } from "../../utils/userHelpers";
import { User } from "../../../../types/auth";

interface ProfileCardProps {
  user: User | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <ProfileCardContainer>
      <Avatar source={{ uri: user.image || "https://via.placeholder.com/150" }} />
      <Name>{user.name}</Name>
      <Email>{user.email}</Email>
      <RoleBadge role={getRoleText(user.role || "")} />
      {user.role === "doctor" && (
        <SpecialtyText>Especialidade: {user.specialty}</SpecialtyText>
      )}
    </ProfileCardContainer>
  );
};

export default ProfileCard;
