import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isPartiallyEmittedExpression } from "typescript";
import { RootState, AppThunk } from "../../app/store";

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

// Each board space is unique.  on the real board there are two identical halves
// of the board, each containing one of these unique spaces
// Also a plus to python, you can access the "name" of the enum.
enum BoardSpaces {
  NECKLACE = "Necklace",
  PUT_BACK = "Put Back Jewelry",
  BRACELET = "Bracelet",
  TAKE_ANY_PIECE = "Take Any Piece",
  RING = "Ring",
  MYSTERY_RING = "Mystery Ring",
  EARRING = "Earring",
  CROWN = "Crown",
}

// In python we can iterate over enums and other things.  We'll just construct
// an interable version of the enum here
const board = [
  BoardSpaces.NECKLACE,
  BoardSpaces.PUT_BACK,
  BoardSpaces.BRACELET,
  BoardSpaces.TAKE_ANY_PIECE,
  BoardSpaces.RING,
  BoardSpaces.MYSTERY_RING,
  BoardSpaces.EARRING,
  BoardSpaces.CROWN,
];

// Each Player has a position on the board and a number of unique jewelry pieces which may or may not be worn
const initialState: PlayerState = {
  board_position: 0,
  bracelet: false,
  earrings: 0,
  mysteryRing: false,
  necklace: false,
  ring: false,
  crown: false,
};

// If a redux "store" is your SQL Database, a "slice" is a Table.  It manages a specific subset of your total state.
// In this case, it's managing an individual player.  I'll likely lift this up into more players "soon"
export const playerSlice = createSlice({
  name: "player",
  initialState: initialState,
  reducers: {
    // This will likely grow more complicated, but for now let's just move around the board.
    move_to: (state, action: PayloadAction<number>) => {
      state.board_position += action.payload;
      state.board_position %= board.length;

      switch (positionToType(state.board_position)) {
        case BoardSpaces.NECKLACE:
          state.necklace = true;
          break;
        case BoardSpaces.BRACELET:
          state.bracelet = true;
          break;
        case BoardSpaces.RING:
          state.ring = true;
          break;
        case BoardSpaces.MYSTERY_RING:
          state.mysteryRing = true;
          break;
        case BoardSpaces.EARRING:
          if (state.earrings < 2) {
            state.earrings += 1;
          }
          break;
        case BoardSpaces.CROWN:
          state.crown = true;
          break;
        case BoardSpaces.TAKE_ANY_PIECE:
        case BoardSpaces.PUT_BACK:
          break;
      }
    },
  },
});

// I suspect this is a stylistic/bestPractice thing to put this here?  Is there anything that
// prevents me from accessing these state objects in a react view directly?
export const selectPlayerBoardPosition = (state: RootState) =>
  state.player.board_position;
export const selectPlayerState = (state: RootState) => state.player;
export const positionToType = (position: number) =>
  board[position % board.length];

export const { move_to } = playerSlice.actions;
export default playerSlice.reducer;
