import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TrainingCalendar from '../training-calendar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrainingCalendar />
  </StrictMode>,
)
