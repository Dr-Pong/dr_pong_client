import { useState, useEffect, useRef, MutableRefObject } from 'react';

import { useRouter } from 'next/router';

import useGameSocket from 'hooks/useGameSocket';

import {
  Player,
  Ball,
  posData,
  roundData,
  initData,
  countdownData,
  gameResult
} from 'types/gameTypes';

import styles from 'styles/game/GameCanvas.module.scss';

export default function GameCanvas() {
  const [socket] = useGameSocket('game');
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasHeight = window.innerHeight * 0.7;
  const canvasWidth = canvasHeight * 0.625;
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
  const [server, setServer] = useState(false);
  const [countdown, setCountdown] = useState(-1);
  const [result, setResult] = useState('');

  const initListener = (data: initData) => {
    setServer(data.server);
    setRound(data.round);
    setMe({
      x: data.me.x * canvasWidth,
      y: data.me.y * canvasHeight,
      width: data.me.width * canvasWidth,
      height: data.me.height * canvasHeight
    });
    setOpponent({
      x: data.opponent.x * canvasWidth,
      y: data.opponent.y * canvasHeight,
      width: data.opponent.width * canvasWidth,
      height: data.opponent.height * canvasHeight
    })
    setBall({
      x: data.ball.x * canvasWidth,
      y: data.ball.y * canvasHeight,
      width: data.ball.size * canvasHeight,
      height: data.ball.size * canvasHeight
    });
  };

  const countdownListener = (data: countdownData) => {
    setCountdown(data.time);
  }

  const updateListener = (data: posData) => {
    setMe((prevMe) => ({
      ...prevMe,
      x: data.playerXPos.me * canvasWidth
    }));
    setOpponent((prevMe) => ({
      ...prevMe,
      x: data.playerXPos.opponent * canvasWidth
    }));
    setBall((prevBall) => ({
      ...prevBall,
      x: data.ballPos.x * canvasWidth,
      y: data.ballPos.y * canvasHeight
    }));
  };

  const roundListener = (data: roundData) => {
    setServer(data.server);
    setRound(data.round);
    setMyScore(data.me);
    setOpponentScore(data.opponent);
  };

  const gameEndListener = (data: gameResult) => {
    setResult(data.result);
    setTimeout(() => {
      router.push('/game');
    }, 2000);
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
    }
  }, []);

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
    ctx.fillRect(opponent.x - opponent.width / 2, opponent.y, opponent.width, opponent.height);
    ctx.beginPath();
    ctx.fillStyle = '#00ff00';
    ctx.arc(ball.x, ball.y, ball.width / 2, 0, 2 * Math.PI);
    ctx.save();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
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
      ? ctx.fillText('Game Start!!', canvasWidth / 2 - 80, canvasHeight / 2 - 10)
      : ctx.fillText(`${countdown}`, canvasWidth / 2 - 5, canvasHeight / 2 - 10);
    ctx.font = '2rem Arial';
    ctx.fillStyle = '#ffff00';
    server
      ? ctx.fillText('↓', canvasWidth / 2 - 5, canvasHeight / 2 + 40)
      : ctx.fillText('↑', canvasWidth / 2 - 5, canvasHeight / 2 - 60);
  };

  const drawGameResult = (ctx: CanvasRenderingContext2D) => {
    ctx.font = '5rem Arial';
    ctx.fillStyle = '#00ffff';
    ctx.fillText(result, canvasWidth / 2, canvasHeight / 2)
  }

  useEffect(() => {
    if (context) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      drawNet(context);
      drawRound(context);
      drawBarBall(context);
      if (countdown !== -1)
        drawCountdown(context);
      if (result)
        drawGameResult(context);
    }
  }, [me, opponent, ball, countdown, server, round, myScore, opponentScore, result]);

  return (
    <canvas
      className={styles.gameCanvas}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};

const initialData: Player | Ball = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};
