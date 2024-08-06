export interface ServerToClientEvents {
  room_id: (roomId: string) => void;
  opponent_status: (opponentReady: boolean | undefined) => void;
  opponent_ready: () => void;
  opponent_not_ready: () => void;
  all_ready: () => void;
  not_all_ready: () => void;
  image: (targetImage: TargetImage | null) => void;
  start_game: () => void;
  user_score: (score: number) => Promise<void>;
  opponent_score: (score: number) => Promise<void>;
  code_update: (opponentCode: string) => void;
  game_over: () => void;
}

export interface ClientToServerEvents {
  create_room: () => void;
  join_room: (roomId: string) => void;
  ready: () => void;
  start_game: () => void;
  code_submit: (code: string) => void;
  code_update: (code: string) => void;
}
