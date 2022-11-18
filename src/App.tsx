import { Navbar } from './components/Navbar'
import { RoutesList } from './routes';

import logo from './assets/logo.webp';
import { UserInfo } from './components/UserInfo';

const App = () => {

  return (
    <div className="w-full h-screen">
      <header className='relative w-full h-[60px] border-b border-zinc-800'>
        <div className='absolute w-full h-full flex items-center px-6'>
          <div className='w-full flex justify-between items-center'>
            <div className='w-[170px] flex'>
              <a href=""><img src={logo} alt="logo-multisoftware" /></a>
            </div>
            <div>
              <UserInfo />
            </div>
          </div>
        </div>
      </header>
      <div className='flex'>
        <nav className='w-[250px]'>
          <Navbar />
        </nav>
        <main className="w-[calc(100%-250px)]">
          <RoutesList></RoutesList>
        </main>
      </div>
    </div>
  )
}

export default App;