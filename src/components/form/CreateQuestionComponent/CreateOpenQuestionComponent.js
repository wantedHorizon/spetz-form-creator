import React from 'react';
import { Form, Button } from 'semantic-ui-react';


const CreateNumberQuestionComponent = ({ index, data, onChange, onDelete }) => {


    return (
        <div className="CreateQuestionComponent">
            CreateNumberQuestionComponent
            <Form.Group grouped style={{ border: '1px solid black' }}>

                <div style={{ position: 'absolute', right: 0 }}>
                    <Button onClick={onDelete} negative>X</Button>
                </div>

                <div style={{ marginTop: "10px" }}>
                    <label htmlFor={`q{${index}}`}>{`Question Number ${index + 1}`}</label>
                    <Form.Input
                        value={data.q}
                        placeholder="Question"
                        onChange={(e, { value }) => onChange(e, data.id, -1, data, 'q', value, "open")}
                    />

                    <Form.Input
                        value={data.value}
                        onChange={(e, { value }) => onChange(e, data.id, -1, data, 'value', value, "open")}

                    />
                </div>
            </Form.Group>
        </div>
    );
};
export default CreateNumberQuestionComponent;
