export type ResultsType = {
    size : number,
    time : number
}

export type TypingTestProps = {
  data: string;
  handleFinish: ({ size, time }: ResultsType) => void;
};

export type InputScreenProps = {
    handleStart : (data : string) => void
}