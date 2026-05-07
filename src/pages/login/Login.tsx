import { Briefcase, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="h-screen flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white border border-border/70">
          <div className="flex flex-col items-center gap-3 pb-2 pt-8">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-secondary-foreground text-center">
                Job Tracker
              </h1>
              <p className="text-md text-muted-foreground mt-1 text-center">
                Welcome back! Sign in to continue
              </p>
            </div>
          </div>
          <div className="pt-6 pb-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="flex flex-col">
                  <label
                    className="pb-2 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter your email"
                    className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  />
                </div>
                <div className="h-5">
                  {errors.email && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <label
                    className="pb-2 flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                          message:
                            "Min 1 uppercase, 1 number, 1 special character",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="min-h-5">
                  {errors.password && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-md hover:bg-primary/90 transition-colors cursor-pointer mt-2"
              >
                {isLoading ? "Login account..." : "Login"}
              </button>
            </form>
            <div className="mt-6 text-center text-md text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:underline font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
