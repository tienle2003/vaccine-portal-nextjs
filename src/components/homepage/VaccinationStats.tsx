import { Divider, Stack, Typography } from "@mui/material";
import React, { ReactElement } from "react";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import VaccinesOutlinedIcon from "@mui/icons-material/VaccinesOutlined";

interface StatCardProps {
  icon: ReactElement;
  label: string;
  value: string;
  unit: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, unit }) => {
  return (
    <Stack direction="row" paddingX={2} className="w-full">
      {icon}
      <Stack>
        <Typography fontWeight="bold">{label}</Typography>
        <Typography fontSize={28} fontWeight="bold">
          {value} <span className="text-sm">({unit})</span>
        </Typography>
      </Stack>
    </Stack>
  );
};

const VaccinationStats: React.FC = () => {
  const stats: StatCardProps[] = [
    {
      label: "Đối tượng đăng ký tiêm",
      icon: <PersonAddAltIcon className="text-primary w-16 h-16 pr-4" />,
      unit: "lượt",
      value: "11,203,873",
    },
    {
      label: "Số mũi tiêm hôm qua",
      icon: <VaccinesOutlinedIcon className="text-primary w-16 h-16 pr-4" />,
      unit: "mũi",
      value: "1,762,119",
    },
    {
      label: "Số mũi đã tiêm toàn quốc",
      icon: <VerifiedUserIcon className="text-primary w-16 h-16 pr-4" />,
      unit: "mũi",
      value: "69,523,654",
    },
  ];
  return (
    <div className="bg-[#F7FBFE] px-9 py-4">
      <Stack
        direction="row"
        justifyContent="space-between"
        className="bg-white"
      >
        {stats.map((stat, index) => (
          <div key={index}>
            <StatCard
              label={stat.label}
              icon={stat.icon}
              unit={stat.unit}
              value={stat.value}
            />
            {index < stats.length - 1 && (
              <Divider orientation="vertical" flexItem />
            )}
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default VaccinationStats;
