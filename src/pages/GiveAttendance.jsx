import { Helmet } from "react-helmet-async";
import GiveAttendance from "../components/GiveAttendance";

const GiveAttendancePage = () => {
  return (
    <>
      <Helmet>
        <title>Give Attendance | Student Portal</title>
      </Helmet>
      
      <div className="space-y-5">
        <div className="flex flex-col space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Give Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Mark your presence in class by verifying your identity
          </p>
        </div>
        
        <GiveAttendance />
      </div>
    </>
  );
};

export default GiveAttendancePage;