import VaccinationChart from "@/components/homepage/VaccinationChart";
import VaccinationPointsTable from "@/components/homepage/VaccinationPointsTable";
import VaccinationStats from "@/components/homepage/VaccinationStats";
import { Stack } from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={4} paddingY={3}>
      <VaccinationStats />
      <VaccinationChart />
      <VaccinationPointsTable />
    </Stack>
  );
}
