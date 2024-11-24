import React from 'react';
import { Card } from 'react-bootstrap';

const TheoryComponent = ({ programmingLanguage }) => {
  const theory = JSON.parse(programmingLanguage.theory);

  return (
    <div>
      {theory.map((section, index) => (
        <Card key={index} className="mb-3">
          <Card.Header className="text-white">{section.section}</Card.Header>
          <Card.Body>
            {section.topics.map((topic, topicIndex) => (
              <div key={topicIndex}>
                <h4 className="text-white">{topic.title}</h4>
                <p className="text-white">{topic.content}</p>
                {topic.examples && topic.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex}>
                    <pre>{example.code}</pre>
                    <p>{example.explanation}</p>
                  </div>
                ))}
              </div>
            ))}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default TheoryComponent;