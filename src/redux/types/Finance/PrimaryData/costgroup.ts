export interface CostGroupType {
  costGroupTypeId: number;
  name: string;
}
export interface CostGroup {
  costGroupId: number;
  name: string;
  status?: string;
  parentCostgroupId?: number;
  costgrouptype?: CostGroupType;
  costgroup?: CostGroupRequest;
}

export interface CostGroupRequest {
  costGroupId?: number;
  parentCostgroupId?: number;
  costgrouptypeId?: number;
  costGroupTypeId?: number;
  name?: string;
}
