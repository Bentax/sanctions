import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [targetTime, setTargetTime] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (time >= targetTime * 60) {
      setIsTimeUp(true);
      const audio = new Audio("path/to/sound.mp3");
      audio.play();
    }
  }, [time, targetTime]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setTime(0);
    setIsTimeUp(false);
  };

  const handleTargetTimeChange = (event) => {
    setTargetTime(event.target.value);
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((timeInSeconds % 3600) / 60).toString().padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col className="text-center mb-4">
          <div className="display-4">{formatTime(time)}</div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          <Button variant="primary" onClick={handleStart} disabled={isRunning}>
            Start
          </Button>
        </Col>
        <Col md="auto">
          <Button variant="secondary" onClick={handleStop} disabled={!isRunning}>
            Stop
          </Button>
        </Col>
        <Col md="auto">
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
        </Col>
      </Row>
      <Row className="justify-content-center mt-4">
        <Col md="auto">
          <Form.Group controlId="targetTime">
            <Form.Label>Target time (minutes)</Form.Label>
            <Form.Control type="number" value={targetTime} onChange={handleTargetTimeChange} />
          </Form.Group>
        </Col>
      </Row>
      {isTimeUp && (
        <Row className="justify-content-center mt-4">
          <Col className="text-center">
            <div className="text-danger">Time's up!</div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Timer;
