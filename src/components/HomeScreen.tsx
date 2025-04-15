import React, { useState } from "react";
import InputScreen from "./InputScreen";
import TypingTest from "./TypingTest";
import Result from "./Result";
import { ResultsType } from "../types/types";

const HomeScreen = () => {
  const [stage, setStage] = useState<"input" | "typing" | "result">("input");
  const [testCode, setTestCode] = useState("");
  const [results, setResults] = useState({
    size: 0,
    time: 0,
  });

  const handleStart = (data: string) => {
    setTestCode(data);
    setStage("typing");
  };

  const handleFinish = ({ size, time }: ResultsType) => {
    setResults({ size, time });
    setStage("result");
  };

  return (
    <>
      {stage === "input" && (
        <InputScreen handleStart={handleStart}></InputScreen>
      )}

      {stage === "typing" && (
        <TypingTest data={testCode} handleFinish={handleFinish}></TypingTest>
      )}

      {stage === "result" && (
        <Result size={results.size} time={results.time}></Result>
      )}
    </>
  );
};

export default HomeScreen;
