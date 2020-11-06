import React from 'react';
import { Form, Button } from 'semantic-ui-react';


const CreateNumberQuestionComponent = ({ index, data, onChange, onDelete }) => {


    return (
        <div className="CreateQuestionComponent">
            CreateNumberQuestionComponent
            <Form.Group grouped style={{ border: '1px solid black', position: 'relative' }}>

                <div style={{ position: 'absolute', right: 0 }}>
                <Button onClick={onDelete} negative>X</Button>
                </div>

                <div style={{ marginTop: "10px" }}>

                    <label htmlFor={`q{${index}}`}>{`Question Number ${index + 1}`}</label>
                    <Form.Input
                        value={data.q}
                        placeholder="Question"
                        onChange={(e, { value }) => onChange(e, data.id, -1, data, 'q', value, "number")}
                    />

                    <Form.Input
                        value={data.min}
                        type="number"
                        label="Min"
                        onChange={(e, { value }) => onChange(e, data.id, -1, data, 'min', value, "number")}

                    />
                    <Form.Input
                        value={data.max}
                        type="number"
                        label="Max"

                        onChange={(e, { value }) => onChange(e, data.id, -1, data, 'max', value, "number")}

                    />
                </div>
            </Form.Group>
        </div>
    );
};
export default CreateNumberQuestionComponent;
