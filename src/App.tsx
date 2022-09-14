import { Navbar } from './components/Navbar'

import {
  PlusCircleIcon,
  CogIcon,
  FireIcon,
  UsersIcon,
  ClipboardDocumentIcon
}
  from '@heroicons/react/24/outline'

const menu = [
  {
    icon: <PlusCircleIcon className="w-6 text-blue-500" />,
    name: "Cadastro de Produtos",
    itens: []
  },
  {
    icon: <ClipboardDocumentIcon className="w-6 text-blue-500" />,
    name: "Checklist",
    itens: []
  },
  {
    icon: <FireIcon className="w-6 text-blue-500" />,
    name: "Microsoft",
    itens: []
  },
  {
    icon: <UsersIcon className="w-6 text-blue-500" />,
    name: "Usuarios",
    itens: []
  },
  {
    icon: <CogIcon className="w-6 text-blue-500" />,
    name: "Configurações",
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