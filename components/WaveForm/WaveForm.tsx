import React, { useRef, useEffect } from "react";
import useSize from "../../hooks/useSize";
interface WaveFormProps {
  analyzerData: {
    dataArray: Uint8Array;
    analyzer: AnalyserNode;
    bufferLength: number;
  };
}

const WaveForm: React.FC<WaveFormProps> = ({ analyzerData }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { dataArray, analyzer, bufferLength } = analyzerData;
  const [width, height] = useSize();

  function animateBars(
    analyser: AnalyserNode,
    canvas: HTMLCanvasElement,
    canvasCtx: CanvasRenderingContext2D,
    dataArray: Uint8Array,
    bufferLength: number
  ) {
    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "#FF0000";

    const HEIGHT = canvas.height / 2;

    var barWidth = Math.ceil((canvas.width / bufferLength) * 2.5);
    let barHeight;
    let x = 0;

    for (var i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * HEIGHT;
      const blueShade = Math.floor((dataArray[i] / 255) * 5);
      const blueHex = ["#FF0000", "#FF0000", "#FF0000", "#419de6", "#20232a"][
        blueShade
        ];
      canvasCtx.fillStyle = blueHex;
      canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

      x += barWidth + 1;
    }
  }


  const draw = (
    dataArray: Uint8Array,
    analyzer: AnalyserNode,
    bufferLength: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");

    const animate = () => {
      requestAnimationFrame(animate);

      canvasCtx?.translate(0, canvas.offsetHeight / 2 - 115);
      animateBars(analyzer, canvas, canvasCtx!, dataArray, bufferLength);
    };

    animate();
  };

  useEffect(() => {
    draw(dataArray, analyzer, bufferLength);
  }, [dataArray, analyzer, bufferLength]);

  return (
    <canvas
      // style={{
      //   top: "0",
      //   left: "0",
      //   zIndex: "-10",
      // }}
      ref={canvasRef}
      className={' w-96 h-full z-10'}
    />
  );
};

export default WaveForm;
