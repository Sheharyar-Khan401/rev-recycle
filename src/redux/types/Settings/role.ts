export interface Role {
  roleId: number;
  roleName: string;
  screen?: Screen[];
  screenActions: Array<number>;
  locked: boolean;
}

export interface Permission {
  createdBy: string;
  creationDate: string;
  modifiedBy: string;
  screenActionPermissionsId: number;
  screenActions: Screen;
  status: string;
}

export interface Screen {
  name: string;
  screen: string;
  screenActions?: ScreenAction[];
  screenGroupId: number;
  screenId: number;
  screens?: Array<Screen>;
}
export interface Screens{
  screenActions?: ScreenAction[];
}
export interface ScreenAction {
  name: string;
  screenActionId: number;
  code?: string;
}
