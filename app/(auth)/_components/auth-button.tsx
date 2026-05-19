import { Button } from "@/components/ui/button";
import React from "react";

const AuthButton = ({
    type,
    loading,
}: {
    type: "Đăng nhập" | "Sign up" | "Reset Password" | "Forgot Password";
    loading: boolean;
}) => {
    return (
        <Button
            disabled={loading}
            type="submit"
            className={`${
                loading ? "bg-gray-600" : "bg-blue-600"
            } rounded-2xl w-full px-12 py-3 mt-6 h-12 text-lg font-medium text-white`}
        >
            {loading ? "Loading..." : type}
        </Button>
    );
};

export default AuthButton;
