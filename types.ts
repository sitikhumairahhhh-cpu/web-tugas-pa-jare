
export enum BraceletMetal {
  SILVER = 'Perak S925',
  GOLD = 'Emas 18K',
  ROSE_GOLD = 'Rose Gold',
  BLACK_STEEL = 'Black Steel'
}

export enum CordStyle {
  CLASSIC_CHAIN = 'Classic Chain',
  MINIMAL_ROPE = 'Minimalist Rope',
  LEATHER_BRAID = 'Leather Braid',
  MILANESE_LOOP = 'Milanese Loop'
}

export enum OrderType {
  SINGLE = 'SINGLE',
  COUPLE = 'COUPLE'
}

export interface SingleBraceletState {
  image: string | null;
  metal: BraceletMetal;
  cord: CordStyle;
  size: number;
  caption: string;
  transform: {
    scale: number;
    x: number;
    y: number;
  };
}

export interface CustomizationState {
  bracelets: [SingleBraceletState, SingleBraceletState];
  activeIndex: number;
  orderType: OrderType;
}

export interface Testimonial {
  name: string;
  review: string;
  date: string;
}
