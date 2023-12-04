import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import StudentLQs from '../../SessionPages/ExamSession/LQs/StudentLQs';
import StudentMCQs from '../../SessionPages/ExamSession/MCQs/StudentMCQs';
import StudentSQs from '../../SessionPages/ExamSession/SQs/StudentSQs';
import { useGetStudentAnswersQuery, setQuestions } from '../../../store';
import StudentButtons from '../../../components/classrooms/ExamSession.js/StudentButtons';
import SESTableHeader from '../../../components/classrooms/ExamSession.js/SESTableHeader';
import SESTableData from '../../../components/classrooms/ExamSession.js/SESTableData';
const StudentAnswers = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { questions } = useSelector((state) => state.examSession);

  const { studentId } = params;
  const { data, isSuccess, isError, error } =
    useGetStudentAnswersQuery(studentId);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      dispatch(setQuestions(data?.answers));
    } else if (isError) {
      console.log(error);
    }
  }, [isError, isSuccess]);

  return (
    <div className=" h-full">
      <div className=" h-1/6 relative z-40">
        <h2 className="my-4 text-2xl text-center font-bold leading-none tracking-tight text-green-900">
          {'Augustine Ngobie@SP20-BSE-108 Answers'}
        </h2>
        {data && <StudentButtons student={data} />}
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <SESTableHeader />
        <tbody>{data && <SESTableData student={data} />}</tbody>
      </table>
      <div className="px-5 relative z-10 mt-10 h-5/6 overflow-scroll overflow-x-hidden">
        {questions.map((question, index) => {
          if (question.type === 'mcq') {
            return (
              <StudentMCQs
                key={question._id}
                question={question}
                index={index}
              />
            );
          } else if (question.type === 'sq') {
            return (
              <StudentSQs
                key={question._id}
                question={question}
                index={index}
              />
            );
          } else if (question.type === 'lq') {
            return (
              <StudentLQs
                key={question._id}
                question={question}
                index={index}
              />
            );
          } else {
            return <div key={question._id}>Question Type Not Found</div>;
          }
        })}
      </div>
    </div>
  );
};

export default StudentAnswers;
