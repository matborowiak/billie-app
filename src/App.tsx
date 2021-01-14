import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import CustomerList from './components/CustomerList'
import Header from './components/Header'

import './App.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const App = () => (
  <div id="main" className="App">
    <Header />
    <QueryClientProvider client={queryClient}>
      <CustomerList />
    </QueryClientProvider>
  </div>
)

export default App
