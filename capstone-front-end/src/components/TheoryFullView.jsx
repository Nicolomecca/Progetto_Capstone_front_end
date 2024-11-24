import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TheoryComponent from './TheoryComponent';
import { Container } from 'react-bootstrap';
const TheoryFullView = () => {
    const { languageName } = useParams();
    const language = useSelector(state => 
      state.languages.languages.find(lang => lang.name === languageName)
    );
  
    if (!language) return <div>Language not found</div>;
  
    return (
      <Container className="my-5">
        <h1 className="text-center mb-5">
          <span className="title-main">{language.name}</span>
          <span className="title-accent"> Theory</span>
        </h1>
        <TheoryComponent programmingLanguage={language} />
      </Container>
    );
  };
  
  export default TheoryFullView;