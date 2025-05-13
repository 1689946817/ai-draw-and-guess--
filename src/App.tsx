import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

type GameState = {
  isDrawing: boolean;
  currentGuess: string | null;
  drawings: Array<{image: string, guess: string}>;
};

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    isDrawing: false,
    currentGuess: null,
    drawings: []
  });
  const [isPainting, setIsPainting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // 初始化画布
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.lineCap = 'round';
  }, []);
  
  // 开始绘画
  const startPainting = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(x, y);
    setIsPainting(true);
  };
  
  // 绘画中
  const paint = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.lineTo(x, y);
    context.stroke();
  };
  
  // 结束绘画
  const stopPainting = () => {
    setIsPainting(false);
  };
  
  // 调用智谱AI API
  const callZhipuAI = async (imageData: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        {
          model: 'glm-4v',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: '请描述这张图片中画的是什么，用简洁的语言回答。'
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageData
                  }
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_ZHIPU_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const guess = response.data.choices[0].message.content;
      return guess;
    } catch (error) {
      console.error('AI识别失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // 提交画作
  const submitDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    try {
      // 将画布转换为base64
      const imageData = canvas.toDataURL('image/png');
      
      // 调用AI API
      const guess = await callZhipuAI(imageData);
      
      // 更新状态
      setGameState(prev => ({
        ...prev,
        currentGuess: guess,
        drawings: [...prev.drawings, { image: imageData, guess }]
      }));
    } catch (error) {
      console.error('提交失败:', error);
    }
  };
  
  // 清空画布
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    setGameState(prev => ({...prev, currentGuess: null}));
  };

  // 处理图片上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          const guess = await callZhipuAI(imageData);
          
          setGameState(prev => ({
            ...prev,
            currentGuess: guess,
            drawings: [...prev.drawings, { image: imageData, guess }]
          }));
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('图片上传失败:', error);
    }
  };

  return (
    <div className="game-container">
      <h1>AI你画我猜</h1>
      <div className="canvas-container">
        <canvas 
          ref={canvasRef} 
          width={600} 
          height={400}
          onMouseDown={startPainting}
          onMouseMove={paint}
          onMouseUp={stopPainting}
          onMouseLeave={stopPainting}
        />
      </div>
      <div style={{ margin: '16px 0' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
        <span style={{ marginLeft: 8, color: '#888' }}>或上传图片让AI识别</span>
      </div>
      <div className="controls">
        <button onClick={clearCanvas}>清空画布</button>
        <button onClick={submitDrawing} disabled={isLoading}>
          {isLoading ? '识别中...' : '提交画作'}
        </button>
      </div>
      {gameState.currentGuess && (
        <div className="guess-result">
          <h3>AI猜测: {gameState.currentGuess}</h3>
          <div className="guess-history">
            <h4>历史猜测:</h4>
            <ul>
              {gameState.drawings.map((drawing, index) => (
                <li key={index}>
                  <p>{drawing.guess}</p>
                  <img src={drawing.image} alt="用户画作" width="100" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default App 