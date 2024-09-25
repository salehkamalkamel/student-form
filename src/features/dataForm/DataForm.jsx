import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Container from "../../ui/Container";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { useGetStudent } from "../../hooks/useGetStudent";
import { useUpdateStudent } from "../../hooks/useUpdateStudent";
import { useSignout } from "../../hooks/useSignout";
import ConfirmPopup from "../../ui/ConfirmPopup";
import { validateEmail } from "../../helpers/helpers";

// Age validation function
const validateAge = (value) => {
  const numericAge = Number(value);
  if (isNaN(numericAge)) {
    return "Age must be a number";
  } else if (numericAge < 6) {
    return "Age must be 6 or more";
  } else if (numericAge > 22) {
    return "Age must be less than or equal to 22";
  }
  return true;
};

export default function DataForm() {
  const { userID } = useParams();
  const { student, gettingStudent } = useGetStudent(userID);
  const { updateStudent, updatingStudent } = useUpdateStudent();
  const { signOut, isSigningOut } = useSignout();
  const navigate = useNavigate();
  const [, setEdit] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");

  function handleSignOut() {
    setShowConfirm(true);
  }

  function confirmSignOut() {
    signOut(userID, { onSuccess: () => navigate("/") });
  }

  // useForm hook with default values
  const {
    register,
    handleSubmit,
    watch,
    setValue, // to dynamically update form fields
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: "",
      educationLevel: "",
      nationality: "",
      nationalID: "",
    },
  });

  // Populate form when student data is fetched
  useEffect(() => {
    if (student?.data) {
      setValue("name", student.data.name);
      setValue("email", student.data.email);
      setValue("age", student.data.age);
      setValue("educationLevel", student.data.educationLevel);
      setValue("nationality", student.data.nationality);
      setValue("nationalID", student.data.nationalID);
    }
  }, [student, setValue]);

  const age = watch("age", "");

  const onSubmit = (data) => {
    console.log(data);
    setMessage("Loading...");
    updateStudent(
      { id: userID, data },
      {
        onSuccess: () =>
          setMessage(
            `Student ${data?.name || `With ID ${userID}`} updated successfully.`
          ),
      }
    );
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setMessage("Editing Student Data");
  };

  // Define education level options based on age
  const getEducationLevels = (age) => {
    const numericAge = Number(age);
    if (numericAge >= 6 && numericAge <= 10) {
      return ["Elementary School"];
    } else if (numericAge >= 11 && numericAge <= 16) {
      return ["Middle School", "High School"];
    } else if (numericAge > 16 && numericAge <= 22) {
      return ["High School", "Bachelor's Degree", "Master's Degree"];
    } else {
      return [];
    }
  };

  const educationLevels = getEducationLevels(age);

  // Education level validation function
  const validateEducationLevel = (value) => {
    if (!value) {
      return "Education Level is required";
    }
    if (!educationLevels.includes(value)) {
      return `Invalid education level for age ${age}`;
    }
    return true;
  };

  if (gettingStudent)
    return (
      <Container>
        <Spinner />
      </Container>
    );

  return (
    <>
      {showConfirm && (
        <ConfirmPopup
          action="signout"
          message="Are you sure you want to sign out? All of your data will be deleted."
          onConfirm={confirmSignOut}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <Container className="flex items-center justify-center gap-6 flex-col">
        <Button shape="backBtn" onClick={() => navigate("/")}>
          Back To Home
        </Button>
        <form
          onChange={handleEdit}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          {/* Name and Email Fields */}
          <div className="flex flex-col items-start sm:flex-row gap-8 justify-between sm:items-center">
            <Input
              heading="Name"
              holder="Enter Your Name"
              {...register("name", { required: "This field is required" })}
              error={errors?.name?.message}
            />
            <Input
              heading="Email"
              holder="Enter Your Email"
              {...register("email", {
                required: "This field is required",
                validate: validateEmail,
              })}
              error={errors?.email?.message}
            />
          </div>

          {/* Age and Education Level Fields */}
          <div className="flex flex-col items-start sm:flex-row gap-8 justify-between sm:items-center">
            <Input
              heading="Age"
              holder="Enter Your Age"
              type="number"
              {...register("age", {
                required: "This field is required",
                validate: validateAge,
              })}
              error={errors?.age?.message}
            />
            <div className="flex flex-col w-full">
              <label className="mb-1 font-medium">Education Level</label>
              <select
                className={`font-medium px-4 py-2 text-[1rem] outline-0 border-2 ${
                  errors.educationLevel ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                {...register("educationLevel", {
                  required: "Education Level is required",
                  validate: validateEducationLevel,
                })}
              >
                <option value="">Select Education Level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.educationLevel && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.educationLevel.message}
                </span>
              )}
            </div>
          </div>

          {/* Nationality and National ID Fields */}
          <div className="flex flex-col items-start sm:flex-row gap-8 justify-between sm:items-center">
            <Input
              heading="Nationality"
              holder="Enter Your Nationality"
              {...register("nationality", {
                required: "This field is required",
              })}
              error={errors?.nationality?.message}
            />
            {age > 16 && (
              <Input
                heading="National ID"
                holder="Enter Your National ID"
                {...register("nationalID", {
                  required: "National ID is required for age over 16",
                })}
                error={errors?.nationalID?.message}
              />
            )}
          </div>

          {message && (
            <p className="font-medium text-sm text-gray-800 text-center">
              {message}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-y-2 gap-x-6 sm:flex-row w-full">
            <Button shape="btn2" type="submit">
              {updatingStudent ? <Spinner /> : "Save Changes"}
            </Button>
          </div>
        </form>
        <div className="flex flex-col gap-2 w-full">
          <Button
            type="button"
            onClick={() => {
              navigate(`/student/${userID}`);
            }}
          >
            View Result
          </Button>
          <Button
            shape="btn1"
            onClick={() => {
              handleSignOut();
            }}
          >
            {isSigningOut ? <Spinner /> : "Sign Out"}
          </Button>
        </div>
      </Container>
    </>
  );
}
