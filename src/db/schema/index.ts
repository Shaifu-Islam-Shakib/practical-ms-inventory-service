// src/db/schema/index.ts
// Export individual schemas
export {inventoryActionEnum} from './enums.ts'
export { inventory, inventoryRelation } from './inventory';
export { history, historyRelation } from './history';

// Import and combine for the default schema object
import { inventory, inventoryRelation } from './inventory';
import { history, historyRelation } from './history';

export const schema = {
  inventory,
  inventoryRelation,
  history,
  historyRelation,

};

// Optional: Export as default as well
//export default schema;