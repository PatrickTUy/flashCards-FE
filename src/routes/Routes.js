import { Route, Routes } from 'react-router-dom';
import Explore from '../components/flashcards/ExploreFlashcards';
import Logout from '../components/flashcards/Logout';
import MyFlashcards from '../components/flashcards/myFlashcards';
import Home from '../components/home/Home';
import Login from '../components/home/Login';
import Signup from '../components/home/SignUp';
import ProtectRoute from './protectedRoutes';

const AllRoutes = () =>(
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Signup/>}
    />
    <Route path="/dashboard/flashcards" element={ 
    <ProtectRoute
      redirectTo="/login" >
          <MyFlashcards/>
    </ProtectRoute>}/>

    <Route path="/dashboard/explore" element={ 
    <ProtectRoute
      redirectTo="/login" >
          < Explore/>
    </ProtectRoute>}/>
    <Route path="/logout" element={<Logout/>}/>
  </Routes>
);

export default AllRoutes