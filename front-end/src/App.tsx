import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register';

function App() {

  return (

    <div className="d-flex w-full justify-center align-items-center h-[900px]">
      <div className='d-flex  flex-col shadow-lg rounded align-items-center  p-4'>
        <div className='py-4 fs-2'>Create an account</div>
        <Register/>
      </div>
    </div>
  
  )
}

export default App
