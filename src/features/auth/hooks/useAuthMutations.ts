"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  verifyResetOtpAction,
  resetPasswordAction,
  googleRedirectAction,
  logoutAction,
} from "@/actions/auth.actions";

import { authQueryKeys } from "@/features/auth/constants/auth.query-keys";

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginAction,

    onSuccess: (result) => {
      if (result.success) {
        queryClient.removeQueries({
          queryKey: authQueryKeys.currentUser,
        });
      }
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerAction,

    onSuccess: (result) => {
      if (result.success) {
        queryClient.removeQueries({
          queryKey: authQueryKeys.currentUser,
        });
      }
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: forgotPasswordAction,
  });
}

export function useVerifyResetOtpMutation() {
  return useMutation({
    mutationFn: verifyResetOtpAction,
  });
}

export function useResetPasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetPasswordAction,

    onSuccess: (result) => {
      if (result.success) {
        queryClient.removeQueries({
          queryKey: authQueryKeys.currentUser,
        });
      }
    },
  });
}

export function useGoogleRedirectMutation() {
  return useMutation({
    mutationFn: googleRedirectAction,
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutAction,

    onSettled: () => {
      queryClient.removeQueries({
        queryKey: authQueryKeys.currentUser,
      });
    },
  });
}
