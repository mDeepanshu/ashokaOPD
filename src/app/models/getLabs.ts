import { SubLab } from './subLab';
export interface LabList {
  _id: string;
  lab_name: string;
  tests: SubLab[];
}
