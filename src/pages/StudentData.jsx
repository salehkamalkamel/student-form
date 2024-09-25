import { useNavigate, useParams } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { useGetStudent } from "../hooks/useGetStudent";
import Spinner from "../ui/Spinner";

export default function StudentData() {
  const { userID } = useParams();
  const {
    student: { data },
    gettingStudent,
  } = useGetStudent(userID);
  const navigate = useNavigate();
  if (gettingStudent) {
    return (
      <Container className="flex flex-col items-center justify-center">
        <h1 className="border-b-[1px] border-gray-300 py-4 text-center font-bold text-2xl text-gray-900">
          Student Data
        </h1>
        <Spinner />
      </Container>
    );
  }
  return (
    <Container className="flex flex-col items-center justify-center">
      <Button shape="backBtn" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <h1 className="border-b-[1px] border-gray-300 py-4 text-center font-bold text-2xl text-gray-900">
        Student Data
      </h1>
      <div className="flex flex-col items-start justify-center gap-4 p-4">
        <div className="flex items-center justify-center">
          <span className="font-bold text-gray-800 text-[1rem]">Name</span>
          <p> {`: ${data?.name || "No Data Provided"}`}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-gray-800 text-[1rem]">Email</span>
          <p> {`: ${data?.email || "No Data Provided"}`}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-gray-800 text-[1rem]">Age</span>
          <p> {`: ${data?.age || "No Data Provided"}`}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-gray-800 text-[1rem]">
            Education Level
          </span>
          <p> {`: ${data?.educationLevel || "No Data Provided"}`}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-gray-800 text-[1rem]">
            Nationality
          </span>
          <p> {`: ${data?.nationality || "No Data Provided"}`}</p>
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold text-gray-800 text-[1rem]">
            National ID
          </span>
          <p> {`: ${data?.nationalID || "No Data Provided"}`}</p>
        </div>
      </div>
    </Container>
  );
}
