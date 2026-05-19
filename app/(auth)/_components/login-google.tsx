"use client";

import React, { useTransition } from "react";

const LoginGoogle = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin = () => {
    startTransition(async () => {
      // await signInWithGithub();
    });
  };

  return (
    <div
      onClick={handleGithubLogin}
      className="w-full gap-4 hover:cursor-pointer mt-6 h-12 rounded-2xl p-4 flex justify-center items-center"
    >
      <p className="text-sm text-[#013E7E] font-bold">
        {isPending ? "Redirecting..." : "Đăng nhập Google"}
      </p>
    </div>
  );
};

export default LoginGoogle;
