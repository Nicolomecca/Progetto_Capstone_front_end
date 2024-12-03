import React, { useState } from "react";
import { Container, Button, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { Sandpack } from "@codesandbox/sandpack-react";

const Practice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [output, setOutput] = useState("");

  const handleRun = async (sandpack) => {
    setIsLoading(true);
    setError(null);
    setOutput("");

    try {
      await sandpack.runSandpack();
      const consoleOutput = await sandpack.getConsoleOutput();
      setOutput(consoleOutput.join("\n"));
    } catch (err) {
      setError(
        err.message ||
          "An error occurred while executing the code"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="practice-container"
      >
        <h2 className="mb-4 text-white">
          Code Editor <span className="fs-4 title-accent">JavaScript</span>
        </h2>

        <Sandpack
          template="vanilla"
          theme="dark"
          options={{
            showNavigator: false,
            showTabs: false,
            editorHeight: 400,
          }}
          customSetup={{
            entry: "/index.js",
            files: {
              "/index.js": {
                code: "// Write your JavaScript code here\n// You can remove or modify this code as you wish.",
              },
            },
          }}
        >
          {(sandpack) => (
            <Button
              variant="success"
              onClick={() => handleRun(sandpack)}
              disabled={isLoading}
              className="mt-3 mb-3"
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Executing...
                </>
              ) : (
                "Run Code"
              )}
            </Button>
          )}
        </Sandpack>

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {output && (
          <div className="output-container mt-3">
            <h4>Output:</h4>
            <pre className="bg-light p-3 rounded">{output}</pre>
          </div>
        )}
      </motion.div>
    </Container>
  );
};

export default Practice;