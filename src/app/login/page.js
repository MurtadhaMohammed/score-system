"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  SelectItem,
  Select,
  Textarea,
} from "@nextui-org/react";
import { useAppStore } from "@/stores";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const PureForm = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFormValues({ email: "", password: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl: "/dashboard",
      });

      setLoading(false);

      router.push("/dashboard");

      if (!res?.error) {
        router.push("/dashboard");
      } else {
        setError("invalid email or password");
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="w-full flex justify-center">
        <div className="w-1/3 bg-gray-200 rounded-lg px-16 py-8">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-y-2">
              <Input
                type="email"
                name="email"
                id="email"
                label="Email"
                value={formValues.email}
                disabled={loading}
                onChange={(e) =>
                  setFormValues({ ...formValues, email: e.target.value })
                }
              />

              <Input
                type="password"
                name="password"
                id="password"
                label="Password"
                value={formValues.password}
                disabled={loading}
                onChange={(e) =>
                  setFormValues({ ...formValues, password: e.target.value })
                }
              />

              <Button
                color="primary"
                type="submit"
                disabled={loading}
                isLoading={loading}
              >
                Login
              </Button>
            </div>

            {error && <p className="text-red-500">{JSON.stringify(error)}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PureForm;
