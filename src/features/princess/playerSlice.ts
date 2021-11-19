import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Board, GameAction, PlayerState } from "./types";

function handleAction(state: PlayerState, action: GameAction) {
  switch (action.type) {
    case "pickup":
      switch (action.jewelName) {
        case "earrings":
          if (state.earrings < 2) {
            state.earrings += 1;
          }
          break;
        default:
          state[action.jewelName] = true;
      }
    case "putdownany":
      break;
    case "pickupany":
      break;
  }
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

const DefaultBoard: Board = [
  { type: "pickup", jewelName: "necklace" },
  { type: "putdownany" },
  { type: "pickup", jewelName: "bracelet" },
  { type: "pickupany" },
  { type: "pickup", jewelName: "ring" },
  { type: "pickup", jewelName: "mysteryRing" },
  { type: "pickup", jewelName: "earrings" },
  { type: "pickup", jewelName: "crown" },
];

// In python we can iterate over enums and other things.  We'll just construct
// an interable version of the enum here
const board = DefaultBoard;

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
    move_to_new: (state, action: PayloadAction<GameAction>) => {},
    move_to: (state, action: PayloadAction<number>) => {
      state.board_position += action.payload;
      state.board_position %= board.length;

      handleAction(state, board[state.board_position]);
    },
  },
});

// I suspect this is a stylistic/bestPractice thing to put this here?  Is there anything that
// prevents me from accessing these state objects in a react view directly?
export const selectPlayerBoardPosition = (state: RootState) =>
  state.player.board_position;
export const selectPlayerState = (state: RootState) => state.player;

export const { move_to } = playerSlice.actions;
export default playerSlice.reducer;
