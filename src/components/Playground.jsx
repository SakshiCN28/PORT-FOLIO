import React, { useState, useEffect, useRef } from 'react';
import { Smile, Frown, Meh, Play, Square, Settings } from 'lucide-react';

export default function Playground() {
  // --- Sentiment Analyzer State ---
  const [sentimentText, setSentimentText] = useState('');
  const [sentimentScores, setSentimentScores] = useState({ pos: 0, neu: 100, neg: 0 });
  const [activeSentiment, setActiveSentiment] = useState('neutral');

  // Lexicon rules from legacy static code
  const posWords = ['good', 'great', 'awesome', 'excellent', 'amazing', 'love', 'happy', 'cool', 'smart', 'outstanding', 'best', 'science', 'ml', 'ai', 'intelligent', 'beautiful', 'fun', 'react', 'tailwind'];
  const negWords = ['bad', 'fail', 'error', 'sad', 'hate', 'worst', 'poor', 'wrong', 'horrible', 'broken', 'bug', 'hard', 'ugly', 'useless', 'terrible', 'slow', 'legacy'];

  useEffect(() => {
    const text = sentimentText.toLowerCase().trim();
    if (text === '') {
      setSentimentScores({ pos: 0, neu: 100, neg: 0 });
      setActiveSentiment('neutral');
      return;
    }

    const words = text.split(/\W+/);
    let posCount = 0;
    let negCount = 0;

    words.forEach(word => {
      if (posWords.includes(word)) posCount++;
      if (negWords.includes(word)) negCount++;
    });

    const total = posCount + negCount;
    let pScore = 0.2; // base defaults
    let nScore = 0.1;

    if (total > 0) {
      pScore = posCount / total;
      nScore = negCount / total;
    } else if (text.length > 5) {
      pScore = 0.35;
      nScore = 0.15;
    }

    const rawPos = Math.round(pScore * 100);
    const rawNeg = Math.round(nScore * 100);
    const rawNeu = 100 - rawPos - rawNeg;

    const finalPos = Math.max(0, Math.min(100, rawPos));
    const finalNeg = Math.max(0, Math.min(100, rawNeg));
    const finalNeu = Math.max(0, Math.min(100, rawNeu));

    setSentimentScores({ pos: finalPos, neu: finalNeu, neg: finalNeg });

    if (finalPos > finalNeu && finalPos >= finalNeg) {
      setActiveSentiment('positive');
    } else if (finalNeg > finalNeu && finalNeg >= finalPos) {
      setActiveSentiment('negative');
    } else {
      setActiveSentiment('neutral');
    }
  }, [sentimentText]);


  // --- Neural Net Simulator State ---
  const [networkType, setNetworkType] = useState('dnn');
  const [learningRate, setLearningRate] = useState('0.01');
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [loss, setLoss] = useState('N/A');
  const [accuracy, setAccuracy] = useState('N/A');
  const [statusText, setStatusText] = useState('Idle');

  const chartRef = useRef(null);
  const intervalRef = useRef(null);
  const historyLossRef = useRef([]);
  const historyValLossRef = useRef([]);

  // Draw static grids
  const drawGrid = (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;

    // Horizontals
    for (let y = 20; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(w - 15, y);
      ctx.stroke();
    }
    // Verticals
    for (let x = 30; x < w; x += 45) {
      ctx.beginPath();
      ctx.moveTo(x, 10);
      ctx.lineTo(x, h - 20);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(30, 10);
    ctx.lineTo(30, h - 20);
    ctx.lineTo(w - 15, h - 20);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '9px monospace';
    ctx.fillText('Loss', 5, 14);
    ctx.fillText('Epochs', w - 40, h - 5);
  };

  const updateChart = () => {
    const canvas = chartRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    drawGrid(ctx, w, h);

    const paddingLeft = 30;
    const paddingRight = 15;
    const paddingTop = 10;
    const paddingBottom = 20;

    const plotW = w - paddingLeft - paddingRight;
    const plotH = h - paddingTop - paddingBottom;

    const lossHist = historyLossRef.current;
    const valLossHist = historyValLossRef.current;
    if (lossHist.length === 0) return;

    // Draw training loss (Cyan)
    ctx.strokeStyle = 'hsl(185, 90%, 45%)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < lossHist.length; i++) {
      const x = paddingLeft + (i / 100) * plotW;
      const y = paddingTop + plotH - (lossHist[i] / 1.0) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Draw validation loss (Violet, dashed)
    ctx.strokeStyle = 'hsl(265, 85%, 60%)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([2, 2]);
    ctx.beginPath();
    for (let i = 0; i < valLossHist.length; i++) {
      const x = paddingLeft + (i / 100) * plotW;
      const y = paddingTop + plotH - (valLossHist[i] / 1.0) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
  };

  useEffect(() => {
    // Initial draw
    const canvas = chartRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 180;
      const ctx = canvas.getContext('2d');
      drawGrid(ctx, canvas.width, canvas.height);
    }
  }, []);

  const handleTrainToggle = () => {
    if (isTraining) {
      stopTraining();
    } else {
      startTraining();
    }
  };

  const startTraining = () => {
    setIsTraining(true);
    setStatusText('Training...');
    historyLossRef.current = [];
    historyValLossRef.current = [];
    setEpoch(0);

    const lr = parseFloat(learningRate);
    const stepRate = lr * (networkType === 'cnn' ? 1.4 : networkType === 'dnn' ? 1.0 : 0.75);
    const maxEpochs = 100;
    let curEpoch = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      curEpoch++;
      
      const decay = Math.exp(-curEpoch * stepRate * 0.15);
      const computedLoss = 0.8 * decay + 0.05 + (Math.random() * 0.02);
      const computedValLoss = 0.85 * decay + 0.08 + (Math.random() * 0.04);
      let computedAcc = (1 - computedLoss * 0.8) * 100;
      if (computedAcc > 98) computedAcc = 98 + Math.random() * 1.5;

      historyLossRef.current.push(computedLoss);
      historyValLossRef.current.push(computedValLoss);

      setEpoch(curEpoch);
      setLoss(computedLoss.toFixed(4));
      setAccuracy(`${computedAcc.toFixed(1)}%`);
      
      updateChart();

      if (curEpoch >= maxEpochs) {
        clearInterval(intervalRef.current);
        setIsTraining(false);
        setStatusText('Completed');
      }
    }, 45);
  };

  const stopTraining = () => {
    clearInterval(intervalRef.current);
    setIsTraining(false);
    setStatusText('Interrupted');
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <section id="playground" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative inline-block">
            AI Playground
            <span className="absolute bottom-[-8px] left-0 w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mt-4">
            Interact with lightweight algorithms running in real-time inside your browser environment.
          </p>
        </div>

        {/* Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Widget 1: Sentiment Analyzer */}
          <div className="glass-card rounded-2xl p-6 flex flex-col h-full">
            <div className="mb-6 border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Smile className="w-5 h-5 text-accent animate-pulse" />
                NLP Sentiment Analyzer
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Type a sentence to run a real-time token-matching lexical analysis on client-side state.
              </p>
            </div>

            <textarea
              value={sentimentText}
              onChange={(e) => setSentimentText(e.target.value)}
              placeholder="Type something here... (e.g. 'This AI portfolio is absolutely amazing and fun to use!')"
              className="w-full h-32 bg-black/25 border border-white/10 rounded-xl p-4 text-slate-100 placeholder-slate-500 font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none mb-6"
            />

            <div className="grid grid-cols-3 gap-3 mt-auto">
              
              {/* Positive Card */}
              <div className={`p-4 rounded-xl text-center border transition-all duration-300 ${activeSentiment === 'positive' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]' : 'bg-white/2 border-white/5 text-slate-400'}`}>
                <Smile className="w-8 h-8 mx-auto mb-2 text-emerald-400" />
                <div className="text-xs font-bold uppercase tracking-wider">Positive</div>
                <div className="text-xs font-mono mt-1 font-semibold">{sentimentScores.pos}%</div>
              </div>

              {/* Neutral Card */}
              <div className={`p-4 rounded-xl text-center border transition-all duration-300 ${activeSentiment === 'neutral' ? 'bg-sky-500/10 border-sky-500 text-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.15)]' : 'bg-white/2 border-white/5 text-slate-400'}`}>
                <Meh className="w-8 h-8 mx-auto mb-2 text-sky-400" />
                <div className="text-xs font-bold uppercase tracking-wider">Neutral</div>
                <div className="text-xs font-mono mt-1 font-semibold">{sentimentScores.neu}%</div>
              </div>

              {/* Negative Card */}
              <div className={`p-4 rounded-xl text-center border transition-all duration-300 ${activeSentiment === 'negative' ? 'bg-rose-500/10 border-rose-500 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]' : 'bg-white/2 border-white/5 text-slate-400'}`}>
                <Frown className="w-8 h-8 mx-auto mb-2 text-rose-400" />
                <div className="text-xs font-bold uppercase tracking-wider">Negative</div>
                <div className="text-xs font-mono mt-1 font-semibold">{sentimentScores.neg}%</div>
              </div>
            </div>
          </div>

          {/* Widget 2: Neural Net training simulator */}
          <div className="glass-card rounded-2xl p-6 flex flex-col h-full">
            <div className="mb-6 border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-secondary" />
                Neural Net Model Simulator
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Configure hyperparameters and simulate convergence validation rates in real-time.
              </p>
            </div>

            {/* Hyperparameters Controls */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Net Type</span>
                <select
                  disabled={isTraining}
                  value={networkType}
                  onChange={(e) => setNetworkType(e.target.value)}
                  className="bg-black/35 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-secondary cursor-pointer disabled:opacity-50"
                >
                  <option value="linear">Linear Logic</option>
                  <option value="dnn">Dense MLP</option>
                  <option value="cnn">Deep CNN</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Learn Rate</span>
                <select
                  disabled={isTraining}
                  value={learningRate}
                  onChange={(e) => setLearningRate(e.target.value)}
                  className="bg-black/35 border border-white/10 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-secondary cursor-pointer disabled:opacity-50"
                >
                  <option value="0.1">0.1 (Fast)</option>
                  <option value="0.01">0.01 (Normal)</option>
                  <option value="0.001">0.001 (Slow)</option>
                </select>
              </div>

              <div className="flex items-end justify-end">
                <button
                  onClick={handleTrainToggle}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${isTraining ? 'bg-gradient-to-r from-accent to-rose-600 text-white hover:shadow-lg hover:shadow-accent/20' : 'bg-gradient-to-r from-primary to-violet-600 text-white hover:shadow-lg hover:shadow-primary/20'}`}
                >
                  {isTraining ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-white" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Train
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Simulated training graph canvas */}
            <div className="h-44 bg-black/25 border border-white/10 rounded-xl relative overflow-hidden mb-6 flex-grow">
              <canvas ref={chartRef} className="absolute inset-0 w-full h-full" />
            </div>

            {/* Convergence details */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-6 font-mono text-[11px] text-slate-400">
                <div>Epoch: <span className="text-secondary">{epoch}</span>/100</div>
                <div>Loss: <span className="text-secondary">{loss}</span></div>
                <div>Accuracy: <span className="text-secondary">{accuracy}</span></div>
              </div>
              <div className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${statusText === 'Training...' ? 'bg-secondary/15 text-secondary animate-pulse' : statusText === 'Completed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-500/15 text-slate-400'}`}>
                {statusText}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
