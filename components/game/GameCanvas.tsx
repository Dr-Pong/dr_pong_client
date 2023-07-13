import { useRouter } from 'next/router';

import React, { useEffect, useRef, useState } from 'react';

import {
  Ball,
  Player,
  countdownData,
  gameResult,
  initData,
  posData,
  roundData,
} from 'types/gameTypes';

import useGameSocket from 'hooks/useGameSocket';

import styles from 'styles/game/GameCanvas.module.scss';

type GameCanvasProps = {
  canvasHeight: number;
  canvasWidth: number;
};

export default function GameCanvas({
  canvasHeight,
  canvasWidth
}: GameCanvasProps) {
  const [socket] = useGameSocket('game');
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvas = canvasRef.current;
  const context = canvas?.getContext('2d');
  const netWidth = canvasWidth / 20;
  const netHeight = netWidth / 5;
  const netGap = netWidth + 10;
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
  const [result, setResult] = useState('');
  const [ratio, setRatio] = useState<Player>(initialData);

  const initListener = (data: initData) => {
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
    setBall({
      x: data.ball.x * canvasWidth,
      y: data.ball.y * canvasHeight,
      width: data.ball.size * canvasHeight,
      height: data.ball.size * canvasHeight,
    });
    setRatio({
      x: data.me.x,
      y: data.me.y,
      width: data.me.width,
      height: data.me.height,
    });
  };

  const countdownListener = (data: countdownData) => {
    setCountdown(data.time);
  };

  const updateListener = (data: posData) => {
    let ballSize: number;
    setMe((prevMe) => ({
      ...prevMe,
      x: data.playerXPos.me * canvasWidth,
      y: ratio.y * canvasHeight,
      width: ratio.width * canvasWidth,
      height: ratio.height * canvasHeight
    }));
    setOpponent((prevOpponent) => ({
      ...prevOpponent,
      x: data.playerXPos.opponent * canvasWidth,
      width: ratio.width * canvasWidth,
      height: ratio.height * canvasHeight
    }));
    setBall((prevBall) => {
      ballSize = prevBall.width;
      return {
        ...prevBall,
        x: data.ballPos.x * canvasWidth,
        y: data.ballPos.y * canvasHeight,
      };
    });
    setBallPath((prev) => {
      const ballPath = [...prev];
      ballPath.push({
        x: data.ballPos.x * canvasWidth,
        y: data.ballPos.y * canvasHeight,
        width: ballSize,
        height: ballSize,
      });
      if (ballPath.length > 30) {
        ballPath.shift();
      }
      return ballPath;
    });
  };

  const roundListener = (data: roundData) => {
    setServer(data.server);
    setRound(data.round);
    setMyScore(data.me);
    setOpponentScore(data.opponent);
    setBallPath([]);
  };

  const gameEndListener = (data: gameResult) => {
    setResult(data.result);
  };

  useEffect(() => {
    socket.once('initData', initListener);
    socket.once('gameEnd', gameEndListener);
    socket.on('time', countdownListener);
    socket.on('posUpdate', updateListener);
    socket.on('roundUpdate', roundListener);
    return () => {
      socket.off('time', countdownListener);
      socket.off('posUpdate', updateListener);
      socket.off('roundUpdate', roundListener);
    };
  }, [canvasHeight, canvasWidth, me, opponent]);

  const drawNet = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = 'white';
    for (let i = 0; i <= canvasWidth; i += netGap) {
      ctx.fillRect(i, netY, netWidth, netHeight);
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
    ctx.font = '1.3rem Arial';
    ctx.fillText(`Round: ${round}`, 10, canvasHeight / 2 - 10);
    ctx.font = '1.5rem Arial';
    ctx.fillStyle = '#f868e1';
    ctx.fillText(`${myScore}`, canvasWidth - 30, netY + netHeight + 26);
    ctx.fillStyle = '#6804c6';
    ctx.fillText(`${opponentScore}`, canvasWidth - 30, netY - 10);
  };

  const drawCountdown = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '2rem Arial';
    ctx.fillStyle = '#00ffff';
    countdown === 0
      ? ctx.fillText(
        'Game Start!!',
        canvasWidth / 2 - 80,
        canvasHeight / 2 - 10
      )
      : ctx.fillText(
        `${countdown}`,
        canvasWidth / 2 - 5,
        canvasHeight / 2 - 10
      );
    ctx.font = '2rem Arial';
    ctx.fillStyle = '#ffff00';
    server
      ? ctx.fillText('↓', canvasWidth / 2 - 5, canvasHeight / 2 + 40)
      : ctx.fillText('↑', canvasWidth / 2 - 5, canvasHeight / 2 - 60);
  };

  const drawGameResult = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '5rem Arial';
    ctx.fillStyle = '#00ffff';
    ctx.fillText(result, canvasWidth / 2, canvasHeight / 2);
  };

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawNet(context);
      drawRound(context);
      drawBarBall(context);
      if (countdown !== -1) drawCountdown(context);
      if (result) drawGameResult(context);
    }
  }, [
    me,
    opponent,
    ball,
    countdown,
    server,
    round,
    myScore,
    opponentScore,
    result
  ]);

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

    for (let j = 0; j < 4; j++) {
      // Calculate interpolation factor and position
      const interpolationFactor = (j + 1) / 4;
      const interpolatedPosition = {
        x: currentBall.x + (nextBall.x - currentBall.x) * interpolationFactor,
        y: currentBall.y + (nextBall.y - currentBall.y) * interpolationFactor,
      };

      // Calculate ball size based on the interpolation level
      const ballSize =
        (currentBall.width * (i * 4 + j)) / (ballPath.length * 4 - 1);

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
      ctx.globalAlpha = 0.2 * ((i * 4 + j) / (ballPath.length * 4 - 1));
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  }
};
