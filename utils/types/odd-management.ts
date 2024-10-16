 

export interface IOddTypeSelection {
    selection: number;
    hit: number;
    odd: number;
  }
   
 export enum OddType {
    Kiron,
  Mohio2,
  Type1,
  Type2,
  Promo6,
  Promo5,
  Promo4,
  Promo3,
  Promo2,
  Promo,
  Mohio,
  }
  

  export interface IOddTypeWithSelection  {type: OddType | any, values: IOddTypeSelection[]}


  export interface IOddManagementResponse {
    defaultProvider: OddType | any;
    shopsWithOddType: {
        id: string,
        name: string,
        identifier: string,
        oddType: OddType | any,
        agentId?: string
    }[],
    agents: {
        id: string,
        firstName: string,
        lastName: string
    }[],
    oddTypes: IOddTypeWithSelection[]
  }