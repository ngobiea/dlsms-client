import React from "react";
import TutorImage from "../../../public/images/cartoon-illustration-thai-female-teacher-holding-stick-front-blackboard_49924-213.avif";
import StudentImage from "../../../public/images/images.png";
import SingleUserCard from "./SingleCard";

const UserCard = () => {
  return (
    <div className="columns-2 flex justify-around">
      <SingleUserCard userImage={TutorImage} user={"tutor"} userTitle={'Tutor'} />
      <SingleUserCard userImage={StudentImage} user={"student"} userTitle={'Student'} />
    </div>
  );
};

export default UserCard;
