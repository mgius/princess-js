export interface PlayerState {
  // Each piece of jewelry worn by the player
  bracelet: boolean;
  earrings: 0 | 1 | 2;
  mysteryRing: boolean;
  necklace: boolean;
  ring: boolean;
  crown: boolean;

  // Where the player is on the board
  board_position: number;
}

// This handles actions really cleanly, but feels weird when I integrate into redux.
// Because the thing that redux is going to receive is either the spinner count
// (1-4) or just a directive to "go".  This would make more sense if the redux
// actions were split but splitting the redux action doesn't feel right, making
// a move and doing an action are a single mutation, not separate actions
type PickUpJewelry = {
  type: "pickup";
  jewelName: Exclude<keyof PlayerState, "board_position">;
};

type PickUpAny = {
  type: "pickupany";
};

type PutDownAny = {
  type: "putdownany";
};

export type GameAction = PickUpAny | PickUpJewelry | PutDownAny;

export type Board = GameAction[];
