import { InfoUser } from './components/InfoUser';
import { Navbar } from './components/Navbar'
import { RoutesList } from './routes';

const App = () => {

  return (
    <div className="w-full">
      <div className='flex'>
        <nav className='w-[280px]'>
          <Navbar />
        </nav>
        <main className="w-[calc(100%-280px)]">          
          <RoutesList></RoutesList>          
        </main>
      </div>
    </div>
  )
}

export default App;