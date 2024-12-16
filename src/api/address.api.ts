import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axios";
import { ResponseData } from "@/types/response";
import { District, Province, Ward } from "@/types/address";
import { useMemo } from "react";

const getProvinces = async () => {
  const response = await axiosInstance.get("/provinces");
  return response.data;
};

const getDistricts = async (provinceId: string | number) => {
  const response = await axiosInstance.get(
    `/provinces/${provinceId}/districts`
  );
  return response.data;
};

const getWards = async (districtId: string | number) => {
  const response = await axiosInstance.get(`/districts/${districtId}/wards`);
  return response.data;
};

const useAddress = (
  provinceId?: string | number,
  districtId?: string | number
) => {
  const useProvinces = useQuery<ResponseData<Province[]>>({
    queryKey: ["provinces"],
    queryFn: getProvinces,
  });

  const useDistricts = useQuery<ResponseData<District[]>>({
    queryKey: ["districts", provinceId],
    queryFn: () => getDistricts(provinceId!),
    enabled: !!provinceId,
  });

  const useWards = useQuery<ResponseData<Ward[]>>({
    queryKey: ["wards", districtId],
    queryFn: () => getWards(districtId!),
    enabled: !!districtId,
  });

  const provinces = useMemo(
    () => useProvinces.data?.data || [],
    [useProvinces.data]
  );
  const districts = useMemo(
    () => useDistricts.data?.data || [],
    [useDistricts.data]
  );
  const wards = useMemo(() => useWards.data?.data || [], [useWards.data]);

  return { provinces, districts, wards };
};

export default useAddress;
