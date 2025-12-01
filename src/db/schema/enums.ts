

// src/schema/enums.ts
import { pgEnum } from 'drizzle-orm/pg-core';

export const inventoryActionEnum = pgEnum('inventory_action_enum', ['in', 'out']);