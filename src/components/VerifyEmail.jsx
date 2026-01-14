import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const status = params.get("status");

  useEffect(() => {
    if (status === "success") toast.success("Email verified. You can log in now.");
    else if (status === "already") toast.info("Email already verified.");
    else if (status === "invalid") toast.error("Verification link is invalid or expired.");
  }, [status]);

  return <div>Processing verification...</div>;
}
