//    import React from 'react';

//    import './App.css'; 
//    import InputShortener from './InputShortener.jsx';


//  function App() {
//   return (
//     <div className="app">
//       <center>

//        <h2>Home page</h2>
       
//        </center>
      
//      <InputShortener />
//     </div>
//   );
//  }

//  export default App;
import React, { useState } from 'react';

import './Analyticpage.css';


import AnalyticPage from './Analyticpage';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      
      <AnalyticPage />
    </div>
  );
};

export default App;




