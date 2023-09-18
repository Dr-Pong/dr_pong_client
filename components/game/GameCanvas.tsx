import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Ball,
  Player,
  countdownData,
  gameInit,
  posData,
  roundData,
} from 'types/gameTypes';

import useGameSocket from 'hooks/useGameSocket';

import styles from 'styles/game/PongGame.module.scss';

type GameCanvasProps = {
  canvasHeight: number;
  canvasWidth: number;
};

const drawnFrames: number[] = [];

let timer: NodeJS.Timeout | null = null;
export default function GameCanvas({
  canvasHeight,
  canvasWidth,
}: GameCanvasProps) {
  const [socket] = useGameSocket('game');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = canvasRef.current;
  const context = canvas?.getContext('2d');
  const netWidth = canvasWidth / 35;
  const netHeight = netWidth / 5;
  const netGap = netWidth + 8;
  const netY = canvasHeight / 2 - netHeight / 2;
  const [round, setRound] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [me, setMe] = useState<Player>(initialData);
  const [opponent, setOpponent] = useState<Player>(initialData);
  const [ball, setBall] = useState<Ball>(initialData);
  const [ballPath, setBallPath] = useState<Ball[]>([]);
  const [server, setServer] = useState(false);
  const [countdown, setCountdown] = useState(-1);
  const [playerRatio, setPlayerRatio] = useState<Player>(initialData);
  const [ballWidthRatio, setWidthBallRatio] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  let positions: posData[] = [];
  let isGameEnd = false;

  const gameInitListener = (data: gameInit) => {
    setServer(data.server);
    setRound(data.round);
    setMe({
      x: data.me.x * canvasWidth,
      y: data.me.y * canvasHeight,
      width: data.me.width * canvasWidth,
      height: data.me.height * canvasHeight,
    });
    setOpponent({
      x: data.opponent.x * canvasWidth,
      y: data.opponent.y * canvasHeight,
      width: data.opponent.width * canvasWidth,
      height: data.opponent.height * canvasHeight,
    });
    setMyScore(data.me.score);
    setOpponentScore(data.opponent.score);
    setBall({
      x: data.ball.x * canvasWidth,
      y: data.ball.y * canvasHeight,
      width: data.ball.size * canvasHeight,
      height: data.ball.size * canvasHeight,
    });
    setPlayerRatio({
      x: data.me.x,
      y: data.me.y,
      width: data.me.width,
      height: data.me.height,
    });
    setWidthBallRatio(data.ball.size);
    setRemainingTime(data.gameTime);
  };

  const countdownListener = (data: countdownData) => {
    setCountdown(data.time);
  };

  const updateListener = (data: { data: posData[] }) => {
    if (timer) clearTimeout(timer);
    positions = data.data;
    drawLoop();
  };

  const roundListener = (data: roundData) => {
    if (timer) clearTimeout(timer);
    setServer(data.server);
    setRound(data.round);
    setMyScore(data.me);
    setOpponentScore(data.opponent);
    setBallPath([]);
  };

  const gameEndListener = () => {
    isGameEnd = true;
  };

  useEffect(() => {
    socket.once('gameInit', gameInitListener);
    socket.once('gameEnd', gameEndListener);
    socket.on('time', countdownListener);
    socket.on('roundUpdate', roundListener);
    return () => {
      socket.off('time', countdownListener);
      socket.off('roundUpdate', roundListener);
    };
  }, []);

  useEffect(() => {
    socket.on('posUpdate', updateListener);
    return () => {
      socket.off('posUpdate', updateListener);
    };
  }, [canvasHeight, canvasWidth, me, opponent]);

  const drawNet = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#656887';
    for (let i = 0; i <= canvasWidth; i += netGap) {
      ctx.fillRect(i, netY, netWidth, 1);
    }
  };

  const drawBarBall = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#f868e1';
    ctx.fillRect(me.x - me.width / 2, me.y, me.width, me.height);
    ctx.fillStyle = '#6804c6';
    ctx.fillRect(
      opponent.x - opponent.width / 2,
      opponent.y,
      opponent.width,
      opponent.height
    );
    ctx.beginPath();
    ctx.fillStyle = '#00ff00';
    ctx.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
    ctx.save();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
    afterImage(ballPath, '#00ff00', ctx);
  };

  const drawRound = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '2rem TTLakesNeueTrialRegular';
    ctx.fillStyle = '#49f60d';
    ctx.fillText(`Round ${round}`, canvasWidth / 2 - 70, canvasHeight / 2 - 10);
  };

  const drawArrow = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '2rem TTLakesNeueTrialRegular';
    ctx.fillStyle = '#49f60d';
    ctx.fillText(
      `${server ? '⬇️' : '⬆️'}`,
      canvasWidth / 2 + 70,
      canvasHeight / 2 - 10
    );
  };

  const drawCountdown = (ctx: CanvasRenderingContext2D) => {
    if (countdown) {
      ctx.font = '3rem TTLakesNeueTrialRegular';
      ctx.fillStyle = '#fdde2e';
      ctx.fillText(`${countdown}`, canvasWidth / 2 - 15, canvasHeight / 2 + 55);
    } else {
      ctx.font = '2rem TTLakesNeueTrialRegular';
      ctx.fillStyle = '#f71a6a';
      ctx.fillText('Game Start!!', canvasWidth / 2 - 95, canvasHeight / 2 + 45);
    }
  };

  const drawScore = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '4rem TTLakesNeueTrialRegular';
    ctx.fillStyle = '#656887';
    ctx.fillText(`${opponentScore}`, 20, canvasHeight / 2 - canvasHeight / 4);
    ctx.fillText(`${myScore}`, 20, canvasHeight / 2 + canvasHeight / 4);
  };

  const drawGametime = (ctx: CanvasRenderingContext2D) => {
    const time = remainingTime / 1000;

    ctx.font = '1.2rem TTLakesNeueTrialRegular';
    ctx.fillStyle = '#ffffff';
    if (time <= 0) ctx.fillText(`0.0`, 20, canvasHeight / 2 - 10);
    else if (time < 10)
      ctx.fillText(`${time.toFixed(1)}`, 20, canvasHeight / 2 - 10);
  };

  const draw = () => {
    if (positions.length === 0) {
      return;
    }
    const data = positions[0];
    setMe((prevMe) => ({
      ...prevMe,
      x: data.playerXPos.me * canvasWidth,
      y: playerRatio.y * canvasHeight,
      width: playerRatio.width * canvasWidth,
      height: playerRatio.height * canvasHeight,
    }));
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      x: data.playerXPos.opponent * canvasWidth,
      width: playerRatio.width * canvasWidth,
      height: playerRatio.height * canvasHeight,
    }));
    setBall((prevBall) => {
      return {
        ...prevBall,
        x: data.ballPos.x * canvasWidth,
        y: data.ballPos.y * canvasHeight,
        width: ballWidthRatio * canvasHeight,
        height: ballWidthRatio * canvasHeight,
      };
    });
    if (data.gameTime !== remainingTime) setRemainingTime(data.gameTime);
    const ballSize = ballWidthRatio * canvasHeight;
    setBallPath((prev) => {
      const ballPath = [...prev];
      if (drawnFrames.includes(data.frame)) {
        return ballPath;
      }
      ballPath.push({
        x: data.ballPos.x * canvasWidth,
        y: data.ballPos.y * canvasHeight,
        width: ballSize,
        height: ballSize,
        frame: data.frame,
      });
      if (ballPath.length > 30) {
        ballPath.shift();
      }
      if (drawnFrames.length > 30) {
        drawnFrames.shift();
      }
      drawnFrames.push(data.frame);
      return ballPath;
    });
    positions.shift();
  };

  const drawLoop = () => {
    if (isGameEnd) {
      setBallPath([]);
      return;
    }
    draw();
    timer = setTimeout(drawLoop, 1000 / 60);
  };

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawNet(context);
      drawBarBall(context);
      drawGametime(context);
      drawScore(context);
      if (countdown !== -1) {
        drawRound(context);
        drawCountdown(context);
        drawArrow(context);
      }
    }
  }, [me, opponent, ball, countdown, server, round, myScore, opponentScore]);

  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);
  return (
    <canvas
      className={styles.gameCanvas}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
}

const initialData: Player | Ball = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

const afterImage = (
  ballPath: Ball[],
  ballColor: string,
  ctx: CanvasRenderingContext2D
) => {
  for (let i = 0; i < ballPath.length - 1; i++) {
    const currentBall = ballPath[i];
    const nextBall = ballPath[i + 1];

    for (let j = 0; j < 8; j++) {
      // Calculate interpolation factor and position
      const interpolationFactor = j / 8;
      const interpolatedPosition = {
        x: currentBall.x + (nextBall.x - currentBall.x) * interpolationFactor,
        y: currentBall.y + (nextBall.y - currentBall.y) * interpolationFactor,
      };

      // Calculate ball size based on the interpolation level
      const ballSize =
        (currentBall.width * (i * 8 + j)) / (ballPath.length * 8 - 1);

      // Draw ball
      ctx.beginPath();
      ctx.fillStyle = ballColor;
      ctx.arc(
        interpolatedPosition.x,
        interpolatedPosition.y,
        ballSize / 2,
        0,
        2 * Math.PI
      );
      ctx.save();
      ctx.globalAlpha = 0.1 * ((i * 8 + j) / (ballPath.length * 8 - 1));
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
};
