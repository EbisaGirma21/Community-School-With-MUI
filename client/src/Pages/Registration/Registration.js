import Dropdown from "../../components/UI/Dropdown";
import { Box, Grid, Typography } from "@mui/material";
import RegistrationTab from "./components/RegistrationTab";
import { useContext, useEffect, useState } from "react";
import AcademicCurriculumContext from "../../context/AcademicCurriculumContext";
import CurriculumContext from "../../context/CurriculumContext";
import GradeContext from "../../context/GradeContext";
import AcademicSessionContext from "../../context/AcademicSessionContext";
import Spinner from "../../components/UI/Spinner";

function Registration() {
  {
    localStorage.setItem("path", JSON.stringify("registration"));
  }

  const [acSession, setAcSession] = useState("");
  const [acCurriculumId, setAcCurriculumId] = useState("");
  const [gradeId, setGradeId] = useState("");
  // const [countDownDate, setCountDownDate] = useState("");

  const { academicCurriculum, fetchAcademicCurriculums } = useContext(
    AcademicCurriculumContext
  );

  const { academicSession, fetchAcademicSessions } = useContext(
    AcademicSessionContext
  );

  const { curriculum, fetchCurriculumById } = useContext(CurriculumContext);
  const { grade, fetchGradeByStage } = useContext(GradeContext);

  //   fetch academic sessions useEffect
  useEffect(() => {
    fetchAcademicSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   fetch academic curriculum useEffect
  useEffect(() => {
    fetchAcademicCurriculums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const academicSessionOption = academicSession.map((ac_Session) => ({
    label: ac_Session.academicYear,
    value: ac_Session.academicYear,
  }));

  const filteredAcCurriculum = academicCurriculum.filter((acCurriculum) => {
    return acCurriculum.academicYear === acSession;
  });
  //   Curruculum to dropdown
  const acCurriculumOption = !acSession
    ? [{ label: "Not found", value: 1 }]
    : filteredAcCurriculum.map((acCurriculum) => ({
        label: `${acCurriculum.curriculumTitle}`,
        value: acCurriculum._id,
      }));

  const selectedAcCurriculum = !acCurriculumId
    ? []
    : academicCurriculum.filter((SelAcCurr) => {
        return SelAcCurr._id === acCurriculumId;
      });

  // fetch curriculum By Id
  useEffect(() => {
    if (acCurriculumId && selectedAcCurriculum.length > 0) {
      const curriculumId = selectedAcCurriculum[0].curriculumId;
      fetchCurriculumById(curriculumId)
        .then((curriculum) => {
          fetchGradeByStage(curriculum.stage);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acCurriculumId]);

  // Fetch grade when curriculum is fetched
  useEffect(() => {
    if (curriculum && curriculum.stage) {
      fetchGradeByStage(curriculum.stage)
        .then(() => {
          // Handle any additional logic after fetching the grade
        })
        .catch((error) => {
          // Handle any errors
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acCurriculumId, curriculum]);

  // gradeOption
  const gradeOption = !acCurriculumId
    ? [{ label: "Not found", value: 1 }]
    : grade.map((gr) => ({
        label: gr.stage === "KG" ? `KG - ${gr.level}` : `Grade - ${gr.level}`,
        value: gr._id,
      }));

  const countDownDate =
    academicSession.length !== 0
      ? new Date(academicSession[0].registrationDate).getTime()
      : "";

  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeRemaining("EXPIRED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        academicSession &&
          setTimeRemaining({
            days,
            hours,
            minutes,
            seconds,
          });
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [timeRemaining]);

  return !academicSession ? (
    <Box className="text-lg text-center justify-center">
      No Registration on Progress
    </Box>
  ) : (
    <Box>
      <Box>
        {new Date(academicSession[0]?.registrationDeadLine).getTime() <
        new Date().getTime() ? (
          <>
            <Box className="flex flex-col items-center justify-center mt-24 gap-4 text-4xl font-bold uppercase text-red-500">
              Registration Period Ended
            </Box>
            <Box className="flex flex-col items-center justify-center mt-16 text-center gap-8">
              <Typography className="text-2xl text-gray-600">
                Registration is now closed.
              </Typography>
              <Typography className="text-lg text-gray-500 max-w-3xl">
                The registration period has successfully ended. Please review
                the applications received and proceed with the next steps in the
                admissions process. If additional information or adjustments are
                needed, use the admin portal to manage student data or
                communicate with applicants.
              </Typography>
              <Typography className="text-lg text-gray-500">
                For any special cases or exceptions, please consult the
                admissions office or update the registration settings as
                necessary.
              </Typography>
              <Box className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-[#C7E4FC] text-[#1E88E5] rounded-lg hover:bg-[#1E88E5] hover:text-[#C7E4FC]">
                  Review Applications
                </button>
                <button className="px-6 py-3 bg-[#EDE7F6] text-[#673AB7] rounded-lg hover:bg-[#673AB7] hover:text-[#EDE7F6]">
                  Update Registration Settings
                </button>
              </Box>
            </Box>
            <Box className="flex justify-center mt-16 text-gray-500">
              <Typography className="text-sm">
                For support or technical assistance, contact the IT team at
                <span className="text-blue-500"> support@school.com</span> or
                call us at
                <span className="text-blue-500"> +123 456 7890</span>.
              </Typography>
            </Box>
          </>
        ) : timeRemaining === "EXPIRED" ? (
          <Box>
            <Box className="bg-white p-4 text-lg rounded-lg">Registration</Box>
            <Box
              className="flex p-1 gap-4"
              sx={{ p: 1, border: "1px solid #dbdde0", borderRadius: "10px" }}
            >
              <Dropdown
                label="Academic Year"
                options={academicSessionOption}
                value={acSession}
                onChange={(e) => {
                  setAcSession(e.target.value);
                }}
                width={"140px"}
              />

              <Dropdown
                label="Academic Curriculum"
                options={acCurriculumOption}
                value={acCurriculumId}
                onChange={(e) => {
                  setGradeId("");
                  setAcCurriculumId(e.target.value);
                }}
                width={"250px"}
              />

              <Dropdown
                label="Grade"
                options={gradeOption}
                value={gradeId}
                onChange={(e) => {
                  setGradeId(e.target.value);
                }}
                width={"80px"}
              />
            </Box>
            <RegistrationTab
              acSession={acSession}
              acCurriculumId={acCurriculumId}
              gradeId={gradeId}
            />
          </Box>
        ) : timeRemaining !== null ? (
          <>
            <Box className="flex flex-col items-center justify-center mt-20 gap-4 text-4xl font-bold uppercase text-slate-500">
              Registration starts in
            </Box>
            <Box className="flex items-center justify-center mt-8 gap-4">
              <Box className="text-9xl text-white bg-gradient-to-r from-[#77c2ff65] via-indigo-500 to-purple-500 p-4 rounded-lg font-bold">
                {timeRemaining.days}{" "}
                <Typography className="text-2xl">Days</Typography>
              </Box>
              <Box className="text-9xl text-white bg-gradient-to-r from-[#77c2ff65] via-indigo-500 to-purple-500 p-4 rounded-lg font-bold">
                {timeRemaining.hours}{" "}
                <Typography className="text-2xl">Hours</Typography>
              </Box>
              <Box className="text-9xl text-white bg-gradient-to-r from-[#77c2ff65] via-indigo-500 to-purple-500 p-4 rounded-lg font-bold">
                {timeRemaining.minutes}{" "}
                <Typography className="text-2xl">Minutes</Typography>
              </Box>
              <Box className="text-9xl text-white bg-gradient-to-r from-[#77c2ff65] via-indigo-500 to-purple-500 p-4 rounded-lg font-bold">
                {timeRemaining.seconds}{" "}
                <Typography className="text-2xl">Seconds</Typography>
              </Box>
            </Box>
            <Box className="flex flex-col items-center justify-center mt-16 text-center gap-8">
              <Typography className="text-2xl text-gray-600">
                Get ready to join our school community!
              </Typography>
              <Typography className="text-lg text-gray-500 max-w-3xl">
                Our registration portal will open soon. Once live, you’ll be
                able to register, check admission requirements, and complete the
                onboarding process seamlessly. Stay tuned and prepare your
                documents in advance!
              </Typography>
              <Typography className="text-lg text-gray-500">
                If you have any questions, feel free to reach out to our support
                team.
              </Typography>
              <Box className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-[#C7E4FC] text-[#1E88E5] rounded-lg hover:bg-[#1E88E5] hover:text-[#C7E4FC]">
                  Learn More
                </button>
                <button className="px-6 py-3 bg-[#EDE7F6] text-[#673AB7] rounded-lg hover:bg-[#673AB7] hover:text-[#EDE7F6]">
                  Contact Support
                </button>
              </Box>
            </Box>
          </>
        ) : (
          <Box className=" mt-64 flex justify-center items-start ">
            <Spinner className="" />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Registration;
