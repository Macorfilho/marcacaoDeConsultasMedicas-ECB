import React from "react";
import { RoleBadgeContainer, RoleText } from "./styles";

interface RoleBadgeProps {
  role: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ role }) => {
  return (
    <RoleBadgeContainer role={role}>
      <RoleText>{role}</RoleText>
    </RoleBadgeContainer>
  );
};

export default RoleBadge;
