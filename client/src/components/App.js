import '../index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components'

// Custom Components
import Header from './Header';
import Collections from './Collections';
import Cards from './Cards';
import Focus from './Focus';
import Profile from './Profile';
import Create from './Create';
import Homepage from './Homepage';
import Sidebar from './Sidebar';
import { COLORS } from './constants';
import { SIZES } from './constants';
import Loader from './Loader';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Wrapper>
        <Sidebar />
        <Pages>
          <Routes>
            <Route path='/' element = {<Homepage />} />
            <Route path='/loader' element = {<Loader />} />
            <Route path='/collections' element = {<Collections />} />
            <Route path='/cards' element = {<Cards />} />
            <Route path='/cards/:collectionId' element = {<Cards />} />
            <Route path='/create' element = {<Create />} />
            <Route path='/focus/:collectionId' element = {<Focus />} />
            <Route path='/profile' element = {<Profile />} />
          </Routes>
        </Pages>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  background: ${COLORS.altDark};
  display: flex;
  max-width: ${SIZES.containerMaxWidth};
  margin: auto;
  padding: 10px 40px;
`

const Pages = styled.div`
  width: 100%;
  padding: 0 20px;
`

export default App;
