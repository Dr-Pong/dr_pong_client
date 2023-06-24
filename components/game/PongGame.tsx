import React, { useRef, useEffect, useState } from 'react';

import GameCanvas from 'components/game/GameCanvas';

import { RoomType, Player, Ball } from 'types/gameTypes';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/game/PongGame.module.scss';

export const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export const DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};

type PongGameProps = {
  roomType: RoomType;
  roomId: string;
};

const PongGame = ({ roomType, roomId }: PongGameProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const [round, setRound] = useState(0);
  const [color, setColor] = useState('#8c52ff');
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [winner, setWinner] = useState('');
  const rounds = [1, 2, 3, 4, 5];
  const colors = ['#8c52ff', '#00ff00', '#ff0000', '#ffff00', '#00ffff'];
  const canvasHeight = window.innerHeight * 0.7;
  const canvasWidth = canvasHeight * 0.6;
  const [player, setPlayer] = useState<Player>({
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    move: DIRECTION.IDLE,
    speed: 5,
  });
  const [ai, setAI] = useState<Player>({
    x: 0,
    y: 0,
    width: 100,
    height: 10,
    move: DIRECTION.IDLE,
    speed: 2,
  });
  const [ball, setBall] = useState<Ball>({
    x: 0,
    y: 0,
    width: 10,
    height: 10,
    moveX: DIRECTION.IDLE,
    moveY: DIRECTION.IDLE,
    speed: 4,
  });

  const handleKeydown = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'ArrowLeft') {
      setPlayer((prevPlayer) => ({ ...prevPlayer, move: DIRECTION.LEFT }));
    }
    if (key === 'ArrowRight') {
      setPlayer((prevPlayer) => ({ ...prevPlayer, move: DIRECTION.RIGHT }));
    }
    // gameSocket?.emit("keypress", { roomId: roomId, key: key });
  };

  const handleKeyup = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      setPlayer((prevPlayer) => ({ ...prevPlayer, move: DIRECTION.IDLE }));
    }
    // gameSocket?.emit("keyrelease", { roomId: roomId, key: key });
  };

  const handleTouchStart = (e: TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touchX = e.touches[0].clientX;
    const canvasRect = canvas.getBoundingClientRect();
    const canvasX = touchX - canvasRect.left;
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      move: canvasX <= canvasWidth / 2 ? DIRECTION.LEFT : DIRECTION.RIGHT
    }));
  };

  const handleTouchEnd = () => {
    setPlayer((prevPlayer) => ({
      ...prevPlayer,
      move: DIRECTION.IDLE,
    }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isTouchScreen) {
      canvas.addEventListener('touchstart', handleTouchStart);
      canvas.addEventListener('touchend', handleTouchEnd);
    } else {
      document.addEventListener('keydown', handleKeydown);
      document.addEventListener('keyup', handleKeyup);
    }

    return () => {
      if (isTouchScreen) {
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchend', handleTouchEnd);
      } else {
        document.removeEventListener('keydown', handleKeydown);
        document.removeEventListener('keyup', handleKeyup);
      }
    };
  }, []);

  useEffect(() => {
    const ctx = context;
    if (ctx) {
      const update = () => {
        // Move player
        setPlayer((prevPlayer) => {
          const newX =
            prevPlayer.x +
            (prevPlayer.move === DIRECTION.LEFT ? -prevPlayer.speed :
              prevPlayer.move === DIRECTION.RIGHT ? prevPlayer.speed : 0);
          if (newX < -(player.width / 2) ||
            newX > window.innerWidth * 0.8 - (player.width / 2))
            return prevPlayer;
          const newPlayer = { ...prevPlayer, x: newX };
          return newPlayer;
        });

        // Move ball
        setBall((prevBall) => {
          const newBall = { ...prevBall };
          if (newBall.moveX === DIRECTION.LEFT) newBall.x -= newBall.speed;
          if (newBall.moveX === DIRECTION.RIGHT) newBall.x += newBall.speed;
          if (newBall.moveY === DIRECTION.UP) newBall.y -= newBall.speed;
          if (newBall.moveY === DIRECTION.DOWN) newBall.y += newBall.speed;
          return newBall;
        });

        setAI((prevAI) => {
          const newAI = { ...prevAI };
          if (newAI.x < ball.x) newAI.x += newAI.speed;
          if (newAI.x > ball.x) newAI.x -= newAI.speed;
          return newAI;
        });

        // Ball collision with player
        if (
          ball.x + ball.width >= player.x &&
          ball.x <= player.x + player.width &&
          ball.y + ball.height >= player.y &&
          ball.y <= player.y + player.height &&
          ball.moveY === DIRECTION.DOWN
        ) {
          if (ball.x >= player.x + player.width / 2 - 10)
            ball.moveX = DIRECTION.RIGHT;
          if (ball.x <= player.x + player.width / 2 - 10)
            ball.moveX = DIRECTION.LEFT;
          ball.moveY = DIRECTION.UP;
        }

        // Ball collision with AI
        if (
          ball.x + ball.width >= ai.x &&
          ball.x <= ai.x + ai.width &&
          ball.y + ball.height >= ai.y &&
          ball.y <= ai.y + ai.height &&
          ball.moveY === DIRECTION.UP
        ) {
          if (ball.x >= ai.x + ai.width / 2 - 10) ball.moveX = DIRECTION.RIGHT;
          if (ball.x <= ai.x + ai.width / 2 - 10) ball.moveX = DIRECTION.LEFT;
          ball.moveY = DIRECTION.DOWN;
        }

        // Ball collision with walls
        if (ball.x <= 0 || ball.x + ball.width >= canvasWidth) {
          ball.moveX = ball.moveX ===
            DIRECTION.LEFT ? DIRECTION.RIGHT : DIRECTION.LEFT;
        }

        // Ball out of bounds
        if (ball.y <= 0 || ball.y + ball.height >= canvasHeight) {
          setRound((prevRound) => prevRound + 1);
          if (ball.y <= 0) setPlayerScore((prevScore) => prevScore + 1);
          else setAiScore((prevScore) => prevScore + 1);
          if (rounds[round] >= rounds.length) {
            setWinner(playerScore > aiScore ? 'Player' : 'AI');
            setOver(true);
            setRunning(false);
          } else {
            // Reset ball position
            setBall((prevBall) => ({
              ...prevBall,
              x: canvasWidth / 2 - prevBall.width / 2,
              y: canvasHeight / 2 - prevBall.height / 2,
              moveX: Math.random() > 0.5 ? DIRECTION.LEFT : DIRECTION.RIGHT,
              moveY: Math.random() > 0.5 ? DIRECTION.UP : DIRECTION.DOWN,
            }));
          }
        }
      };

      if (running && !over) {
        const gameInterval = setInterval(update, 1000 / 60);
        return () => clearInterval(gameInterval);
      }
    }
  }, [context, player, ai, ball, running, over, round, color]);

  const setField = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      setContext(ctx);

      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        x: canvasWidth / 2 - prevPlayer.width / 2,
        y: canvasHeight - prevPlayer.height - 10,
      }));

      setAI((prevAI) => ({
        ...prevAI,
        x: canvasWidth / 2 - prevAI.width / 2,
        y: 10,
      }));

      setBall((prevBall) => ({
        ...prevBall,
        x: canvasWidth / 2 - prevBall.width / 2,
        y: canvasHeight / 2 - prevBall.height / 2,
        moveX: Math.random() > 0.5 ? DIRECTION.LEFT : DIRECTION.RIGHT,
        moveY: Math.random() > 0.5 ? DIRECTION.UP : DIRECTION.DOWN,
      }));
    }
  };

  const reset = () => {
    setAiScore(0);
    setPlayerScore(0);
    setWinner('');
    setField();
  };

  const startGame = () => {
    reset();
    setRunning(true);
    setOver(false);
    setRound(0);
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className={styles.pongGame}>
      <GameCanvas
        canvasRef={canvasRef}
        player={player}
        ai={ai}
        ball={ball}
        round={rounds[round]}
        playerScore={playerScore}
        aiScore={aiScore}
        winner={winner}
        color={color}
      />
      {((!running && !over) || over) && (
        <BasicButton style='basic' color='pink' handleButtonClick={startGame}>
          Game Start
        </BasicButton>
      )}
    </div>
  );
};

export default PongGame;
