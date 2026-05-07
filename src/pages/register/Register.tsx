import { Briefcase } from "lucide-react";

const Register = () => {
  return (
    <div>
      <div className="h-screen flex items-center justify-center">
        <div>
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <h1>Job Tracker</h1>
          <p>Create an account to get started</p>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Register;
