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
    path: "/item",
    itens: []
  },
  {
    icon: <ClipboardDocumentIcon className="w-6 text-blue-500" />,
    name: "Checklist",
    path: "/item",
    itens: []
  },
  {
    icon: <FireIcon className="w-6 text-blue-500" />,
    name: "Microsoft",
    path: "/item",
    itens: []
  },
  {
    icon: <UsersIcon className="w-6 text-blue-500" />,
    name: "Usuarios",
    path: "/item",
    itens: []
  },
  {
    icon: <CogIcon className="w-6 text-blue-500" />,
    name: "Configurações",
    path: "/item",
    itens: []
  }
];

const App = () => {

  return (
    <div className="w-full">
      <div className='flex'>
        <Navbar menuItens={menu} />
        <main className="w-[calc(100%-280px)] p-4">
          ...
        </main>
      </div>
    </div>
  )
}

export default App;