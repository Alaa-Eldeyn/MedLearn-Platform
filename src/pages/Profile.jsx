import { useEffect, useState } from "react";
import { addUser, getUser } from "../utils/LocalStorage";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileInfoSchema, updateProfile } from "../utils/auth";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const user = getUser();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileInfoSchema),
  });
  const handleEditInfo = async () => {
    const data = new FormData();
    data.append("FirstName", getValues("firstName"));
    data.append("LastName", getValues("lastName"));
    data.append("PhoneNumber", getValues("phoneNumber"));
    data.append("UserName", user?.userName);
    data.append("NewPassword", getValues("newPassword") || "");
    data.append("ConfirmNewPassword", getValues("confirmPassword") || "");
    if (getValues("image.0")) {
      data.append("Image", getValues("image.0"));
    }
    let res = await updateProfile(user?.id, data);
    if (res?.isSuccess) {
      setIsEdit(false);
      let data = {
        email: res?.data?.email,
        firstName: res?.data?.firstName,
        id: res?.data?.id,
        imageUrl: res?.data?.imageUrl,
        lastName: res?.data?.lastName,
        phoneNumber: res?.data?.phoneNumber,
        userName: res?.data?.userName,
      };
      setPhotoPreview(res?.data?.imageUrl);
      addUser(data);
    }
  };
  useEffect(() => {
    if (!user) return;
    setValue("firstName", user?.firstName);
    setValue("lastName", user?.lastName);
    setValue("phoneNumber", user?.phoneNumber);
    setPhotoPreview(user?.imageUrl);
  }, []);

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e?.dataTransfer?.files;
    if (droppedFiles.length > 0) {
      setValue("image", droppedFiles);
      handlePhotoChange({ target: { files: droppedFiles } });
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleEditInfo();
    }
  };

  return (
    <>
      <div className="h-[70px] bg-[#1E0C2F]" />
      <div className="bg-gray-50 ">
        <div className="container pt-10 pb-16 max-w-[600px]">
          <div className="center">
            <div className="relative">
              <input
                type="file"
                className="hidden"
                id="photoInput"
                accept="image/*"
                {...register("image", {
                  onChange: (e) => handlePhotoChange(e),
                })}
              />
              {photoPreview ? (
                <>
                  <div className="relative size-32">
                    <Icon
                      icon="tdesign:edit-filled"
                      className={`cursor-pointer size-8 absolute z-10 right-0 border-4 border-white bg-[#EC8AB3] rounded-full p-1 text-white`}
                      onClick={() => {
                        setIsEdit(true);
                        document.getElementById("photoInput").click();
                      }}
                    />
                    <img
                      src={"http://localhost:5000/" + photoPreview}
                      alt="user profile"
                      className="rounded-full size-32 object-cover"
                    />
                  </div>
                </>
              ) : (
                <>
                  <Icon
                    icon="gridicons:user-circle"
                    className={`${
                      isEdit && "cursor-pointer"
                    } size-32 opacity-20`}
                    onClick={() => {
                      if (isEdit) document.getElementById("photoInput").click();
                    }}
                    onDrop={() => {
                      if (isEdit) handleFileDrop();
                    }}
                    onDragOver={(e) => e.preventDefault()}
                  />
                </>
              )}
            </div>
            <div className="text-sm">
              <h1 className="font-bold mb-1 text-lg">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-primary">@{user?.userName}</p>
            </div>
          </div>
          <form>
            <h2 className="mt-10 font-bold text-xl text-primary">
              Personal Information
            </h2>
            <div className="flex gap-4 mt-4">
              <div className="w-1/2">
                <label className="text-sm text-primary" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="input"
                  {...register("firstName")}
                  disabled={!isEdit}
                />
                {errors && errors?.firstName && (
                  <span className="text-red-500">
                    {errors?.firstName?.message}
                  </span>
                )}
              </div>
              <div className="w-1/2">
                <label className="text-sm text-primary" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="input"
                  {...register("lastName")}
                  disabled={!isEdit}
                />
                {errors && errors?.lastName && (
                  <span className="text-red-500">
                    {errors?.lastName?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm text-primary" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                value={user?.email}
                disabled
              />
            </div>
            <div className="mt-4">
              <label className="text-sm text-primary" htmlFor="phoneNumber">
                phoneNumber
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="input"
                {...register("phoneNumber")}
                disabled={!isEdit}
              />
              {errors && errors?.phoneNumber && (
                <span className="text-red-500">
                  {errors?.phoneNumber?.message}
                </span>
              )}
            </div>
            <h2 className="mt-6 font-bold text-xl text-primary">
              Change Password
            </h2>
            <div className="mt-4">
              <label htmlFor="newPassword" className=" text-primary">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="input"
                disabled={!isEdit}
                {...register("newPassword")}
              />
              {errors && errors?.newPassword && (
                <span className="text-red-500">
                  {errors?.newPassword?.message}
                </span>
              )}
            </div>
            <div className="mt-4">
              <label htmlFor="confirmPassword" className=" text-primary">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="input"
                disabled={!isEdit}
                {...register("confirmPassword")}
              />
              {errors && errors?.confirmPassword && (
                <span className="text-red-500">
                  {errors?.confirmPassword?.message}
                </span>
              )}
            </div>
            {isEdit ? (
              <button
                type="button"
                className="px-10 py-2 mt-5 text-white bg-primary rounded-full"
                onClick={handleSubmit(handleEditInfo)}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                type="button"
                className="px-10 py-2 mt-5 text-white bg-primary rounded-full"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
