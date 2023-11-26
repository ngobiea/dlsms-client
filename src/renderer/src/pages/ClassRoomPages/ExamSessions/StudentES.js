import React, { useEffect } from 'react';
import SessionHeader from '../../../components/classrooms/Sessions/SessionHeader';
import SessionTableData from '../../../components/classrooms/Sessions/SessionTableData';
import SessionTableHeader from '../../../components/classrooms/Sessions/SessionTableHeader';
import { useGetESStudentsQuery } from '../../../store';
import { useParams } from 'react-router-dom';
import StudentESTableData from '../../../components/classrooms/ExamSession.js/StudentESTableData';
import StudentESTableHeader from '../../../components/classrooms/ExamSession.js/StudentESTableHeader';

const StudentES = () => {
  const params = useParams();
  const { examSessionId } = params;

  const { data, isSuccess, isError, error } =
    useGetESStudentsQuery(examSessionId);
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    } else if (isError) {
      console.log(error);
    }
  }, [data, isSuccess]);
  return (
    <div className=" w-full h-full ">
      <SessionHeader title={'Exam Session Students'} />
      <div className="bg-white rounded-md ">
        <div className="-mx-4 px-4  overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <StudentESTableHeader />
              <tbody>
                {data?.map((student) => {
                  return (
                    <StudentESTableData
                      student={student}
                      type={'exam'}
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

export default StudentES;
