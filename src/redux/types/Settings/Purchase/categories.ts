export interface Categories {
  applyFoh: boolean;
  categoryDescription: string;
  categoryId: number;
  level: number;
  name: string;
  parentCategoryId: number;
  showWeight: boolean;
  status: string;
}

export interface CategoryRequest
  extends Record<string, number | string | boolean | boolean> {
  applyFOH: boolean;
  categoryId: number;
  name: string;
  parentCategoryId: number;
  showWeight: boolean;
}

export interface AllCategoryItems {
  categoryId: number;
  name: string;
  applyFoh: boolean;
  parentCategoryId: number;
  showWeight: boolean;
  showWeightInCode: boolean;
  manpower: number;
  displayOrder: number;
  showInDashboard: boolean;
}
