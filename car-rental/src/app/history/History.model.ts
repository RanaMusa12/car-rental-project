
import { Timestamp } from '@angular/fire/firestore';

export interface carHistory {
  car: string;
  from: Date;
  to: Date;
  total: number;
}
