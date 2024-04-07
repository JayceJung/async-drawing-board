'use client'
import React, { useEffect, useRef } from 'react';

const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>()

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const ctxCanvas = ctx?.canvas; 
    
    if (ctxCanvas) {
      ctxCanvas.height = window.innerHeight;
      ctxCanvas.width = window.innerWidth;
    }

    let isDrawing = false;
    let mx = 0;
    let my = 0;

    canvas?.addEventListener('mousedown', function (e) {
      mx = e.offsetX;
      my = e.offsetY;

      isDrawing = true
    })

    canvas?.addEventListener('mousemove', function (e) {
      if (isDrawing) {
        drawMouse(ctx, mx, my, e.offsetX, e.offsetY);
      }
      mx = e.offsetX;
      my = e.offsetY;
    })

    canvas?.addEventListener('mouseup', function (e) {
      if (isDrawing) {
        drawMouse(ctx, mx, my, e.offsetX, e.offsetY);
        mx = 0;
        my = 0;
        isDrawing = false;
      }
    })

    function drawMouse(ctx: CanvasRenderingContext2D | null | undefined, mx: number, my: number, mx2: number, my2: number) {
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.moveTo(mx, my);
        ctx.lineTo(mx2, my2);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }, [])
  
  return (
    <canvas ref={canvasRef}/>
  )
}

export default Page