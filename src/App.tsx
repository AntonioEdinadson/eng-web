import { Navbar } from './components/Navbar'


const App = () => {

  return (
    <div className="w-full">
      <div className='flex'>
        <nav className='w-[280px]'>
          <Navbar />
        </nav>
        <main className="w-[calc(100%-280px)] p-4">
          ...
        </main>
      </div>
    </div>
  )
}

export default App;