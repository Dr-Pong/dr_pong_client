import { MutableRefObject } from 'react';

import { Player, Ball } from 'types/gameTypes';

import styles from 'styles/game/GameCanvas.module.scss';

type GameCanvasProps = {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  player: Player;
  ai: Player;
  ball: Ball;
  round: number;
  playerScore: number;
  aiScore: number;
  winner: string;
  ballColor: string;
};

export default function GameCanvas(gameCanvasProps: GameCanvasProps) {
  const {
    canvasRef, player, ai, ball, round, playerScore, aiScore, winner, ballColor
  }: GameCanvasProps = gameCanvasProps;
  const canvasHeight = window.innerHeight * 0.7;
  const canvasWidth = canvasHeight * 0.6;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  const netWidth = canvasWidth / 20;
  const netHeight = 4;
  const netGap = netWidth + 10;
  const netY = canvasHeight / 2 - netHeight / 2;

  if (ctx) {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw net
    ctx.fillStyle = 'white';
    for (let i = 0; i <= canvasWidth; i += netGap) {
      ctx.fillRect(i, netY, netWidth, netHeight);
    }

    // Draw player
    ctx.fillStyle = '#f868e1';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Draw AI
    ctx.fillStyle = '#6804c6';
    ctx.fillRect(ai.x, ai.y, ai.width, ai.height);

    // Draw ball
    ctx.fillStyle = ballColor;
    ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

    // Display round
    ctx.font = '1.3rem Arial';
    ctx.fillText(round ? `Round: ${round}` : `Winner: ${winner}`, 10, canvasHeight / 2 - 10);

    // Display Score
    ctx.font = '1.5rem Arial';
    ctx.fillStyle = '#f868e1';
    ctx.fillText(`${playerScore}`, canvasWidth - 20, netY + netHeight + 26);
    ctx.fillStyle = '#6804c6';
    ctx.fillText(`${aiScore}`, canvasWidth - 20, netY - 10);
  }

  return (
    <canvas
      className={styles.gameCanvas}
      ref={canvasRef}
      width={canvasWidth}
      height={canvasHeight}
    />
  );
};
