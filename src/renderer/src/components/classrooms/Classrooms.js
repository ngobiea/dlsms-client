import React from 'react';
import { Link } from 'react-router-dom';
import ClassRoomCard from './ClassRoomCard';
import { useSelector } from 'react-redux';

const ClassRooms = () => {
  const { classrooms } = useSelector((state) => {
    return state.classroom;
  });
  return (
    <>
      <div className="h-full overflow-y-scroll px-5 pt-28 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {classrooms.map((item) => {
            return (
              <Link to={`${item._id.toString()}`} key={item._id}>
                <ClassRoomCard title={item.name} classroom={item} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ClassRooms;
