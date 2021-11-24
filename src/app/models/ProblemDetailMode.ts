import { TestCase } from './TestCaseModel';

export interface ProblemDetail {
  module: number;
  topic: number;
  title: string;
  problemContent: string;
  sampleTestCase: TestCase;
  solutionVideoLink: string;
  topicName?: string;
}
