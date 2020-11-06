import React from 'react';
import { Form, Button } from 'semantic-ui-react';

const options = [
  { key: 0, value: 0, text: 1 },
  { key: 1, value: 1, text: 2 },
  { key: 2, value: 2, text: 3 },
  { key: 3, value: 3, text: 4 },
];
const CreateQuestionComponent = ({ index, data, onChange,onDelete }) => {
  const displayQuestions = () =>
    data.answers.map((ans, ansIndex) => (
      <div className="field" key={`q(${index})-ans(${ansIndex})`}>

        <Form.Input
          value={ans}
          placeholder={`Answer${ansIndex + 1}`}
          onChange={(e, { value }) => onChange(e, data.id, ansIndex, data, 'answer', value, "american")}
        />
      </div>
    ));

  return (
    <div className="CreateQuestionComponent">
      CreateAmericanQuestionComponent

      <Form.Group grouped style={{ border: '1px solid black', position: 'relative' }}>
        <div style={{ position: 'absolute', right: 0 }}>
          <Button onClick={onDelete} negative>X</Button>

        </div>

        <div style={{marginTop:"10px"}}>
          <label htmlFor={`q{${index}}`}>{`Question Number ${index + 1}`}</label>

          <Form.Input value={data.q} placeholder="Question" onChange={(e, { value }) => onChange(e, data.id, -1, data, 'q', value)} />

          {displayQuestions()}

          <Form.Field
            control={Form.Select}
            label={`Correct Answer is: ${data?.correct + 1}`}
            options={options}
            onChange={(e, { value }) => onChange(e, data.id, -1, data, 'correct', value, "american")}
            value={data.correct}
            placeholder="Correct Answer"
          />
        </div>

      </Form.Group>
    </div>
  );
};
export default CreateQuestionComponent;
