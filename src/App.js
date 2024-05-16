import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListTask from './pages/show/ListTask'
import ManageTask from './pages/manage/ManageTask';
import AddProduct from './pages/product/AddProduct';
import Header from './components/Header'
function App() {
  return (
    <div>
     <BrowserRouter>
     <Header/>
        <Routes>
           <Route path='/' element={<ListTask/>}/>
           <Route path='/manage' element={<ManageTask/>}/>
           <Route path='/addproduct' element={<AddProduct/>}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
