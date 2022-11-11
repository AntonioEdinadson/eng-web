import { Navbar } from './components/Navbar'
import { RoutesList } from './routes';

const App = () => {

  return (
    <div className="w-full h-screen">
      <header className='relative w-full h-[60px] border-b border-zinc-800'>
        <div className='absolute'>
          ....
        </div>
      </header>
      <div className='flex'>
        <nav className='w-[250px]'>
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