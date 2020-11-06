/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { Form as SemanticForm, FormButton } from 'semantic-ui-react';
import Form from '../components/form/Form';
// import quizAPI from '../api/quiz-api';
import CreateAmericanQuestionComponent from '../components/form/CreateQuestionComponent/CreateAmericanQuestionComponent';
import CreateNumberQuestionComponent from '../components/form/CreateQuestionComponent/CreateNumberQuestionComponent';
import CreateOpenQuestionComponent from '../components/form/CreateQuestionComponent/CreateOpenQuestionComponent';

// const OPTION_NUMBER = 3;
const questionOptions = [
  { key: 'american', value: 'american', text: 'American Question' },
  { key: 'number', value: 'number', text: 'Number Question' },
  { key: 'open', value: 'open', text: 'Open Question' },

]
let id = 0;

const validateQuestions = (questions) => {
  if (questions.length < 2)
    return false;
  let result = true;
  questions.forEach(q => {
    switch (q.type) {
      case "american":
        q.answers.forEach(ans => {

          if (ans.length < 1) {
            result = false;
          }
        });
        break;

      case "open":
        // if (q.value.length < 1) {
        //   result = false;
        // }
        break;

      case "number": // should validate range // future improvement 
        if ((q.min > q.max)) {

          result = false;
        }

        break;

      default:
        return result;
    }

    if (q.q.length < 1) {
      result = false
    }
  })

  return result;
};

const CreateFormContainer = () => {


  const [formData, setFormData] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [welcome, setWelcome] = useState(`היי, כאן בוט הגיוס של חברת Spetz!
  שמחתי לקבל את קורות החיים שהגשת למשרת גיבור העל שלנו.
  רגע לפני שאנחנו מתאמים ראיון, אשמח לשאול אותך כמה שאלות.
  קודם כל, מה שמך?`);
  const [goodbye, setGoodbye] = useState(`מעולה, רשמתי הכל. מחלקת הגיוס שלנו תהיה איתך בקשר בהמשך. המשך יום
  נעים!`);

  const [newQuestionType, setNewQuestionType] = useState('american');


  const displayForm = () => {
    return formData.map((q, i) => {
      switch (q.type) {
        case "american":
          return <CreateAmericanQuestionComponent
            key={q.id}
            index={i}
            data={q}
            onDelete={() => onClickRemoveQuestionHandler(q.id)}
            onChange={onChangeQuestionHandler}
          />;

        case "number":
          return <CreateNumberQuestionComponent
            key={q.id}
            index={i}
            data={q}
            onChange={onChangeQuestionHandler}
            onDelete={() => onClickRemoveQuestionHandler(q.id)}
          />;

        case "open":
          return <CreateOpenQuestionComponent
            key={q.id}
            index={i}
            data={q}
            onChange={onChangeQuestionHandler}
            onDelete={() => onClickRemoveQuestionHandler(q.id)}
          />;
        default:
          return null;

      }
    }
    )
  }



  // events handlers

  const onSubmitHandler = async (e) => {
    e.preventDefault();


    if (!validateQuestions(formData)) {
      alert("invalid form");
      return;
    }


    const data = {
      openMsg: welcome,
      questionsArr: formData,
      closeMsg: goodbye
    }

    console.log(data);
    console.log(JSON.stringify(data));
    alert("data is printed to console.");
    alert(JSON.stringify(data));
  };
  const addNewQuestionHandler = () => {
    let newQuestion;
    switch (newQuestionType) {
      case "american":
        newQuestion = {
          q: '',
          id,
          type: 'american',
          answers: ['', '', '', ''],
          correct: 0,
        };
        break;

      case "number":
        newQuestion = {
          q: '',
          type: 'number',
          min: 0,
          max: 0,
          value: '',
          id
        }
        break;

      case "open":

        newQuestion = {
          q: '',
          type: 'open',
          value: '',
          id
        }
        break;

      default:
        console.log('error invalid question type');
    }

    const newForm = formData.slice();
    newForm.push(newQuestion);
    id++;
    setFormData(newForm);
  };
  const onChangeQuestionHandler = (e, id, answerIndex, data, type = 'answer', value, qType) => {
    const newFormData = formData.slice();

    if (qType === "american") {


      let question = newFormData.find(q => q.id === id);
      if (!question) {
        return;
      }

      if (type === 'answer') {
        question.answers[answerIndex] = value;
      } else if (type === 'q') {
        question.q = value;
      } else if (type === 'correct') {
        question.correct = value;
      }


    } else {
      const question = newFormData.find(q => q.id === id);
      if (!question) {
        return;
      }
      question[type] = value;

    }


    setFormData(newFormData);

  };
  const onClickRemoveQuestionHandler = (id) => {
    const newForm = formData.filter(q => q.id !== id);
    setFormData(newForm);
  }


  return (
    <div className="CreateFormContainer " style={{ maxWidth: '50%', margin: '0 auto' }}>
      <h3>Create New Form</h3>

      <Form className="ui form " onSubmit={onSubmitHandler}>
        <SemanticForm.Group widths="equal">
          <SemanticForm.TextArea label="Welcome Message"
            placeholder='Tell us more'
            value={welcome}
            onChange={(e, { value }) => setWelcome(value)} />
        </SemanticForm.Group>

        <div className="inline-fields">{displayForm()}</div>

        <div className="field">
          <SemanticForm.Select
            placeholder='Question Type'
            label='Question type'
            onChange={(e, { value }) => setNewQuestionType(value)}
            options={questionOptions}
            defaultValue={newQuestionType}
          />

          <button className="button ui secondary" type="button" onClick={addNewQuestionHandler}>
            Add New Question
          </button>

          <SemanticForm.Group widths="equal">
            <SemanticForm.TextArea
              label="Goodbye Message"
              placeholder='Tell us more'
              value={goodbye}
              onChange={(e, { value }) => setGoodbye(value)}
            />
          </SemanticForm.Group>
        </div>
        <div className="field">
          <FormButton primary type="submit" disabled={formData.length < 2}>
            Create New JSON
          </FormButton>
        </div>
      </Form>
    </div>
  );
};
export default CreateFormContainer;
