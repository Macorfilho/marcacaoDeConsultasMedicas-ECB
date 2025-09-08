import React from "react";
import styled from "styled-components/native";
import { ViewStyle, TouchableOpacity, Image } from "react-native";
import theme from "../../../styles/theme";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface DoctorListProps {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  selectedDoctorId?: string;
  style?: ViewStyle;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onSelectDoctor,
  selectedDoctorId,
  style,
}) => {
  return (
    <Container style={style}>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          onPress={() => onSelectDoctor(doctor)}
          isSelected={selectedDoctorId === doctor.id}
        >
          <DoctorImage source={{ uri: doctor.image }} />
          <DoctorInfo>
            <DoctorName>{doctor.name}</DoctorName>
            <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
          </DoctorInfo>
          <ChevronIcon isSelected={selectedDoctorId === doctor.id}>
            ›
          </ChevronIcon>
        </DoctorCard>
      ))}
    </Container>
  );
};

const Container = styled.View`
  margin-bottom: 15px;
`;

const DoctorCard = styled(TouchableOpacity)<{ isSelected: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  margin-vertical: 4px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isSelected ? theme.colors.primary + "20" : theme.colors.background};
  border-width: 1px;
  border-color: ${(props) =>
    props.isSelected ? theme.colors.primary : theme.colors.border};
`;

const DoctorImage = styled(Image)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${theme.colors.primary};
`;

const DoctorInfo = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const DoctorName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

const DoctorSpecialty = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  opacity: 0.7;
`;

const ChevronIcon = styled.Text<{ isSelected: boolean }>`
  font-size: 24px;
  color: ${(props) =>
    props.isSelected ? theme.colors.primary : theme.colors.text};
  opacity: 0.5;
`;

export default DoctorList;
