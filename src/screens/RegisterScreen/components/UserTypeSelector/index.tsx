import React from "react";
import { SelectorContainer, Option, OptionText } from "./styles";

interface UserTypeSelectorProps {
  userType: "patient" | "doctor";
  setUserType: (type: "patient" | "doctor") => void;
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({
  userType,
  setUserType,
}) => {
  return (
    <SelectorContainer>
      <Option
        selected={userType === "patient"}
        onPress={() => setUserType("patient")}
      >
        <OptionText selected={userType === "patient"}>Paciente</OptionText>
      </Option>
      <Option
        selected={userType === "doctor"}
        onPress={() => setUserType("doctor")}
      >
        <OptionText selected={userType === "doctor"}>Médico</OptionText>
      </Option>
    </SelectorContainer>
  );
};

export default UserTypeSelector;