export type ResultsType = {
    size : number,
    time : number
}

export type TypingTestProps = {
  ogText : string;
  handleFinish: ({ size, time }: ResultsType) => void;
};

export type InputScreenProps = {
    handleStart : (data : string) => void
}