import "primeicons/primeicons.css" //icons
import "primereact/resources/primereact.min.css" //core css
// import "primereact/resources/themes/lara-light-indigo/theme.css" //theme
// import "primereact/resources/themes/vela-green/theme.css" //theme
import "primereact/resources/themes/tailwind-light/theme.css" //theme
import React from 'react'
import ReactDOM from 'react-dom'
// import App from './App'
import ImportGroup from './features/imports/Imports'

 

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <ImportGroup/>
  </React.StrictMode>,
  document.getElementById('root')
)
