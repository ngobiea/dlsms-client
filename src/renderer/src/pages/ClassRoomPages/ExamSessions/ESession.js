import React, { useEffect } from 'react';
import SessionHeader from '../../../components/classrooms/Sessions/SessionHeader';
import SessionTableData from '../../../components/classrooms/Sessions/SessionTableData';
import SessionTableHeader from '../../../components/classrooms/Sessions/SessionTableHeader';
import { useGetExamSessionsQuery } from '../../../store';

import { useParams } from 'react-router-dom';

const ESession = () => {
const params = useParams();
const { classroomId } = params;
const { data, isSuccess, isError, error } =
  useGetExamSessionsQuery(classroomId);
useEffect(() => {
  if (isSuccess) {
    console.log(data);
  } else if (isError) {
    console.log(error);
  }
}, [data, isSuccess]);
    return (
      <>
        <SessionHeader title={'Exam Session'} />
        <div className="bg-white rounded-md ">
          <div className="-mx-4 px-4  overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <SessionTableHeader />
                <tbody>
                  {data?.map((session) => {
                    return (
                      <SessionTableData
                        session={session}
                        type={'exam'}
                        key={session._id.toString()}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
};

export default ESession;