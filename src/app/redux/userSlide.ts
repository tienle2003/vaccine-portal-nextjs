import { Gender } from "@/types/gender";
import { Role } from "@/types/role";
import { User } from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  dob: "",
  gender: Gender.MALE,
  email: "",
  healthInsuranceNumber: "",
  idCardNumber: "",
  role: Role.USER,
  province: { id: "", name: "" },
  district: { id: "", name: "", provinceId: "" },
  ward: { id: "", name: "", districtId: "" },
};

const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      const {
        id,
        dob,
        email,
        gender,
        healthInsuranceNumber,
        idCardNumber,
        name,
        role,
        province,
        district,
        ward,
      } = action.payload;
      state.id = id;
      state.dob = dob;
      state.email = email;
      state.gender = gender;
      state.healthInsuranceNumber = healthInsuranceNumber;
      state.idCardNumber = idCardNumber;
      state.name = name;
      state.role = role;
      state.province = province;
      state.district = district;
      state.ward = ward;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlide.actions;

export default userSlide.reducer;
