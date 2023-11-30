import React, { useEffect } from 'react';
import SessionHeader from '../../../components/classrooms/Sessions/SessionHeader';
import { useGetCSStudentsQuery } from '../../../store';
import { useParams } from 'react-router-dom';
import StudentCSTableData from '../../../components/classrooms/ClassSession/StudentCSTableData';
import StudentCSTableHeader from '../../../components/classrooms/ClassSession/StudentCSTableHeader';
const StudentCS = () => {
  const params = useParams();
  const { classSessionId } = params;
  const { data, isSuccess, isError, error } =
    useGetCSStudentsQuery(classSessionId);
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    } else if (isError) {
      console.log(error);
    }
  }, [data, isSuccess]);
  return (
    <div className=" w-full h-full ">
      <SessionHeader title={'Students'} buttonText={'Class Session'} />
      <div className="bg-white rounded-md ">
        <div className="-mx-4 px-4  overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <StudentCSTableHeader />
              <tbody>
                {data?.map((student) => {
                  return (
                    <StudentCSTableData
                      student={student}
                      type={'class'}
                      key={student._id.toString()}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCS;
