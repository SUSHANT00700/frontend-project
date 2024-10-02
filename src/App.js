import './styles/app.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from './pages/Base';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Base/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
