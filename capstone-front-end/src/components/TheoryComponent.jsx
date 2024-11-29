import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const TheoryComponent = ({ programmingLanguage }) => {
  const theory = JSON.parse(programmingLanguage.theory);
  const [expandedSection, setExpandedSection] = useState(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
  };

  return (
    <div>
      {theory.map((section, index) => (
        <motion.div
          key={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="mb-3 theory-card">
            <Card.Header 
              className="text-white cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === index ? null : index)}
              style={{ color: 'white' }}
            >
              {section.section}
            </Card.Header>
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate={expandedSection === index ? "expanded" : "collapsed"}
              transition={{ duration: 0.3 }}
            >
              <Card.Body>
                {section.topics.map((topic, topicIndex) => (
                  <div key={topicIndex}>
                    <h4 style={{ color: 'white' }}>{topic.title}</h4>
                    <p style={{ color: 'white' }}>{topic.content}</p>
                    {topic.examples && topic.examples.map((example, exampleIndex) => (
                      <div key={exampleIndex}>
                        <pre style={{ color: 'white' }}>{example.code}</pre>
                        <p style={{ color: 'white' }}>{example.explanation}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </Card.Body>
            </motion.div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default TheoryComponent;