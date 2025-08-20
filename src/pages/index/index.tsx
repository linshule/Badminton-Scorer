import { View, Text, Button } from '@tarojs/components'
import { useReducer, useEffect ,useRef } from 'react'
import Taro from '@tarojs/taro'
import './index.css'

// 定义更详细的比赛状态
interface GameState {
  player1: { score: number; gamesWon: number };
  player2: { score: number; gamesWon: number };
  servingPlayer: 1 | 2; // 1 或 2, 代表发球方
  winner: 1 | 2 | null; // 单局获胜者
}

// 初始状态
const initialState: GameState = {
  player1: { score: 0, gamesWon: 0 },
  player2: { score: 0, gamesWon: 0 },
  servingPlayer: 1,
  winner: null,
};

// 所有状态变更的逻辑都封装在 reducer 中
function gameReducer(state: GameState, action: { type: string; payload?: any }): GameState {
  switch (action.type) {
    case 'ADD_POINT': {
      // 如果已有胜者，不允许再加分
      if (state.winner) return state;

      const player = action.payload.player as 1 | 2;
      const newState = {
        ...state,
        player1: { ...state.player1 },
        player2: { ...state.player2 }
      };

      if (player === 1) {
        newState.player1.score++;
      } else {
        newState.player2.score++;
      }

      // 根据羽毛球规则判断发球方
      // 得分方发球
      newState.servingPlayer = player;

      // 检查是否有人获胜
      const { score: score1 } = newState.player1;
      const { score: score2 } = newState.player2;

      if (score1 >= 21 && score1 - score2 >= 2) {
        newState.winner = 1;
        newState.player1.gamesWon++;
      } else if (score2 >= 21 && score2 - score1 >= 2) {
        newState.winner = 2;
        newState.player2.gamesWon++;
      } else if (score1 === 30 && score2 === 29) {
        newState.winner = 1;
        newState.player1.gamesWon++;
      } else if (score2 === 30 && score1 === 29) {
        newState.winner = 2;
        newState.player2.gamesWon++;
      }

      return newState;
    }
    case 'SET_STATE': {
      return action.payload;
    }
    case 'EXCHANGE_SIDES': {
        // 交换场地
        const newState = {
          ...state,
          player1: { ...state.player1 },
          player2: { ...state.player2 }
        };
        
        const tempPlayer = newState.player1;
        newState.player1 = newState.player2;
        newState.player2 = tempPlayer;
        // 通常交换场地后发球方也需要根据规则调整，这里简单地反转发球方
        newState.servingPlayer = newState.servingPlayer === 1 ? 2 : 1;
        
        return newState;
    }
    case 'NEXT_GAME': {
      // 开始下一局
      if (!state.winner) return state; // 必须有获胜者才能开始下一局
      return {
        ...initialState,
        player1: { ...initialState.player1, gamesWon: state.player1.gamesWon },
        player2: { ...initialState.player2, gamesWon: state.player2.gamesWon },
        servingPlayer: state.winner, // 获胜方先发球
      };
    }
    case 'RESET_MATCH': {
      // 重置整个比赛
      return initialState;
    }
    default:
      return state;
  }
}

export default function Index() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const historyRef = useRef<GameState[]>([]);

  const { player1, player2, servingPlayer, winner } = state;

  // 手机震动反馈，提升体验
  const vibrate = () => {
    Taro.vibrateShort({ type: 'light' });
  };

  const handleAddPoint = (player: 1 | 2) => {
    vibrate();

    const currentState = {
      player1: { ...state.player1 },
      player2: { ...state.player2 },
      servingPlayer: state.servingPlayer,
      winner: state.winner,
    };
    historyRef.current.push(currentState);

    dispatch({ type: 'ADD_POINT', payload: { player } });
  };

  const handleUndo = () => {
    vibrate();
    const lastState = historyRef.current.pop(); // 取出最后一步
    if (lastState) {
      dispatch({ type: 'SET_STATE', payload: lastState });
    }
  };
  
  const handleExchange = () => {
    vibrate();

    // ✅ 保存当前状态到历史
    const currentState = {
      player1: { ...state.player1 },
      player2: { ...state.player2 },
      servingPlayer: state.servingPlayer,
      winner: state.winner,
    };
    historyRef.current.push(currentState);

    dispatch({ type: 'EXCHANGE_SIDES' });
  };

  const handleNextGame = () => {
    vibrate();
    dispatch({ type: 'NEXT_GAME' });
  };

  const handleResetMatch = () => {
    vibrate();
    Taro.showModal({
      title: '确认',
      content: '确定要重置所有比分和局数吗？',
      success: (res) => {
        if (res.confirm) {
          dispatch({ type: 'RESET_MATCH' });
        }
      }
    })
  };

  // 根据分数判断发球区域（左/右）
  const getServingSide = (score: number) => (score % 2 === 0 ? '右' : '左');

  return (
    <View className='badminton-scorer'>
      {/* 玩家1计分区域 */}
      <View className='player-section player-1' onClick={() => handleAddPoint(1)}>
        <Text className='games-won'>胜局: {player1.gamesWon}</Text>
        <Text className='score'>{player1.score}</Text>
        <View className='player-info'>
          <Text className='player-name'>PLAYER 1</Text>
          {servingPlayer === 1 && !winner && (
            <View className='serving-indicator'>
              <Text>发球 ({getServingSide(player1.score)})</Text>
            </View>
          )}
        </View>
      </View>

      {/* 中间操作栏 */}
      <View className='center-controls'>
        <View className='buttons-row'>
          <Button className='control-btn' onClick={handleUndo}>撤销</Button>
          <Button className='control-btn' onClick={handleExchange}>交换</Button>
        </View>
        <View className='divider-line'></View>
        <View className='buttons-row'>
           {winner ? (
              <Button className='control-btn next-game' onClick={handleNextGame}>下一局</Button>
            ) : (
              <Button className='control-btn reset' onClick={handleResetMatch}>重置</Button>
            )}
        </View>
      </View>

      {/* 玩家2计分区域 */}
      <View className='player-section player-2' onClick={() => handleAddPoint(2)}>
        <Text className='games-won'>胜局: {player2.gamesWon}</Text>
        <Text className='score'>{player2.score}</Text>
        <View className='player-info'>
          <Text className='player-name'>PLAYER 2</Text>
          {servingPlayer === 2 && !winner && (
            <View className='serving-indicator'>
              <Text>发球 ({getServingSide(player2.score)})</Text>
            </View>
          )}
        </View>
      </View>

      {/* 获胜提示 */}
      {winner && false && (
        <View className='winner-overlay'>
          <Text className='winner-text'>PLAYER {winner} 获胜！</Text>
        </View>
      )}
    </View>
  )
}