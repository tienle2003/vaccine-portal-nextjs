"use client";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/TextInput";

import { loginSchema } from "@/schemas";
import OverlayLoading from "@/components/OverlayLoading";
import { RootState, useAppDispatch, useAppSelector } from "@/app/redux/store";
import { login } from "@/app/redux/authSlide";
import { useLoginMutation } from "@/api/auth.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { handleRequestError } from "@/utils/errorHandler";

export type LoginFormData = z.infer<typeof loginSchema>;

const defaultValues = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, userId } = useAppSelector(
    (state: RootState) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated && userId) {
      router.push("/");
    }
  }, [router, isAuthenticated, userId]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync, isPending } = useLoginMutation();
  const onSubmit: SubmitHandler<LoginFormData> = async (payload) => {
    try {
      const {
        data: { access_token, refresh_token },
        message,
      } = await mutateAsync(payload);
      const decoded = jwtDecode<{ id: string | number }>(access_token);
      dispatch(
        login({
          accessToken: access_token,
          refreshToken: refresh_token,
          userId: decoded.id,
        })
      );
      toast.success(message);
      router.push("/");
    } catch (error) {
      handleRequestError(error);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {isPending && <OverlayLoading message="loading" />}

      <div className="m-36">
        <Typography
          variant="h4"
          fontWeight="700"
          align="center"
          marginBottom={"1.5rem"}
          sx={{
            lineHeight: "42px",
          }}
        >
          Đăng nhập vào tài khoản
        </Typography>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            name="email"
            control={control}
            label="Email"
            errMsg={errors.email?.message}
            isError={!!errors.email}
          />
          <TextInput
            name="password"
            control={control}
            label="Password"
            type="password"
            errMsg={errors.password?.message}
            isError={!!errors.password}
          />
          <p className="text-blue-500 hover:underline w-fit ml-auto">
            <Link href="/forgot-password">Quên mật khẩu?</Link>
          </p>

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            disabled={isSubmitting || !isValid}
            sx={{ fontSize: "18px", fontWeight: "bold" }}
          >
            Đăng Nhập
          </Button>
          {errors.root && (
            <Typography align="center" color="error">
              {errors.root.message}
            </Typography>
          )}
          <p className="text-center text-lg">
            Hoặc đăng ký tài khoản, nếu bạn chưa đăng ký!
          </p>
          <Button
            onClick={() => router.push("register")}
            variant="outlined"
            color="success"
            fullWidth
            sx={{ marginTop: "100px", fontSize: "18px", fontWeight: "bold" }}
          >
            Đăng ký
          </Button>
        </form>
      </div>
    </Box>
  );
}
