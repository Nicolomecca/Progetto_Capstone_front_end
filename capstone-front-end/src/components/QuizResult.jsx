import { Card, ProgressBar, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const QuizResult = ({ result, correctAnswers, incorrectAnswers, totalQuestions }) => {
    const navigate = useNavigate();

    return (
        <>
            <Card bg="dark" text="white" className="shadow mb-4">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Quiz Completed!</Card.Title>
                    <Card.Text className="text-center">
                        Congratulations! You can now start learning for real.
                    </Card.Text>
                    <Card.Text className="text-center">
                        Your Score: {result.score}%
                    </Card.Text>
                    <Card.Text className="text-center">
                        Level: {result.skillLevel}
                    </Card.Text>
                    <ProgressBar className="mb-3">
                        <ProgressBar variant="success" now={(correctAnswers / totalQuestions) * 100} key={1} />
                        <ProgressBar variant="danger" now={(incorrectAnswers / totalQuestions) * 100} key={2} />
                    </ProgressBar>
                    <div className="text-center">
                        <span className="me-3">Correct: {correctAnswers}</span>
                        <span>Incorrect: {incorrectAnswers}</span>
                    </div>
                </Card.Body>
            </Card>
            <div className="text-center auth-bot">
                <Button className="auth-links" onClick={() => navigate('/home')} >
                    Go to Home
                </Button>
            </div>
        </>
    );
};

export default QuizResult;