import { TargetImage } from '@store/useStore';

export interface ServerToClientEvents {
  room_id: (roomId: string) => void;
  opponent_status: (status: boolean) => void;
  opponent_ready: () => void;
  opponent_not_ready: () => void;
  all_ready: () => void;
  not_all_ready: () => void;
  image: (image: TargetImage) => void;
  start_game: () => void;
  user_score: (score: number) => void;
  opponent_score: (score: number) => void;
  code_update: (code: string) => void;
  game_over: () => void;
}

export interface ClientToServerEvents {
  sendMessage: (message: string) => void;
  joinRoom: (roomId: string) => void;
  // Add more events as needed
}
