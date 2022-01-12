import { SellMedicineSet } from './sellMedicineSet';
export interface PharmaSell {
  customername: string;
  discount: number;
  total: number;
  type: string;
  items: SellMedicineSet[];
}
