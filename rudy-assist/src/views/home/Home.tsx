import './Home.css';
import { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import Markdown from 'react-markdown';

interface HistoryType {
  role: string;
  text: string;
}

interface ModelType {
  value: string;
  label: string;
}

export default function ChatApp() {
  const [modelOptions, setModelOptions] = useState([]);
  const [model, setModel] = useState<ModelType>();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryType[]>([]);
  const msgBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = msgBoxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  useEffect(() => {
    fetchModels();
  },[]);

  const fetchModels = async () => {
    const resp = await fetch('http://localhost:3000/api/models', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    const res = await resp.json();
    const options = res.AIModels.map((item:any) => {
      return { value: item.id, label: item.name };
    });
    setModelOptions(options);

    setModel(options[0]); // 默认选中第一个模型
  }

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setHistory(h => [...h, userMsg]);
    setInput('');

    // 调用后端
    const resp = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userInput: input,
        modelId: model?.value
      }),
    });
    const { search, answer } = await resp.json();
    setHistory((h) => [...h, { role: 'network', text: search }, { role: 'assistant', text: answer }]);
  };

  const OnChangeModel = (selectedOption: any) => {
    setModel(selectedOption);
    console.log("Selected model:", model);
  }

  return (    
    <div className='container'>      
      <Select
        options={modelOptions}
        value={model}        
        onChange={OnChangeModel}
        styles={{ container: (p) => ({ ...p, marginBottom: 10, width: 500 }) }}
      />
      
      <div className='msg-box' ref={msgBoxRef}>
        {history.map((m, i) => (
          <div key={i} style={{ margin: '10px 0'}}>
            <b style={{color: 'blue'}}>{m.role}:</b> 
            <Markdown>{m.text}</Markdown>
          </div>
        ))}
      </div>

      <div>
        <input
          className='input-box'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="输入问题后按回车"
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button style={{marginLeft: 8}} onClick={send}>发送</button>
        </div>
    </div>
  );
}
