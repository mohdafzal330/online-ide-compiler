import { TestCase } from './TestCaseModel';

export interface ProblemDetail {
  id: number;
  module: number;
  topic: number;
  title: string;
  problemContent: string;
  sampleTestCase: TestCase;
  solutionVideoLink: string;
  defaultScript?: string;
  topicName?: string;
}
