import { Navbar } from './components/Navbar'
import { TrashIcon } from '@heroicons/react/24/solid'

const menu = [
  {
    icon: <TrashIcon className="w-4 text-blue-500" />,
    name: "Menu",
    itens: []
  },
  {
    icon: <TrashIcon className="w-4 text-blue-500" />,
    name: "Menu",
    itens: []
  },
  {
    icon: <TrashIcon className="w-4 text-blue-500" />,
    name: "Menu",
    itens: []
  },
  {
    icon: <TrashIcon className="w-4 text-blue-500" />,
    name: "Menu",
    itens: []
  },
  {
    icon: <TrashIcon className="w-4 text-blue-500" />,
    name: "Menu",
    itens: []
  }
];


const App = () => {

  return (
    <div className="w-full">
      <div className='flex'>
        <Navbar menuItens={menu} />
        <main className="w-[calc(100%-250px)] p-4">
          ...
        </main>
      </div>
    </div>
  )
}

export default App